import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
	return axios.get(baseUrl);
};

const create = (newPhone) => {
	return axios.post(baseUrl, newPhone);
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