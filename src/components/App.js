/* eslint-disable */ //warning 제거
import React, { useEffect } from 'react';
import '.././App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Components */
import AppRouter from './Router';
import Navigation from './Navigation';

/* Redux, Actions */
import { useDispatch, useSelector } from "react-redux";
import { LoggedIn, pushUserInfo } from 'store.js';

function App() {
  let dispatch = useDispatch();
  let state = useSelector((state) => state)

  let data = {
    login : false,
    loginId : ''
  }

  useEffect(()=>{
    if (localStorage.length === 0){
      localStorage.setItem('login',JSON.stringify(data))
    }

    if (JSON.parse(localStorage.getItem('login')).login === true){
      let nowLoggedInId = JSON.parse(localStorage.getItem('login')).loginId
      let nowLoggedInInfo = JSON.parse(localStorage.getItem(JSON.stringify(nowLoggedInId)))
      dispatch(LoggedIn(nowLoggedInId))
      dispatch(pushUserInfo(nowLoggedInInfo))
    }
  },[])

  return (
    <div className="App">
      <Navigation />
      <AppRouter />
    </div>
  );
}

export default App;
