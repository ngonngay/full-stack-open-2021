import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
	const response = await axios.get(baseUrl);
	console.log(response.data);
	return response.data;
};
const createNew = async (anecdote) => {
	const object = { content: anecdote, votes: 0 };
	const response = await axios.post(baseUrl, object);
	return response.data;
}; //6.14
const updateVote = async (anecdote) => {
	const object = { ...anecdote, votes: anecdote.votes + 1 };
	console.log(object);
	const response = await axios.put(`${baseUrl}/${anecdote.id}`, object);
	return response.data;
}; //6.14

export default {
	getAll,
	createNew,
	updateVote,
};
