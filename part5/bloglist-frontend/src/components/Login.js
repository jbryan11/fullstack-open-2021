import { Fragment, useState } from "react";
import loginService from "../services/login";
export default function Login(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	async function  handleSubmit(event) {
        event.preventDefault()
		const user = await loginService.login({username, password})
        window.localStorage.setItem("loggedUser", JSON.stringify(user))
        props.data(user)
	}
	return (
		<Fragment>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					onChange={({ target }) => {
						setUsername(target.value);
					}}
					placeholder='Enter your username'
                    value={username}
				/>
				<input
					type='password'
					onChange={({ target }) => {
						setPassword(target.value);
					}}
					placeholder='Enter your password'
                    value={password}
				/>
				<button type='submit'>Login</button>
			</form>
		</Fragment>
	);
}
