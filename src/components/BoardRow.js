import React from 'react';

import { useNavigate } from 'react-router-dom';

function BoardRow({ boards}){
	let navigate = useNavigate();

  function getDate(date) {
    let md = date.slice(5,10)
    let time = date.slice(11,16)
    return `${md} ${time}`
  }

	return (
		<>
		{boards.map((a,i) => boards[i].content !== "" && (
		<tr key={i} style={{fontSize:13, width:800}} className="board_tr">
			<td style={{width:80}}>{boards[i].postNumber}</td>
			<td style={{width:400, textAlign:'left', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', display:'block'}}>
				<span 
					style={{textDecoration:'none', color:'black', cursor:'pointer', marginRight:5}} 
					onClick={()=>{
						navigate(`/boarddetail/${boards[i].postNumber}`)
					}}
				>{boards[i].title}
				</span>
				<span style={{color:'red', fontWeight:'bold'}}>[{boards[i].commentCount}]</span>
			</td>
			<td style={{width:100}}>{boards[i].writer.nickname}</td>
			<td style={{width:100}}>{getDate(boards[i].createdDate)}</td> 
			<td style={{width:60}}>{boards[i].viewCount}</td>
			<td style={{width:60}}>{boards[i].likeCount}</td>
		</tr>
		))}
		</>
	)
}

export default BoardRow