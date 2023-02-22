import React, { useState } from 'react';

function Join({ isLoggedIn }){
	const [id, setId] = useState("");
  const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [nickname, setNickname] = useState("");
	let localStorage = window.localStorage;
	const [userObj, setUserObj] = useState({
    id:"",
    password:"",
    nickname:"",
    name:"",
    email:""
  });
	// const [error, setError] = useState("");

	const onChange = (e) => {
		const {
			target: { name, value },
		} = e;

		if (name === 'id'){
			setId(value)
		} else if (name === 'password'){
			setPassword(value)
		} else if (name === 'email'){
			setEmail(value)
		} else if (name === 'name'){
			setName(value)
		} else if (name === 'nickname'){
			setNickname(value)
		}
	}

	const onSubmit = (e) => {
		e.preventDefault();
	}


	const submitOnClick = () => {
		if (id !== "" && password !== "" && email !== "" && name !== "" && nickname !== ""){
			setUserObj({
				id:id,
				password:password,
				email:email,
				name:name,
				nickname:nickname
			})
			localStorage.setItem(JSON.stringify(id), JSON.stringify(userObj))
		}
		
	}

	return(
		<div>
			<form onSubmit={onSubmit}>
				<input type="text" name="id" placeholder="Id" value={id} onChange={onChange} /> 
				<input type="password" name="password" placeholder="Password" value={password} onChange={onChange} />
				<input type="email" name="email" placeholder="Email" value={email} onChange={onChange} />
				<input type="text" name="name" placeholder="Name" value={name} onChange={onChange} />
				<input type="text" name="nickname" placeholder="Nickname" value={nickname} onChange={onChange} />
				
				<input type="submit" value="Join us" onClick={submitOnClick} />
			</form>
		</div>
	)

	/*
	return (
		<div>
			<div className="join_img_form">
				<div className='join_img'>
					<div className="join-bg">
						<h2>회원가입</h2>
					</div>
				</div>
			</div>
			<div className='join_inner'>
				<div className='inner'>
					<form>
						<p className='welcome'>Noven에 어서왕!</p>
						<div className="join_wrap">
							<div className='join_title_area'>
								<h2 className='title2'>회원가입</h2>
							</div>
							<div className="form_wrap">
								<div className="form_group form_id">
									<div className="title">{'아아디(ID)'}</div>
								</div>
								<div className='cont'>
									<div className='input_box'>
										<input type="text" placeholder='예) 농노이 (본인 실명을 띄어쓰기 없이 입력해주세요)' />
									</div>
								</div>

							
								
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
	*/
}

export default Join;