import React, { useEffect, useState } from 'react';

import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setOpenBoard } from 'store';
import { increaseBoardViewCount } from 'store';

import BoardWriteButton from 'components/BoardWriteButton';


function Home(){
	let navigate = useNavigate();
	let dispatch = useDispatch();
	let state = useSelector((state) => state)

	let [boards, setBoards] = useState([]);

	const dataObj = () => {
		let data = {
			id : state.userInfo[0].id,
			boardNumber : state.nowOpenBoard.num
		}
		return data
	}

	useEffect(()=>{
		setBoards(state.boardObj)
	},[state.boardObj])

	return (
		<div style={{maxWidth:800, marginLeft:'auto', marginRight:'auto'}}>
			<h4 style={{marginTop:30}} >Board</h4>	
			<div style={{textAlign:'right'}}>
				<BoardWriteButton />
			</div>
			<Table style={{marginTop:30, width:800}}>
				<thead>
					<tr>
						<th>번호</th>
						<th>제목</th>
						<th>작성자</th>
						<th>작성일시</th>
						<th>조회수</th>
						<th>추천</th>
					</tr>
				</thead>
				<tbody>
					{ boards.map((a,i) => 
						<tr key={i} style={{fontSize:13, width:800}} className="board_tr">
							<td style={{width:80}}>{boards[i].boardNumber}</td>
							<td style={{width:400, textAlign:'left', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', display:'block'}}>
								<span 
									style={{textDecoration:'none', color:'black', cursor:'pointer', marginRight:5}} 
									onClick={()=>{
										navigate("/boarddetail")
										dispatch(setOpenBoard(i))
										dispatch(increaseBoardViewCount(dataObj()))
									}}
								>{boards[i].title}
								</span>
								<span style={{color:'red', fontWeight:'bold'}}>[{boards[i].commentCount}]</span>
							</td>
							<td style={{width:100}}>{boards[i].creatorNickname}</td>
							<td style={{width:100}}>{boards[i].createDate}</td>
							<td style={{width:60}}>{boards[i].viewCount.length}</td>
							<td style={{width:60}}>{boards[i].likeCount.length}</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	)
}

export default Home;