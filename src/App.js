/* eslint-disable */ //warning 제거
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import AppRouter from './components/Router';

function App() {

  let navigate = useNavigate();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginChange = () => {
    setIsLoggedIn(true)
    navigate("/")
  }
  const [userObj, setUserObj] = useState(null);

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">No ·_· ven</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            {
              isLoggedIn === false ? 
                <Nav.Link onClick={()=>{ navigate('/join') }}>Join Us</Nav.Link>
              :
                <Nav.Link onClick={()=>{ navigate('mypage') }}>MyPage</Nav.Link>
            }
            <Nav.Link onClick={()=>{ 
              setIsLoggedIn(false) 
              navigate('/')
            }}>LogOut</Nav.Link>

            <Nav.Link onClick={()=>{ navigate('/login') }}>Login</Nav.Link>
{/* 
            <Nav.Link onClick={()=>{ 
              setIsLoggedIn(true) 
              navigate('/')
            }}>자동로그인</Nav.Link> */}

          </Nav>
        </Container>
      </Navbar>

      <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} loginChange={loginChange} />
    </div>
  );
}

export default App;
