import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {useSelector} from "react-redux";

/* Routes import */
import Home from 'routes/Home.js';
import MyPage from 'routes/MyPage.js';
import Feed from 'routes/Feed.js';
import Join from '../routes/Join.js';
import Login from '../routes/Login.js';
import FeedTest from 'routes/FeedTest.js';

function AppRouter(){
	let state = useSelector((state) => state)
	return(
		<Routes>
			{/* 메인페이지 */}
			<Route path="/" element={ <Home /> }></Route>

			{/* 회원가입페이지 */}
			<Route path="/join" element={ <Join /> } />

			{/* 마이페이지 */}
			{ state.isLoggedIn === true ? 
				<Route path="/mypage" element={ <MyPage /> } />
				:
				<Route path="/join" element={ <Join /> } />
			}

			{/* 로그인페이지 */}
			<Route path="/login" element={ <Login /> } /> 

			{/* 피드페이지 */}
			<Route path="/feed" element={ <Feed /> } /> 

			{/* 피드 파일입출력 테스트페이지 */}
			<Route path="/feedtest" element={ <FeedTest /> } /> 
			
		</Routes>
	)
}

export default AppRouter