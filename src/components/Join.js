import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

/* Actions */
import { createUserObj } from '../store.js';
import { LoggedIn } from '../store.js';

function Join(){
	const [uid, setUid] = useState("");
  const [upassword, setUpassword] = useState("");
	const [uemail, setUemail] = useState("");
	const [uname, setUnName] = useState("");
	const [unickname, setUnickname] = useState("");
	
	let navigate = useNavigate();
	const [joinUserObj, setJoinUserObj] = useState(null);

	let dispatch = useDispatch();

	const onChange = (e) => {
		const {
			target: { name, value },
		} = e;

		if (name === 'id'){
			setUid(value)
		} else if (name === 'password'){
			setUpassword(value)
		} else if (name === 'email'){
			setUemail(value)
		} else if (name === 'name'){
			setUnName(value)
		} else if (name === 'nickname'){
			setUnickname(value)
		}
	}

	const onSubmit = async(e) => {
		e.preventDefault();
		try{
			if (uid !== "" && upassword !== "" && uemail !== "" && uname !== "" && unickname !== ""){
				setJoinUserObj({
					id:uid,
					password:upassword,
					email:uemail,
					name:uname,
					nickname:unickname
				})
				dispatch(createUserObj(joinUserObj))
				dispatch(LoggedIn(joinUserObj.id))
				setJoinUserObj(null)
				navigate('/')
			}
			else if (uid === ""){
				alert('아이디를 입력해주세요!')
			}
			else if (upassword === ""){
				alert('비밀번호를 입력해주세요!')
			}
			else if (uemail === ""){
				alert('이메일을 입력해주세요!')
			}
			else if (uname === ""){
				alert('이름을 입력해주세요!')
			}
			else if (unickname === ""){
				alert('닉네임을 입력해주세요!')
			}
		} catch{}
	}

	return(
		<div>
			<h4 style={{marginBottom:30, marginTop:30}} >Join</h4>
			<form onSubmit={onSubmit}>
				<p><input type="text" name="id" placeholder="Id" value={uid} onChange={onChange} /> </p>
				<p><input type="password" name="password" placeholder="Password" value={upassword} onChange={onChange} autoComplete="on" /></p>
				<p><input type="email" name="email" placeholder="Email" value={uemail} onChange={onChange} /></p>
				<p><input type="text" name="name" placeholder="Name" value={uname} onChange={onChange} /></p>
				<p><input type="text" name="nickname" placeholder="Nickname" value={unickname} onChange={onChange} /></p>
				
				<input style={{marginTop:30}} type="submit" value="Join us" />
			</form>
		</div>
	)
}

export default Join;