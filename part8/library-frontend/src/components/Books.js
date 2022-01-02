import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../query';

const Books = (props) => {
	const { loading, data, error } = useQuery(ALL_BOOKS);
	const [filter, setFilter] = useState(null);
	if (!props.show) {
		return null;
	}
	if (error) return <p>Error :(</p>;
	//if (error) return <p>{error}</p>;
	if (loading) {
		return <p>Loading...</p>;
	}
	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th>name</th>
						<th>author</th>
						<th>published</th>
					</tr>
					{data?.allBooks.map((book) => {
						if (filter) {
							if (book.genres.includes(filter)) {
								return (
									<tr key={book.title}>
										<td>{book.title}</td>
										<td>{book.author.name}</td>
										<td>{book.published}</td>
									</tr>
								);
							}
						} else {
							return (
								<tr key={book.title}>
									<td>{book.title}</td>
									<td>{book.author.name}</td>
									<td>{book.published}</td>
								</tr>
							);
						}
					})}
				</tbody>
			</table>
			<br />
			{data
				? [
						...new Set(
							data?.allBooks.reduce((genres, book) => {
								return (genres = [...genres, ...book.genres]);
							}, []),
						),
				  ]
						.map((genre) => {
							return (
								<i key={genre}>
									<button
										onClick={() =>
											setFilter(genre)
										}>
										{genre}
									</button>{' '}
								</i>
							);
						})
						.concat(
							<i key={'all'}>
								<button onClick={() => setFilter()}>
									All
								</button>
							</i>,
						)
				: null}
		</div>
	);
};

export default Books;
