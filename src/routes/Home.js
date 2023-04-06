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
		setBoards([...state.boardObj].reverse())
	},[state.boardObj])

	return (
		<div style={{maxWidth:800, marginLeft:'auto', marginRight:'auto'}}>
			<h4 style={{marginTop:30}} >Board</h4>	
			<div style={{textAlign:'right'}}>
				<BoardWriteButton />
			</div>
			<Table style={{marginTop:30, width:800}}>
				<thead>
					<tr style={{width:800}}>
						<th style={{width:80}}>번호</th>
						<th style={{width:400}}>제목</th>
						<th style={{width:100}}>작성자</th>
						<th style={{width:100}}>작성일시</th>
						<th style={{width:60}}>조회수</th>
						<th style={{width:60}}>추천</th>
					</tr>
				</thead>
				<tbody>
					{ boards.map((a,i) => 
						boards[i].content !== "" ?
							<BoardRow boards={boards} key={i} i={i} />
						: null
					)}
				</tbody>
			</Table>
		</div>
	)
}

export default Home;