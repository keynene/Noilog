import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

// import { FaRegEye } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { BiCommentDetail } from "react-icons/bi";

import { useNavigate } from 'react-router-dom';

/* Redux, State */
import { useDispatch, useSelector } from 'react-redux';
import { onBoardLikeCountChange } from 'store';

/* Components */
import BoardCommentFactory from './BoardCommentFactory';
import BoardComments from './BoardComments';

function BoardDetail({ boards}){
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let state = useSelector((state) => state)

  let [boardComments, setBoardComments] = useState([]);

  useEffect(()=>{
    setBoardComments(state.boardCommentObj)
  },[state.boardCommentObj])

  const dataObj = () => {
		let data = {
			id : state.userInfo[0].id,
			boardNumber : state.nowOpenBoard.num
		}
		return data
	}

	return (
		<Container style={{width:800, marginTop:10}}>
      <Row style={{textAlign:'left'}}>
        <Col><Button variant="light" onClick={()=>{navigate("/")}} style={{border:'1px solid rgb(200,200,200)'}}>목록</Button></Col>
      </Row>
      <Row style={{height:50, alignItems:'center', marginTop:10, backgroundColor:'rgb(250, 250, 250)', borderBottom:'1px solid #ccc'}}>
        <Col style={{textAlign:'left', marginLeft:30}}>{boards.creatorNickname}</Col>
        <Col style={{color:'gray'}}>{boards.createDate}</Col>
        <Col style={{textAlign:'right', marginRight:30}}>{boards.boardNumber}</Col>
      </Row>
      <Row style={{textAlign:'right', alignItems:'center', height:40}}>
        <Col></Col>
        <Col sm={6}>
          <span style={{marginRight:30}}>조회 : {boards.viewCount.length}</span>
          <span>추천 : {boards.likeCount.length}</span>
        </Col>
      </Row>
      <Row style={{marginTop:40, marginBottom:60}}>
        <Col><h4>{boards.title}</h4></Col>
      </Row>
      <Row>
        <Col style={{textAlign:'left', paddingBottom:80}} >
          <div dangerouslySetInnerHTML={{ __html :  boards.content  }} />
        </Col>
      </Row>
      <Row>
        <Col style={{alignItems:'baseline'}}>
          <Button 
            variant="light" 
            style={{fontSize:25, padding:'5px 20px 10px 20px',border:'1px solid rgb(200,200,200)'}}
            onClick={()=>{
              if(state.isLoggedIn === true){
                dispatch(onBoardLikeCountChange(dataObj()))
              } else {
                if(window.confirm('권한이 없습니다. 로그인 후 이용해주세요!')){
                  navigate("/login")
                }
              }
            }}>
            <FcLikePlaceholder style={{fontSize:30, marginRight:10}} />
            {boards.likeCount.length}
          </Button>
        </Col>
      </Row>
      <Row style={{marginTop:30, alignItems:'center'}}>
        <Col style={{textAlign:'right', paddingBottom:30, borderBottom:'1px solid #ccc'}}>
          <Button variant="light" style={{marginRight:10, border:'1px solid rgb(200,200,200)'}} onClick={()=>{navigate("/")}}>목록</Button>
          <Button variant="dark" onClick={()=>{
						if (state.isLoggedIn === true){
							navigate("/boardFactory")
						}
						else {
							if(window.confirm('권한이 없습니다. 로그인 후 이용해주세요!')){
								navigate("/login")
							}
						}
					}}>글쓰기</Button>
        </Col>
      </Row>
      <Row style={{marginTop:10}}>
        <Col style={{textAlign:'left'}}><BiCommentDetail/> 댓글 ({boards.commentCount})</Col>
      </Row>

      {/* 댓글달기 컴포넌트 */}
      <BoardCommentFactory boards={boards} />

      {/* 댓글출력 컴포넌트 */}
      <Row>
        <Col>
          <Container>
            {
              boardComments.map((ca,ci) => 
                <BoardComments boards={boards} i={state.nowOpenBoard.num} ci={ci} key={ci} boardComments={boardComments} />
              )
            }
          </Container>
        </Col>
      </Row>


      
    </Container>
	)
}

export default BoardDetail