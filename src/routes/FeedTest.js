import feedData from 'feed/feedData';
import React, { useState } from 'react';


function FeedTest(){
	let [feed, setFeed] = useState(feedData);

	return(
		<div>
			{
				feed.map((a,i) =>
					<div key={i}>
						<p>{`postNumber : ${feed[i].postNumber}`}</p>
						<p>{`title : ${feed[i].title}`}</p>
						<p>{`content : ${feed[i].content}`}</p>
						<p>{`writer : ${feed[i].writer}`}</p>
						<p>{`viewCount : ${feed[i].viewCount}`}</p>
						<p>{`likeCount : ${feed[i].likeCount}`}</p>
						<p>{`commentCount : ${feed[i].commentCount}`}</p>
						<p>{`createDate : ${feed[i].createDate}`}</p>
						<p>{`creatorNickname : ${feed[i].creatorNickname}`}</p>
						<br />
					</div>
				)
			}
		</div>
	)
}

export default FeedTest;