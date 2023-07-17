import axios from 'axios';
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { useDispatch } from 'react-redux';

import { boardCommentEditingOff } from 'store';

function BoardCommentEditForm({ comments, ci, getConfig, COMMENTS_URL, setCommentLoading }){
	let dispatch = useDispatch();

	let [editComment, setEditComment] = useState('');
  let editData = {
    content : ''
  }

  let commentNumber = comments[ci].commentNumber

  const commentEditRequest = (config, data, commentNumber) => {
    axios
      .put(`${COMMENTS_URL}?commentNumber=${commentNumber}`, data, config)
      .then(response => {
        alert('댓글 수정이 완료되었습니다! 😎')
        setCommentLoading(false)
      })
      .catch(err => {
        console.log(err)
        setCommentLoading(false)
      })
  }

	const onChange = (e) => {
		const {
			target: { value },
		} = e;
		setEditComment(value);
	}

	const onSubmit = (e) => {
		e.preventDefault();
	}
	
	const onEditButtonClick = () => {
		if (editComment === ""){
			return alert("수정할 댓글 내용을 입력해주세요!")
		}
    editData.content = editComment

    commentEditRequest(getConfig(), editData, commentNumber)
		dispatch(boardCommentEditingOff())
		
		setEditComment('')
	}

	return (
		<form onSubmit={onSubmit}>
      {setCommentLoading(true)}
			<Row style={{textAlign:'left', marginTop:10,marginBottom:10}}>
				<Col>
					<span style={{marginRight:10, fontWeight:'bold', fontSize:17}}>{comments[ci].writer.nickname}</span>
					<span style={{color:'gray', fontSize:13.5}}>({comments[ci].createdDate})</span>
				</Col>
				<Col style={{textAlign:'right'}}>
					<input type="submit" value="수정하기" onClick={()=>{onEditButtonClick()}}/>
					<input type="submit" value="취소하기" onClick={()=>{dispatch(boardCommentEditingOff()) }} style={{marginLeft:10}}/>
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