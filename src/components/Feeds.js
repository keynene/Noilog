import React, { useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { addLikeCount, createCommentObj, findCommentObjIndex } from 'store.js';

import { useSelector, useDispatch } from "react-redux";

import sampleImgUrl from '../img/sample.jpg'
import sampleImgUrl2 from '../img/sample2.jpg'

// import { FaRegEye } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { BiCommentDetail } from "react-icons/bi";

function Feeds({feeds, comments}){
	
	let state = useSelector((state) => state)
	let dispatch = useDispatch();
	
	let [comment, setComment] = useState("");

	const onCommentChange = (e) => {
		const {
			target: { value },
		} = e;
		setComment(value);
	}
	
	const onCommentSubmit = (e) => {
		e.preventDefault();
	}

	const onCommentButtonClick = (i) => {
		if (comment === ""){
			return alert('댓글 내용을 입력해주세요!')
		}
		
		const createdCommentObj = {
			postNumber : state.feedObj[i].postNumber,
			content : comment,
			writer : state.userInfo.nickname
		}

		dispatch(createCommentObj(createdCommentObj))
		setComment("")
	}
	
	return (
		<div>
			{
				feeds.map((a,i)=>
					<Container key={i} style={{marginTop:50, maxWidth:700}}>
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
										<Row>
											<Col sm={2}><img src={sampleImgUrl2} alt="sampleImg2" style={{width:50, height:50, borderRadius:50}} /></Col>
											<Col sm={2} style={{textAlign:'left', color:'gray'}}>{state.userInfo.nickname}</Col>
											<Col sm={8} style={{textAlign:'left', height:50, justifyContent:'center'}}>{comments[ci].content}</Col>
										</Row>
									</Container>
								)}
							</Col>
						</Row>
						<Row>
							<Col style={{paddingTop:20, textAlign:'left'}}>
								<form onSubmit={onCommentSubmit} className="comment_container" >
									<textarea className="comment_textarea" placeholder="댓글 달기..." color="gray" value={comment} onChange={onCommentChange} />
									<input className="comment_submit" type="submit" value="↑" onClick={()=>{onCommentButtonClick(i)}} />
								</form>

							</Col>
						</Row>
						<Row style={{marginTop:30, width:'100%'}}><hr style={{border:'dashed 1px gray'}} /> </Row>
					</Container>
				)
			}
		</div>
	)
}

export default Feeds;