import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../helpers/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const Login = () => {
	// * make a post request to retrieve a token from the api
	// * when you have handled the token, navigate to the BubblePage route

	// ?? Set initialState
	const initialState = {
		credentials: {
			username: '',
			password: '',
			error: '',
		},
	};

	// ?? Set state, utilizing initialState
	const [state, setState] = useState(initialState);

	// ?? Set error state
	const [error, setError] = useState(initialState.error);

	// ?? Set history for redirecting
	const history = useHistory();

	// ?? handleChanges
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
		// ?? Use axiosWithAuth
		axiosWithAuth()
			// ?? post - path to login, using state.credentials for second parameter
			.post('http://localhost:5000/api/login', state.credentials)
			.then((res) => {
				console.log('Login.js: axios post =====> ', res);
				// ?? Set 'token' to localStorage
				localStorage.setItem('token', res.data.payload);
				// ?? Redirect to BubblePage (protected path)
				history.push('/protected');
			})
			.catch((err) => {
				console.error(
					// ?? Error message for invalid credentials
					'Username or Password not valid.',
					err.message
				);
				// ?? Set erroe message
				setError({ error: err.message });
			});
	};

	useEffect(() => {
		axiosWithAuth()
			.delete(`http://localhost:5000/api/colors/1`, {
				headers: {
					authorization:
						'ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98',
				},
			})
			.then((res) => {
				axiosWithAuth()
					.get(`http://localhost:5000/api/colors`, {
						headers: {
							authorization: '',
						},
					})
					.then((res) => {
						console.log(res);
					});
				console.log(res);
			});
	});

	return (
		<>
			<h1>Welcome to the Bubble App!</h1>
			{/* // ?? Login form */}
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
				{error && <p>Username or Password not valid.</p>}
			</form>
		</>
	);
};

export default Login;

// * Task List:
// * 1. Build a form containing a username and password field.
// * 2. Add whatever state nessiary for form functioning.
// * 3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
// * 4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
// * 5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.
