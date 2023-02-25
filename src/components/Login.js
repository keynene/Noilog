import React, { useState } from 'react';

function Login(){
	const [id, setId] = useState("");
  const [password, setPassword] = useState("");

	const onChange = (e) => {
		const {
			target: {name, value},
		} = e

		if (name === 'id'){
			setId(value)
		} else if (name === 'password'){
			setPassword(value)
		}
	}

	const onSubmit = (e) => {
		e.preventdefault();
	}

	const submitOnClick = (e) => {
		if (id !== "" && password !== ""){
			//아이디값에 맞는 password 확인 후 로그인
			// console.log(localStorage.getItem('id'))

		}
	}

	return(
		<div>
			<h4 style={{marginBottom:30, marginTop:30}} >Login</h4>
			<form onSubmit={onSubmit} >
				<input type="text" name="id" placeholder="Id" value={id} onChange={onChange} /> 
				<input type="password" name="password" placeholder="Password" value={password} onChange={onChange} />
				
				<input type="submit" value="Join us" onClick={submitOnClick} />
			</form>
		</div>
	)
}

export default Login;