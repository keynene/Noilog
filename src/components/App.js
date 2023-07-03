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
import { LoggedIn, setUserInfo } from 'store.js';

/* etc */
import { Table, Row, Col } from 'react-bootstrap';

function App() {
  let dispatch = useDispatch();
  let state = useSelector((state) => state)
  let [boards, setBoards] = useState([]);
  let [lastPage, setLastPage] = useState(0);
  let [firstPage, setFirstPage] = useState(1);
  let [maxPostNum, setMaxPostNum] = useState(0);
  let [loginUserInfo, setLoginUserInfo] = useState({});

  // let data = {
  //   login : false,
  //   loginId : ''
  // }

  /** 로그인여부 확인 (구방법)*/
  // useEffect(()=>{
  //   if (localStorage.length === 0){
  //     localStorage.setItem('login',JSON.stringify(data))
  //   }

  //   if (JSON.parse(localStorage.getItem('login')).login === true){
  //     let nowLoggedInId = JSON.parse(localStorage.getItem('login')).loginId
  //     let nowLoggedInInfo = JSON.parse(localStorage.getItem(JSON.stringify(nowLoggedInId)))
  //     dispatch(LoggedIn(nowLoggedInId))
  //     dispatch(setUserInfo(nowLoggedInInfo))
  //   }
  // },[])
  
  /** 로그인 성공하면 회원정보 받아오기 (로그인 성공 여부는 Login.js파일에 있음) */
  useEffect(()=>{
    if (state.loginState.isLoggedIn){
      let token = localStorage.getItem("accessToken")
      let config = {
        headers : {
          "access-token" : token
        }
      }

      axios
        .get(`http://3.36.85.194:42988/api/v1/members`, config)
        .then(response => {
          let userInfoCopy = {...response.data.data}
          setLoginUserInfo(userInfoCopy)
        })
        .catch(err => console.log(err.message))
    }
  },[state.loginState])

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

  return (
    <div className="App">
      <Navigation />
      <Table>
        <Row>
          { state.loginState.isLoggedIn ? 
            (<Col style={{color:'gray', marginTop:'10', textAlign:'right', maxWidth:800, marginLeft:'auto', marginRight:'auto'}}>
              {loginUserInfo.nickname}님, 어서오세요🎉
            </Col>
          ) : (
            <Col style={{marginTop:'10', textAlign:'right', maxWidth:800, marginLeft:'auto', marginRight:'auto'}}> </Col>
          )
          }
        </Row>
      </Table>
      <AppRouter boards={boards} lastPage={lastPage} firstPage={firstPage} maxPostNum={maxPostNum} />
    </div>
  );
}
export default App;
