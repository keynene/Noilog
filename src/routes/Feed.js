import Feeds from 'components/Feeds';
import React, { useEffect, useState } from 'react';
import FeedFactory from 'components/FeedFactory';

import {useSelector} from "react-redux";


function Feed(){
	let userId = JSON.parse(localStorage.getItem('login')).loginId
	let state = useSelector((state) => state)
	
	const [feedArr, setFeedArr] = useState([]);

	useEffect(()=>{
		let copy = [...feedArr]
		setFeeds(feeds)

	}, [])


	return(
		<div>
			<FeedFactory />
			<div>
				{feeds.map((feed) => 
					<Feeds
						feedObj={JSON.parse(localStorage.getItem(JSON.stringify(userId)))}
					/>
				)}
			</div>
		</div>
	)
}

export default Feed;