//6.9
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import anecdoteReducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';

const reducer = combineReducers({
	message: notificationReducer,
	anecdotes: anecdoteReducer,
	filter: filterReducer,
}); //6.10

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
