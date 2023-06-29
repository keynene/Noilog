import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { onChangedPage } from 'store';

import styled from 'styled-components'

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

function Pagination({ totalPage, firstPage }){
  let dispatch = useDispatch();
  let state = useSelector((state) => state)

	const pageNumbers = [];
  for (let i=0; i<=totalPage; i++){
    pageNumbers.push(i)
  }

	const onFirstButtonClick = () => { // <<
    dispatch(onChangedPage(firstPage))
	}

	const onPrevButtonClick = () => { // <
		if (state.currentPage.page > firstPage){
      dispatch(onChangedPage(state.currentPage.page-1))
		}
	}

	const onNextButtonClick = () => { // >
		if (state.currentPage.page < totalPage){
      dispatch(onChangedPage(state.currentPage.page+1))
		}
	}

	const onLastButtonClick = () => { // >>
    dispatch(onChangedPage(totalPage))
	}

	const onPageButtonClick = (num) => { // Click Number
    dispatch(onChangedPage(num))
	}

	return (
		<>
			<PageUl>
				<PageLi onClick={()=>{onFirstButtonClick()}}><PageSpan>{"<<"}</PageSpan></PageLi>
				<PageLi onClick={()=>{onPrevButtonClick()}}><PageSpan>{"<"}</PageSpan></PageLi>
				{pageNumbers.map((number) => (
          <PageLi key={number} className="page-item">
						{ state.currentPage.page === number ? (
              <PageSpan onClick={() => onPageButtonClick(number) } className="page-link" style={{color:'#ff8298'}}>
                {number}
              </PageSpan>
              ) : (
              <PageSpan onClick={() => onPageButtonClick(number) } className="page-link">
                {number}
              </PageSpan>
              )
            }
					</PageLi>
				))}
				<PageLi onClick={()=>{onNextButtonClick()}}><PageSpan>{">"}</PageSpan></PageLi>
				<PageLi onClick={()=>{onLastButtonClick()}}><PageSpan>{">>"}</PageSpan></PageLi>
			</PageUl>
		</>
	)
}

export default Pagination