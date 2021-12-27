import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../../reducers/loginReducer';
import BlogList from '../../BlogList';
import CreateBlogForm from '../../CreateBlogForm';

const HomePage = () => {
	const user = useSelector((state) => state.loggedUser);
	//console.log(user);
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<div>
			<p>
				{user.name} logged-in <button onClick={() => handleLogout()}>Logout</button>
			</p>
			<br />
			<CreateBlogForm />
			<br />
			<BlogList />
		</div>
	);
};

export default HomePage;
