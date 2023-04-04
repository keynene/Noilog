import React, { useEffect, useState } from 'react';

import { Table } from 'react-bootstrap';

import { useSelector } from 'react-redux';

/* Components */
import BoardWriteButton from 'components/BoardWriteButton';
import BoardRow from 'components/BoardRow';

function Home(){
	let state = useSelector((state) => state)

	let [boards, setBoards] = useState([]);

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
						<BoardRow boards={boards} key={i} i={i} />
					)}
				</tbody>
			</Table>
		</div>
	)
}

export default Home;