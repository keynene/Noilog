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

const userId = createSlice({
	name : 'userId',
	initialState : JSON.parse(localStorage.getItem('login')).loginId,
})

const userInfo = createSlice({
	name : 'userInfo',
	initialState : JSON.parse(localStorage.getItem(JSON.stringify(JSON.parse(localStorage.getItem('login')).loginId)))
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

const feedObj = createSlice({
	name : 'feedObj',
	initialState : [],

	reducers : {
		createFeedObj(state,action){
			let copy = {...action.payload}
			state.unshift(copy)
		},

		addViewCount(state,action){
			let index = state.findIndex((x)=> x.postNumber === action.payload )
			state[index].viewCount ++;
		},

		addLikeCount(state,action){
			let index = state.findIndex((x)=> x.postNumber === action.payload )
			state[index].likeCount ++;
		}
	}
})

const commentObj = createSlice({
	name : 'commentObj',
	initialState: [],

	reducers : {
		createCommentObj(state,action){
			let copy = {...action.payload}
			state.push(copy)
		},

		// findCommentObjIndex(state,action){
		// 	let i = 0
		// 	let index = []

		// 	for(i=0; i<state.length; i++){
		// 		if (state[i].postNumber === action.payload.postNumber){
		// 			index.push(i)
		// 			break;
		// 		}
		// 	}
		// 	if (index === 0){ return null } 
		// 	else { return index}
		// }
	}
})

export let { LoggedIn, LoggedOut } = isLoggedIn.actions 
export let { createUserObj, logOutUserObj, deleteUserObj } = userObj.actions 
export let { createFeedObj, addViewCount, addLikeCount } = feedObj.actions 
export let { createCommentObj } = commentObj.actions 

export default configureStore({
	reducer: {
		isLoggedIn : isLoggedIn.reducer,
		userObj : userObj.reducer,
		feedObj : feedObj.reducer,
		userId : userId.reducer,
		userInfo : userInfo.reducer,
		commentObj : commentObj.reducer,
	}
})