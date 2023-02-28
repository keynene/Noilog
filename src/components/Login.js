import React, { useState } from 'react';

function Login({ loginChange }){

	const [uid, setUid] = useState("");
  const [upassword, setUpassword] = useState("");
	// const [error, setError] = useState("");

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

	const handleLogin = () => {
		loginChange()
	}

	const onSubmit = (e) => {
		e.preventDefault();
		try {
			if (uid !== "" && upassword !== ""){
				let compId = JSON.parse(localStorage.getItem(JSON.stringify(uid))).id
				let compPassword = JSON.parse(localStorage.getItem(JSON.stringify(upassword))).password
				if (compId === uid && compPassword === upassword){
					handleLogin()
				}
				else { alert('뭔가잘못됨') }
			}
		} catch {  }
		
	}

	// const submitOnClick = () => {
		
	// }

	return(
		<div>
			<h4 style={{marginBottom:30, marginTop:30}} >Login</h4>
			<form onSubmit={onSubmit} >
				<p><input type="text" name="id" placeholder="Id" value={uid} onChange={onChange} /> </p>
				<p><input type="password" name="password" placeholder="Password" value={upassword} onChange={onChange} /></p>
				
				<input type="submit" value="Login" />
				<br />
				{/* {error && <span className="authError">{error}</span>} */}
			</form>
		</div>
	)
}

export default Login;