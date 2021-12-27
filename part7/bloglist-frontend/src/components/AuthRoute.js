import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = (props) => {
	const user = useSelector((state) => state.loggedUser);
	//console.log(user);
	//console.log('auth');
	if (!user) {
		return <Redirect to='/login' />;
	}
	return <Route {...props} />;
};

export default AuthRoute;
