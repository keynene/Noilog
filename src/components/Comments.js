import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import sampleImgUrl2 from '../img/sample2.jpg'
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";


function Comments({ feeds, i, comments, ci, isCommentOwner }){
	let state = useSelector((state) => state)

	return (
		<Container style={{marginTop:30, marginBottom:30}} key={ci} >
			{
				feeds[i].postNumber === comments[ci].postNumber ? (
					<Row>
						<Col sm={2}><img src={sampleImgUrl2} alt="sampleImg2" style={{width:50, height:50, borderRadius:50}} /></Col>
						<Col sm={2} style={{textAlign:'left', color:'gray'}}>{comments[ci].creatorNickname}</Col>
						<Col sm={5} style={{textAlign:'left', whiteSpace:'pre'}}> {comments[ci].content} </Col> 
						<Col sm={3} style={{textAlign:'right', whiteSpace:'pre', fontSize:13, color:'gray'}}>
							<Row style={{textAlign:'right'}}>
								<Col>{comments[ci].createDate}</Col>
							</Row>
							{isCommentOwner ? (
								<Row style={{textAlign:'right', fontSize:18}}>
									<Col style={{textAlign:'right'}}>
										<span><GrEdit /></span>
										<span style={{marginLeft:10, color:'black'}}><RiDeleteBin6Line/></span>
									</Col>
								</Row>
								) : null
							}
						</Col> 
						{/* whiteSpace:'pre' == 입력받은 값의 공백/개행 등 다 반영하여 출력 */}
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