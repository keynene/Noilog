import React from 'react';

import { Row, Col } from 'react-bootstrap';

function BoardComments({ boardComments, boards, ci }){
	return (
		<>
		{ boardComments[ci].content !== "" ? (  //내용이 있을때만
			boards.boardNumber === boardComments[ci].boardNumber ? ( //게시글과 boardNumber 일치할때만
				<>
					<Row style={{textAlign:'left', marginTop:10,marginBottom:10}}>
						<Col>
							<span style={{marginRight:10, fontWeight:'bold', fontSize:17}}>{boardComments[ci].creatorNickname}</span>
							<span style={{color:'gray', fontSize:13.5}}>({boardComments[ci].createDate})</span>
						</Col>
					</Row>
					<Row style={{textAlign:'left', paddingBottom:20, borderBottom:'1px solid #ccc'}}>
						<Col>{boardComments[ci].content}</Col>
					</Row>
				</>
			) : null //조건 2 : 댓글  boardNumber와 게시글 boardNumber이 같을때만 출력
			) : null //조건 1 : 댓글 내용이 있을때만 출력
		}
		</>
	)
}

export default BoardComments