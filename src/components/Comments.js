import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import sampleImgUrl2 from '../img/sample2.jpg'

function Comments({ feeds, i, comments, ci }){
	let state = useSelector((state) => state)

	return (
		<Container style={{marginTop:30, marginBottom:30}} key={ci} >
			{
				feeds[i].postNumber === comments[ci].postNumber ? (
					<Row>
						<Col sm={2}><img src={sampleImgUrl2} alt="sampleImg2" style={{width:50, height:50, borderRadius:50}} /></Col>
						<Col sm={2} style={{textAlign:'left', color:'gray'}}>{state.userInfo.nickname}</Col>
						<Col sm={8} style={{textAlign:'left', whiteSpace:'pre'}}> {comments[ci].content} </Col> 
						{/* 원래 ↑ 이거 sm={8} */}
						{/* <Col sm={3} style={{textAlign:'left'}}> postNumber={comments[ci].postNumber} </Col> */}
						{/* <Col sm={3} style={{textAlign:'left'}}> commentId={comments[ci].commentId} </Col> */}
					</Row>
				) : null
			}
		</Container>
	)
}

export default Comments;