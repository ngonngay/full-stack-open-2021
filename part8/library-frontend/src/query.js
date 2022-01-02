import { gql } from '@apollo/client';

export const ALL_AUTHOR = gql`
	query {
		allAuthors {
			name
			bookCount
			born
		}
	}
`;
const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		title
		author {
			name
		}
		published
		genres
		id
	}
`;
export const ALL_BOOKS = gql`
	query ($author: String, $genre: String) {
		allBooks(author: $author, genre: $genre) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;
export const ME = gql`
	query {
		me {
			username
			favoriteGenre
		}
	}
`;
export const CREATE_BOOKS = gql`
	mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
		addBook(title: $title, author: $author, published: $published, genres: $genres) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`;
export const UPDATE_BORN = gql`
	mutation editAuthor($name: String!, $born: Int!) {
		editAuthor(name: $name, setBornTo: $born) {
			name
			bookCount
			born
		}
	}
`;
export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`;
export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}

	${BOOK_DETAILS}
`;
