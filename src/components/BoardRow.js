import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setOpenBoard, increaseBoardViewCount } from 'store';

function BoardRow({ boards, i }){
	let navigate = useNavigate();
	let dispatch = useDispatch();
	let state = useSelector((state) => state)

	const dataObj = () => {
		let data = {
			id : state.userInfo.id,
			boardNumber : boards[i].boardNumber
		}
		return data
	}

	return (
		<>
		{boards.map((a,i) => boards[i].content !== "" && (
		<tr key={i} style={{fontSize:13, width:800}} className="board_tr">
			<td style={{width:80}}>{boards[i].boardNumber}</td>
			<td style={{width:400, textAlign:'left', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', display:'block'}}>
				<span 
					style={{textDecoration:'none', color:'black', cursor:'pointer', marginRight:5}} 
					onClick={()=>{
						navigate("/boarddetail")
						dispatch(setOpenBoard(boards[i].boardNumber))
						dispatch(increaseBoardViewCount(dataObj())) //수정
					}}
				>{boards[i].title}
				</span>
				<span style={{color:'red', fontWeight:'bold'}}>[{boards[i].commentCount}]</span>
			</td>
			<td style={{width:100}}>{boards[i].creatorNickname}</td>
			<td style={{width:100}}>{boards[i].createDate.setDateMDHM}</td>
			<td style={{width:60}}>{boards[i].viewCount.length}</td>
			<td style={{width:60}}>{boards[i].likeCount.length}</td>
		</tr>
		))}
		</>
	)
}

export default BoardRow