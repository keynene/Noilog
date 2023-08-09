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
import { setNewToken, LoggedOut, tokenDead } from 'store';

/* etc */
import { Row, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

function App() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  
  let state = useSelector((state) => state)
  let API_URL = useSelector((state) => state.API_URL)
  let PAGE_URL = useSelector((state) => state.PAGE_URL)

  let [boards, setBoards] = useState([]);
  let [lastPage, setLastPage] = useState(0);
  let [firstPage, setFirstPage] = useState(1);
  let [maxPostNum, setMaxPostNum] = useState(0);
  
  let [userInfo, setUserInfo] = useState();

  let [mainPageLoading, setMainPageLoading] = useState(false);

  let getConfig = () => {
    let config = {
      headers : {
        "accesstoken" : localStorage.getItem("accessToken"),
        "refreshtoken" : localStorage.getItem("refreshToken"),
      },
    }
    return config
  }

  /** 모든 토큰 만료 시 로그아웃 */
  useEffect((message)=>{
    dispatch(tokenDead(message))
    if (state.isLoggedIn.isDead === true){
      navigate("/")
      dispatch(LoggedOut())
    }
  },[state.isLoggedIn.isDead])

  /** 탈퇴대기 회원 복구신청 (axios) */
  const recoveryUserRequest = (config) => {
    axios
      .get(`${API_URL}/members/recovery`, config)
      .then(response => {
        alert(`계정 복구가 완료되었습니다 😍`)
      })
      .catch(err => console.log(err))
  }

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
        .catch(err => {
          console.log(err)
          dispatch(tokenDead(err.response.data.message))

          if(err.response.data.message === '탈퇴대기 상태인 회원이에요.'){
            if(window.confirm(`현재 탈퇴대기 상태입니다. 계정 복구를 원하시면 확인을 눌러주세요 😋
취소를 누르면 로그아웃됩니다.`)){
              recoveryUserRequest(getConfig())
            }
            else { dispatch(LoggedOut()) }
          }
        })
    }
  },[state.isLoggedIn.value])

  /** 게시글 데이터 받아오기 (axios) */
  useEffect(()=>{
    if (mainPageLoading === false){
      axios.get(`${PAGE_URL}${state.currentPage.page}`)
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
    }
  },[state.currentPage.page, mainPageLoading])

  /** 게시글 데이터 실시간으로 받아오기 (다음프로젝트에서는 그닥) */
  let boardData = useQuery(['boardData'],()=>{
    return (
      axios
      .get(`${PAGE_URL}${state.currentPage.page}`)
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
      <AppRouter boards={boards} userInfo={userInfo} setMainPageLoading={setMainPageLoading} lastPage={lastPage} firstPage={firstPage} maxPostNum={maxPostNum} />
    </div>
  );
}
export default App;
