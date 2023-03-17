import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { useDispatch, useSelector } from "react-redux";
import { addLikeCount } from 'store.js';

import sampleImgUrl from '../img/sample.jpg'

// import { FaRegEye } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { BiCommentDetail } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

import CommentFactory from './CommentFactory';
import Comments from './Comments';

function Feeds({a, i, feeds, comments, isFeedOwner}){
	let dispatch = useDispatch();
	let state = useSelector((state) => state)
	
	return (
		<Container style={{marginTop:50, maxWidth:700}}>
			<Row>
				<Col style={{textAlign:'left', marginBottom:20}} >postNumber={feeds[i].postNumber}</Col>
			</Row>
			<Row>
				<Col sm={2}><img src={sampleImgUrl} alt="sampleImg" style={{width:50, height:50, borderRadius:50}} /></Col>
				<Col sm={2} style={{color:'gray', textAlign:'left'}} >{feeds[i].creatorNickname}</Col>
				<Col sm={8} style={{textAlign:'right', color:'gray', whiteSpace:'pre'}}>{feeds[i].createDate}</Col>
			</Row>
			<Row>
				<Col style={{paddingTop:30, paddingBottom:15, textAlign:'left', fontWeight:'bold'}}>{feeds[i].title}</Col>
			</Row>
			<Row>
				<Col style={{paddingTop:15, paddingBottom:30, textAlign:'left'}}>{feeds[i].content}</Col>
			</Row>
			<Row style={{fontSize:20}}>
				<Col style={{textAlign:'left'}}>
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
				{isFeedOwner ? (
					<Col style={{textAlign:'right'}}>
						<span ><GrEdit/></span>
						<span style={{marginLeft:15, color:'black'}}><RiDeleteBin6Line/></span>
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
		</Container>
	)
}

export default Feeds;