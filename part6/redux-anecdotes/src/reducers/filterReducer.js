const initialState = '';
const reducer = (state = initialState, action) => {
	console.group('filter reducer');
	console.log('state now: ', state);
	console.log('action', action);
	console.groupEnd();
	switch (action.type) {
		case 'SET_FILTER':
			return action.payload.filter;
		default:
			return state;
	}
};
export const setFilter = (filter) => {
	return {
		type: 'SET_FILTER',
		payload: {
			filter: filter,
		},
	};
};
export default reducer;
