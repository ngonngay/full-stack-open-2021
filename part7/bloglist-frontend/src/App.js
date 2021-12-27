import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';

import AuthRoute from './components/AuthRoute';
import { HomePage, LoginPage, UsersPage, UserDetailPage, BlogDetailPage } from './components/Pages';
import Notification from './components/Notification';
import './index.css';
import { Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initializeBlogs());
		dispatch(initializeUsers());
	}, []);
	useLayoutEffect(() => {}, []);
	const loggedUser = useSelector((state) => state.loggedUser);
	//console.log(loggedUser);

	return (
		<div>
			<h2>blogs</h2>
			<Nav />
			<br />
			<Notification />
			<br />
			<Switch>
				<Route path='/login' component={LoginPage} />
				<AuthRoute path='/users/:id' component={UserDetailPage} />
				<AuthRoute path='/blog/:id' component={BlogDetailPage} />
				<AuthRoute path='/users' component={UsersPage} />
				<AuthRoute path='/' component={HomePage} />
			</Switch>
			<br />
		</div>
	);
};

export default App;
