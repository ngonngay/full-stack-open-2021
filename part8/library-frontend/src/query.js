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
	query {
		allBooks {
			title
			author
			published
		}
	}
`;
export const CREATE_BOOKS = gql`
	mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
		addBook(title: $title, author: $author, published: $published, genres: $genres) {
			title
			author
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
