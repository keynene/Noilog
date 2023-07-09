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
import { Row, Col, Button } from 'react-bootstrap';
import { useQuery } from 'react-query';

function App() {
  let dispatch = useDispatch();
  let state = useSelector((state) => state)
  let [boards, setBoards] = useState([]);
  let [lastPage, setLastPage] = useState(0);
  let [firstPage, setFirstPage] = useState(1);
  let [maxPostNum, setMaxPostNum] = useState(0);
  let [isLoading, setIsLoading] = useState(true);
  
  let [userInfo, setUserInfo] = useState();

  let [accessToken, setAccessToken] = useState(
    localStorage.length > 0 ? localStorage.getItem("accessToken") : ''
  );
    let [refreshToken, setRefreshToken] = useState(
    localStorage.length > 0 ? localStorage.getItem("refreshToken") : ''
  );

  /** 토큰들 localStorage에 업데이트 */
  useEffect(()=>{
    if (localStorage.length > 0){
      if (localStorage.getItem("accessToken") !== null && localStorage.getItem("refreshToken") !== null){
        setAccessToken(localStorage.getItem("accessToken"))
        setRefreshToken(localStorage.getItem("refreshToken"))
        setIsLoading(false)
      }
    }
  },[state.isLoggedIn])

  /** 유저데이터 받아오기 (axios) */
  useEffect(()=>{
    if (state.isLoggedIn){
      let config = {
        headers : {
          "accesstoken" : accessToken,
          "refreshtoken" : refreshToken,
        },
      }
      axios
        .get(`http://3.36.85.194:42988/api/v1/members`, config)
        .then(response => {
          let userInfoCopy = {...response.data.data}
          setUserInfo(userInfoCopy)
        })
        .catch(err => console.log(err))
    }
  },[accessToken, refreshToken])

  /** 게시글 데이터 받아오기 (axios) */
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
        console.log("error=> ",error);
      })
  },[state.currentPage.page])

  /** 게시글 데이터 실시간으로 받아오기 (다음프로젝트에서는 그닥) */
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
        console.log("error=> ",error);
      })
    )
  })

  return (
    <div className="App">
      <Navigation />
      <Row>
        { state.isLoggedIn && userInfo !== undefined ? 
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
