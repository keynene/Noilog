import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import sampleImgUrl from '../img/sample.jpg'

import { useDispatch, useSelector } from "react-redux";
import { LoggedOut } from 'store.js';

function MyPage(){
	let state = useSelector((state) => {return state})
	let dispatch = useDispatch();
	let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(true)

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

  /** 로그아웃 요청 (axios) */
  const logoutRequest = () => {
    let config = getConfig()

    axios
      .post(`${API_URL}/logout`,{},config)
      .then((response) => {
        navigate('/')
        dispatch(LoggedOut()) 
        alert('로그아웃 되었습니다 😀')
      })
      .catch(err => console.log(err))
  }

  /** 회원탈퇴 */
  const dropUser = () =>{
    if(window.confirm("정말 회원 탈퇴하실껀가요? 😥")){
      const promptId = prompt("아이디를 입력해주세요")
      if (promptId === myInfo.id){
        navigate("/")
        dispatch(LoggedOut())
        // localStorage.removeItem(JSON.stringify(state.userId))
        //회원탈퇴 요청하는 함수 만들기
        alert('회원탈퇴가 완료되었습니다.')
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
        .catch(err => console.log(err))
    }
  },[])

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
                  logoutRequest()
                }}>로그아웃
                </button>
              </h4>
              <p>{myInfo.email}</p>
              <p>
                <Link to="/mypage" style={{marginRight:10, marginLeft:10, textDecoration:'none'}} onClick={()=>{ console.log('내가 쓴 글 출력') }}>내가 쓴 글</Link>
                <Link to="/mypage" style={{marginRight:10, marginLeft:10, textDecoration:'none'}}>내가 쓴 댓글</Link> 
              </p>
              <button onClick={()=>{ dropUser() }}>회원탈퇴</button>
            </Col>
          </Row>
        </Container>
       }
		</div>
	)
}

export default MyPage;