import axios from 'axios';
// const baseUrl = 'http://localhost:3001/api/persons';
const baseUrl = '/api/persons';

const getAll = () => {
	return axios.get(baseUrl);
};

const create = (newPhone) => {
	return axios.post(`${baseUrl}/create`, newPhone);
};

const replace = (id, newPhone) => {
	return axios.put(`${baseUrl}/${id}`, newPhone);
};
const deleted = (id) => {
	return axios.delete(`${baseUrl}/${id}`);
};
const update = (id, newData) => {
	return axios.patch(`${baseUrl}/${id}`, newData);
};
export default {
	getAll,
	create,
	update,
	deleted,
	replace,
};
