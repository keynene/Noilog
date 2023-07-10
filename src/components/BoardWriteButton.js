import React from 'react';

import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function BoardWriteButton(){
	let navigate = useNavigate();
	let state = useSelector((state) => state)

	return(
		<Button variant="dark" onClick={()=>{
			if (state.isLoggedIn.value === true){
				navigate("/boardFactory")
			}
			else {
				if(window.confirm('권한이 없습니다. 로그인 후 이용해주세요!')){
					navigate("/login")
				}
			}
		}}>글쓰기
		</Button>
	)
}

export default BoardWriteButton