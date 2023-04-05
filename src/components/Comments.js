import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

/* Redux state */
import {useDispatch, useSelector } from 'react-redux';
import { commentEditingOn, deleteCommentObj, decreaseCommentCount } from 'store';

/* Icons */
import sampleImgUrl2 from '../img/sample2.jpg'
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

/* Components */
import CommentEditForm from './CommentEditForm';

function Comments({ feeds, i, comments, ci, isCommentOwner }){
	let state = useSelector((state) => state)
	let dispatch = useDispatch();

	const EditingAndTrueCommentNumber = (ci) => {
		if (state.isCommentEditing.editState){
			if (state.isCommentEditing.commentNumber === ci){
				return true
			}
		}
		return false
	}

	return (
		<Container style={{marginTop:30, marginBottom:30}} key={ci} >
			{ comments[ci].content !== "" ?( 
				//삭제된 댓글은 출력X
				//postNumber에 해당하는 댓글만 출력
				feeds[i].postNumber === comments[ci].postNumber ? (
					//수정폼
					EditingAndTrueCommentNumber(ci) ?(
						<CommentEditForm comments={comments} ci={ci} />
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
									//댓글작성자인경우 수정/삭제 버튼 보임
									<CommentEditDeleteConfirm comments={comments} ci={ci} dispatch={dispatch} />
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

// 수정삭제버튼 컴포넌트
function CommentEditDeleteConfirm({ comments, ci, dispatch }){
	return (
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
	)
}

export default Comments;