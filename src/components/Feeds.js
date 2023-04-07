import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

/* Redux state */
import { useDispatch, useSelector } from "react-redux";
import { onLikeCountChange } from 'store.js';

import sampleImgUrl from '../img/sample.jpg'

// import { FaRegEye } from "react-icons/fa";
import { FcLikePlaceholder } from "react-icons/fc";
import { BiCommentDetail } from "react-icons/bi";


/* Components */
import CommentFactory from './CommentFactory';
import FeedEditForm from './FeedEditForm';
import Comments from './Comments';
import FeedEditDeleteConfirm from './FeedEditDeleteConfirm';

function Feeds({a, i, feeds, comments, isFeedOwner}){
	let dispatch = useDispatch();
	let state = useSelector((state) => state)

	const likeDataObj = (postNumber) => {
		let likeData = {
			id : state.userInfo.id,
			postNumber
		}
		return likeData
	}

	const EditingAndTruePostNumber = (postNumber) => {
		if (state.isFeedEditing.editState){
			if (state.isFeedEditing.postNumber === postNumber){
				return true
			}
		}
		return false
	}
	
	return (
		<Container style={{marginTop:50, maxWidth:700}}>
		{ feeds[i].title !== "" ? ( 
				<div>
					<Row>
						<Col style={{textAlign:'left', marginBottom:20}} >postNumber={feeds[i].postNumber}</Col>
					</Row>
					<Row>
						<Col sm={2}><img src={sampleImgUrl} alt="sampleImg" style={{width:50, height:50, borderRadius:50}} /></Col>
						<Col sm={2} style={{color:'gray', textAlign:'left'}} >{feeds[i].creatorNickname}</Col>
						<Col sm={8} style={{textAlign:'right', color:'gray', whiteSpace:'pre'}}>{feeds[i].createDate}</Col>
					</Row>
					{
						//수정버튼 눌렀고, i값과 postNumber가 일치하는 게시글만 수정폼 적용
						EditingAndTruePostNumber(feeds[i].postNumber) ? (
							<FeedEditForm postNumber={feeds[i].postNumber} feeds={feeds[i]} />
						) : (
							//수정상태 아니거나, 수정상태이지만 postNumber가 다른경우 게시글 그대로 출력
							<>
								<Row>
									<Col style={{paddingTop:30, paddingBottom:15, textAlign:'left', fontWeight:'bold'}}>{feeds[i].title}</Col>
								</Row>
								<Row>
									<Col style={{paddingTop:15, paddingBottom:30, textAlign:'left'}}>{feeds[i].content}</Col>
								</Row>
							</>
						)
					}
						
					<Row style={{fontSize:20}}>
						<Col style={{textAlign:'left'}}>
							<span onClick={()=>{
								dispatch(onLikeCountChange(likeDataObj(feeds[i].postNumber)))
							}} ><FcLikePlaceholder /> {feeds[i].likeCount.length}</span>
							<span><BiCommentDetail style={{marginLeft:30}}/> {feeds[i].commentCount}</span>
						</Col>

						{isFeedOwner ? ( //피드 작성자만 수정/삭제 버튼 보임
							<FeedEditDeleteConfirm i={i} feeds={feeds} />
						) : null
					}
					</Row>
					
					{ feeds[i].commentCount ? 
						<Row style={{marginTop:30}}>
							<Col style={{backgroundColor:'#F0F0F0', borderRadius:15}}>
								{comments.map((ca,ci)=>
									//댓글출력
									<Comments feeds={feeds} i={i} comments={comments} ci={ci} key={ci} isCommentOwner={state.userInfo.id === comments[ci].writer} />
								)}
							</Col>
						</Row> : null
					}

					{/* 댓글 달기 컴포넌트 */}
					<CommentFactory feeds={feeds} i={i} />

					<Row style={{marginTop:30, marginLeft:0, marginRight:0, marginBottom:0, width:'100%'}}><hr style={{border:'dashed 1px gray'}} /> </Row>
				</div>
			) : null
		}
		</Container>
	)
}

export default Feeds;