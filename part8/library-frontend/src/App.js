import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Recommend from './components/Recommend';
const App = () => {
	const [page, setPage] = useState('authors');
	const [token, setToken] = useState('');
	useEffect(() => {
		const token = localStorage.getItem('library-user-token');
		if (token) setToken(token);
	}, []);
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

			<NewBook show={page === 'add'} />

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
