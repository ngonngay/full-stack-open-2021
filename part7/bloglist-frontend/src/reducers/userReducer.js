import userService from '../services/user';

const userReducer = (state = [], action) => {
	//console.log('state now: ', state);
	//console.log('action', action);
	switch (action.type) {
		case 'INIT_USERS':
			return action.payload.users;
		default:
			return state;
	}
};

export const initializeUsers = () => {
	return async (dispatch) => {
		const users = await userService.getAll();
		dispatch({
			type: 'INIT_USERS',
			payload: {
				users: users.users,
			},
		});
	};
};

export default userReducer;
