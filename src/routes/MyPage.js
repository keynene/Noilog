import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';

import sampleImgUrl from '../img/sample.jpg'

import { useDispatch, useSelector } from "react-redux";
import { LoggedOut } from 'store.js';

function MyPage(){
	let state = useSelector((state) => {return state})
	
	let dispatch = useDispatch();
	let navigate = useNavigate();

	return(
		<div>
			<Container style={{marginTop:30, width:800}}>
				<Row>
					<Col><img src={sampleImgUrl} alt="" width="133px" height="158px" /></Col>
					<Col style={{paddingTop:20}}>
						<h4>
							{state.userInfo.nickname} ({state.userInfo.id})
							<button style={{fontSize:14, marginLeft:10}} onClick={()=>{
								dispatch(LoggedOut(null))
								navigate("/")
								alert('로그아웃 되었습니다.')
							}}>로그아웃</button>
						</h4>
						<p>{state.userInfo.email}</p>
						<p>
							<Link to="/mypage" style={{marginRight:10, marginLeft:10, textDecoration:'none'}} onClick={()=>{ console.log('내가 쓴 글 출력') }}>내가 쓴 글</Link>
							<Link to="/mypage" style={{marginRight:10, marginLeft:10, textDecoration:'none'}}>내가 쓴 댓글</Link> 
						</p>
						<button onClick={()=>{
							if(window.confirm("정말 회원 탈퇴하실껀가요? 😥")){
								const promptId = prompt("아이디를 입력해주세요")
								if (promptId === state.userInfo.id){
									alert('회원탈퇴가 완료되었습니다.')
									dispatch(LoggedOut(null))
									localStorage.removeItem(JSON.stringify(state.userId))
									navigate("/")
								} else {
									alert('아이디가 일치하지 않습니다.')
								}
							}}}>회원탈퇴</button>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default MyPage;