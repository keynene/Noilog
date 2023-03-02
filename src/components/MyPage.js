import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import sampleImgUrl from '../img/sample.jpg'

function MyPage(){
	return(
		<div>
			<Container>
				<Row>
					<Col><img src={sampleImgUrl} alt="" width="133px" height="158px" /></Col>
					<Col>2 of 2</Col>
				</Row>
			</Container>
		</div>
	)
}

export default MyPage;