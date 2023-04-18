import React, { useEffect, useState } from 'react';

import { Table } from 'react-bootstrap';
import ReactDOM from "react-dom";

import { useSelector } from 'react-redux';

/* Components */
import BoardWriteButton from 'components/BoardWriteButton';
import BoardRow from 'components/BoardRow';
import data from 'components/test.js'
import Pagination from 'components/Pagination.js'

// currentPage: 현재 페이지
// totalCount: 총 데이터의 갯수
// pageCount: 화면에 나타날 페이지 갯수
// limit: 한 페이지 당 나타낼 데이터의 갯수
function Home(){
	let state = useSelector((state) => state)

	let [boards, setBoards] = useState([]);
	
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostPerPage] = useState(10);

	const indexOfLast = currentPage * postsPerPage;
	const indexOfFirst = indexOfLast - postsPerPage;
	const currentPosts = (posts) => {
		let currentPosts = 0;
		currentPosts = posts.slice(indexOfFirst, indexOfLast);
		return currentPosts;
	}
	////////////////////////////////////////////////////////////////////////////////////
	// let [tBoards, setTBoards] = useState(data);
	////////////////////////////////////////////////////////////////////////////////////

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
							<td colSpan="6" style={{border:"none", paddingTop:20}}>아직 게시글이 없습니다!</td> 
						</tr>
					</tbody>
				) : (
					<tbody>
						{loading && <div> loading... </div>}
						{	boards.map((a,i) => 
								boards[i].content !== ""   &&
									<BoardRow boards={currentPosts(boards)} key={i} i={i} />
							)
						}
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
		/////////////////////////////////////////////////////////////////////////사본
		// <div style={{maxWidth:800, marginLeft:'auto', marginRight:'auto'}}>
		// 	<h4 style={{marginTop:30}} >Board</h4>	
		// 	<div style={{textAlign:'right'}}>
		// 		<BoardWriteButton />
		// 	</div>
		// 	<Table style={{marginTop:30, width:800}}>
		// 		<thead>
		// 			<tr style={{width:800}}>
		// 				<th style={{width:80}}>번호</th>
		// 				<th style={{width:400}}>제목</th>
		// 				<th style={{width:100}}>작성자</th>
		// 				<th style={{width:100}}>작성일시</th>
		// 				<th style={{width:60}}>조회수</th>
		// 				<th style={{width:60}}>추천</th>
		// 			</tr>
		// 		</thead>
		// 		<tbody>
		// 			<Boards tBoards={currentPosts(tBoards)} loading={loading} />
		// 			{/* { tBoards.map((a,i) => 
		// 				<tr key={i} style={{fontSize:15}}>
		// 					<td>{tBoards[i].postNumber}</td>
		// 					<td>{tBoards[i].title}</td>
		// 					<td>{tBoards[i].writer.nickname}</td>
		// 					<td>{tBoards[i].createdDate.substring(0,10)}</td>
		// 					<td>{tBoards[i].viewCount}</td>
		// 					<td>{tBoards[i].likeCount}</td>
		// 				</tr>
		// 			)} */}
		// 		</tbody>
		// 	</Table>
		// 	<Pagination
		// 		postsPerPage={postsPerPage}
		// 		totalPosts={tBoards.length}
		// 		paginate={setCurrentPage}
		// 	></Pagination>
		// </div>
		/////////////////////////////////////////////////////////////////////////사본
	)
}

// function Boards({ tBoards, loading }){
// 	return (
// 		<>
// 			{loading && <div> loading... </div>}
// 			<>
// 			{ tBoards.map((a,i) => 
// 				<tr key={i} style={{fontSize:15}}>
// 					<td>{tBoards[i].postNumber}</td>
// 					<td>{tBoards[i].title}</td>
// 					<td>{tBoards[i].writer.nickname}</td>
// 					<td>{tBoards[i].createdDate.substring(0,10)}</td>
// 					<td>{tBoards[i].viewCount}</td>
// 					<td>{tBoards[i].likeCount}</td>
// 				</tr>
// 			)}
// 			</>
// 		</>
// 	)
// }



export default Home;