import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/* Redux, Actions */
import { useDispatch, useSelector } from "react-redux";
import { LoggedOut } from 'store.js';

function Navigation(){
  let dispatch = useDispatch();
	let navigate = useNavigate();
  let state = useSelector((state) => {return state})

	return (
		<div>
			<Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">No ·_· ven</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/feed') }}>Feed</Nav.Link>
            {
              state.isLoggedIn === true ? 
								<Nav.Link onClick={()=>{ navigate('/mypage') }}>MyPage</Nav.Link>
              :
								<Nav.Link onClick={()=>{ navigate('/join') }}>Join Us</Nav.Link>
            }

            { 
              state.isLoggedIn === true ? 
                null
              :
                <Nav.Link onClick={()=>{ navigate('/login') }}>Login</Nav.Link>
            }

            {
              state.isLoggedIn === true ?
                <Nav.Link onClick={()=>{ dispatch(LoggedOut('')) }} >Logout</Nav.Link>
              :
                null
            }

          </Nav>
        </Container>
      </Navbar>
		</div>
	)
}

export default Navigation;