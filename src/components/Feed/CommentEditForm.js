import React, { useState } from 'react';

/* Icons */
import sampleImgUrl2 from '../../img/sample2.jpg'

import { useDispatch } from 'react-redux';
import { commentEditingOff, editCommentObj } from 'store';

import { Row, Col } from 'react-bootstrap';

function CommentEditForm({ comments, ci }){
	let dispatch = useDispatch();

	let [editComment,setEditComment] = useState("")
	
	const onChange = (e) => {
		const {
			target: { value },
		} = e;
		setEditComment(value);
	}

	const onSubmit = (e) => {
		e.preventDefault();

		if (editComment === ""){
			return alert('수정할 댓글 내용을 입력해주세요')
		}

		dispatch(commentEditingOff())

		alert('수정이 완료되었습니다!')
		setEditComment('')
	}

	const onSubmitClick = (commentNumber) => {
		let editData = {
			commentNumber,
			editComment
		}
		dispatch(editCommentObj(editData))
	}

	return(
		<form onSubmit={onSubmit}>
			<Row className="editing_container">
				<Col sm={2}><img src={sampleImgUrl2} alt="sampleImg2" style={{width:50, height:50, borderRadius:50}} /></Col>
				<Col sm={2} style={{textAlign:'left', color:'gray'}}>{comments[ci].creatorNickname}</Col>
				<Col sm={5} style={{textAlign:'left', whiteSpace:'pre'}}>
					<textarea 
						className="editing_textarea" 
						placeholder='댓글 내용을 수정해주세용' 
						value={editComment} 
						onChange={onChange} >
					</textarea>
				</Col>
				<Col sm={3} style={{textAlign:'right', whiteSpace:'pre', fontSize:13, color:'gray'}}>
					<Row style={{textAlign:'right'}}>
						<Col>{comments[ci].createDate}</Col>
					</Row>
					<Row style={{textAlign:'right'}}>
						<Col>
							<br/>
							<input type="submit" value="수정하기" onClick={()=>{onSubmitClick(comments[ci].commentNumber)}} />
						</Col>
					</Row>
				</Col>
			</Row>
		</form>
	)
}

export default CommentEditForm;