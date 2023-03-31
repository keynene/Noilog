import React, { useEffect, useState } from 'react';

import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

function Home(){
	let navigate = useNavigate();
	let state = useSelector((state) => state)

	let [boards, setBoards] = useState([]);

	useEffect(()=>{
		setBoards(state.boardObj)
	},[state.boardObj])

	return (
		<div style={{maxWidth:800, marginLeft:'auto', marginRight:'auto'}}>
			<h4 style={{marginTop:30}} >Board</h4>	
			<div style={{textAlign:'right'}}>
				<Button variant="dark" onClick={()=>{navigate("/boardFactory")}} >글쓰기</Button>
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
					{
						boards.map((a,i) => 
							<tr key={i} style={{fontSize:13, width:800}} className="board_tr">
								<td style={{width:80}}>{boards[i].boardNumber}</td>
								<td style={{width:400, textAlign:'left', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', display:'block'}}>
									<Link style={{textDecoration:'none', color:'black'}} onClick={()=>{navigate("/")}}>{boards[i].title}</Link></td>
								<td style={{width:100}}>{boards[i].creatorNickname}</td>
								<td style={{width:100}}>{boards[i].createDate}</td>
								<td style={{width:60}}>{boards[i].likeCount.length}</td>
								<td style={{width:60}}>{boards[i].viewCount}</td>
							</tr>
					)}
				</tbody>
			</Table>
		</div>
	)
}

export default Home;