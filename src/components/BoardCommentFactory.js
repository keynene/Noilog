import axios from 'axios';
import React, { useState } from 'react';

import { Row, Col } from 'react-bootstrap';

/* Redux, State */
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function BoardCommentFactory({ openBoard, boards }){
	let navigate = useNavigate();
  
  let state = useSelector((state) => state);
  let COMMENTS_URL = useSelector((state) => state.COMMENTS_URL);
  let postNumber = 'postNumber'
  
	let [comment, setComment] = useState('');
  let commentObj = { content : '' };
  
	const onBoardCommentChange = (e) => {
		const {
			target: { value },
		} = e;
		setComment(value);
	}

  let getConfig = () => {
    let config = {
      headers : {
        "accesstoken" : localStorage.getItem("accessToken"),
        "refreshtoken" : localStorage.getItem("refreshToken")
      }
    }
    return config
  }

  const commentPostRequest = (data, config) => {
    console.log(`${COMMENTS_URL}?${postNumber}=${openBoard.postNumber}`)
    axios
      .post(`${COMMENTS_URL}?${postNumber}=${openBoard.postNumber}`, data, config)
      .catch(err => console.log(err))
  }

	const onBoardCommentSubmit = (e) => {
		e.preventDefault();

		if (state.isLoggedIn.value === false){
			if(window.confirm('로그인 후 이용해주세요! 로그인하시겠습니까?')){
				return navigate("/login")
			} else {return}
		}

		if (comment === ''){
			return alert('댓글 내용을 입력해주세요!')
		}

    commentObj.content = comment
    commentPostRequest(commentObj, getConfig())
		
		setComment("")
	}


	return(
		<Row>
			<Col style={{paddingTop:20, paddingBottom:20, textAlign:'left', borderBottom:'1px solid #ccc'}}>
				<form onSubmit={onBoardCommentSubmit} className="comment_container" style={{border:'1px solid rgb(200,200,200)'}}>
					<textarea className="comment_textarea" placeholder="댓글 달기..." color="gray" value={comment} onChange={onBoardCommentChange} />
					{/* textarea에 value, onchange 추가 */}
					<input className="comment_submit" type="submit" value="↑" onClick={()=>{ }} />
				</form>
			</Col>
		</Row>
	)
}

export default BoardCommentFactory