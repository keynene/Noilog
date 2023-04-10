import React, { useEffect, useState } from 'react';

import { Button, Table } from 'react-bootstrap';

import { useSelector } from 'react-redux';

/* Components */
import BoardWriteButton from 'components/BoardWriteButton';
import BoardRow from 'components/BoardRow';
import data from 'components/test.js'

// currentPage: 현재 페이지
// totalCount: 총 데이터의 갯수
// pageCount: 화면에 나타날 페이지 갯수
// limit: 한 페이지 당 나타낼 데이터의 갯수

function Home(){
	let state = useSelector((state) => state)

	let [boards, setBoards] = useState([]);



	////////////////////////////////////////////////////////////////////////////////////
	let [tBoards, setTBoards] = useState(data);

	const [page, setPage] = useState(1); //페이지
	const [totalPosts, setTotalPosts] = useState(tBoards.length); //게시글 갯수
	const limit = 10; //posts가 보일 최대한의 갯수
	const offset = (page-1)*limit //시작점과 끝점 구하기
	const numPages = Math.ceil(totalPosts/limit)

	const postsData = (posts) => {
		if(posts){
			let result = posts.slice(offset, offset+limit);
			return result;
		}
	}

	////////////////////////////////////////////////////////////////////////////////////

	useEffect(()=>{
		setBoards([...state.boardObj].reverse())
	},[state.boardObj])

	return (
		// 원본
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
		// 			{ boards.map((a,i) => 
		// 				boards[i].content !== "" ?
		// 					<BoardRow boards={boards} key={i} i={i} />
		// 				: null
		// 			)}
		// 		</tbody>
		// 	</Table>
		// </div>




		/////////////////////////////////////////////////////////////////////////사본
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
					{ tBoards.map((a,i) => 
						<tr key={i} style={{fontSize:15}}>
							<td>{tBoards[i].postNumber}</td>
							<td>{tBoards[i].title}</td>
							<td>{tBoards[i].writer.nickname}</td>
							<td>{tBoards[i].createdDate.substring(0,10)}</td>
							<td>{tBoards[i].viewCount}</td>
							<td>{tBoards[i].likeCount}</td>
						</tr>
					)}
				</tbody>
			</Table>
			<div>
				{Array(numPages).map((pa,pi) => 
					<Button 
						variant="light"
						key={pi+1}
						onClick={()=>{setPage(pi+1)}}
					>{pi+1}</Button>
				)}
			</div>
		</div>
		/////////////////////////////////////////////////////////////////////////사본
	)
}

export default Home;