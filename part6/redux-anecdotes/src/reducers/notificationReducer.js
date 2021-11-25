//6.11
const initialState = '';
const reducer = (state = initialState, action) => {
	console.group('notification reducer');
	console.log('state now: ', state);
	console.log('action', action);
	console.groupEnd();
	switch (action.type) {
		case 'SET_MESSAGE':
			clearTimeout(state.delay);
			return action.data;
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
		data: {
			message,
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
