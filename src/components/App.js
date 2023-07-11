/* eslint-disable */ //warning 제거
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '.././App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Components */
import AppRouter from './Router';
import Navigation from './Navigation';

/* Redux, Actions */
import { useDispatch, useSelector } from "react-redux";
import { setNewToken, LoggedIn } from 'store';

/* etc */
import { Row, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';

function App() {
  let dispatch = useDispatch();
  let state = useSelector((state) => state)
  let [boards, setBoards] = useState([]);
  let [lastPage, setLastPage] = useState(0);
  let [firstPage, setFirstPage] = useState(1);
  let [maxPostNum, setMaxPostNum] = useState(0);
  
  let [userInfo, setUserInfo] = useState();

  let getConfig = () => {
    let config = {
      headers : {
        "accesstoken" : localStorage.getItem("accessToken"),
        "refreshtoken" : localStorage.getItem("refreshToken"),
      },
    }
    return config
  }

  let API_URL = "http://3.36.85.194:42988/api/v1";

  /** 유저데이터 받아오기 (axios) */
  useEffect(()=>{
    if (state.isLoggedIn.value){
      let config = getConfig()

      axios
        .get(`${API_URL}/members`, config)
        .then(response => {
          let userInfoCopy = {...response.data.data}
          setUserInfo(userInfoCopy)

          dispatch(setNewToken(response.headers.newtoken))
        })
        .catch(err => console.log(err))
    }
  },[state.isLoggedIn.value])

  /** 게시글 데이터 받아오기 (axios) */
  useEffect(()=>{
    axios.get(`${API_URL}/posts/search?page=${state.currentPage.page}`)
      .then(response => {
        let boardCopy = [...response.data.data.posts]
        setBoards(boardCopy)

        setLastPage(parseInt(response.data.data.lastPage))
        setFirstPage(parseInt(1))
        setMaxPostNum(parseInt(response.data.data.posts[0].postNumber))
      })
      .catch((error)=>{
        console.log("error=> ",error);
      })
  },[state.currentPage.page])

  /** 게시글 데이터 실시간으로 받아오기 (다음프로젝트에서는 그닥) */
  let boardData = useQuery(['boardData'],()=>{
    return (
      axios
      .get(`${API_URL}/posts/search?page=${state.currentPage.page}`)
      .then(response => {
        let boardCopy = [...response.data.data.posts]
        setBoards(boardCopy)
        
        dispatch(setNewToken(response.headers.newtoken))

        setLastPage(parseInt(response.data.data.lastPage))
        setFirstPage(parseInt(1))
        setMaxPostNum(parseInt(response.data.data.posts[0].postNumber))
      })
      .catch((error)=>{
        console.log("error=> ",error);
      })
    )
  })

  return (
    <div className="App">
      <Navigation />
      <Row>
        { state.isLoggedIn.value && userInfo !== undefined ? 
          (<Col style={{color:'gray', marginTop:'10', textAlign:'right', maxWidth:800, marginLeft:'auto', marginRight:'auto'}}>
            {userInfo.nickname}님, 어서오세요🎉
          </Col>
          ) : (
          <Col style={{marginTop:'10', textAlign:'right', maxWidth:800, marginLeft:'auto', marginRight:'auto'}}><br/></Col>
          )
        }
      </Row>
      <AppRouter boards={boards} userInfo={userInfo} lastPage={lastPage} firstPage={firstPage} maxPostNum={maxPostNum} />
    </div>
  );
}
export default App;
