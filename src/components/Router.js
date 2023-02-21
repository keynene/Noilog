import React from 'react';
import { Routes, Route } from 'react-router-dom';

/* 컴포넌트 import */
import Join from './Join.js';
import Home from './Home.js';
import MyPage from './MyPage.js';

function AppRouter({ isLoggedIn }){
	return(
		<Routes>
			{/* 메인페이지 */}
			<Route path="/" element={ <Home /> }></Route>

			{/* 회원가입페이지 */}
			<Route path="/join" element={ <Join /> } />

			{/* 마이페이지 */}
			{ isLoggedIn == true ? 
				<Route path="/mypage" element={ <MyPage /> } />
				:
				<Route path="/join" element={ <Join /> } />
			}
			
		</Routes>
	)
}

export default AppRouter