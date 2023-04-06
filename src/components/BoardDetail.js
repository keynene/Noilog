import React, { useEffect, useState  } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import 'react-quill/dist/quill.snow.css';

// import { FaRegEye } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { BiCommentDetail } from "react-icons/bi";

import { useNavigate } from 'react-router-dom';

/* Redux, State */
import { useDispatch, useSelector } from 'react-redux';
import { onBoardLikeCountChange, deleteBoardObj, boardEditingOn } from 'store';

/* Components */
import BoardCommentFactory from './BoardCommentFactory';
import BoardComments from './BoardComments';
import BoardWriteButton from './BoardWriteButton';
import BoardEditForm from './BoardEditForm';

function BoardDetail({ boards, isBoardOwner }){
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let state = useSelector((state) => state)
  
  let [boardComments, setBoardComments] = useState([]);

  useEffect(()=>{
    setBoardComments(state.boardCommentObj)
  },[state.boardCommentObj])

  const MoveToTop = () => {
    window.scrollTo({ top:0, behavior:'smooth' });
  }

  const dataObj = () => {
		let data = {
			id : state.userInfo[0].id,
			boardNumber : state.nowOpenBoard.num
		}
		return data
	}

	return (
    <Container style={{width:800, marginTop:10, marginBottom:100}}>
      <Row style={{textAlign:'left'}}>
        <Col><Button variant="light" onClick={()=>{navigate("/")}} style={{border:'1px solid rgb(200,200,200)'}}>목록</Button></Col>
      </Row>
      <Row style={{height:50, alignItems:'center', marginTop:10, backgroundColor:'rgb(250, 250, 250)', borderBottom:'1px solid #ccc'}}>
        <Col style={{fontSize:15, textAlign:'left', marginLeft:30}}>{boards.creatorNickname}</Col>
        <Col style={{fontSize:15, color:'gray'}}>{boards.createDate.setDateYMDHMS}</Col>
        <Col style={{fontSize:15, textAlign:'right', marginRight:10}}>
          <span style={{marginRight:10}}>조회 : {boards.viewCount.length}</span>
          <span>추천 : {boards.likeCount.length}</span>
        </Col>
      </Row>
      {/* 수정폼 컴포넌트 */}
      { state.isBoardEditing.editState ? (
        <BoardEditForm boards={boards} />
      ) : (
      //수정중이 아닐때 게시글 출력
      <> 
        <Row style={{marginTop:15}}>
          <Col style={{textAlign:'right'}}>
            {/* 수삭목댓 컴포넌트 */}
            <BoardUpDelInCom isBoardOwner={isBoardOwner} boards={boards} navigate={navigate} dispatch={dispatch} />
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
            {/* 추천버튼 컴포넌트 */}
            <LikeButton state={state} boards={boards} dispatch={dispatch} navigate={navigate} dataObj={dataObj} />
          </Col>
        </Row>
        <Row style={{marginTop:30, alignItems:'flex-end', paddingBottom:30, borderBottom:'1px solid #ccc'}}>
          <Col style={{textAlign:'left'}}>
            {/* 수삭목댓 컴포넌트 */}
            <BoardUpDelInCom isBoardOwner={isBoardOwner} boards={boards} navigate={navigate} dispatch={dispatch} />
          </Col>
          <Col style={{textAlign:'right'}}>
            { isBoardOwner ? (
              <Button 
                variant="light" 
                style={{marginRight:10, border:'1px solid rgb(200,200,200)'}} 
                onClick={()=>{
                  if (window.confirm('게시글을 수정하시겠습니까?')){
                    dispatch(boardEditingOn(boards.boardNumber))
                  }
              }}>수정</Button> ) : null 
            }
            <Button variant="light" style={{marginRight:10, border:'1px solid rgb(200,200,200)'}} onClick={()=>{navigate("/")}}>목록</Button>
            <BoardWriteButton />
          </Col>
        </Row>
        <Row style={{marginTop:10}}>
          <Col style={{textAlign:'left'}}><BiCommentDetail/> 댓글 ({boards.commentCount})</Col>
        </Row>

        {/* 댓글출력 컴포넌트 */}
        <Row>
          <Col>
            <Container>
              { boardComments.map((ca,ci) => 
                <BoardComments 
                  boards={boards} 
                  boardComments={boardComments} 
                  ci={ci} 
                  key={ci} 
                  isBoardCommentOwner={ 
                    state.isLoggedIn ? state.userInfo[0].id === boardComments[ci].writer : false
                  } 
                />
              )}
            </Container>
          </Col>
        </Row>

        {/* 댓글달기 컴포넌트 */}
        <BoardCommentFactory boards={boards} />

        <Row style={{textAlign:'left', marginTop:30}}>
          <Col>
            <Button variant="light" onClick={()=>{navigate("/")}} style={{border:'1px solid rgb(200,200,200)', marginRight:5}}>목록</Button>
            {/* <Button variant="light" onClick={()=>{navigate("/")}} style={{fontSize:13, border:'1px solid rgb(200,200,200)', marginRight:5}}>다음글 ↑</Button>
            <Button variant="light" onClick={()=>{navigate("/")}} style={{fontSize:13, border:'1px solid rgb(200,200,200)'}}>이전글 ↓</Button> */}
          </Col>
          <Col style={{textAlign:'right'}}>
            <Button variant="light" onClick={()=>{MoveToTop()}} style={{border:'1px solid rgb(200,200,200)', marginRight:5}}>맨위로</Button>
            <BoardWriteButton />
          </Col>
        </Row>
      </>
      )}
    </Container>
	)
}

/* 수정/삭제/목록/댓글 span */
function BoardUpDelInCom({ isBoardOwner, boards, navigate, dispatch }){
  return (
    <div>
      { isBoardOwner ? (
        // 글작성자이면 수삭목댓
        <div style={{fontSize:14, color:'gray'}}>
          <span style={{cursor:'pointer'}} onClick={()=>{
            if (window.confirm('게시글을 수정하시겠습니까?')){
              dispatch(boardEditingOn(boards.boardNumber))
            }
          }}>수정</span><span> | </span>
          <span style={{cursor:'pointer'}} onClick={()=>{
            if (window.confirm('게시글을 삭제하시겠습니까?')){
              dispatch(deleteBoardObj(boards.boardNumber))
              navigate("/")
            }}} >삭제
          </span><span> | </span>
          <span style={{cursor:'pointer'}} onClick={()=>{navigate("/")}}>목록</span><span> | </span>
          <span style={{cursor:'pointer'}}>댓글(<span style={{color:'#F94B4B'}}>{boards.commentCount}</span>)</span>
        </div>
      ) : (
        // 글작성자 아니면 목댓
        <div style={{fontSize:14, color:'gray'}}>
          <span style={{cursor:'pointer'}} onClick={()=>{navigate("/")}}>목록</span><span> | </span>
          <span style={{cursor:'pointer'}}>댓글(<span style={{color:'#F94B4B'}}>{boards.commentCount}</span>)</span>
        </div>
      )}
    </div>
  )
}

/* 추천버튼 컴포넌트 */
function LikeButton({ state, boards, dispatch, navigate, dataObj }){
  return(
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
  )
}

export default BoardDetail