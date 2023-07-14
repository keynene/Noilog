import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import sampleImgUrl from '../img/sample.jpg'

import { useDispatch, useSelector } from "react-redux";
import { LoggedOut, setDeletedUser, setRecoveredUser } from 'store.js';

function MyPage(){
	let state = useSelector((state) => {return state})
	let dispatch = useDispatch();
	let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(true)
  let [isDeletedUser, setIsDeletedUser] = useState(false)

  let API_URL = "http://3.36.85.194:42988";

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
      .post(`${API_URL}/logout`,{}, config)
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
      .delete(`${API_URL}/api/v1/members`, config)
      .then(response => {
        alert(`회원탈퇴가 완료되었습니다 😥
*탈퇴한 계정은 2시간 이내 복구신청이 가능합니다*`)
        navigate("/")
        dispatch(LoggedOut())
      })
      .catch(err => console.log(err))
  }

  /** 탈퇴대기 회원 복구신청 (axios) */
  const recoveryUserRequest = (config) => {
    axios
      .get(`${API_URL}/api/v1/members/recovery`, config)
      .then(response => {
        console.log(response)
        dispatch(setRecoveredUser())
        alert(`계정 복구가 완료되었습니다 😍`)
        navigate("/")
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
        .get(`${API_URL}/api/v1/members`, config)
        .then(response => {
          let myInfoCopy = {...response.data.data}
          setMyInfo(myInfoCopy)
          setIsLoading(false)
        })
        .catch(err => {
          if(err.response.status === 401){
            alert(`로그인 기간이 만료되었습니다. 다시 로그인 해주세요 😅`)
            dispatch(LoggedOut())
            navigate('/')
          }
          if(err.response.data.message === '탈퇴대기 상태인 회원이에요.'){
            if(window.confirm(`현재 탈퇴대기 상태입니다. 계정 복구를 원하시면 확인을 눌러주세요 😋`)){
              recoveryUserRequest(getConfig())
            }
            else { 
              dispatch(setDeletedUser())
              setIsLoading(false)
              setIsDeletedUser(true)
            }
          }
        })
    }
  },[])

	return(
		<div>
      { isLoading ? <>loading...</> :
        isDeletedUser ? 
          <>
            탈퇴대기중인 계정은 마이페이지를 이용하실 수 없습니다😥 <br/>
            계정 복구를 원하시면 아래 버튼을 눌러주세요 ! <br/>
            <br/>
            <button onClick={()=>{recoveryUserRequest(getConfig())}}>계정복구</button>
          </> 
        :
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