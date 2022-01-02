import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../query';
const Login = (props) => {
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const { handleLogin, setToken } = props;
	const [login, result] = useMutation(LOGIN, {
		onError: (error) => {
			console.log(error);
		},
	});
	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value;
			setToken(token);
			localStorage.setItem('library-user-token', token);
		}
	}, [result.data]); // eslint-disable-line

	if (!props.show) {
		return null;
	}

	const submitPrevent = async (e) => {
		e.preventDefault();
		//console.log(username, password);
		try {
			setUserName('');
			setPassword('');
			console.log('login');
			login({ variables: { username, password } });
			handleLogin();
		} catch (error) {
			//handleLogin(null);
		}
	};
	return (
		<div>
			<h1>Log in</h1>
			<form onSubmit={(e) => submitPrevent(e)}>
				<div>
					username
					<input
						type='text'
						value={username}
						name='username'
						label='username'
						onChange={({ target }) => setUserName(target.value)}
						required
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
						required
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
	);
};

export default Login;
