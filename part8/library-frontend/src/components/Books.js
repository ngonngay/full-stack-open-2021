import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useSubscription, useApolloClient } from '@apollo/client';
import { BOOK_ADDED, ALL_BOOKS } from '../query';

const Books = (props) => {
	const { loading, data, error } = useQuery(ALL_BOOKS);
	const [filter, setFilter] = useState(null);
	const client = useApolloClient();
	const updateCacheWith = (addedBook) => {
		const includedIn = (set, object) => set.map((p) => p.id).includes(object.id);
		console.log(addedBook);
		const dataInStore = client.readQuery({ query: ALL_BOOKS });
		console.log(!includedIn(dataInStore.allBooks, addedBook));
		if (!includedIn(dataInStore.allBooks, addedBook)) {
			client.writeQuery({
				query: ALL_BOOKS,
				data: { allBooks: dataInStore.allBooks.concat(addedBook) },
			});
		}
	};
	useSubscription(BOOK_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			const addedBook = subscriptionData.data.bookAdded;
			console.log(addedBook);
			window.alert(`${addedBook.name} added`);
			updateCacheWith(addedBook);
		},
	});
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
