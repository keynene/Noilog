import React, { useEffect, useState  } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import 'react-quill/dist/quill.snow.css';

import { useNavigate, useParams } from 'react-router-dom';

/* Redux, State */
import { useDispatch, useSelector } from 'react-redux';
import { boardEditingOff } from 'store';

/* Components */
import BoardEditForm from './BoardEditForm';
import BoardDetailObj from './BoardDetailObj';

function BoardDetail({boards}){
  let {postNumber} = useParams();
  let [openBoard, setOpenBoard] = useState(boards.find((x)=>{ return x.postNumber == postNumber }));

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let state = useSelector((state) => state)
  let [isBoardOwner, setIsBoardOwner] = useState(false);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    setOpenBoard(boards.find((x)=>{ return x.postNumber == postNumber }))
  },[boards, postNumber])
  
  useEffect(()=>{
    if (openBoard !== undefined){
      setIsLoading(false)
    }
    if (state.isLoggedIn && isLoading === false){
      if (state.userInfo.nickname === openBoard.writer.nickname){
        setIsBoardOwner(true)
      } else {setIsBoardOwner(false)}
    } else {setIsBoardOwner(false)}
  },[state.isLoggedIn, state.userInfo, openBoard, isLoading])

  console.log(openBoard)
  
  return (
    <Container style={{width:800, marginTop:10, marginBottom:100}}>
      <Row style={{textAlign:'left'}}>
        <Col>
          <Button 
            variant="light" 
            onClick={()=>{
              if (state.isBoardEditing.editState){
                if (window.confirm('글 수정을 취소하시겠습니까?')){
                  dispatch(boardEditingOff())
                  navigate("/")
                }
              } else{ navigate("/")}
            }} 
            style={{border:'1px solid rgb(200,200,200)'}}
          >목록</Button>
        </Col>
      </Row>
      { isLoading ? (
        <> loading... </>
        ) : (
        <Row style={{height:50, alignItems:'center', marginTop:10, backgroundColor:'rgb(250, 250, 250)', borderBottom:'1px solid #ccc'}}>
          <Col style={{fontSize:15, textAlign:'left', marginLeft:30}}>No. {openBoard.postNumber}</Col>
          <Col style={{fontSize:15, color:'gray'}}>{openBoard.createdDate}</Col>
          <Col style={{fontSize:15, textAlign:'right', marginRight:10}}>
            <span style={{marginRight:10}}>조회 : {openBoard.viewCount}</span>
            <span>추천 : {openBoard.likeCount}</span>
          </Col>
        </Row>
        )
      }

      {/* 수정폼 컴포넌트 */}
      { state.isBoardEditing.editState ? (
        <BoardEditForm openBoard={openBoard} />
      ) : (
      //수정중이 아닐때 게시글 출력
        <BoardDetailObj openBoard={openBoard} isBoardOwner={isBoardOwner} boards={boards} isLoading={isLoading} />
      )}
    </Container>
	)
}

export default BoardDetail