import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FeedFactory from 'components/FeedFactory';

import { useSelector, useDispatch } from "react-redux";
import { addLikeCount } from 'store.js';

import sampleImgUrl from '../img/sample.jpg'

// import { FaRegEye } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { BiCommentDetail } from "react-icons/bi";


function Feed(){
	
	let state = useSelector((state) => state)
	let dispatch = useDispatch();

	let [feeds, setFeeds] = useState([]);
	let [comment, setComment] = useState("");

	useEffect(()=>{
		setFeeds(state.feedObj)
	},[state.feedObj])

	const onCommentChange = (e) => {
		const {
			target: { value },
		} = e;
		setComment(value);
	}

	
	const onCommentSubmit = (e) => {
		e.preventDefault();
		
		if (comment === ""){
			return alert('댓글 내용을 입력해주세요!')
		}
		
		const createdCommentObj = {
			postNumber : state.feedObj[i].postNumber,
			content : comment,
			writer : state.userInfo.creatorNickname
		}

	}

	return(
		<div>
			<FeedFactory />

			{/* Feeds */}
			<div>
				{
					feeds.map((a,i)=>
						<Container key={i} style={{marginTop:50, maxWidth:700}}>
							<Row>
								<Col style={{textAlign:'left', marginBottom:20}} >postNumber={state.feedObj[i].postNumber}</Col>
							</Row>
							<Row>
								<Col sm={2}><img src={sampleImgUrl} alt="sampleImg" style={{width:50, height:50, borderRadius:50}} /></Col>
								<Col sm={2} style={{color:'gray'}} >{state.feedObj[i].creatorNickname}</Col>
								<Col sm={6}></Col>
								<Col sm={2} style={{textAlign:'right', color:'gray'}}><span style={{fontSize:20}}>·</span>{state.feedObj[i].createDate}</Col>
							</Row>
							<Row>
								<Col style={{paddingTop:30, paddingBottom:15, textAlign:'left', fontWeight:'bold'}}>{state.feedObj[i].title}</Col>
							</Row>
							<Row>
								<Col style={{paddingTop:15, paddingBottom:30, textAlign:'left'}}>{state.feedObj[i].content}</Col>
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
										dispatch(addLikeCount(state.feedObj[i].postNumber))
									}} ><FcLikePlaceholder /> {state.feedObj[i].likeCount}</span>
									<span><BiCommentDetail style={{marginLeft:30}}/> {state.feedObj[i].commentCount}</span>
								</Col>
							</Row>
							<Row>
								<Col>
								</Col>
							</Row>
							<Row>
								<Col style={{paddingTop:20, textAlign:'left'}}>
									<form onSubmit={onCommentSubmit} className="comment_container" >
										<textarea className="comment_textarea" placeholder="댓글 달기..." color="gray" value={comment} onChange={onCommentChange} />
										<input className="comment_submit" type="submit" value="↑"/>
									</form>
								</Col>
							</Row>
							<Row style={{marginTop:30, width:'100%'}}><hr style={{border:'dashed 1px gray'}} /> </Row>
						</Container>
					)
				}
			</div>
		</div>
	)
}

export default Feed;