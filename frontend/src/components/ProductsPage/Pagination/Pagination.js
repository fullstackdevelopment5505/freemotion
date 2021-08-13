import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import styles from "./Pagination.module.scss";

import LeftChevronIcon from "../../../svgs/left_chevron.svg";
import RightChevronIcon from "../../../svgs/right_chevron (2).svg";

const PageIndexBlock = ({ pageIndex, setCurrentPage }) => (
  <div className={styles.pageIndex} onClick={() => setCurrentPage(pageIndex)}>
    <span>{pageIndex}</span>
  </div>
);

const CurrentPageIndex = ({ pageIndex }) => (
  <div className={styles.currentPageIndex}>
    <span>{pageIndex}</span>
  </div>
);

const PaginationEmptySpace = () => (
  <div className={styles.emptyPagination}>
    <span>...</span>
  </div>
);

export default function Pagination({ numPages, currentPage, setCurrentPage }) {
  const [prevPages, setPrevPages] = useState([]);
  const [nextPages, setNextPages] = useState([]);

  const nextPage = () => {
    if (currentPage < numPages) setCurrentPage((prevState) => prevState + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prevState) => prevState - 1);
  };

  const renderPrevPages = () => {
    setPrevPages([]);
    if (currentPage >= 3) setPrevPages([currentPage - 2, currentPage - 1]);
    if (currentPage == 2) setPrevPages([1]);
  };

  const renderNextPages = () => {
    setNextPages([]);
    if (currentPage + 2 <= numPages)
      setNextPages([currentPage + 1, currentPage + 2]);
    if (currentPage == numPages - 1) setNextPages([numPages]);
    if (numPages == currentPage + 1) setNextPages([currentPage + 1]);
    if (numPages < currentPage + 1) setNextPages([]);
  };

  useEffect(() => {
    renderPrevPages();
    renderNextPages();
  }, [currentPage, numPages]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ReactSVG
          src={LeftChevronIcon}
          beforeInjection={(svg) => {
            svg.setAttribute("style", `width: 1.1rem`);
            svg.setAttribute("style", `height: 1.1rem`);
            svg.setAttribute("style", `margin-bottom: -6px`);
          }}
          onClick={() => prevPage()}
        />
        <div className={styles.pages}>
          {currentPage !== 1 && currentPage >= 4 ? (
            <PageIndexBlock pageIndex={1} setCurrentPage={setCurrentPage} />
          ) : (
            ""
          )}
          {prevPages[0] > 2 ? <PaginationEmptySpace /> : ""}
          {prevPages.length > 0 &&
            prevPages.map((page) => (
              <PageIndexBlock
                key={page}
                pageIndex={page}
                setCurrentPage={setCurrentPage}
              />
            ))}
          {currentPage - 2 > prevPages[prevPages.length - 1] ? (
            <PaginationEmptySpace />
          ) : (
            ""
          )}
          <CurrentPageIndex pageIndex={currentPage} />
          {nextPages.length > 0 &&
            nextPages.map((page) => (
              <PageIndexBlock
                key={page}
                pageIndex={page}
                setCurrentPage={setCurrentPage}
              />
            ))}
          {numPages - 1 > nextPages[nextPages.length - 1] ? (
            <PaginationEmptySpace />
          ) : (
            ""
          )}
          {currentPage !== numPages && numPages > currentPage + 2 ? (
            <PageIndexBlock
              pageIndex={numPages}
              setCurrentPage={setCurrentPage}
            />
          ) : (
            ""
          )}
        </div>
        <ReactSVG
          src={RightChevronIcon}
          beforeInjection={(svg) => {
            svg.setAttribute("style", `width: 1.1rem`);
            svg.setAttribute("style", `height: 1.1rem`);
            svg.setAttribute("style", `margin-bottom: -6px`);
          }}
          onClick={() => nextPage()}
        />
      </div>
    </div>
  );
}
