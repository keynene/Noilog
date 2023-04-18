import React, { useEffect, useState } from 'react';

import { Table } from 'react-bootstrap';

import { useSelector } from 'react-redux';

/* Components */
import BoardWriteButton from 'components/BoardWriteButton';
import BoardRow from 'components/BoardRow';
import data from 'components/test.js'
import Pagination from 'components/Pagination.js'

function Home(){
	let state = useSelector((state) => state)

	let [boards, setBoards] = useState([]);
	
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 10;

	const indexOfLast = currentPage * postsPerPage;
	const indexOfFirst = indexOfLast - postsPerPage;
	const currentPosts = (posts) => {
		let currentPosts = 0;
		currentPosts = posts.slice(indexOfFirst, indexOfLast);
		return currentPosts;
	}

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
				{boards.length === 0 ? (
					<tbody>
						<tr>
							<td colSpan="6" style={{border:"none", paddingTop:20, color:"gray"}}>아직 게시글이 없습니다!</td> 
						</tr>
					</tbody>
				) : (
					<tbody>
						{loading && <div> loading... </div>}
						{boards.map((a,i) => 
							boards[i].content !== "" &&
							<BoardRow boards={currentPosts(boards)} key={i} i={i} />
						)}
					</tbody>
				)}
			</Table>
			{boards.length !== 0 &&
				<Pagination
					postsPerPage={postsPerPage}
					totalPosts={boards.length}
					paginate={setCurrentPage}
				/>
			}
		</div>
	)
}

export default Home;