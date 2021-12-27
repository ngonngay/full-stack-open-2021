import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { blogReducer, loginReducer, notificationReducer, userReducer } from './reducers';
import { loginService } from './services';
const persistedData = {
	loggedUser: loginService.loadUserData(),
};

const reducer = combineReducers({
	blogs: blogReducer,
	loggedUser: loginReducer,
	message: notificationReducer,
	users: userReducer,
});
const store = createStore(reducer, persistedData, applyMiddleware(thunk));
export default store;
