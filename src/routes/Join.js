import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Join(){
	const [uusername, setUusername] = useState("");
  const [upassword, setUpassword] = useState("");
	const [uemail, setUemail] = useState("");
	const [uname, setUnName] = useState("");
	const [unickname, setUnickname] = useState("");
	
	let navigate = useNavigate();
	const joinUserObj = 
    {
      username:"",
      password:"",
      email:"",
      name:"",
      nickname:"",
    };

  let API_URL = "http://3.36.85.194:42988";

	const onChange = (e) => {
		const {
			target: { name, value },
		} = e;

		if (name === 'username'){
			setUusername(value)
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

  let signupRequest = (createReq) => {
    axios
      .post(`${API_URL}/signup`, createReq)
      .then(response => {
        console.log(response)
        alert(`회원가입이 완료됐어요 😎`)
        navigate("/login")
      })
      .catch(err => console.log(err))
  }

	const onSubmit = (e) => {
		e.preventDefault();
		try{
      if (uusername === ""){
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
      else {
        joinUserObj.username = uusername
        joinUserObj.password = upassword
        joinUserObj.email = uemail
        joinUserObj.name = uname
        joinUserObj.nickname = unickname

        signupRequest(joinUserObj)
      }
		} catch{}
	}

	return(
		<div>
			<h4 style={{marginBottom:30, marginTop:30}} >Join</h4>
			<form onSubmit={onSubmit}>
				<p><input type="text" name="username" placeholder="username" value={uusername} onChange={onChange} /> </p>
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