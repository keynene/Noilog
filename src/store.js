import {configureStore, createSlice} from '@reduxjs/toolkit';

const isLoggedIn = createSlice({
	name : 'isLoggedIn',
	initialState : false,

	reducers : {
		LoggedIn(state){
			localStorage.setItem('login',true)
			return state = true
		},
		LoggedOut(state){
			localStorage.setItem('login',false)
			return state = false
		}
	}
})


export let { LoggedIn, LoggedOut } = isLoggedIn.actions 

export default configureStore({
	reducer: {
		isLoggedIn : isLoggedIn.reducer
	}
})