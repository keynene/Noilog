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

const isEditing = createSlice({
	name : 'editing',
	initialState : false,

	reducers : {
		editingOn(state){
			return state = true
		},

		editingOff(state){
			return state = false
		},
	}
})

// const userId = createSlice({
// 	name : 'userId',
// 	initialState : {
// 		id : ''
// 	},
// 	// initialState : JSON.parse(localStorage.getItem('login')).loginId,

// 	reducers : {
// 		handleUserId(state,action){
// 			state.id = action.payload
// 		}
// 	}
// })

const userInfo = createSlice({
	name : 'userInfo',
	initialState : [],
	// initialState : JSON.parse(localStorage.getItem(JSON.stringify(JSON.parse(localStorage.getItem('login')).loginId))),

	reducers : {
		pushUserInfo(state,action){
			let copy = {...action.payload}
			state.push(copy)
		},
		popUserInfo(state){
			state.pop()
		},
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
		},

		addCommentCount(state,action){
			let index = state.findIndex((x)=> x.postNumber === action.payload )
			state[index].commentCount ++;
		},

		deleteFeedObj(state,action){
			let index = state.findIndex((x)=> x.postNumber === action.payload )
			state.slice(index,1)
		},

		editFeedObj(state,action){
			let index = state.findIndex((x)=> x.postNumber === action.payload.postNumber )
			state[index].title = action.payload.editTitle
			state[index].content = action.payload.editContent
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

		deleteCommentObj(state,action){
			let i = 0
			let index = []
			for (i=0; i<state.length; i++){
				if(state[i].postNumber === action.payload){
					index.push(i)
				}
			}
			while (index.length !== 0){
				state.slice(index[0],1)
				index.unshift()
			}
		}
	}
})

export let { LoggedIn, LoggedOut } = isLoggedIn.actions 
export let { editingOn, editingOff } = isEditing.actions 
// export let { handleUserId } = userId.actions 
export let { pushUserInfo, popUserInfo } = userInfo.actions 
export let { createUserObj, logOutUserObj, deleteUserObj } = userObj.actions 
export let { createFeedObj, addViewCount, addLikeCount, addCommentCount, deleteFeedObj, editFeedObj } = feedObj.actions 
export let { createCommentObj, deleteCommentObj } = commentObj.actions 

export default configureStore({
	reducer: {
		isLoggedIn : isLoggedIn.reducer,
		userObj : userObj.reducer,
		feedObj : feedObj.reducer,
		// userId : userId.reducer,
		userInfo : userInfo.reducer,
		commentObj : commentObj.reducer,
		isEditing : isEditing.reducer,
	}
})