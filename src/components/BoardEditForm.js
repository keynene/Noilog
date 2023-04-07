import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import ReactQuill from 'react-quill';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editBoardObj, boardEditingOff } from 'store';

function BoardEditForm({ boards }){
	let [editTitle, setEditTitle] = useState(boards.title);
  let [editContent, setEditContent] = useState(boards.content);

	let dispatch = useDispatch();
	let navigate = useNavigate();

	const onTitleChange = (e) => {
		const {
			target: { value },
		} = e;
		setEditTitle(value);
	}

  const onContentChange = (e) => {
		setEditContent(e);
	}

  const onSubmit = (e) => {
    e.preventDefault();
  }

  const onEditButtonClick = (i) => {
    if (editTitle === ""){
      return alert('')
    }
    if (editContent === ""){
			return alert('수정할 피드 내용을 입력해주세요')
		}

    let editData = {
			boardNumber : i,
			editTitle,
			editContent
		}
		dispatch(editBoardObj(editData))

		dispatch(boardEditingOff())

		alert('수정이 완료되었습니다!')
		setEditTitle('')
		setEditContent('')

    navigate("/boarddetail")
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

	return(
		<form onSubmit={onSubmit}>
			<p><input 
				className='board_title' 
				type="text" 
				placeholder='게시글 제목을 수정해주세용' 
				color="gray" 
				value={editTitle}
				onChange={onTitleChange}
				/></p>
			<ReactQuill 
				onChange={onContentChange} 
				placeholder='게시글 내용을 수정해주세용' 
				modules={modules}
				value={editContent}
				style={{height:500, paddingBottom:80}}
			/>
			<Button variant="light" type="submit" onClick={()=>{dispatch(boardEditingOff())}} style={{marginRight:10, border:'1px solid rgb(200,200,200)'}}>취소하기</Button>
			<Button variant="dark" type="submit" onClick={()=>{onEditButtonClick(boards.boardNumber)}}>수정하기</Button>
		</form>
	)
}

export default BoardEditForm