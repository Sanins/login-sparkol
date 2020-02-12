import React, { useState } from "react";
import './Login.scss';

const Login: React.FC<{}> = () => {

	// username: jeff1967
	// password: lightbulb

	const [form, setValues] = useState({
        username: '',
        password: '',
    });

	const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(form.username, form.password);
	};

	const updateField = (e:React.FormEvent<HTMLInputElement>) => {
		let name: string = (e.target as HTMLFormElement).name;
		let value: string = (e.target as HTMLFormElement).value;
		
        setValues({
            ...form,
            [name]: value
        });
    };

	return (
		<div className='login'>
			<h2 className='login__heading'>Login</h2>
			<form onSubmit={handleSubmit} >
				<div>
					<input className='login__input' placeholder='Email' id="username" name="username" type="text" onChange={updateField} value={form.username} />
				</div>
				<div>
					<input className='login__input' placeholder='Password' id="password" name="password" type="text" onChange={updateField} value={form.password} />
				</div>
				<button className='login__button--submit' type="submit">Submit</button>
			</form>
        </div>
			
	);
};

export default Login;
