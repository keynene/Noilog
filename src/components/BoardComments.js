import React, { useState } from 'react';

import { Row, Col } from 'react-bootstrap';

import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useDispatch, useSelector } from 'react-redux';
import { decreaseBoardCommentCount, deleteBoardCommentObj, boardCommentEditingOn, boardCommentEditingOff, editBoardCommentObj } from 'store';

function BoardComments({ boardComments, boards, ci, isBoardCommentOwner }){
	let dispatch = useDispatch();
	let state = useSelector((state) => state)
	let [editComment, setEditComment] = useState('');

	const EditingAndTrueCommentNumber = (ci) => {
		if (state.isBoardCommentEditing.editState){
			if (state.isBoardCommentEditing.commentNumber === ci){
				return true
			}
		}
		return false
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
		<>
		{ boardComments[ci].content !== "" ? (  //내용이 있을때만
			boards.boardNumber === boardComments[ci].boardNumber ? ( //게시글과 boardNumber 일치할때만
			EditingAndTrueCommentNumber(ci) === false ? ( //수정중이 아니면
				<>
					<Row style={{textAlign:'left', marginTop:10,marginBottom:10}}>
						<Col>
							<span style={{marginRight:10, fontWeight:'bold', fontSize:17}}>{boardComments[ci].creatorNickname}</span>
							<span style={{color:'gray', fontSize:13.5}}>({boardComments[ci].createDate})</span>
						</Col>

						{/* 수정삭제버튼 컴포넌트 */}
						{
							isBoardCommentOwner ? ( //댓글 작성자일때만 수정삭제버튼 보임
								<BoardCommentEditDeleteButton dispatch={dispatch} boardComments={boardComments} ci={ci} />
							) : null //조건 3 : 댓글 작성자일때만 수정삭제버튼 보임
						}

					</Row>
					<Row style={{textAlign:'left', paddingBottom:20, borderBottom:'1px solid #ccc'}}>
						<Col>{boardComments[ci].content}</Col>
					</Row>
				</>
			) : (
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
			) : null //조건 2 : 댓글  boardNumber와 게시글 boardNumber이 같을때만 출력
			) : null //조건 1 : 댓글 내용이 있을때만 출력
		}
		</>
	)
}

// 수정삭제버튼 컴포넌트
function BoardCommentEditDeleteButton({ dispatch, boardComments, ci }){
	return(
		<Col style={{textAlign:'right'}}>
			<span style={{cursor:'pointer'}} onClick={()=>{ 
				if (window.confirm('댓글을 수정하시겠습니까?')){
					dispatch(boardCommentEditingOn(ci))
				}
			}} ><GrEdit/></span>
			<span style={{cursor:'pointer', marginLeft:15, color:'black'}} onClick={()=>{
				if (window.confirm('정말 댓글을 삭제하시겠습니까?')){
					dispatch(deleteBoardCommentObj(boardComments[ci].commentNumber))
					dispatch(decreaseBoardCommentCount(boardComments[ci].boardNumber))
				}
			}}><RiDeleteBin6Line/>
			</span>
		</Col>
	)
}

export default BoardComments