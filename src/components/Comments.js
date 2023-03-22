import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/* Redux state */
import { useDispatch, useSelector } from 'react-redux';
import { commentEditingOff, commentEditingOn, editCommentObj, deleteCommentObj, decreaseCommentCount } from 'store';

import sampleImgUrl2 from '../img/sample2.jpg'
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

function Comments({ feeds, i, comments, ci, isCommentOwner }){
	let state = useSelector((state) => state)
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

	const onSubmitClick = (ci) => {
		let editData = {
			commentNumber : ci,
			editComment
		}
		dispatch(editCommentObj(editData))
	}

	const EditingAndTrueCommentNumber = (ci) => {
		if (state.isCommentEditing.editState){
			if (state.isCommentEditing.commentNumber === ci){
				return true
			}
			return false
		}
		return false
	}



	return (
		<Container style={{marginTop:30, marginBottom:30}} key={ci} >
			{ comments[ci].content !== "" ?( //삭제된 댓글은 출력X
				//postNumber에 해당하는 댓글만 출력
				feeds[i].postNumber === comments[ci].postNumber ? (
					//수정폼
					EditingAndTrueCommentNumber(ci) ?(
					<form onSubmit={onSubmit}>
						<Row className="editing_container">
							<Col sm={2}><img src={sampleImgUrl2} alt="sampleImg2" style={{width:50, height:50, borderRadius:50}} /></Col>
							<Col sm={2} style={{textAlign:'left', color:'gray'}}>{comments[ci].creatorNickname}</Col>
							<Col sm={5} style={{textAlign:'left', whiteSpace:'pre'}}>
								<textarea className="editing_textarea" placeholder='댓글 내용을 수정해주세용' value={editComment} onChange={onChange} ></textarea>
							</Col>
							<Col sm={3} style={{textAlign:'right', whiteSpace:'pre', fontSize:13, color:'gray'}}>
								<Row style={{textAlign:'right'}}>
									<Col>{comments[ci].createDate}</Col>
								</Row>
								<Row style={{textAlign:'right'}}>
									<Col>
										<br/>
										<input type="submit" value="수정하기" onClick={()=>{onSubmitClick(ci)}} />
									</Col>
								</Row>
							</Col>
						</Row>
					</form>
					)	:	(
						<Row>
							<Col sm={2}><img src={sampleImgUrl2} alt="sampleImg2" style={{width:50, height:50, borderRadius:50}} /></Col>
							<Col sm={2} style={{textAlign:'left', color:'gray'}}>{comments[ci].creatorNickname}</Col>
							<Col sm={5} style={{textAlign:'left', whiteSpace:'pre'}}> {comments[ci].content} </Col> 
							<Col sm={3} style={{textAlign:'right', whiteSpace:'pre', fontSize:13, color:'gray'}}>
								<Row style={{textAlign:'right'}}>
									<Col>{comments[ci].createDate}</Col>
								</Row>
								{isCommentOwner ? (
									<Row style={{textAlign:'right', fontSize:18}}>
										<Col style={{textAlign:'right'}}>
											<span onClick={()=>{
												if (window.confirm('댓글을 수정하시겠습니까?')) {
													dispatch(commentEditingOn(ci))
												}
											}}><GrEdit /></span>
											<span onClick={()=>{
												if (window.confirm('댓글을 삭제하시겠습니까?')){
													dispatch(deleteCommentObj(ci))
													dispatch(decreaseCommentCount(comments[ci].postNumber))
												}
											}} style={{marginLeft:10, color:'black'}}><RiDeleteBin6Line/></span>
										</Col>
									</Row>
									) : null
								}
							</Col> 
						</Row>
					)
				) : null
				) : null
			}
		</Container>
	)
}

export default Comments;