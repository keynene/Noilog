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

function BoardDetail(){
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let state = useSelector((state) => state)
  
  let [boardsObj, setBoardsObj] = useState([...state.boardObj]);
  let [boards, setBoards] = useState([]);
  // let [boards, setBoards] = useState(
    //   boardsObj.find((x)=> x.postNumber === state.nowOpenBoard.postNumber )
    // );

  let page = 0

  useEffect(()=>{
    axios.get(`http://3.36.85.194:42988/api/v1/posts/search?page=${page}`)
      .then(response => {
        // console.log(response.data.data.content)
        let copy = [...response.data.data.content]
        setBoards(copy)
      })
      .catch((error)=>{
        console.log("error=> ",error.message);
      })
  },[])
    
  let [isBoardOwner, setIsBoardOwner] = useState( //수정전
    state.userInfo.nickname === boards.writer.nickname ? true : false
  );

  console.log(boards)
  console.log(state.userInfo.nickname)
  console.log(boards.writer.nickname)

  useEffect(()=>{ 
    //아래 setBoards useEffect이 find함수를 통해 index를 redux의 return 값으로 
    //받아올 수가 없어서 boardsObj를 통해 redux가 아닌 현 컴포넌트의 state로 불러옴
    setBoardsObj([...state.boardObj])
  },[state.boardObj])

  //기존코드
  // useEffect(()=>{
  //   setBoards(boardsObj.find((x)=> x.boardNumber === state.nowOpenBoard.boardNumber ))
  // },[boardsObj, state.nowOpenBoard])

  useEffect(()=>{
    if (state.isLoggedIn){
      if (state.userInfo.id === boards.writer){
        setIsBoardOwner(true)
      } else {setIsBoardOwner(false)}
    } else {setIsBoardOwner(false)}
  },[state.isLoggedIn, state.userInfo, boards.writer])

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
        <BoardDetailObj boards={boards} isBoardOwner={isBoardOwner} boardsObj={boardsObj} />
      )}
    </Container>
	)
}

export default BoardDetail