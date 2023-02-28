import React from 'react';
import { Routes, Route } from 'react-router-dom';

/* 컴포넌트 import */
import Join from './Join.js';
import Home from './Home.js';
import MyPage from './MyPage.js';
import Login from './Login.js';

function AppRouter({ isLoggedIn, userObj,loginChange }){
	return(
		<Routes>
			{/* 메인페이지 */}
			<Route path="/" element={ <Home /> }></Route>

			{/* 회원가입페이지 */}
			<Route path="/join" element={ <Join isLoggedIn={isLoggedIn} /> } />

			{/* 마이페이지 */}
			{ isLoggedIn === true ? 
				<Route path="/mypage" element={ <MyPage /> } />
				:
				<Route path="/join" element={ <Join /> } />
			}

			{/* 로그인페이지 */}
			<Route path="/login" element={ <Login loginChange={loginChange} /> } /> 
			
		</Routes>
	)
}

export default AppRouter