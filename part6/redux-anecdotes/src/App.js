import React, { useEffect } from 'react';
import AnedoteForm from './components/AnedoteForm';
import AnedoteList from './components/AnedoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import { initializeAnecdotes } from './reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeAnecdotes()); //6.13
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Notification />
			<h2>Anecdotes</h2>
			<Filter />
			<AnedoteList />
			<h2>create new</h2>
			<AnedoteForm />
		</div>
	);
};

export default App;
