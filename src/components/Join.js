import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Join(){
	const [uid, setUid] = useState("");
  const [upassword, setUpassword] = useState("");
	const [uemail, setUemail] = useState("");
	const [uname, setUnName] = useState("");
	const [unickname, setUnickname] = useState("");
	
	let navigate = useNavigate();
	let localStorage = window.localStorage;
	const [userObj, setUserObj] = useState(null);
	// const [error, setError] = useState("");

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

	const onSubmit = (e) => {
		e.preventDefault();
	}

	const submitOnClick = async() => {
		if (uid !== "" && upassword !== "" && uemail !== "" && uname !== "" && unickname !== ""){
			setUserObj({
				id:uid,
				password:upassword,
				email:uemail,
				name:uname,
				nickname:unickname
			})
			alert(`${userObj.nickname}님! 회원가입이 완료되었습니다!🎉`)
			await localStorage.setItem(JSON.stringify(userObj.id), JSON.stringify(userObj))
			setUserObj(null)
			navigate('/login')
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
	}

	// const complete = async() => {
		
	// }

	return(
		<div>
			<h4 style={{marginBottom:30, marginTop:30}} >Join</h4>
			<form onSubmit={onSubmit}>
				<input type="text" name="id" placeholder="Id" value={uid} onChange={onChange} /> 
				<input type="password" name="password" placeholder="Password" value={upassword} onChange={onChange} />
				<input type="email" name="email" placeholder="Email" value={uemail} onChange={onChange} />
				<input type="text" name="name" placeholder="Name" value={uname} onChange={onChange} />
				<input type="text" name="nickname" placeholder="Nickname" value={unickname} onChange={onChange} />
				
				<input style={{marginTop:30}} type="submit" value="Join us" onClick={submitOnClick} />
			</form>
		</div>
	)
}

export default Join;