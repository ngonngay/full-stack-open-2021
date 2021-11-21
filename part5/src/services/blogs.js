import axios from 'axios';
//production url
//const baseUrl = '/api/blogs'
//dev url
const baseUrl = 'http://localhost:3001/api/blogs';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};
let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.post(baseUrl, newObject, config);
	return response.data;
};

const update = (id, newObject) => {
	const config = {
		headers: { Authorization: token },
	};
	const request = axios.put(`${baseUrl}/${id}`, newObject, config);
	return request.then((response) => response.data);
};
const deleteBlog = (id) => {
	const config = {
		headers: { Authorization: token },
	};
	const request = axios.delete(`${baseUrl}/${id}`, config);
	return request.then((response) => response.data);
};

export default { getAll, create, update, setToken, deleteBlog };
