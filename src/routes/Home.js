import React from 'react';

import { Table } from 'react-bootstrap';

/* Components */
import BoardWriteButton from 'components/BoardWriteButton';
import BoardRow from 'components/BoardRow';
import Pagination from 'components/Pagination.js'

function Home({boards, lastPage, firstPage}){
	
	return (
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
				{boards.length === 0 ? (
        <tbody>
          <tr>
            <td colSpan="6" style={{border:"none", paddingTop:20, color:"gray"}}>
              아직 게시글이 없습니다!
            </td> 
          </tr>
        </tbody>
        ) : (
        <tbody>
          <BoardRow boards={boards}/>
        </tbody>
        )}
			</Table>

			{boards.length !== 0 &&
      <div style={{display:"flex", justifyContent:"center"}}>
        <Pagination
          lastPage={lastPage}
          firstPage={firstPage}
          style={{textAlign:"center"}}
        />
      </div>
			}
		</div>
	)
}

export default Home;