import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Row, Col, Container } from 'react-bootstrap';
import { BiCommentDetail } from 'react-icons/bi';

import BoardComments from './BoardComments';
import BoardCommentFactory from './BoardCommentFactory';

import { useDispatch, useSelector } from 'react-redux';
import { setCommentPostedFalse, setNewToken } from 'store';

function BoardCommentContainer({userInfo, isTokenDead, openBoard, setPostLoading}){

  let state = useSelector((state) => state)
  let dispatch = useDispatch();

  const COMMENTS_URL = useSelector((state) => state.COMMENTS_URL)
  const postNumber = 'postNumber'
  
  let [comments, setComments] = useState([]);
  let [commentLoading, setCommentLoading] = useState(false)

  /** 댓글 받아오기 (axios) */
  useEffect(()=>{
    if (openBoard !== undefined && commentLoading === false){
      axios
        .get(`${COMMENTS_URL}/search?${postNumber}=${openBoard.postNumber}`)
        .then(response => {
          setComments(response.data.data)
          dispatch(setCommentPostedFalse())

          dispatch(setNewToken(response.headers.newtoken))
        })
        .catch(err => {
          console.log(err)
          isTokenDead(err.response.data.message)
          dispatch(setNewToken(err.response.headers.newtoken))
        })
    }
  },[openBoard, state.isCommentPosted.value, commentLoading, COMMENTS_URL, dispatch])
  
  return (
    <>
      {/* 댓글출력 컴포넌트 */}
      <Row style={{marginTop:10}}>
        <Col style={{textAlign:'left'}}><BiCommentDetail/> 댓글 ({comments.length})</Col>
      </Row>
      <Row>
        <Col>
          <Container>
            { comments.map((ca,ci) => 
              <BoardComments 
                isTokenDead={isTokenDead}
                comments={comments} 
                ci={ci} 
                key={ci} 
                isCommentOwner={ 
                  state.isLoggedIn.value ? 
                    userInfo.memberNumber === comments[ci].writer.memberNumber 
                  : false
                } 
                setCommentLoading={setCommentLoading}
                setPostLoading={setPostLoading}
              />
              )}
          </Container>
        </Col>
      </Row>

      {/* 댓글달기 컴포넌트 */}
      <BoardCommentFactory
        isTokenDead={isTokenDead}
        openBoard={openBoard}
        setPostLoading={setPostLoading}
        setCommentLoading={setCommentLoading}
      />
    </>
  )
}

export default BoardCommentContainer;