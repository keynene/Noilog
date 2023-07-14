import React from 'react';
import axios from 'axios';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/* Redux, Actions */
import { useDispatch, useSelector } from "react-redux";
import { LoggedOut } from 'store.js';

function Navigation(){
  let dispatch = useDispatch();
	let navigate = useNavigate();
  let state = useSelector((state) => {return state})

  let getConfig = () => {
    let config = {
      headers : {
        "accesstoken" : localStorage.getItem("accessToken"),
        "refreshtoken" : localStorage.getItem("refreshToken"),
      },
    }
    return config
  }

  let API_URL = "http://3.36.85.194:42988";

  const logoutRequest = () => {
    let config = getConfig()

    axios
      .post(`${API_URL}/logout`,{},config)
      .then(async(response) => {
        dispatch(LoggedOut()) 
        alert('로그아웃 되었습니다 😀')
        await navigate('/')
      })
      .catch(err => {
        if (err.response.data.message === `탈퇴대기 상태인 회원이에요.`){
          dispatch(LoggedOut())
          alert('로그아웃 되었습니다 😀')
        }
      })
  }

	return (
		<div>
			<Navbar bg="light" variant="light">
        <Container>
          <Nav.Link className="navbar-brand" onClick={()=>{ navigate('/') }}>No ·_· ven</Nav.Link>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/feed') }}>Feed</Nav.Link>
            {
              state.isLoggedIn.value === true ? 
								<Nav.Link onClick={()=>{ navigate('/mypage') }}>MyPage</Nav.Link>
              :
								<Nav.Link onClick={()=>{ navigate('/join') }}>Join Us</Nav.Link>
            }

            { 
              state.isLoggedIn.value === true ? 
                null
              :
                <Nav.Link onClick={()=>{ navigate('/login') }}>Login</Nav.Link>
            }

            {
              state.isLoggedIn.value === true ?
                <Nav.Link onClick={()=>{ 
                  logoutRequest()
                }} >Logout</Nav.Link>
              :
                null
            }
            {/* <Nav.Link onClick={()=>{ 
              logoutRequest()
            }} >Logout</Nav.Link>

            <Nav.Link onClick={()=>{ navigate('/join') }}>Join Us</Nav.Link> */}

          </Nav>
        </Container>
      </Navbar>
		</div>
	)
}

export default Navigation;