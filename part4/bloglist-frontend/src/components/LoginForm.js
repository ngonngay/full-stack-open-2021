import React, { useState } from 'react';
import loginService from '../services/login';
const LoginForm = ({ handleLogin }) => {
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');

	const submitPrevent = async (e) => {
		e.preventDefault();
		console.log(username, password);
		try {
			const user = await loginService.login(username.trim(), password.trim());
			console.log(user);
			setUserName('');
			setPassword('');
			handleLogin(user);
		} catch (error) {
			console.log(error);
			handleLogin(null);
		}
	};
	return (
		<div>
			<h1>Log in</h1>

			{/* <Notification message={errorMessage} /> */}

			<form onSubmit={(e) => submitPrevent(e)}>
				<div>
					username
					<input
						type='text'
						value={username}
						name='username'
						label='username'
						onChange={({ target }) => setUserName(target.value)}
					/>
				</div>
				<div>
					password
					<input
						// type='password'
						value={password}
						name='password'
						label='password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
	);
};

export default LoginForm;
