import React from 'react';
import { Col } from 'react-bootstrap';

import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useDispatch } from 'react-redux';
import { feedEditingOn, deleteFeedObj } from 'store';

function FeedEditDeleteConfirm({ i, feeds }){
	let dispatch = useDispatch();

	return (
		<Col style={{textAlign:'right'}}>
			<span onClick={()=>{ 
				if (window.confirm('피드를 수정하시겠습니까?')){
					dispatch(feedEditingOn(i)) 
			}
		}} ><GrEdit/></span>
		<span 
			onClick={()=>{
				if (window.confirm('정말 피드를 삭제하시겠습니까?')){
					dispatch(deleteFeedObj(feeds[i].postNumber))
				}
			}} 
			style={{marginLeft:15, color:'black'}}>
			<RiDeleteBin6Line/>
		</span>
	</Col>
	)
}

export default FeedEditDeleteConfirm