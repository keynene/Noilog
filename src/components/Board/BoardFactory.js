import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setNewToken } from 'store';

function BoardFactory({isTokenDead, setMainPageLoading}){
	let state = useSelector((state) => state)
	let POST_URL = useSelector((state) => state.POST_URL)

	let navigate = useNavigate();
  let dispatch = useDispatch();
	
	let [boardTitle, setBoardTitle] = useState('');
	let [boardContent, setBoardContent] = useState('');
  let data = {
    title : '',
    content : ''
  }

  let getConfig = () => {
    let config = {
      headers : {
        "accesstoken" : localStorage.getItem("accessToken"),
        "refreshtoken" : localStorage.getItem("refreshToken"),
      },
    }
    return config
  }

  /** 게시글 작성 요청 (axios) */
  const postRequest = (data, config) => {
    axios
      .post(`${POST_URL}`, data, config)
      .then(async(response) => {
        alert('😎게시글 등록이 완료되었습니다😎')
        setMainPageLoading(false)
        dispatch(setNewToken(response.headers.newtoken))
        await navigate("/")
      })
      .catch(err => {
        console.log(err)
        setMainPageLoading(false)
        isTokenDead(err.response.data.message)
        dispatch(setNewToken(err.response.headers.newtoken))
      })
  }
	
	const onTitleChange = (e) => {
		const {
			target: { value },
		} = e;
		setBoardTitle(value);
	}

	const onContentsChange = (e) => {
		setBoardContent(e)
	}

	const onSubmit = (e) => {
		e.preventDefault();

		if (boardTitle === ''){
			return alert('제목을 입력해주세요')
		}             

		if (boardContent === ''){
			return alert('글 내용을 입력해주세요')
		}

		if (state.isLoggedIn.value === false){
			if (window.confirm('로그인 후 이용해주세요! 로그인 화면으로 이동할까요?')){
				navigate("/login")
			}
		}

    data.title = boardTitle
    data.content = boardContent

    setMainPageLoading(true)
    postRequest(data, getConfig())

		setBoardTitle("");
		setBoardContent("");
	}

	const modules = {
    toolbar: {
			container: [
				[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
				[{ 'font': [] }],
				[{ 'align': [] }],
				['bold', 'italic', 'underline', 'strike', 'blockquote'],
				[{ 'list': 'ordered' }, { 'list': 'bullet' }, 'link'],
				[{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }, { 'background': [] }],
				['image', 'video'],
				['clean']  
			],
    }
	}

	return (
		<form onSubmit={onSubmit} style={{ maxWidth:800, marginLeft:'auto', marginRight:'auto', marginTop:30}}>
			<p><input 
				className='board_title' 
				type="text" 
				placeholder='글 제목을 작성해주세요' 
				color="gray" 
				value={boardTitle}
				onChange={onTitleChange}
			/></p>
			<ReactQuill 
				onChange={onContentsChange} 
				modules={modules}
				value={boardContent}
				style={{height:500, paddingBottom:50}}
			/>

			<div >
				<Button 
					variant="light" 
					onClick={()=>{
						if (window.confirm('글 작성을 취소하시겠습니까?')){
							navigate("/")
						}
					}} 
					style={{border:'1px solid rgb(200,200,200)', marginRight:5}}
				> 목록</Button>
				<Button variant="dark" type="submit" >글쓰기</Button>
			</div>
		</form>
	)
}

export default BoardFactory