import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import anecdoteService from '../services/anecdotes';
const AnedoteForm = () => {
	const dispatch = useDispatch();
	const handleSubmit = async (e) => {
		e.preventDefault();
		let anecdote = e.target.anecdote.value;
		dispatch(createAnecdote(anecdote));
		e.target.anecdote.value = '';
		e.target.anecdote.focus();
	}; //6.4
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<input name='anecdote' />
			</div>
			<button type='submit'>create</button>
		</form>
	);
};

export default AnedoteForm;
