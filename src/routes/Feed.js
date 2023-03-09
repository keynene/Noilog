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
			<div>
			{
				feeds.map((a,i) =>
					<Feeds i={i} feeds={feeds} comments={comments} key={i} />
				)
			}
			</div>
		</div>
	)
}

export default Feed;