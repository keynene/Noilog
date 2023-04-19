import React from 'react';

import styled from 'styled-components'

function Pagination({ postsPerPage, totalPosts, paginate, currentPage }){

	const PageUl = styled.ul`
		margin-top: 20px;
		list-style: none;
		text-align: center;
		color: rgb(100,100,100);
		padding: 1px;
	`;

	const PageLi = styled.li`
		display: inline-block;
		font-size: 17px;
		font-weight: 550;
		padding: 3px;
		border-radius: 50px;
		width: 30px;
		&:hover {
			cursor: pointer;
			background-color: rgb(230,230,230);
		}
		&:focus::after {
			color: white;
			background-color: #263a6c;
		}
	`;

	const PageSpan = styled.span`
		&:hover::after,
		&:focus::after {
			border-radius: 100%;
			color: white;
			background-color: #263a6c;
		}
	`;

	const pageNumbers = [];
	for (let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++){
		pageNumbers.push(i);
	}

	const onPrevButtonClick = () => {
		if (currentPage !== 1){
			paginate(currentPage-1)
		}
	}

	const onNextButtonClick = () => {
		if (pageNumbers.length !== currentPage){
			paginate(currentPage+1)
		}
	}

	return (
		<>
		{console.log(currentPage)}
			<PageUl>
				<PageLi onClick={()=>{onPrevButtonClick()}}><PageSpan>{"<<"}</PageSpan></PageLi>
				<PageLi onClick={()=>{onPrevButtonClick()}}><PageSpan>{"<"}</PageSpan></PageLi>
				{pageNumbers.map((number) => (
					<PageLi key={number} className="page-item">
						<PageSpan onClick={() => paginate(number) } className="page-link">
							{number}
						</PageSpan>
					</PageLi>
				))}
				<PageLi onClick={()=>{onNextButtonClick()}}><PageSpan>{">"}</PageSpan></PageLi>
				<PageLi onClick={()=>{onNextButtonClick()}}><PageSpan>{">>"}</PageSpan></PageLi>
			</PageUl>
		</>
	)
}

export default Pagination