import { Row, Col } from 'react-bootstrap';

import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useDispatch, useSelector } from 'react-redux';
import { boardCommentEditingOn, setNewToken } from 'store';

import BoardCommentEditForm from './BoardCommentEditForm';
import axios from 'axios';

//댓글 받아오기 axios 기능은 BoardDetailObj 컴포넌트 참고, 여기는 댓글 출력 컴포넌트

function BoardComments({ isTokenDead, comments, ci, isCommentOwner, setCommentLoading, setPostLoading }){
	let dispatch = useDispatch();

	let state = useSelector((state) => state)
	let COMMENTS_URL = useSelector((state) => state.COMMENTS_URL)

  let commentNumber = comments[ci].commentNumber

	const EditingAndTrueCommentNumber = () => {
		if (state.isBoardCommentEditing.editState){
			if (state.isBoardCommentEditing.commentNumber === commentNumber){
				return true
			}
		}
		return false
	}

  let getConfig = () => {
    let config = {
      headers : {
        "accesstoken" : localStorage.getItem("accessToken"),
        "refreshtoken" : localStorage.getItem("refreshToken")
      }
    }
    return config
  }

	return (
		<>
		{ 
			EditingAndTrueCommentNumber() === false ? ( //수정중이 아니면(일반폼)
				<>
					<Row style={{textAlign:'left', marginTop:10,marginBottom:10}}>
						<Col>
							<span style={{marginRight:10, fontWeight:'bold', fontSize:17}}>{comments[ci].writer.nickname}</span>
							<span style={{color:'gray', fontSize:13.5}}>({comments[ci].createdDate})</span>
						</Col>
						{
							//댓글 작성자일때만 수정삭제버튼 보임
							isCommentOwner && ( 
								<BoardCommentEditDeleteButton 
                  isTokenDead={isTokenDead}
                  dispatch={dispatch}
                  commentNumber={commentNumber}
                  COMMENTS_URL={COMMENTS_URL}
                  config={getConfig()}
                  setCommentLoading={setCommentLoading}
                  setPostLoading={setPostLoading}
                />
              )
						}
					</Row>
					<Row style={{textAlign:'left', paddingBottom:20, borderBottom:'1px solid #ccc'}}>
						<Col>{comments[ci].content}</Col>
					</Row>
				</>
			) : ( //수정중이라면(수정폼)
				<BoardCommentEditForm 
          isTokenDead={isTokenDead}
          comments={comments}
          ci={ci}
          getConfig={getConfig} //getConfig를 사용해야 하니까 함수호출(getConfig())이 아닌, 함수 그대로를 전달
          COMMENTS_URL={COMMENTS_URL}
          setCommentLoading={setCommentLoading}
          setPostLoading={setPostLoading}
        />
			)
		}
		</>
	)
}

// 수정삭제 아이콘 컴포넌트
function BoardCommentEditDeleteButton({ isTokenDead, dispatch, commentNumber, COMMENTS_URL, config, setCommentLoading, setPostLoading }){
  const commentDeleteRequest = () => {
    axios
      .delete(`${COMMENTS_URL}?commentNumber=${commentNumber}`, config)
      .then(response => {
        setCommentLoading(false)
        setPostLoading(false)

        dispatch(setNewToken(response.headers.newtoken))
      })
      .catch(err => {
        console.log(err)
        setCommentLoading(false)
        setPostLoading(false)
        
        isTokenDead(err.response.data.message)
        dispatch(setNewToken(err.response.headers.newtoken))
      })
  }

	return(
    <Col style={{textAlign:'right'}}>
      {/* 댓글 수정 아이콘 */}
			<span style={{cursor:'pointer'}} onClick={()=>{ 
				if (window.confirm('댓글을 수정하시겠습니까?')){
					dispatch(boardCommentEditingOn(commentNumber))
				}
			}}><GrEdit/></span>

      {/* 댓글 삭제 아이콘 */}
			<span style={{cursor:'pointer', marginLeft:15, color:'black'}} onClick={()=>{
				if (window.confirm('정말 댓글을 삭제하시겠습니까?')){
          setCommentLoading(true)
          setPostLoading(true)
          commentDeleteRequest(commentNumber)
				} 
        else { 
          setCommentLoading(false)
          setPostLoading(false)
        }
			}}><RiDeleteBin6Line/>
			</span>
		</Col>
	)
}

export default BoardComments