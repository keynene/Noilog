import React, { useEffect, useState } from 'react';

import {useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import { createFeedObj } from 'store.js';

function FeedFactory(){
	const [feed, setFeed] = useState("");
	const [feeds, setFeeds] = useState([]);

	let userId = JSON.parse(localStorage.getItem('login')).loginId
	let userInfo = JSON.parse(localStorage.getItem(JSON.stringify(userId)))
	let state = useSelector((state) => state)
	let dispatch = useDispatch();

	useEffect(()=>{
		setFeeds(state.feedObj)
	},[])

	const onChange = (e) => {
		const {
			target: { value },
		} = e;
		setFeed(value);
	}

	const onSubmit = (e) => {
		e.preventDefault();
		if (feed === ""){
			return alert('피드를 입력해주세요')
		}
		let feedFactoryObj = [{
			text : feed,
			createAt : Date.now(),
			creatorId : userId,
			creatorNickname : userInfo.nickname,
		}]

		// dispatch(createFeedObj(feedFactoryObj))
		let copy = [...feedFactoryObj.text, ...feeds]
		setFeeds(copy)
		feedFactoryObj = []
	}


	return (
		<div>
			<form onSubmit={onSubmit}>
				<input type="text" placeholder="여기입력해봐" onChange={onChange} value={feed} />
				<input type="submit" value="글작성하기" />
			</form>
		</div>
	)
}

export default FeedFactory;