import {configureStore, createSlice} from '@reduxjs/toolkit';

const isLoggedIn = createSlice({
	name : 'isLoggedIn',
	initialState : false,

	reducers : {
		LoggedIn(state){
			return state = true
		},
		LoggedOut(state){
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