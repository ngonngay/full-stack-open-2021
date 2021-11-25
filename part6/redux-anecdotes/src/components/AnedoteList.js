//6.8
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnedoteList = () => {
	const anecdotes = useSelector((state) =>
		state.anecdotes
			.filter((anecdote) =>
				anecdote.content.toUpperCase().includes(state.filter.toUpperCase()),
			)
			.sort((a, b) => -(a.votes - b.votes)),
	);
	const dispatch = useDispatch();

	const vote = (anecdote) => {
		dispatch(voteAnecdote(anecdote));
		dispatch(setNotification(`you voted '${anecdote.content}'`, 5, dispatch));
	}; //6.3

	return (
		<>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</>
	);
};

export default AnedoteList;
