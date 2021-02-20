import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
	// * make a post request to retrieve a token from the api
	// * when you have handled the token, navigate to the BubblePage route

	const initialState = {
		credentials: {
			username: '',
			password: '',
		},
	};

	const [state, setState] = useState(initialState);

	const history = useHistory();

	const handleChange = (e) => {
		setState({
			credentials: {
				...state.credentials,
				[e.target.name]: e.target.value,
			},
		});
	};

	const login = (e) => {
		e.preventDefault();
		axios.post('http://localhost:5000/api/login', state.credentials)
			.then((res) => {
				console.log('Login.js: axios post =====> ', res);
				localStorage.setItem('token', res.data.payload);
				history.push('/protected');
			})
			.catch((err) =>
				console.err('Username or Password not valid.', err.message)
			);
	};

	useEffect(() => {
		axios.delete(`http://localhost:5000/api/colors/1`, {
			headers: {
				authorization:
					'ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98',
			},
		}).then((res) => {
			axios.get(`http://localhost:5000/api/colors`, {
				headers: {
					authorization: '',
				},
			}).then((res) => {
				console.log(res);
			});
			console.log(res);
		});
	});

	return (
		<>
			<h1>
				Welcome to the Bubble App!
				<p>Log In</p>
			</h1>
			<form onSubmit={login}>
				<label>
					username:
					<input
						name="username"
						type="text"
						value={state.username}
						onChange={handleChange}
					/>
				</label>
				<label>
					password:
					<input
						name="password"
						type="password"
						value={state.password}
						onChange={handleChange}
					/>
				</label>
				<button>Log In</button>
			</form>
		</>
	);
};

export default Login;

//Task List:
// * 1. Build a form containing a username and password field.
// * 2. Add whatever state nessiary for form functioning.
// * 3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.
