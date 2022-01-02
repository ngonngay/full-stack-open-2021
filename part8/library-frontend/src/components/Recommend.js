import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../query';
const Recommend = (props) => {
	const { loading: me_loading, error: me_error, data: me } = useQuery(ME);

	const favoriteGenre = me?.me?.favoriteGenre;

	const { loading, error, data } = useQuery(ALL_BOOKS, {
		variables: { genre: favoriteGenre },
		fetchPolicy: 'no-cache',
	});

	if (!props.show) {
		return null;
	}

	if (loading || me_loading) return <p>Loading...</p>;
	if (error || me_error) return <p>Error :(</p>;
	console.log(data);
	return (
		<div>
			<h1>Recommendations</h1>
			<h2>
				Books in your favorite genre <i>{favoriteGenre}</i>{' '}
			</h2>
			<table>
				<tbody>
					<tr>
						<th>name</th>
						<th>author</th>
						<th>published</th>
					</tr>
					{data?.allBooks.map((book) => (
						<tr key={book.title}>
							<td>{book.title}</td>
							<td>{book.author.name}</td>
							<td>{book.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Recommend;
