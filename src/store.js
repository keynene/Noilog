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

const isFeedEditing = createSlice({
	name : 'isFeedEditing',
	initialState : {
		postNumber : null,
		editState : false
	},

	reducers : {
		feedEditingOn(state,action){
			state.postNumber = action.payload
			state.editState = true
		},
		
		feedEditingOff(state){
			state.postNumber = null
			state.editState = false
		},
	}
})

const isCommentEditing = createSlice({
	name : 'isCommentEditing',
	initialState : {
		commentNumber : null,
		editState : false
	},

	reducers : {
		commentEditingOn(state,action){
			state.commentNumber = action.payload
			state.editState = true
		},
		
		commentEditingOff(state){
			state.commentNumber = null
			state.editState = false
		},
	}
})

const postNumber = createSlice({
	name : 'postNumber',
	initialState : {
		num : 0
	},
	reducers : {
		addPostNumber(state){
			state.num = state.num+1
		}
	}
})

const commentNumber = createSlice({
	name : 'commentNumber',
	initialState : {
		num : 0
	},
	reducers : {
		addCommentNumber(state){
			state.num = state.num+1
		}
	}
})

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
			state.push(copy)
		},

		increaseViewCount(state,action){
			let index = state.findIndex((x)=> x.postNumber === action.payload )
			state[index].viewCount ++;
		},

		onLikeCountChange(state,action){
			let index = state.findIndex((x)=> x.postNumber === action.payload.postNumber )
			if (state[index].likeCount.includes(action.payload.id) === false){
				state[index].likeCount.push(action.payload.id);
			}
			else {
				let dataIndex = state[index].likeCount.indexOf(action.payload.id)
				state[index].likeCount.splice(dataIndex,1)
			}
		},

		increaseCommentCount(state,action){
			let index = state.findIndex((x)=> x.postNumber === action.payload )
			state[index].commentCount ++;
		},

		decreaseCommentCount(state,action){
			// let copy = [...state].reverse()
			let index = state.findIndex((x)=> x.postNumber === action.payload )
			// copy[index].commentCount --;
			// state = [...copy].reverse()
			state[index].commentCount --;
		},

		deleteFeedObj(state,action){
			let index = state.findIndex((x)=> x.postNumber === action.payload )
			state[index].title = ""
			state[index].content =""
		},

		editFeedObj(state,action){
			//feedObj를 push로 넣고, Feed컴포넌트에서 Feeds컴포넌트로 feeds={[...feeds].reverse()}로 넘겨서
			//역순으로 출력한 상태이므로 (map에서 바로 reverse로 출력해주는 기능이 없기 때문에 reverse배열을 만들어서 그걸 출력해야함)
			//copy에 state의 reverse배열을 대입하고, 거기서 postNumber에 맞는 index를 수정해야함
			//역순으로 출력해서 수정했으니 state에 역순으로(원래대로돌리기) 저장해줘야함
			let copy = [...state].reverse()
			let index = state.findIndex((x)=> x.postNumber === action.payload.postNumber )
			copy[index].title = action.payload.editTitle
			copy[index].content = action.payload.editContent
			state = [...copy].reverse()
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
			let index = state.findIndex((x)=> x.commentNumber === action.payload )
			state[index].content = ""
		},

		editCommentObj(state,action){
			let copy = [...state]
			let index = state.findIndex((x)=> x.commentNumber === action.payload.commentNumber )
			copy[index].content = action.payload.editComment
			state = [...copy]
		}
	}
})

export let { LoggedIn, LoggedOut } = isLoggedIn.actions 
export let { addPostNumber } = postNumber.actions 
export let { addCommentNumber } = commentNumber.actions 
export let { feedEditingOn, feedEditingOff } = isFeedEditing.actions 
export let { commentEditingOn, commentEditingOff } = isCommentEditing.actions 
export let { pushUserInfo, popUserInfo } = userInfo.actions 
export let { createUserObj, logOutUserObj, deleteUserObj } = userObj.actions 
export let { createFeedObj, increaseViewCount, onLikeCountChange, increaseCommentCount, decreaseCommentCount, deleteFeedObj, editFeedObj } = feedObj.actions 
export let { createCommentObj, editCommentObj, deleteCommentObj } = commentObj.actions 

export default configureStore({
	reducer: {
		isLoggedIn : isLoggedIn.reducer,
		userObj : userObj.reducer,
		feedObj : feedObj.reducer,
		userInfo : userInfo.reducer,
		commentObj : commentObj.reducer,
		isFeedEditing : isFeedEditing.reducer,
		isCommentEditing : isCommentEditing.reducer,
		postNumber : postNumber.reducer,
		commentNumber : commentNumber.reducer,
	}
})