import {configureStore, createSlice} from '@reduxjs/toolkit';

const isLoggedIn = createSlice({
	name : 'isLoggedIn',
	initialState : false,

	reducers : {
		LoggedIn(state, action){
			let data = {
				login : true,
				loginId : action.payload
			}
			localStorage.setItem('login',JSON.stringify(data))
			return state = true
		},

		LoggedOut(state, action){
			let data = {
				login : false,
				loginId : action.payload
			}
			localStorage.setItem('login',JSON.stringify(data))
			return state = false
		}
	}
})

const userObj = createSlice({
	name : 'userObj',
	initialState : null,

	reducers : {
		createUserObj(state,action){
			alert(`${action.payload.nickname}님! 회원가입이 완료되었습니다!🎉`)
			localStorage.setItem(JSON.stringify(action.payload.id), JSON.stringify(action.payload))

			return (
				state = {
					id:action.payload.id,
					password:action.payload.password,
					email:action.payload.email,
					name:action.payload.name,
					nickname:action.payload.nickname
				}
			)
		},

		logOutUserObj(state){
			return state = null
		}
	}

})

export let { LoggedIn, LoggedOut } = isLoggedIn.actions 
export let { createUserObj, logOutUserObj, deleteUserObj } = userObj.actions 
export default configureStore({
	reducer: {
		isLoggedIn : isLoggedIn.reducer,
		userObj : userObj.reducer
	}
})