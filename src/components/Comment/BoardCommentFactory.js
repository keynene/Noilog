import axios from 'axios';
import React, { useState } from 'react';

import { Row, Col } from 'react-bootstrap';

/* Redux, State */
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCommentPostedTrue } from 'store';

function BoardCommentFactory({ openBoard, setPostLoading, setCommentLoading }){
	let navigate = useNavigate();
  let dispatch = useDispatch();
  
  let state = useSelector((state) => state);
  let COMMENTS_URL = useSelector((state) => state.COMMENTS_URL);
  let postNumber = 'postNumber'
  
	let [comment, setComment] = useState('');
  let commentObj = { content : '' };
  
	const onCommentChange = (e) => {
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
    axios
      .post(`${COMMENTS_URL}?${postNumber}=${openBoard.postNumber}`, data, config)
      .then(response => {
        setCommentLoading(false)
        setPostLoading(false)
      })
      .catch(err => console.log(err))
  }

	const onCommentSubmit = (e) => {
		e.preventDefault();

		if (state.isLoggedIn.value === false){
			if(window.confirm('로그인 후 이용해주세요! 로그인하시겠습니까?')){
				return navigate("/login")
			} else {return}
		}

		if (comment === ''){
			return alert('댓글 내용을 입력해주세요!')
		}

    setCommentLoading(true)
    setPostLoading(true)
    commentObj.content = comment
    commentPostRequest(commentObj, getConfig())
    dispatch(setCommentPostedTrue())
		
		setComment("")
	}


	return(
		<Row>
			<Col style={{paddingTop:20, paddingBottom:20, textAlign:'left', borderBottom:'1px solid #ccc'}}>
				<form onSubmit={onCommentSubmit} className="comment_container" style={{border:'1px solid rgb(200,200,200)'}}>
					<textarea 
            className="comment_textarea" 
            placeholder="댓글 달기..." 
            color="gray" 
            value={comment} 
            onChange={onCommentChange} 
          />
					<input className="comment_submit" type="submit" value="↑"/>
				</form>
			</Col>
		</Row>
	)
}

export default BoardCommentFactory