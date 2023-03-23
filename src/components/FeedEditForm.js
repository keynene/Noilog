import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { feedEditingOff, editFeedObj } from 'store';

function FeedEditForm({ i }){
	let [editTitle, setEditTitle] = useState("")
	let [editContent, setEditContent] = useState("")

	let dispatch = useDispatch();

	const onEditTitleChange = (e) => {
		const {
			target: { value },
		} = e;
		setEditTitle(value);
	}
	
	const onEditContentChange = (e) => {
		const {
			target: { value },
		} = e;
		setEditContent(value);
	}

	const onSubmit = (e) => {
		e.preventDefault();
		
		if (editTitle === ""){
			return alert('수정할 제목을 입력해주세요')
		}

		if (editContent === ""){
			return alert('수정할 피드 내용을 입력해주세요')
		}

		dispatch(feedEditingOff())

		alert('수정이 완료되었습니다!')
		setEditTitle('')
		setEditContent('')
	}

	const onSubmitClick = (i) => {
		let editData = {
			postNumber : i,
			editTitle,
			editContent
		}
		dispatch(editFeedObj(editData))
	}

	return (
		<form onSubmit={onSubmit}>
			<Row className="editing_container">
				<Col style={{paddingTop:30, paddingBottom:15, textAlign:'left', fontWeight:'bold'}}>
					<textarea className="editing_textarea" placeholder='게시글 제목을 수정해주세용' value={editTitle} onChange={onEditTitleChange} />
				</Col>
			</Row>
			<Row>
				<Col style={{paddingTop:15, paddingBottom:30, textAlign:'left'}}>
					<textarea className="editing_textarea" placeholder='게시글 내용을 수정해주세용' value={editContent} onChange={onEditContentChange} />
				</Col>
			</Row>
			<Row>
				<Col style={{textAlign:'right'}}>
					<input type="submit" value="수정하기" onClick={()=>{onSubmitClick(i)}}/>
				</Col>
			</Row>
		</form>
	)
}

export default FeedEditForm;