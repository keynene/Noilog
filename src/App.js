/* eslint-disable */ //warning 제거
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';


/* 컴포넌트 import */
import  Join  from './components/Join.js';

function App() {

  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">No ·_· ven</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/join') }}>Join Us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        {/* 메인페이지 */}
        <Route path="/" element={ <div>메인페이지임</div> }></Route>

        {/* 회원가입페이지 */}
        <Route path="/join" element={ <Join /> } />
      </Routes>

    </div>
  );
}

export default App;
