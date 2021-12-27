import anecdotesService from '../services/anecdotes';
const anecdotesAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	};
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
	console.group('anecdote reducer');
	console.log('state now: ', state);
	console.log('action', action);
	console.groupEnd();
	switch (action.type) {
		case 'VOTE':
			let newVote = state.find((anecdote) => anecdote.id === action.payload.id);
			newVote.votes += 1;
			return state
				.map((anecdote) => (anecdote.id === action.payload.id ? newVote : anecdote))
				.sort((a, b) => -(a.votes - b.votes));
		case 'CREATE':
			let newAnecdote = action.payload;
			return [...state, newAnecdote].sort((a, b) => -(a.votes - b.votes)); //6.5;
		case 'INIT_ANECDOTES':
			return action.payload.anecdotes;
		default:
			break;
	}
	return state;
};
const voteAnecdote = (anecdote) => {
	return async (dispatch) => {
		const updatedAnecdote = await anecdotesService.updateVote(anecdote);
		dispatch({
			type: 'VOTE',
			payload: {
				id: anecdote.id,
			},
		});
	};
};
const createAnecdote = (anecdote) => {
	return async (dispatch) => {
		const savedAnecdote = await anecdotesService.createNew(anecdote);
		dispatch({
			type: 'CREATE',
			payload: savedAnecdote,
		});
	};
};
const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdotesService.getAll();
		dispatch({
			type: 'INIT_ANECDOTES',
			payload: {
				anecdotes: anecdotes,
			},
		});
	};
};
export { voteAnecdote, createAnecdote, initializeAnecdotes }; //6.6
export default reducer;
