import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { useDispatch } from 'react-redux';

import { editBoardCommentObj, boardCommentEditingOff } from 'store';

function BoardCommentEditForm({ boardComments, ci }){
	let [editComment, setEditComment] = useState('');
	let dispatch = useDispatch();

	const onChange = (e) => {
		const {
			target: { value },
		} = e;
		setEditComment(value);
	}

	const onSubmit = (e) => {
		e.preventDefault();
	}
	
	const onEditButtonClick = (ci) => {
		if (editComment === ""){
			return alert("수정할 댓글 내용을 입력해주세요!")
		}

		let editData = {
			commentNumber : ci,
			editComment
		}
		dispatch(editBoardCommentObj(editData))
		dispatch(boardCommentEditingOff())

		alert('수정이 완료되었습니다!')
		setEditComment('')
	}

	return (
		<form onSubmit={onSubmit}>
			<Row style={{textAlign:'left', marginTop:10,marginBottom:10}}>
				<Col>
					<span style={{marginRight:10, fontWeight:'bold', fontSize:17}}>{boardComments[ci].creatorNickname}</span>
					<span style={{color:'gray', fontSize:13.5}}>({boardComments[ci].createDate})</span>
				</Col>
				<Col style={{textAlign:'right'}}>
					<input type="submit" value="수정하기" onClick={()=>{onEditButtonClick(ci)}}/>
				</Col>
			</Row>
			<Row style={{textAlign:'left', paddingBottom:20, borderBottom:'1px solid #ccc'}}>
				<Col>
					<textarea 
						className="editing_textarea" 
						placeholder='댓글 내용을 수정해주세용'  
						value={editComment}
						onChange={onChange}
					/>
				</Col>
			</Row>
		</form>
	)
}

export default BoardCommentEditForm