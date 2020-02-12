import React, { useState } from "react";

const Login: React.FC<{}> = () => {

	// username: jeff1967
	// password: lightbulb

	const [form, setValues] = useState({
        username: 'jeff1967',
        password: 'lightbulb',
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
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username:</label>
				<input id="username" name="username" type="text" onChange={updateField} value={form.username} />
				<label>Password:</label>
				<input id="password" name="password" type="text" onChange={updateField} value={form.password} />
				<button type="submit">Submit</button>
			</form>
        </div>
			
	);
};

export default Login;
