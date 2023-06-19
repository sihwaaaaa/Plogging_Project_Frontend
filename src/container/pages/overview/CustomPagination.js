import React, { useEffect, useRef, useState } from "react";
import "../../../static/css/pagination.scss"
import {
    UilAngleDoubleDown,
    UilAngleDoubleLeft,
    UilAngleDoubleRight,
    UilAngleLeft,
    UilAngleRight
} from "@iconscout/react-unicons";

const CustomPagination = (props) => {

    const totalPages = props.result.totalPages;
    const totalElements = props.result.totalElements;
    const numberOfElements = props.result.numberOfElements;
    const last = props.result.last;
    const first = props.result.first;
    const size = props.result.size;
    const pageable = props.result.pageable;

    const setPage = props.setPage;
    const page = props.page;
    const setScroll = props.setScroll;
    let pageNum = [];

    const [active, setActive] = useState('');

    let setPageNumber = () => {
        // let pagesNum = Math.floor(totalPages / 10);
        let currentPage;
        // console.log(pagesNum)
        // console.log(totalPages % 10)

        for (currentPage = 0; currentPage < totalPages ; currentPage++) {
            pageNum.push(<li key={currentPage}
                             id={currentPage}
                             onClick={pageClick}>{currentPage + 1}</li>)
        }
        return pageNum
    }


    const pageClick = e => {
        setPage(e.target.id)
        setActive(e.target.id)
    }

    const scrollClick = () => {
        setScroll(true)
        setPage(page + 1)
    }

    const nextPage = (page) => {
        setPage(page+1)
    }

    const lastPage = (page) => {
        setPage(page-1)
    }

    // const pageActive = () => {
    //     document.getElementById(active).
    // }
    //
    // useEffect(() => {
    //     pageActive();
    // }, active)


    const beforePagesRef = useRef(null);
    const beforePageRef = useRef(null);
    const afterPageRef = useRef(null);
    const afterPagesRef = useRef(null);


  return (
    <>
        <div className="pagination">
            {!first && totalPages / 10 >= 1 ? (
              <div className="beforePages" ref={beforePagesRef}><UilAngleDoubleLeft /></div>
            ) : ''}
            {!first ? (
              <div className="beforePage" onClick={() => lastPage(page)} ref={beforePageRef}><UilAngleLeft /></div>
            ) : ''}
            {setPageNumber()}
            {!last ? (
              <div className="afterPage" onClick={() => nextPage(page)} ref={afterPageRef}><UilAngleRight /></div>
            ) : ''}
            {!last && totalPages / 10 >= 1 ? (
              <div className="afterPages" ref={afterPagesRef}><UilAngleDoubleRight /></div>
            ) : ''}
        </div>
        <div className="InfiniteScroll">
            {!last ? (
              <div className="btnWrapper" onClick={scrollClick}>
                  <span>더보기</span>
                  <UilAngleDoubleDown />
              </div>
            ) : (
              <span style={{fontSize:11, fontWeight:"bold", color:"rgba(102, 109, 146, 0.6)"}}>마지막 페이지입니다</span>
            )}
        </div>
    </>
  );
};

export default CustomPagination;