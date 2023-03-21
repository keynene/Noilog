import React, { useEffect, useState } from 'react';

/* Components */
import FeedFactory from 'components/FeedFactory';
import Feeds from 'components/Feeds';

import { useSelector } from 'react-redux';

function Feed(){

	let state = useSelector((state) => state)
	
	let [feeds, setFeeds] = useState([]);
	let [comments, setComments] = useState([]);


	useEffect(()=>{
		setFeeds(state.feedObj)
	},[state.feedObj])

	useEffect(()=>{
		setComments(state.commentObj)
	},[state.commentObj])
	
	return(
		<div>
			<FeedFactory />
			{
				feeds.map((a,i) =>
					<Feeds i={i} feeds={[...feeds].reverse()} comments={comments} key={i} isFeedOwner={[...feeds].reverse()[i].writer === state.userInfo[0].id} />
				)
			}
		</div>
	)
}

export default Feed;