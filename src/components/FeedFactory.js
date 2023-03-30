import React, { useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createFeedObj, increasePostNumber } from 'store.js';

function FeedFactory(){
	
	let state = useSelector((state) => state)
	let dispatch = useDispatch();
	let Navigate = useNavigate();
	
	const [feedTitle, setFeedTitle] = useState("");
	const [feedContent, setFeedContent] = useState("");


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
		let hours = ('0' + date.getHours()).slice(-2); 
		let minutes = ('0' + date.getMinutes()).slice(-2);
		// let seconds = ('0' + date.getSeconds()).slice(-2); 
		let ampm = '오전'

		if (hours >= 12){
			ampm = '오후'
			if (hours > 12){
				hours -= 12
			}

		}

		return `${year}년 ${month}월 ${day}일\n${ampm} ${hours}시 ${minutes}분`;
	}

	// const timeForToday = () => {
	// 	const today = new Date();
	// 	const timeValue = new Date(Date.now());

	// 	const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
	// 	if (betweenTime < 1) return '방금전';
	// 	if (betweenTime < 60) {
	// 			return `${betweenTime}분전`;
	// 	}

	// 	const betweenTimeHour = Math.floor(betweenTime / 60);
	// 	if (betweenTimeHour < 24) {
	// 			return `${betweenTimeHour}시간전`;
	// 	}

	// 	const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
	// 	if (betweenTimeDay < 365) {
	// 			return `${betweenTimeDay}일전`;
	// 	}

	// 	return `${Math.floor(betweenTimeDay / 365)}년전`;
	// }

	const onSubmit = (e) => {
		e.preventDefault();

		if (feedTitle === ""){
			return alert('제목을 입력해주세요')
		} 
		
		else if (feedContent === ""){
			return alert('내용을 입력해주세요')
		}

		else if (state.isLoggedIn === false){
			if (window.confirm('로그인 후 이용해주세요! 로그인 화면으로 이동할까요?')){
				Navigate("/login")
			}
		}

		let createdFeedObj = {
			postNumber : state.postNumber.num,
			title : feedTitle,
			content : feedContent,
			writer : state.userInfo[0].id,
			viewCount : 0,
			likeCount : [],
			commentCount : 0,
			createDate : getDate(),
			creatorNickname : state.userInfo[0].nickname,
		}
		
		dispatch(increasePostNumber());
		dispatch(createFeedObj(createdFeedObj));

		setFeedTitle("")
		setFeedContent("")
		
		createdFeedObj = null
	}

	return(
		<div>
			<h4 style={{marginBottom:30, marginTop:30}} >Feed</h4>	
			<form onSubmit={onSubmit}>
				<p><input type="text" name="title" placeholder="Title" onChange={onFeedTitleChange} value={feedTitle} /></p>
				<p><input type="text" name="content" placeholder="Content" onChange={onFeedContentChange} value={feedContent} /></p>
				<input type="submit" value="글작성하기" />
			</form>
		</div>
	)
}

export default FeedFactory;