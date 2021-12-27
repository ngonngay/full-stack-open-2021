import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../reducers/loginReducer';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const history = useHistory();
	const submitPrevent = async (e) => {
		e.preventDefault();
		//console.log(username, password);
		try {
			setUserName('');
			setPassword('');
			await dispatch(login(username, password));
			history.push('/');
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

export default LoginForm;
