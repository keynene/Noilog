import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import sampleImgUrl from '../img/sample.jpg'

import { useDispatch } from "react-redux";
import { deleteUserObj } from 'store.js';

function MyPage(){
	// let state = useSelector((state) => {return state})
	let userId = JSON.parse(localStorage.getItem('login')).loginId
	let userInfo = JSON.parse(localStorage.getItem(JSON.stringify(userId)))
	
	let dispatch = useDispatch();

	return(
		<div>
			<Container style={{marginTop:30}}>
				<Row>
					<Col><img src={sampleImgUrl} alt="" width="133px" height="158px" /></Col>
					<Col style={{paddingTop:20}}>
						<h4>{userInfo.nickname} ({userInfo.id})</h4>
						<p>{userInfo.email}</p>
						<button onClick={dispatch(deleteUserObj(userId))} >회원탈퇴</button>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default MyPage;