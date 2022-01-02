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
export const ALL_BOOKS = gql`
	query ($author: String, $genre: String) {
		allBooks(author: $author, genre: $genre) {
			title
			author {
				name
			}
			published
			genres
		}
	}
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
			title
			author {
				name
			}
			published
		}
	}
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
