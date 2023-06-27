import React, { useEffect, useState  } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';

import 'react-quill/dist/quill.snow.css';

import { useNavigate } from 'react-router-dom';

/* Redux, State */
import { useDispatch, useSelector } from 'react-redux';
import { boardEditingOff } from 'store';

/* Components */
import BoardEditForm from './BoardEditForm';
import BoardDetailObj from './BoardDetailObj';

function BoardDetail({boards}){
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let state = useSelector((state) => state)
  let [openBoard, setOpenBoard] = useState(null);
  let [isBoardOwner, setIsBoardOwner] = useState(false);
  // let [openBoard, setOpenBoard] = useState(
  //   boards.find((x)=> x.postNumber === state.nowOpenBoard.postNumber ))

  // let [boardsObj, setBoardsObj] = useState([...boards]);
  //기존코드
  // let [boards, setBoards] = useState([]);
  // let [boards, setBoards] = useState(
    //   boardsObj.find((x)=> x.postNumber === state.nowOpenBoard.postNumber )
    // );
    
    
    // console.log(boards)
    // console.log(state.userInfo.nickname)
    // console.log(boards.writer.nickname)
    
    
    ////////////기존코드
    // useEffect(()=>{ 
      //   //아래 setBoards useEffect이 find함수를 통해 index를 redux의 return 값으로 
      //   //받아올 수가 없어서 boardsObj를 통해 redux가 아닌 현 컴포넌트의 state로 불러옴
      //   setBoardsObj([...state.boardObj])
      // },[state.boardObj])
      
      // useEffect(()=>{
        //   setBoards(boardsObj.find((x)=> x.boardNumber === state.nowOpenBoard.boardNumber ))
        // },[boardsObj, state.nowOpenBoard])
        ///////////

  console.log(1)
  useEffect(()=>{
    console.log(2)
    axios.get(`http://3.36.85.194:42988/api/v1/posts/${state.nowOpenBoard.postNumber}`)
    .then(response => {
      setOpenBoard(response.data.data)
      console.log("성공")
      
    })
    .catch((error)=>{
      console.log("error=> ",error.message);
    })
  },[])
  console.log(3)
  console.log("3 => ", openBoard)
  
  // useEffect(()=>{
  //   console.log(4)
  //   if (state.isLoggedIn){
  //     console.log(5)
  //     console.log("5 => ", openBoard)
  //     if (state.userInfo.nickname === openBoard.writer.nickname){
  //       console.log(6)
  //       setIsBoardOwner(true)
  //     } else {setIsBoardOwner(false)}
  //   } else {setIsBoardOwner(false)}
  // },[state.isLoggedIn, state.userInfo, openBoard])
  
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
      { openBoard !== null ? (
        <Row style={{height:50, alignItems:'center', marginTop:10, backgroundColor:'rgb(250, 250, 250)', borderBottom:'1px solid #ccc'}}>
          <Col style={{fontSize:15, textAlign:'left', marginLeft:30}}>{openBoard.postNumber}</Col>
          <Col style={{fontSize:15, color:'gray'}}>{openBoard.createdDate}</Col>
          <Col style={{fontSize:15, textAlign:'right', marginRight:10}}>
            <span style={{marginRight:10}}>조회 : {openBoard.viewCount}</span>
            <span>추천 : {openBoard.likeCount}</span>
          </Col>
        </Row>
        ) : (
          <>
            loading...
          </>
        )
      }
      

      {/* 수정폼 컴포넌트 */}
      {/* { state.isBoardEditing.editState ? (
        <BoardEditForm openBoard={openBoard} />
      ) : (
      //수정중이 아닐때 게시글 출력
        <BoardDetailObj openBoard={openBoard} isBoardOwner={isBoardOwner} boards={boards} />
      )} */}
    </Container>
	)
}

export default BoardDetail