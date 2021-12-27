import loginService from '../services/login';

const initialState = null;

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'INIT_USER':
			return action.payload.user;
		case 'LOGOUT':
			return action.payload.user;
		case 'LOGIN':
			return action.payload.user;
		default:
			break;
	}
	return state;
};

const initializeLoggedUser = () => {
	return (dispatch) => {
		const loggedNoteappUser = window.localStorage.getItem('loggedBlogappUser');
		dispatch({
			type: 'INIT_USER',
			payload: {
				user: loggedNoteappUser && JSON.parse(loggedNoteappUser),
			},
		});
	};
};
const logout = () => {
	return (dispatch) => {
		window.localStorage.removeItem('loggedBlogappUser');
		dispatch({
			type: 'LOGOUT',
			payload: {
				user: null,
			},
		});
	};
};
const login = (username, password) => {
	return async (dispatch) => {
		const user = await loginService.login(username.trim(), password.trim());
		if (user) {
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
		}
		dispatch({
			type: 'LOGIN',
			payload: {
				user: user,
			},
		});
	};
};

export { initializeLoggedUser, logout, login };
export default reducer;
