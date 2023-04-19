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

	let [boards, setBoards] = useState(data);
	
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostPerPage] = useState(10);

	const indexOfLast = currentPage * postsPerPage; //현재페이지*10 (현페이지 마지막 인덱스)
	const indexOfFirst = indexOfLast - postsPerPage; //현페이지 마지막 인덱스-10 (현페이지 첫 인덱스)
	const currentPosts = (posts) => { //현재페이지의 포스트 함수
		let currentPosts = 0;
		//전체게시글에서 현페이지 첫인덱스~마지막인덱스 까지만 보여주기 위해 범위 설정
		currentPosts = posts.slice(indexOfFirst, indexOfLast); 
		return currentPosts;
	}

	// useEffect(()=>{
	// 	setBoards([...state.boardObj].reverse())
	// },[state.boardObj])

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
						<BoardRow boards={currentPosts(boards)}/>
					</tbody>
				)}
			</Table>
			{boards.length !== 0 &&
				<div style={{display:"flex", justifyContent:"center"}}>
					{console.log("home =>",currentPage)}
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={boards.length}
						paginate={setCurrentPage}
						currentPage={currentPage}
						style={{textAlign:"center"}}
					/>
				</div>
			}
		</div>
	)
}

export default Home;