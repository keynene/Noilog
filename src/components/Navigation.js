import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/* Redux, Actions */
import { useSelector } from "react-redux";

function Navigation(){
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

          </Nav>
        </Container>
      </Navbar>
		</div>
	)
}

export default Navigation;