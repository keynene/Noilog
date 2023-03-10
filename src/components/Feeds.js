import React, { useEffect, useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { useSelector, useDispatch } from "react-redux";
import { addLikeCount, createCommentObj, addCommentCount } from 'store.js';

import sampleImgUrl from '../img/sample.jpg'
import sampleImgUrl2 from '../img/sample2.jpg'

// import { FaRegEye } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { BiCommentDetail } from "react-icons/bi";

import CommentFactory from './CommentFactory';

function Feeds({a, i, feeds, comments}){
	
	let state = useSelector((state) => state)
	let dispatch = useDispatch();
	
	return (
		<Container style={{marginTop:50, maxWidth:700}}>
			<Row>
				<Col style={{textAlign:'left', marginBottom:20}} >postNumber={feeds[i].postNumber}</Col>
			</Row>
			<Row>
				<Col sm={2}><img src={sampleImgUrl} alt="sampleImg" style={{width:50, height:50, borderRadius:50}} /></Col>
				<Col sm={2} style={{color:'gray', textAlign:'left'}} >{feeds[i].creatorNickname}</Col>
				<Col sm={8} style={{textAlign:'right', color:'gray'}}><span style={{fontSize:20}}>·</span>{feeds[i].createDate}</Col>
			</Row>
			<Row>
				<Col style={{paddingTop:30, paddingBottom:15, textAlign:'left', fontWeight:'bold'}}>{feeds[i].title}</Col>
			</Row>
			<Row>
				<Col style={{paddingTop:15, paddingBottom:30, textAlign:'left'}}>{feeds[i].content}</Col>
			</Row>
			<Row>
				<Col style={{fontSize:20, textAlign:'left'}}>
					{/* 
					피드버전은 조회수 필요없어서 주석처리함
					<span onClick={()=>{
						dispatch(addViewCount(state.feedObj[i].postNumber))
					}}><FaRegEye/> {state.feedObj[i].viewCount}</span>  
					*/}
					<span onClick={()=>{
						dispatch(addLikeCount(feeds[i].postNumber))
					}} ><FcLikePlaceholder /> {feeds[i].likeCount}</span>
					<span><BiCommentDetail style={{marginLeft:30}}/> {feeds[i].commentCount}</span>
				</Col>
			</Row>
			<Row style={{marginTop:30}}>
				<Col style={{backgroundColor:'#F0F0F0', borderRadius:15}}>
					{comments.map((ca,ci)=>
						<Container style={{marginTop:30, marginBottom:30}} key={ci} >
							{
								feeds[i].postNumber === comments[ci].postNumber ? (
									<Row>
										<Col sm={2}><img src={sampleImgUrl2} alt="sampleImg2" style={{width:50, height:50, borderRadius:50}} /></Col>
										<Col sm={2} style={{textAlign:'left', color:'gray'}}>{state.userInfo.nickname}</Col>
										<Col sm={8} style={{textAlign:'left'}}> {comments[ci].content} </Col> 
										{/* 원래 ↑ 이거 sm={8} */}
										{/* <Col sm={3} style={{textAlign:'left'}}> postNumber={comments[ci].postNumber} </Col> */}
										{/* <Col sm={3} style={{textAlign:'left'}}> commentId={comments[ci].commentId} </Col> */}
									</Row>
								) : null
							}
						</Container>
					)}
				</Col>
			</Row>

			{/* 댓글 달기 컴포넌트 */}
			<CommentFactory feeds={feeds} i={i} />

			<Row style={{marginTop:30, marginLeft:0, marginRight:0, marginBottom:0, width:'100%'}}><hr style={{border:'dashed 1px gray'}} /> </Row>
		</Container>
	)
}

export default Feeds;