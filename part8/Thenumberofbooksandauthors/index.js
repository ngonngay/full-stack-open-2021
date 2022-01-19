const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { UserInputError, AuthenticationError, gql } = require('apollo-server');
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const express = require('express');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const cors = require('cors');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('./utils/config');
const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User');
const { ObjectId } = require('bson');
const url = config.MONGODB_URI;
mongoose.connect(url)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

const typeDefs = gql`
	type Author {
		name: String
		bookCount: Int
		born: Int
		id: ID!
	}
	type Book {
		title: String!
		published: Int!
		author: Author!
		genres: [String!]!
		id: ID!
	}
	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}
	type Token {
		value: String!
	}

	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book]
		allAuthors: [Author]!
		me: User
	}
	type Mutation {
		addBook(title: String, author: String, published: Int, genres: [String!]!): Book
		editAuthor(name: String!, setBornTo: Int!): Author
		createUser(username: String!, favoriteGenre: String!): User
		login(username: String!, password: String!): Token
	}
	type Subscription {
		bookAdded: Book!
	}
`;

const resolvers = {
	Query: {
		bookCount: async () => await Book.find({}).count(),
		authorCount: async () => await Author.find({}).count(),
		allBooks: async (root, args) => {
			const findByAuthor = async () => {
				const author = await Author.findOne({ name: args.author });
				//console.log('author: ', author.id);
				let books = await Book.aggregate([
					{
						$match: {
							author: new ObjectId(author.id),
						},
					},
					{
						$lookup: {
							from: 'authors',
							let: {
								author_id: '$author',
								author_name: args.author,
							},
							pipeline: [
								{
									$match: {
										$expr: {
											$and: [
												{
													$eq: [
														'$_id',
														'$$author_id',
													],
												},
												{
													$eq: [
														'$name',
														'$$author_name',
													],
												},
											],
										},
									},
								},
							],
							as: 'author',
						},
					},
					{
						$unwind: '$author',
					},
				]);
				return books;
			};
			if (args.author && args.genre) {
				const books = await findByAuthor();
				return books.filter((book) => book.genres.includes(args.genre));
			} else if (args.author) {
				const books = await findByAuthor();
				//console.log(books);
				return books;
			} else if (args.genre) {
				let books = await Book.find({
					genres: { $elemMatch: { $eq: args.genre } },
				}).populate('author');
				//console.log(books);
				return books;
			} else {
				let books = await Book.find({}).populate('author');
				//console.log(books);
				return books;
			}
		},
		allAuthors: async () => {
			const authors = await Author.find({});
			//console.log(authors);
			return authors;
		},
		me: (root, args, context) => {
			return context.currentUser;
		},
	},
	Mutation: {
		addBook: async (root, args, context) => {
			//console.log(args);
			const currentUser = context.currentUser;

			if (!currentUser) {
				throw new AuthenticationError('not authenticated');
			}

			try {
				const { title, published, genres } = args;
				const book = new Book({ title, published, genres });
				let existAuthor = await Author.findOne({ name: args.author });
				//console.log(existAuthor);
				if (existAuthor) {
					book.author = existAuthor.id;
				} else {
					const author = new Author({ name: args.author });
					await author.save();
					//console.log(author.id);
					book.author = author.id;
				}
				// console.log(book);
				await pubsub.publish('BOOK_ADDED', { bookAdded: book });
				await book.save();
				return book.populate('author');
			} catch (err) {
				console.log(err);
				return new Error(err.message);
			}
		},
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser;
			if (!currentUser) {
				throw new AuthenticationError('not authenticated');
			}

			const result = await Author.findOneAndUpdate(
				{ name: args.name },
				{ $set: { born: args.setBornTo } },
				{ new: true },
			);
			return result;
		},
		createUser: async (root, args) => {
			const user = new User({ ...args });
			try {
				await user.save();
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			}
			return user;
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== 'thang') {
				throw new UserInputError('wrong credentials');
			}

			const userForToken = {
				username: user.username,
				id: user.id,
			};

			return { value: jwt.sign(userForToken, config.JWT_SECRET) };
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => {
				console.log('subscribe');
				pubsub.asyncIterator(['BOOK_ADDED']);
			},
		},
	},
};

(async function () {
	const app = express();
	app.use(cors());
	app.get('/api/ping', (_req, res) => {
		console.log('someone pinged here');
		res.send('pong');
	});
	app.get('/api/books', async (_req, res) => {
		let books = await Book.find({}).populate('author');
		//console.log(books);
		res.send(books);
	});
	const httpServer = createServer(app);
	const schema = makeExecutableSchema({ typeDefs, resolvers });
	const subscriptionServer = SubscriptionServer.create(
		{
			// This is the `schema` we just created.
			schema,
			// These are imported from `graphql`.
			execute,
			subscribe,
		},
		{
			// This is the `httpServer` we created in a previous step.
			server: httpServer,
			// Pass a different path here if your ApolloServer serves at
			// a different path.
			path: '/graphql',
		},
	);

	const server = new ApolloServer({
		schema,
		context: async ({ req }) => {
			const auth = req ? req.headers.authorization : null;
			if (auth && auth.toLowerCase().startsWith('bearer ')) {
				const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET);
				const currentUser = await User.findById(decodedToken.id);
				return { currentUser };
			}
		},
		plugins: [
			ApolloServerPluginLandingPageGraphQLPlayground(),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							subscriptionServer.close();
						},
					};
				},
			},
		],
	});
	await server.start();
	server.applyMiddleware({ app });

	const PORT = 4000;
	httpServer.listen(PORT, () =>
		console.log(`Server is now running on http://localhost:${PORT}/graphql`),
	);
})();
