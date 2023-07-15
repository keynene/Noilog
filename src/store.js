import {configureStore, createSlice} from '@reduxjs/toolkit';

const SURVER_URL = createSlice({
  name : 'SERVER_URL',
  initialState : 'http://3.36.85.194:42988'
})
const API_URL = createSlice({
  name : 'API_URL',
  initialState : 'http://3.36.85.194:42988/api/v1'
})
const PAGE_URL = createSlice({
  name : 'PAGE_URL',
  initialState : 'http://3.36.85.194:42988/api/v1/posts/search?page='
})
const POST_URL = createSlice({
  name : 'POST_URL',
  initialState : 'http://3.36.85.194:42988/api/v1/posts'
})
const MEMBER_URL = createSlice({
  name : 'MEMBER_URL',
  initialState : 'http://3.36.85.194:42988/api/v1/members'
})
const COMMENTS_URL = createSlice({
  name : 'COMMENTS_URL',
  initialState : 'http://3.36.85.194:42988/api/v1/comments'
})

const isLoggedIn = createSlice({
  name: 'isLoggedIn',
  initialState: {
    value : 
      localStorage.length > 0 ? 
        localStorage.getItem("accessToken") !== null && localStorage.getItem("refreshToken") !== null ?
          true : false //localStorage의 accessToken, refreshToken 둘 다 null이 아닐 때
        : false, //localStorage 길이가 0일때 (access, refresh 둘 다 없을 때)
    }
  ,

  reducers : {
    LoggedIn(state){
      state.value = true
    },
    LoggedOut(state){
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      state.value = false
    },
    setNewToken(state, action){
      if (state.value && action.payload !== ''){
        localStorage.setItem("accessToken", action.payload)
      }
    },
  }
})

const currentPage = createSlice({
  name : 'currentPage',
  initialState : {
    page : 1
  },

  reducers : {
    onChangedPage(state, action){
      state.page = action.payload
    },
  }
})

const postViewPoint = createSlice({
  name : 'postViewPoint',
  initialState : {value : ''},

  reducers : {
    setViewPointPrev(state){
      state.value = 'prev'
    },
    setViewPointNext(state){
      state.value = 'next'
    },
    setViewPointNull(state){
      state.value = ''
    },
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

const isBoardEditing = createSlice({
	name : 'isBoardEditing',
	initialState : {
		postNumber : null,
		editState : false
	},

	reducers : {
		boardEditingOn(state,action){
      if (window.confirm('게시글을 수정하시겠습니까?')){
        state.postNumber = action.payload
        state.editState = true
      }
		},
		
		boardEditingOff(state){
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

//댓글작성 시 댓글불러오기 axios 버튼역할
const isCommentPosted = createSlice({
  name : 'isCommentPosted',
  initialState : {value : false},

  reducers : {
    setCommentPostedTrue(state){
      state.value = true
    },
    setCommentPostedFalse(state){
      state.value = false
    },
  }
})

const isBoardCommentEditing = createSlice({
	name : 'isBoardCommentEditing',
	initialState : {
		commentNumber : null,
		editState : false
	},

	reducers : {
		boardCommentEditingOn(state,action){
			state.commentNumber = action.payload
			state.editState = true
		},
		
		boardCommentEditingOff(state){
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
		increasePostNumber(state){
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
		increaseCommentNumber(state){
			state.num = state.num+1
		}
	}
})

const boardCommentNumber = createSlice({
	name : 'boardCommentNumber',
	initialState : {
		num : 0
	},
	reducers : {
		increaseBoardCommentNumber(state){
			state.num = state.num+1
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
			let index = state.findIndex((x)=> x.postNumber === action.payload )
			state[index].commentCount --;
		},

		deleteFeedObj(state,action){
			let index = state.findIndex((x)=> x.postNumber === action.payload )
			state[index].title = ""
			state[index].content =""
		},

		editFeedObj(state,action){
			let index = state.findIndex((x)=> x.postNumber === action.payload.postNumber )
			state[index].title = action.payload.editTitle
			state[index].content = action.payload.editContent
		},
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
			console.log(index)
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

const boardCommentObj = createSlice({
	name : 'boardCommentObj',
	initialState: [],

	reducers : {
		createBoardCommentObj(state,action){
			let copy = {...action.payload}
			state.push(copy)
		},
		
		deleteBoardCommentObj(state,action){
			let index = state.findIndex((x)=> x.commentNumber === action.payload )
			state[index].content = ""
		},
		
		editBoardCommentObj(state,action){
			let copy = [...state]
			let index = state.findIndex((x)=> x.commentNumber === action.payload.commentNumber )
			copy[index].content = action.payload.editComment
			state = [...copy]
		}
	}
})

export let { LoggedIn, LoggedOut, setNewToken, } = isLoggedIn.actions 

export let { createFeedObj, increaseViewCount, onLikeCountChange, increaseCommentCount, decreaseCommentCount, deleteFeedObj, editFeedObj } = feedObj.actions 
export let { increasePostNumber } = postNumber.actions 
export let { feedEditingOn, feedEditingOff } = isFeedEditing.actions 
export let { createCommentObj, editCommentObj, deleteCommentObj } = commentObj.actions 
export let { increaseCommentNumber } = commentNumber.actions 
export let { commentEditingOn, commentEditingOff } = isCommentEditing.actions 

export let { onChangedPage } = currentPage.actions 
export let { setViewPointNext, setViewPointPrev, setViewPointNull } = postViewPoint.actions 
export let { boardEditingOn, boardEditingOff } = isBoardEditing.actions 
export let { setCommentPostedTrue, setCommentPostedFalse } = isCommentPosted.actions 
export let { increaseBoardCommentNumber } = boardCommentNumber.actions 
export let { createBoardCommentObj, deleteBoardCommentObj, editBoardCommentObj } = boardCommentObj.actions 
export let { boardCommentEditingOn, boardCommentEditingOff } = isBoardCommentEditing.actions 

export default configureStore({
	reducer: {
		SURVER_URL : SURVER_URL.reducer,
		API_URL : API_URL.reducer,
		PAGE_URL : PAGE_URL.reducer,
		POST_URL : POST_URL.reducer,
		MEMBER_URL : MEMBER_URL.reducer,
		COMMENTS_URL : COMMENTS_URL.reducer,

		isLoggedIn : isLoggedIn.reducer,

		feedObj : feedObj.reducer,
		postNumber : postNumber.reducer,
		isFeedEditing : isFeedEditing.reducer,
		commentObj : commentObj.reducer,
		commentNumber : commentNumber.reducer,
		isCommentEditing : isCommentEditing.reducer,
		
    currentPage : currentPage.reducer,
    postViewPoint : postViewPoint.reducer,
		isBoardEditing : isBoardEditing.reducer,
		isCommentPosted : isCommentPosted.reducer,
		boardCommentObj : boardCommentObj.reducer,
		boardCommentNumber : boardCommentNumber.reducer,
		isBoardCommentEditing : isBoardCommentEditing.reducer,
	}
})