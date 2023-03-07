import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { useDispatch, useSelector } from "react-redux";
import { createFeedObj } from 'store.js';

import sampleImgUrl from '../img/sample.jpg'

import { FaRegEye } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { BiCommentDetail } from "react-icons/bi";

function Feed(){
	let userId = JSON.parse(localStorage.getItem('login')).loginId
	let userInfo = JSON.parse(localStorage.getItem(JSON.stringify(userId)))
	let state = useSelector((state) => state)
	let dispatch = useDispatch();

	const [feedTitle, setFeedTitle] = useState("");
	const [feedContent, setFeedContent] = useState("");
	const [feeds, setFeeds] = useState([]);

	let [like, setLike] = useState(0);


	useEffect(()=>{
		setFeeds(state.feedObj)
	},[state.feedObj])

	const onFeedTitleChange = (e) => {
		const {
			target: { value },
		} = e;
		setFeedTitle(value);
	}

	const onFeedContentChange = (e) => {
		const {
			target: { value },
		} = e;
		setFeedContent(value);
	}

	const getDate = () => {
		let date = new Date();
		let year = date.getFullYear();
		let month = ("0" + (1+date.getMonth())).slice(-2);
		let day = ("0"+date.getDate()).slice(-2);

		return year + "-" + month + "-" + day;
	}

	const onSubmit = (e) => {
		e.preventDefault();

		if (feedTitle === ""){
			return alert('제목을 입력해주세요')
		} 
		
		else if (feedContent === ""){
			return alert('내용을 입력해주세요')
		}

		let createdfeedObj = [{
			title : feedTitle,
			content : feedContent,
			writer : userId,
			viewCount : 0,
			likeCount : 0,
			commentCount : 0,
			createDate : getDate(),
			creatorNickname : userInfo.nickname,
		}]
		
		dispatch(createFeedObj(createdfeedObj));

		setFeedTitle("")
		setFeedContent("")
		
		createdfeedObj = null
	}


	return(
		<div>
			{/* <FeedFactory /> */}
			<div>
				<h4 style={{marginBottom:30, marginTop:30}} >Feed</h4>	
				<form onSubmit={onSubmit}>
					<p><input type="text" name="title" placeholder="Title" onChange={onFeedTitleChange} value={feedTitle} /></p>
					<p><input type="text" name="content" placeholder="Content" onChange={onFeedContentChange} value={feedContent} /></p>
					<input type="submit" value="글작성하기" />
				</form>
			</div>

			{/* Feeds */}
			<div>
				{
					feeds.map((a,i)=>
						<Container key={i} style={{marginTop:50, maxWidth:700}}>
							<Row>
								<Col style={{textAlign:'left', marginBottom:20}} >postNumber={i+1}</Col>
							</Row>
							<Row>
								<Col sm={2}><img src={sampleImgUrl} alt="sampleImg" style={{width:50, height:50, borderRadius:50}} /></Col>
								<Col sm={2} style={{color:'gray'}} >{state.feedObj[i].creatorNickname}</Col>
								<Col sm={6}></Col>
								<Col sm={2} style={{textAlign:'right', color:'gray'}}>{state.feedObj[i].createDate}</Col>
							</Row>
							<Row>
								<Col style={{paddingTop:30, paddingBottom:15, textAlign:'left'}}>{state.feedObj[i].title}</Col>
							</Row>
							<Row>
								<Col style={{paddingTop:15, paddingBottom:30, textAlign:'left'}}>{state.feedObj[i].content}</Col>
							</Row>
							<Row>
								<Col style={{fontSize:20, textAlign:'left'}}>
									<span><FaRegEye/> {state.feedObj[i].viewCount}</span> 
									<span onClick={()=>{ setLike(like+1) }} ><FcLikePlaceholder style={{marginLeft:30}}/> {like}</span>
									<span><BiCommentDetail style={{marginLeft:30}}/> {state.feedObj[i].commentCount}</span>
								</Col>
							</Row>
							<Row style={{marginTop:30}}><hr style={{border:'dashed 1px gray'}} /> </Row>
						</Container>
					)
				}
			</div>
		</div>
	)
}

export default Feed;