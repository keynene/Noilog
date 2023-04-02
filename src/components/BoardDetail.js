import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

// import { FaRegEye } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { BiCommentDetail } from "react-icons/bi";

import { Navigate, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

function BoardDetail({ boards }){
  let navigate = useNavigate();

	return (
		<Container style={{width:800, marginTop:10}}>
      {console.log(boards.likeCount)}
      <Row style={{textAlign:'left'}}>
        <Col><Button variant="light" onClick={()=>{navigate("/")}}>목록</Button></Col>
      </Row>
      <Row style={{height:50, alignItems:'center', marginTop:10, backgroundColor:'rgb(250, 250, 250)', borderBottom:'1px solid #ccc'}}>
        <Col style={{textAlign:'left', marginLeft:30}}>{boards.creatorNickname}</Col>
        <Col style={{color:'gray'}}>{boards.createDate}</Col>
        <Col style={{textAlign:'right', marginRight:30}}>{boards.boardNumber}</Col>
      </Row>
      <Row style={{textAlign:'right', alignItems:'center', height:40}}>
        <Col></Col>
        <Col sm={6}>
          <span style={{marginRight:30}}>조회 : {boards.viewCount}</span>
          <span>추천 : {boards.likeCount.length}</span>
        </Col>
      </Row>
      <Row style={{marginTop:40, marginBottom:60}}>
        <Col><h4>{boards.title}</h4></Col>
      </Row>
      <Row>
        <Col style={{textAlign:'left', paddingBottom:80}} >
          <div dangerouslySetInnerHTML={{ __html :  boards.content  }} />
        </Col>
      </Row>
      <Row>
        <Col style={{alignItems:'baseline'}}>
          <span style={{fontSize:25}}>
            <FcLikePlaceholder style={{fontSize:30}} />
            {boards.likeCount.length}
          </span>
        </Col>
      </Row>
    </Container>
	)
}

export default BoardDetail