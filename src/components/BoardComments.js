import { Row, Col } from 'react-bootstrap';

import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useDispatch, useSelector } from 'react-redux';
import { boardCommentEditingOn } from 'store';

import BoardCommentEditForm from './BoardCommentEditForm';
import axios from 'axios';

//댓글 받아오기 axios 기능은 BoardDetailObj 컴포넌트 참고, 여기는 댓글 출력 컴포넌트

function BoardComments({ openBoard, comments, boards, ci, isCommentOwner, setCommentLoading }){
	let dispatch = useDispatch();

	let state = useSelector((state) => state)
	let COMMENTS_URL = useSelector((state) => state.COMMENTS_URL)

	const EditingAndTrueCommentNumber = (commentNumber) => {
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
			EditingAndTrueCommentNumber(comments[ci].commentNumber) === false ? ( //수정중이 아니면(일반폼)
				<>
					<Row style={{textAlign:'left', marginTop:10,marginBottom:10}}>
						<Col>
							<span style={{marginRight:10, fontWeight:'bold', fontSize:17}}>{comments[ci].writer.nickname}</span>
							<span style={{color:'gray', fontSize:13.5}}>({comments[ci].createdDate})</span>
						</Col>
						{
							//수정삭제 아이콘 컴포넌트
							isCommentOwner ? ( //댓글 작성자일때만 수정삭제버튼 보임
								<BoardCommentEditDeleteButton dispatch={dispatch} comments={comments} ci={ci} COMMENTS_URL={COMMENTS_URL} config={getConfig()} setCommentLoading={setCommentLoading} />
							) : null //조건 3 : 댓글 작성자일때만 수정삭제버튼 보임
						}
					</Row>
					<Row style={{textAlign:'left', paddingBottom:20, borderBottom:'1px solid #ccc'}}>
						<Col>{comments[ci].content}</Col>
					</Row>
				</>
			) : ( //수정중이라면(수정폼)
				<BoardCommentEditForm 
          comments={comments}
          ci={ci}
          getConfig={getConfig}
          COMMENTS_URL={COMMENTS_URL}
          setCommentLoading={setCommentLoading}
        />
			)
		}
		</>
	)
}

// 수정삭제 아이콘 컴포넌트
function BoardCommentEditDeleteButton({ dispatch, comments, ci, COMMENTS_URL, config, setCommentLoading }){
  const commentDeleteRequest = (commentNumber) => {
    axios
      .delete(`${COMMENTS_URL}?commentNumber=${commentNumber}`, config)
      .then(response => {
        setCommentLoading(false)
      })
      .catch(err => { console.log(err) })
  }

	return(
		<Col style={{textAlign:'right'}}>
			<span style={{cursor:'pointer'}} onClick={()=>{ 
				if (window.confirm('댓글을 수정하시겠습니까?')){
					dispatch(boardCommentEditingOn(comments[ci].commentNumber))
				}
			}}><GrEdit/></span>
			<span style={{cursor:'pointer', marginLeft:15, color:'black'}} onClick={()=>{
				if (window.confirm('정말 댓글을 삭제하시겠습니까?')){
          setCommentLoading(true)
          commentDeleteRequest(comments[ci].commentNumber, config)
				} else { setCommentLoading(false)}
			}}><RiDeleteBin6Line/>
			</span>
		</Col>
	)
}

export default BoardComments