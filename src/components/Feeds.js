import React, { useState } from 'react';

function Feeds(){
	const [editing, setEditing] = useState(false);
	
	return (
		<div>
			{
				editing ? (
					<>수정하는 폼 보여줄꺼임</>
				) : (
					<></>
				)
			}
		</div>
	)
}

export default Feeds;