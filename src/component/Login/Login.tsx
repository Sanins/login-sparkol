import React, { useState } from 'react';
import axios from 'axios';
import './Login.scss';

export function setAuthToken(token?:any) {
	axios.defaults.headers.common['Authorization'] = '';
	delete axios.defaults.headers.common['Authorization'];
  
	if (token) {
	  axios.defaults.headers.common['Authorization'] = `${token}`;
	}
  }

const Login: React.FC<{}> = () => {

	// username: jeff1967
	// password: hotdog

	const [form, setValues] = useState({
        username: 'jeff1967',
        password: 'hotdog',
	});
	
	// const [isloading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState('');
	const [loggedIn, setIsLoggedIn] =  useState(false);

	const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		// setIsLoading(true);

		axios({
			method: 'POST',
			url: 'http://localhost:3333/login',
			data: {
				username : form.username,
				password : form.password
			  }
		})
		.then( user => {
			const token = user.data.token;
			setAuthToken(token);
			return axios.get('http://localhost:3333/verifyToken', {headers: { Authorization: `Bearer ${token}` }} )
		})
		.then((res) => {
			console.log(res.data);
			if (res.data === 'OK') {
				setIsLoggedIn(true)
				// setIsLoading(false);
			}
		})
		.catch((response) => {
			setIsError(response);
			// setIsLoading(false);
		});
	};

	const updateField = (e:React.FormEvent<HTMLInputElement>) => {
		let name: string = (e.target as HTMLFormElement).name;
		let value: string = (e.target as HTMLFormElement).value;
		
        setValues({
            ...form,
            [name]: value
        });
	};
	
	const logout = () => {
		setAuthToken();
		setIsLoggedIn(false);
	}

	return (
		<>
		{!loggedIn ?
		<div className='login'>
			<h2 className='login__heading'>Login</h2>
			<form onSubmit={handleSubmit} >
				<div>
					<input className='login__input' placeholder='Username' id="username" name="username" type="text" onChange={updateField} value={form.username} />
				</div>
				<div>
					<input className='login__input' placeholder='Password' id="password" name="password" type="text" onChange={updateField} value={form.password} />
				</div>
				<button className='login__button--submit' type="submit">Submit</button>
				{isError && 
					<p className='login__state--error'>Incorrect username or password</p> 
				}
			</form>
        </div>
		:
			<div>
				<button className='login__button--submit' onClick={logout}>Log out</button>
				<p>hello {form.username}</p>
			</div>
		}
		
		</>
			
	);
};

export default Login;
