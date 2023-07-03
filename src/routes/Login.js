import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

/* Actions */
import { LoggedIn, setLoginUserInfo, setLoginTrue } from '../store.js';
function Login(){

	const [uid, setUid] = useState("");
  const [upassword, setUpassword] = useState("");
  const loginObj = {
    password : "",
    username : "",
  };

	let dispatch = useDispatch()
	let navigate = useNavigate();
  let state = useSelector((state) => state)

  // useEffect(()=>{
  //   console.log(state.loginState.isLoggedIn)
  //   if (state.loginState.isLoggedIn == true && state.loginUserInfo.memberNumber !== null){
  //     navigate("/")
  //     console.log(state.loginUserInfo)
  //     alert(`${state.loginUserInfo.nickname}님, 환영합니당🎉`)
  //   }
  // },[state.loginState, state.loginUserInfo])

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
        loginObj.password = upassword
        loginObj.username = uid

        axios
          .post(`http://3.36.85.194:42988/login`, loginObj)
          .then(response => {
            let accessToken = response.data.accessToken
            localStorage.setItem("accessToken", accessToken)
            //토큰만 저장, 유저정보는 App.js에서 저장
            dispatch(setLoginTrue())
            navigate("/")
          })
          .catch(err => console.log(err.message))
			}
			else if (uid === ""){
				alert('아이디를 입력해주세요')
			}
			else if (upassword === ""){
				alert('비밀번호를 입력해주세요')
			}
		// } catch { alert('없는 아이디입니다!') }
		} catch(error) { 
      console.log(error.message) 
    }
		
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