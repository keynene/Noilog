import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

/* Actions */
import {LoggedIn} from '../store.js';

function Login(){

	const [uid, setUid] = useState("");
  const [upassword, setUpassword] = useState("");

	let dispatch = useDispatch()
	let navigate = useNavigate();

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
		e.preventDefault();
		try {
			if (uid !== "" && upassword !== ""){
				let compId = JSON.parse(localStorage.getItem(JSON.stringify(uid))).id
				let compPassword = JSON.parse(localStorage.getItem(JSON.stringify(uid))).password

				if (compId === uid && compPassword === upassword){
					dispatch(LoggedIn())
					navigate("/")
				} 
				
				else if (compId === uid && compPassword !== upassword) { 
					alert('비밀번호를 다시 확인해주세요!')
				} 
				
				else if(compId !== uid && compPassword === upassword) {
					alert('없는 아이디입니다.')
				}
			}
			else if (uid === ""){
				alert('아이디를 입력해주세요')
			}
			else if (upassword === ""){
				alert('비밀번호를 입력해주세요')
			}
		} catch(error) { console.log(error.message) }
		
	}

	return(
		<div>
			<h4 style={{marginBottom:30, marginTop:30}} >Login</h4>
			<form onSubmit={onSubmit} >
				<p><input type="text" name="id" placeholder="Id" value={uid} onChange={onChange} /> </p>
				<p><input type="password" name="password" placeholder="Password" value={upassword} onChange={onChange} autoComplete="on" /></p>
				
				<input type="submit" value="Login" />
				<br />
				{/* {error && <span className="authError">{error}</span>} */}
			</form>
		</div>
	)
}

export default Login;