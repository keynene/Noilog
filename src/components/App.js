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
import { LoggedIn } from 'store';

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
  let [userInfo, setUserInfo] = useState({});
  let [accessToken, setAccessToken] = useState(
    localStorage.length > 0 ? localStorage.getItem("accessToken") : ''
  );
    let [refreshToken, setRefreshToken] = useState(
    localStorage.length > 0 ? localStorage.getItem("refreshToken") : ''
  );
  
  /** 로그인 성공하면 회원정보 받아오기 (로그인 성공 여부는 Login.js파일에 있음) */
  useEffect(()=>{
    if (localStorage.length > 0){
      if (localStorage.getItem("accessToken") !== null && localStorage.getItem("refreshToken") !== null){
        setAccessToken(localStorage.getItem("accessToken"))
        setRefreshToken(localStorage.getItem("refreshToken"))
      }
    }
    let config = {
      headers : {
        "access-token" : accessToken,
        "refresh-token" : refreshToken
      }
    }
    axios
      .get(`http://3.36.85.194:42988/api/v1/members`, config)
      .then(response => {
        dispatch(LoggedIn())
        let userInfoCopy = {...response.data.data}
        setUserInfo(userInfoCopy)
      })
      .catch(err => console.log(err))
  },[state.isLoggedIn])

  /** 데이터 받아오기 (axios) */
  useEffect(()=>{
    axios.get(`http://3.36.85.194:42988/api/v1/posts/search?page=${state.currentPage.page}`)
      .then(response => {
        let boardCopy = [...response.data.data.posts]
        setBoards(boardCopy)

        setLastPage(parseInt(response.data.data.lastPage))
        setFirstPage(parseInt(1))
        setMaxPostNum(parseInt(response.data.data.posts[0].postNumber))
      })
      .catch((error)=>{
        console.log("error=> ",error.message);
      })
  },[state.currentPage.page])

  let boardData = useQuery(['boardData'],()=>{
    return (
      axios
      .get(`http://3.36.85.194:42988/api/v1/posts/search?page=${state.currentPage.page}`)
      .then(response => {
        let boardCopy = [...response.data.data.posts]
        setBoards(boardCopy)

        setLastPage(parseInt(response.data.data.lastPage))
        setFirstPage(parseInt(1))
        setMaxPostNum(parseInt(response.data.data.posts[0].postNumber))
      })
      .catch((error)=>{
        console.log("error=> ",error.message);
      })
    )
  })

  return (
    <div className="App">
      <Navigation />
      <Row>
        { state.isLoggedIn ? 
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
