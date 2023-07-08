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

function Pagination({ lastPage, firstPage }){
  let dispatch = useDispatch();
  let state = useSelector((state) => state)

	const pageNumbers = [];
  for (let i=1; i<=lastPage; i++){
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
		if (state.currentPage.page < lastPage){
      dispatch(onChangedPage(state.currentPage.page+1))
		}
	}

	const onLastButtonClick = () => { // >>
    dispatch(onChangedPage(lastPage))
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
          //1~5페이지
          state.currentPage.page <= 3 && number <= 5 ? (
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
        ) : (
          //끝-5 ~ 끝 페이지              // 중간페이지 구현해야함
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
        )
				))}
				<PageLi onClick={()=>{onNextButtonClick()}}><PageSpan>{">"}</PageSpan></PageLi>
				<PageLi onClick={()=>{onLastButtonClick()}}><PageSpan>{">>"}</PageSpan></PageLi>
			</PageUl>
		</>
	)
}

export default Pagination