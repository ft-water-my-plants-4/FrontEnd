import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

import { logIn } from '../actions/index';
// import { logIn } from '../actions/index';

const initialCredentials = {
	username: '',
	password: ''
};

function Login() {
	const [credentials, setCredentials] = useState(initialCredentials);

	const history = useHistory();

	const handleChange = e => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value
		});
	};

	const submitLogin = e => {
		e.preventDefault();
		// logIn(credentials); // this will need updating RE the PUT call
		axios
			.post('http://localhost:5000/api/login', credentials) // replace server location and endpoint
			.then(res => {
				localStorage.setItem('token', res.data.payload);
				setCredentials(initialCredentials);
				history.push('/dashboard');
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div className="login-container">
			<div className="Form">
				<h2>Login Credentials</h2>
				<form onSubmit={submitLogin} id="login">
					<label>
						{' '}
						Name:
						<input
							type="text"
							name="username"
							id="name-input"
							value={credentials.username}
							onChange={handleChange}
						/>
					</label>
					<br />
					<label>
						{' '}
						Password:
						<input
							type="password"
							name="password"
							id="password-input"
							minLength="5"
							value={credentials.password}
							onChange={handleChange}
						/>
					</label>
					<br />
					<div className="submit">
						<button id="login-btn">Login!</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
// export default connect(null, {})(Login);
