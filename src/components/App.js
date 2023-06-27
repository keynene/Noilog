/* eslint-disable */ //warning 제거
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '.././App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Components */
import AppRouter from './Router';
import Navigation from './Navigation';

/* Redux, Actions */
import { useDispatch, useSelector } from "react-redux";
import { LoggedIn, setUserInfo } from 'store.js';

function App() {
  let dispatch = useDispatch();
  let state = useSelector((state) => state)
  let [boards, setBoards] = useState([]);
  let [page, setPage] = useState(0);
  

  let data = {
    login : false,
    loginId : ''
  }

  /** 로그인여부 확인 */
  useEffect(()=>{
    if (localStorage.length === 0){
      localStorage.setItem('login',JSON.stringify(data))
    }

    if (JSON.parse(localStorage.getItem('login')).login === true){
      let nowLoggedInId = JSON.parse(localStorage.getItem('login')).loginId
      let nowLoggedInInfo = JSON.parse(localStorage.getItem(JSON.stringify(nowLoggedInId)))
      dispatch(LoggedIn(nowLoggedInId))
      dispatch(setUserInfo(nowLoggedInInfo))
    }
  },[])

  /** 데이터 받아오기 (axios) */
  useEffect(()=>{
    axios.get(`http://3.36.85.194:42988/api/v1/posts/search?page=${page}`)
      .then(response => {
        // console.log(response.data.data.content)
        let copy = [...response.data.data.content]
        setBoards(copy)
      })
      .catch((error)=>{
        console.log("error=> ",error.message);
      })
  },[page])

  return (
    <div className="App">
      <Navigation />
      <AppRouter boards={boards} page={page} />
    </div>
  );
}

export default App;
