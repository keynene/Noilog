/* eslint-disable */ //warning 제거
import React, { useEffect, useState } from 'react';
import '.././App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* Components */
import AppRouter from './Router';
import Navigation from './Navigation';

/* Redux, Actions */
import { useDispatch, useSelector } from "react-redux";
import {LoggedIn } from 'store.js';

function App() {
  let dispatch = useDispatch();

  useEffect(()=>{
    if (JSON.parse(localStorage.getItem('login')).login === true){
      let userId = JSON.parse(localStorage.getItem('login')).loginId
      dispatch(LoggedIn(userId))
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
