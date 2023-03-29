import React from 'react';

import { Row, Col } from 'react-bootstrap';

/* Icons */
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

/* Redux State */
import { useDispatch } from 'react-redux';
import { commentEditingOn, deleteCommentObj, decreaseCommentCount } from 'store';

function CommentEditDeleteConfirm({ comments, ci }){
	let dispatch = useDispatch();

	return (
		<Row style={{textAlign:'right', fontSize:18}}>
			<Col style={{textAlign:'right'}}>
				<span onClick={()=>{
					if (window.confirm('댓글을 수정하시겠습니까?')) {
						dispatch(commentEditingOn(ci))
					}
				}}><GrEdit /></span>
				<span onClick={()=>{
					if (window.confirm('댓글을 삭제하시겠습니까?')){
						dispatch(deleteCommentObj(ci))
						dispatch(decreaseCommentCount(comments[ci].postNumber))
					}
				}} style={{marginLeft:10, color:'black'}}><RiDeleteBin6Line/></span>
			</Col>
		</Row>
	)
}

export default CommentEditDeleteConfirm;