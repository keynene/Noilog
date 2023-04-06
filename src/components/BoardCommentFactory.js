import React, { useState } from 'react';

import { Row, Col } from 'react-bootstrap';

/* Redux, State */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { increaseBoardCommentNumber, createBoardCommentObj, increaseBoardCommentCount } from 'store';

function BoardCommentFactory({ boards }){
	let [boardComment, setBoardComment] = useState('');
	let state = useSelector((state) => state);
	let dispatch = useDispatch();
	let navigate = useNavigate();

	const onBoardCommentChange = (e) => {
		const {
			target: { value },
		} = e;
		setBoardComment(value);
	}

	const getDate = () => {
		let date = new Date();
		let year = date.getFullYear();
		let month = ("0" + (1+date.getMonth())).slice(-2);
		let day = ("0"+date.getDate()).slice(-2);
		let hours = ('0' + date.getHours()).slice(-2); 
		let minutes = ('0' + date.getMinutes()).slice(-2);
		let seconds = ('0' + date.getSeconds()).slice(-2); 

		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	}

	const onBoardCommentSubmit = (e) => {
		e.preventDefault();

		if (state.isLoggedIn === false){
			if(window.confirm('로그인 후 이용해주세요! 로그인하시겠습니까?')){
				return navigate("/login")
			} else {return}
		}

		if (boardComment === ''){
			return alert('댓글 내용을 입력해주세요!')
		}

		let createdBoardCommentObj = {
			commentNumber : state.boardCommentNumber.num,
			boardNumber : boards.boardNumber,
			content : boardComment,
			writer : state.userInfo.id,
			creatorNickname : state.userInfo.nickname,
			createDate : getDate()
		}

		dispatch(increaseBoardCommentNumber())
		dispatch(createBoardCommentObj(createdBoardCommentObj))
		dispatch(increaseBoardCommentCount(boards.boardNumber))

		
		setBoardComment("")

		createdBoardCommentObj = null
	}


	return(
		<Row>
			<Col style={{paddingTop:20, paddingBottom:20, textAlign:'left', borderBottom:'1px solid #ccc'}}>
				<form onSubmit={onBoardCommentSubmit} className="comment_container" style={{border:'1px solid rgb(200,200,200)'}}>
					<textarea className="comment_textarea" placeholder="댓글 달기..." color="gray" value={boardComment} onChange={onBoardCommentChange} />
					{/* textarea에 value, onchange 추가 */}
					<input className="comment_submit" type="submit" value="↑" onClick={()=>{ }} />
				</form>
			</Col>
		</Row>
	)
}

export default BoardCommentFactory