import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

// import { FaRegEye } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { BiCommentDetail } from "react-icons/bi";

/* Components */
import BoardCommentFactory from './BoardCommentFactory';
import BoardComments from './BoardComments';
import BoardWriteButton from './BoardWriteButton';

/* Redux, State */
import { useDispatch, useSelector } from 'react-redux';
import { onBoardLikeCountChange, deleteBoardObj, boardEditingOn, setOpenBoard, increaseBoardViewCount } from 'store';

function BoardDetailObj({ openBoard, setOpenBoard, isBoardOwner, boards, isLoading }){
	let state = useSelector((state) => state)
	let navigate = useNavigate();
	let dispatch = useDispatch();

  let [boardComments, setBoardComments] = useState([]);
  let [maxPostNum, setMaxPostNum] = useState(0);

	useEffect(()=>{
    setBoardComments([...state.boardCommentObj])
  },[state.boardCommentObj])

	
  const MoveToTop = () => {
    window.scrollTo({ top:0, behavior:'smooth' });
  }

  const dataObj = () => {
		let data = {
			id : state.userInfo.id,
			boardNumber : state.nowOpenBoard.boardNumber
		}
		return data
	}
	
  const onEditButtonClick = () => {
    if (window.confirm('게시글을 수정하시겠습니까?')){
      dispatch(boardEditingOn(openBoard.postNumber))
    }
  }

  const onDeleteButtonClick = () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')){
      dispatch(deleteBoardObj(openBoard.boardNumber))
      alert('삭제되었습니다.')
      navigate("/")
    }
    
  }

  const onNextButtonClick = () => {
    axios.get(`http://3.36.85.194:42988/api/v1/posts/search?page=1`)
    .then(response => {
      let copy = response.data.data.posts[0].postNumber
      setMaxPostNum(copy)
    })
    .catch((error)=>{
      console.log("error=> ",error.message);
    })

    if (openBoard.postNumber === maxPostNum){
      return alert('다음글이 없습니다!')
    }

    else{
      setOpenBoard(boards.find((x)=>{ return x.postNumber == openBoard.postNumber-1 }))
      navigate(`/boarddetail/${openBoard.postNumber+1}`)
    }
  }

  const onPrevButtonClick = () => {
    if (openBoard.postNumber === 1){
      return alert('이전글이 없습니다!')
    }
    else{
      setOpenBoard(boards.find((x)=>{ return x.postNumber == openBoard.postNumber+1 }))
      navigate(`/boarddetail/${openBoard.postNumber-1}`)
    }
  }

	return (
		<> 
    {isLoading? <>loading...</> : //openBoard 데이터 로딩 시 출력 (BoardDetail.js 참고)
		(
      <>
      <Row style={{marginTop:15}}>
        <Col style={{textAlign:'right'}}>
          {/* 수삭목댓 컴포넌트 */}
          <BoardUpDelInCom 
            isBoardOwner={isBoardOwner} 
            openBoard={openBoard} 
            boards={boards} 
            navigate={navigate} 
            onEditButtonClick={onEditButtonClick} 
            onDeleteButtonClick={onDeleteButtonClick}
          />
        </Col>
      </Row>
      
      <Row style={{marginTop:40, marginBottom:60}}>
        <Col><h4>{openBoard.title}</h4></Col>
      </Row>

      <Row>
        <Col style={{textAlign:'left', paddingBottom:80}} >
          <div dangerouslySetInnerHTML={{ __html :  openBoard.content  }} />
        </Col>
      </Row>

      {/* 추천버튼 컴포넌트 */}
      <Row>
        <Col style={{alignItems:'baseline'}}>
          <LikeButton state={state} openBoard={openBoard} boards={boards} dispatch={dispatch} navigate={navigate} dataObj={dataObj} />
        </Col>
      </Row>

      <Row style={{marginTop:30, alignItems:'flex-end', paddingBottom:30, borderBottom:'1px solid #ccc'}}>
        <Col style={{textAlign:'left'}}>
          {/* 수삭목댓 컴포넌트 */}
          <BoardUpDelInCom 
            isBoardOwner={isBoardOwner} openBoard={openBoard} boards={boards} navigate={navigate} onEditButtonClick={onEditButtonClick} onDeleteButtonClick={onDeleteButtonClick}/>
        </Col>
        <Col style={{textAlign:'right'}}>
          { isBoardOwner ? (
            <>
            <Button 
              variant="light" 
              style={{marginRight:10, border:'1px solid rgb(200,200,200)'}} 
              onClick={()=>{onEditButtonClick()}}
            >수정</Button> 
            <Button
              variant="light"
              style={{marginRight:10, border:'1px solid rgb(200,200,200)'}}
              onClick={()=>{onDeleteButtonClick()}}
            >삭제</Button>
            </>
            ) : null 
          }
          <Button variant="light" style={{marginRight:10, border:'1px solid rgb(200,200,200)'}} onClick={()=>{navigate("/")}}>목록</Button>
          <BoardWriteButton />
        </Col>
      </Row>

      {/* 댓글출력 컴포넌트 */}
      <Row style={{marginTop:10}}>
        <Col style={{textAlign:'left'}}><BiCommentDetail/> 댓글 ({openBoard.commentCount})</Col>
      </Row>
      <Row>
        <Col>
          <Container>
            { boardComments.map((ca,ci) => 
              <BoardComments 
                openBoard={openBoard}
                boards={boards} 
                boardComments={boardComments} 
                ci={ci} 
                key={ci} 
                isBoardCommentOwner={ 
                  state.isLoggedIn ? state.userInfo.id === boardComments[ci].writer : false
                } 
              />
            )}
          </Container>
        </Col>
      </Row>

      {/* 댓글달기 컴포넌트 */}
      <BoardCommentFactory openBoard={openBoard} boards={boards} />

      {/* 목록, 다음글, 이전글, 맨위로, 글쓰기 버튼 */}
      <Row style={{textAlign:'left' , marginTop:30}}>
        <Col>
          <Button variant="light" onClick={()=>{navigate("/")}} style={{border:'1px solid rgb(200,200,200)', marginRight:5}}>목록</Button>
          <Button 
            variant="light" 
            onClick={()=>{onNextButtonClick()}}
            style={{border:'1px solid rgb(200,200,200)', marginRight:5}}
          >다음글 ↑</Button>
          <Button 
            variant="light" 
            onClick={()=>{onPrevButtonClick()}} 
            style={{border:'1px solid rgb(200,200,200)'}}
          >이전글 ↓</Button>
        </Col>
        <Col style={{textAlign:'right'}}>
          <Button variant="light" onClick={()=>{MoveToTop()}} style={{border:'1px solid rgb(200,200,200)', marginRight:5}}>맨위로</Button>
          <BoardWriteButton />
        </Col>
      </Row>
      </>
    )}
		</>
	)
}


/* 수정/삭제/목록/댓글 컴포넌트 */
function BoardUpDelInCom({ openBoard, isBoardOwner, navigate, onEditButtonClick, onDeleteButtonClick }){
  return (
    <div>
      { isBoardOwner ? (
        // 글작성자이면 수삭목댓
        <div style={{fontSize:14, color:'gray'}}>
          <span style={{cursor:'pointer'}} onClick={()=>{ onEditButtonClick() }}>수정</span><span> | </span>
          <span style={{cursor:'pointer'}} onClick={()=>{ onDeleteButtonClick() }}>삭제</span><span> | </span>
          <span style={{cursor:'pointer'}} onClick={()=>{navigate("/")}}>목록</span><span> | </span>
          <span style={{cursor:'pointer'}}>댓글(<span style={{color:'#F94B4B'}}>{openBoard.commentCount}</span>)</span>
        </div>
      ) : (
        // 글작성자 아니면 목댓
        <div style={{fontSize:14, color:'gray'}}>
          <span style={{cursor:'pointer'}} onClick={()=>{navigate("/")}}>목록</span><span> | </span>
          <span style={{cursor:'pointer'}}>댓글(<span style={{color:'#F94B4B'}}>{openBoard.commentCount}</span>)</span>
        </div>
      )}
    </div>
  )
}

/* 추천버튼 컴포넌트 */
function LikeButton({ openBoard, state, dispatch, navigate, dataObj }){
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
      {openBoard.likeCount}
    </Button>
  )
}

export default BoardDetailObj