import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Recommend from './components/Recommend';
import { useSubscription, useApolloClient } from '@apollo/client';
import { BOOK_ADDED, ALL_BOOKS } from './query';

const App = () => {
	const [page, setPage] = useState('authors');
	const [token, setToken] = useState('');
	const client = useApolloClient();
	useEffect(() => {
		const token = localStorage.getItem('library-user-token');
		if (token) setToken(token);
	}, []);
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
	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				{token ? (
					<>
						<button onClick={() => setPage('add')}>add book</button>
						<button onClick={() => setPage('recommend')}>
							recommend
						</button>
						<button
							onClick={() => {
								localStorage.removeItem('library-user-token');
								setToken('');
								setPage('authors');
							}}>
							logout
						</button>
					</>
				) : (
					<button onClick={() => setPage('login')}>login</button>
				)}
			</div>

			<Authors show={page === 'authors'} logged={!!token} />

			<Books show={page === 'books'} />

			<NewBook show={page === 'add'} updateCacheWith={updateCacheWith} />

			<Recommend show={page === 'recommend'} />

			<Login
				show={page === 'login'}
				handleLogin={() => setPage('books')}
				setToken={setToken}
			/>
		</div>
	);
};

export default App;
