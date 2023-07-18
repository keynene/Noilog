import React, { useEffect, useState } from 'react';

/* Components */
import FeedFactory from 'components/Feed/FeedFactory';
import Feeds from 'components/Feed/Feeds';

import { useSelector } from 'react-redux';

function Feed(){

	let state = useSelector((state) => state)
	
	let [comments, setComments] = useState([]);
	let [feeds, setFeeds] = useState([]);

	useEffect(()=>{
		setFeeds([...state.feedObj].reverse())
	},[state.feedObj])

	useEffect(()=>{
		setComments(state.commentObj)
	},[state.commentObj])
	
	return(
		<div>
			<FeedFactory />
			{
				feeds.map((a,i) =>
					<Feeds 
						i={i} 
						feeds={feeds} 
						comments={comments} 
						key={i} 
						isFeedOwner={
							state.isLoggedIn ? 
								feeds[i].writer === state.userInfo.id
							: false
						} 
					/>
				)
			}
		</div>
	)
}

export default Feed;