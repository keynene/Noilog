import React, { useState } from 'react';

function Login({ isLoggedIn }){
	const [uid, setUid] = useState("");
  const [upassword, setUpassword] = useState("");

	const onChange = (e) => {
		const {
			target: {name, value},
		} = e

		if (name === 'id'){
			setUid(value)
		} else if (name === 'password'){
			setUpassword(value)
		}
	}

	const onSubmit = (e) => {
		e.preventdefault();
	}

	const submitOnClick = () => {
		if (uid !== "" && upassword !== ""){
			compId = localStorage.getItem(uid.id)
			compPassword = localStorage.getItem(uid.password)
			if (compId === uid && compPassword === upassword){
				
			}

		}
	}

	return(
		<div>
			<h4 style={{marginBottom:30, marginTop:30}} >Login</h4>
			<form onSubmit={onSubmit} >
				<input type="text" name="id" placeholder="Id" value={uid} onChange={onChange} /> 
				<input type="password" name="password" placeholder="Password" value={upassword} onChange={onChange} />
				
				<input type="submit" value="Join us" onClick={submitOnClick} />
			</form>
		</div>
	)
}

export default Login;