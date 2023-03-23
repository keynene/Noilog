import React, { useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { useDispatch, useSelector } from "react-redux";
import { increaseLikeCount, deleteFeedObj, feedEditingOn } from 'store.js';

import sampleImgUrl from '../img/sample.jpg'

// import { FaRegEye } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { BiCommentDetail } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

import CommentFactory from './CommentFactory';
import FeedEditForm from './FeedEditForm';
import Comments from './Comments';

function Feeds({a, i, feeds, comments, isFeedOwner}){
	let dispatch = useDispatch();
	let state = useSelector((state) => state)
	

	const EditingAndTruePostNumber = (i) => {
		if (state.isFeedEditing.editState){
			if (state.isFeedEditing.postNumber === i){
				return true
			}
		}
		return false
	}
	
	return (
		<Container style={{marginTop:50, maxWidth:700}}>
		{ feeds[i].title !== "" ? ( 
				<div>
					<Row>
						<Col style={{textAlign:'left', marginBottom:20}} >postNumber={feeds[i].postNumber}</Col>
					</Row>
					<Row>
						<Col sm={2}><img src={sampleImgUrl} alt="sampleImg" style={{width:50, height:50, borderRadius:50}} /></Col>
						<Col sm={2} style={{color:'gray', textAlign:'left'}} >{feeds[i].creatorNickname}</Col>
						<Col sm={8} style={{textAlign:'right', color:'gray', whiteSpace:'pre'}}>{feeds[i].createDate}</Col>
					</Row>
					{
						//수정버튼 눌렀고, i값과 postNumber가 일치하는 게시글만 수정폼 적용
						EditingAndTruePostNumber(i) ? (
							<FeedEditForm i={i} />
						) : (
							//수정상태 아니거나, 수정상태이지만 postNumber가 다른경우 게시글 그대로 출력
							<>
								<Row>
									<Col style={{paddingTop:30, paddingBottom:15, textAlign:'left', fontWeight:'bold'}}>{feeds[i].title}</Col>
								</Row>
								<Row>
									<Col style={{paddingTop:15, paddingBottom:30, textAlign:'left'}}>{feeds[i].content}</Col>
								</Row>
							</>
						)
					}
						
					<Row style={{fontSize:20}}>
						<Col style={{textAlign:'left'}}>
							{/* 
							피드버전은 조회수 필요없어서 주석처리함
							<span onClick={()=>{
								dispatch(addViewCount(state.feedObj[i].postNumber))
							}}><FaRegEye/> {state.feedObj[i].viewCount}</span>  
							*/}
							<span onClick={()=>{
								dispatch(increaseLikeCount(feeds[i].postNumber))
							}} ><FcLikePlaceholder /> {feeds[i].likeCount}</span>
							<span><BiCommentDetail style={{marginLeft:30}}/> {feeds[i].commentCount}</span>
						</Col>
						{isFeedOwner ? (
							<Col style={{textAlign:'right'}}>
								<span onClick={()=>{ 
									if (window.confirm('피드를 수정하시겠습니까?')){
										dispatch(feedEditingOn(i)) 
								}
							}} ><GrEdit/></span>
							<span 
								onClick={()=>{
									if (window.confirm('정말 피드를 삭제하시겠습니까?')){
										dispatch(deleteFeedObj(feeds[i].postNumber))
									}
								}} 
								style={{marginLeft:15, color:'black'}}>
								<RiDeleteBin6Line/>
							</span>
						</Col>
						) : null
					}
				</Row>
				<Row style={{marginTop:30}}>
					<Col style={{backgroundColor:'#F0F0F0', borderRadius:15}}>
						{comments.map((ca,ci)=>
							//댓글출력
							<Comments feeds={feeds} i={i} comments={comments} ci={ci} key={ci} isCommentOwner={state.userInfo[0].id === comments[ci].writer} />
						)}
					</Col>
				</Row>

				{/* 댓글 달기 컴포넌트 */}
				<CommentFactory feeds={feeds} i={i} />

				<Row style={{marginTop:30, marginLeft:0, marginRight:0, marginBottom:0, width:'100%'}}><hr style={{border:'dashed 1px gray'}} /> </Row>
				</div>
			) : null
		}
		</Container>
	)
}

export default Feeds;