import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/login';
//const baseUrl = '/api/login';
const login = (username, password) => {
	const request = axios.post(baseUrl, { username, password });
	return request.then((response) => response.data);
};
const loadUserData = () => {
	const loggedNoteappUser = window.localStorage.getItem('loggedBlogappUser');
	return loggedNoteappUser && JSON.parse(loggedNoteappUser);
};
export default { login, loadUserData };
