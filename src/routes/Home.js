import React from 'react';

import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home(){
	let navigate = useNavigate();

	return (
		<div style={{maxWidth:800, marginLeft:'auto', marginRight:'auto'}}>
			<h4 style={{marginTop:30}} >Table</h4>	
			<div style={{textAlign:'right'}}>
				<Button variant="dark" onClick={()=>{navigate("/tableFactory")}} >글쓰기</Button>
			</div>
			<Table style={{marginTop:30}}>
				<thead>
					<tr>
						<th>번호</th>
						<th>제목</th>
						<th>작성자</th>
						<th>작성일</th>
						<th>조회수</th>
						<th>추천</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
						<td>1</td>
					</tr>
				</tbody>
			</Table>
		</div>
	)
}

export default Home;