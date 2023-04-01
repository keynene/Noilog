import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { useSelector } from 'react-redux';

function BoardDetail(){
	let state = useSelector((state) => state)
	let [openBoard, setOpenBoard] = useState({});

	useEffect(()=>{
		setOpenBoard(state.boardObj[state.nowOpenBoard.num])
	}
	,[state.nowOpenBoard.num, state.boardObj])

	return (
		<Container>
      <Row>
        <Col>{openBoard.boardNumber}</Col>
      </Row>
      <Row>
        <Col>{openBoard.title}</Col>
      </Row>
      <Row>
        <Col>{openBoard.content}</Col>
      </Row>
      <Row>
        <Col>{openBoard.writer}</Col>
      </Row>
      <Row>
        <Col>{openBoard.viewCount}</Col>
      </Row>
      <Row>
        <Col>{openBoard.likeCount}</Col>
      </Row>
      <Row>
        <Col>{openBoard.commentCount}</Col>
      </Row>
      <Row>
        <Col>{openBoard.createDate}</Col>
      </Row>
      <Row>
        <Col>{openBoard.creatorNickname}</Col>
      </Row>
    </Container>
	)
}

export default BoardDetail