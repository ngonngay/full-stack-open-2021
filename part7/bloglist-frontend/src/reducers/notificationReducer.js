//6.11
const initialState = {};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_MESSAGE':
			clearTimeout(state.delay);
			return action.payload;
		case 'REMOVE_MESSAGE':
			return initialState;
		default:
			break;
	}
	return state;
};
export const setNotification = (message, delay, dispatch) => {
	return {
		type: 'SET_MESSAGE',
		payload: {
			message: message.message,
			type: message.type,
			delay: setTimeout(() => {
				dispatch(removeNotification(''));
			}, delay * 1000), //6.18
		},
	};
};

export const removeNotification = () => {
	return {
		type: 'REMOVE_MESSAGE',
	};
};
export default reducer;
