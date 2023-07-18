import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import sampleImgUrl from '../img/sample.jpg'

import { useDispatch, useSelector } from "react-redux";
import { LoggedOut, setNewToken } from 'store.js';

function MyPage({isTokenDead}){
	let state = useSelector((state) => state)
	let SERVER_URL = useSelector((state) => state.SERVER_URL)
	let MEMBER_URL = useSelector((state) => state.MEMBER_URL)

	let dispatch = useDispatch();
	let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(true)

  let [myInfo, setMyInfo] = useState();

  let getConfig = () => {
    let config = {
      headers : {
        "accesstoken" : localStorage.getItem("accessToken"),
        "refreshtoken" : localStorage.getItem("refreshToken"),
      },
    }
    return config
  }

  /** 로그아웃 요청 (axios-logout) */
  const logoutRequest = (config) => {
    axios
      .post(`${SERVER_URL}/logout`,{}, config)
      .then((response) => {
        navigate('/')
        dispatch(LoggedOut()) 
        alert('로그아웃 되었습니다 😀')
      })
      .catch(err => console.log(err))
  }

  /** 회원탈퇴 요청 (axios-delete) */
  const deleteUserRequest = (config) => {
    axios
      .delete(`${MEMBER_URL}`, config)
      .then(response => {
        alert(`회원탈퇴가 완료되었습니다 😥
*탈퇴한 계정은 2시간 이내 복구신청이 가능합니다*`)
        navigate("/")
        dispatch(LoggedOut())
      })
      .catch(err => console.log(err))
  }

  /** 회원탈퇴 */
  const deleteUser = () =>{
    if(window.confirm("정말 회원 탈퇴하실껀가요? 😥")){
      const promptId = prompt("확인을 위해 아이디를 정확하게 입력해주세요 ")
      if (promptId === myInfo.username){
        deleteUserRequest(getConfig())
      } 
      else {
        alert('아이디가 일치하지 않습니다.')
      }
    }
  }

  /** 마이페이지 데이터 받기 (axios) */
  useEffect(()=>{
    if (state.isLoggedIn.value){
      let config = getConfig()
      axios
        .get(`${MEMBER_URL}`, config)
        .then(response => {
          let myInfoCopy = {...response.data.data}
          setMyInfo(myInfoCopy)
          setIsLoading(false)

          dispatch(setNewToken(response.headers.newtoken))
        })
        .catch(err => {
          isTokenDead()
          dispatch(setNewToken(err.response.headers.newtoken))
        })
    }
  },[MEMBER_URL, dispatch, navigate, state.isLoggedIn.value])

	return(
		<div>
      { isLoading ? <>loading...</> :
        <Container style={{marginTop:30, width:800}}>
          <Row>
            <Col><img src={sampleImgUrl} alt="" width="133px" height="158px" /></Col>
            <Col style={{paddingTop:20}}>
              <h4>
                {myInfo.nickname} ({myInfo.username})
                <button style={{fontSize:14, marginLeft:10}} onClick={()=>{
                  logoutRequest(getConfig())
                }}>로그아웃
                </button>
              </h4>
              <p>{myInfo.email}</p>
              <p>
                <Link to="/mypage" style={{marginRight:10, marginLeft:10, textDecoration:'none'}} onClick={()=>{ console.log('내가 쓴 글 출력') }}>내가 쓴 글</Link>
                <Link to="/mypage" style={{marginRight:10, marginLeft:10, textDecoration:'none'}}>내가 쓴 댓글</Link> 
              </p>
              <button onClick={()=>{ deleteUser() }}>회원탈퇴</button>
            </Col>
          </Row>
        </Container>
       }
		</div>
	)
}

export default MyPage;