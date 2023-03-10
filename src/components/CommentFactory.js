import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { createCommentObj, addCommentCount } from 'store.js';

function CommentFactory({ feeds, i }){
	let state = useSelector((state) => state)
	let dispatch = useDispatch();

	let [comment, setComment] = useState("");
	let [commentId, setCommentId] = useState(0);

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
		
		setCommentId(commentId+1)
		
		let createdCommentObj = {
			commentId,
			postNumber : state.feedObj[i].postNumber,
			content : comment,
			writer : state.userInfo.nickname
		}

		dispatch(createCommentObj(createdCommentObj))
		setComment("")

		createdCommentObj = null
	}

	return(
		<Row>
			<Col style={{paddingTop:20, textAlign:'left'}}>
				<form onSubmit={onCommentSubmit} className="comment_container" >
					<textarea className="comment_textarea" placeholder="댓글 달기..." color="gray" value={comment} onChange={onCommentChange} />
					<input className="comment_submit" type="submit" value="↑" onClick={()=>{
						onCommentButtonClick(i)
						dispatch(addCommentCount(feeds[i].postNumber))
						}} />
				</form>
			</Col>
		</Row>
	)
}

export default CommentFactory;