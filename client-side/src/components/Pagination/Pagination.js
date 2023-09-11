import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Pagination.module.css";

const Pagination = (props) => {
  const PER_PAGE = props.pageItems;
  const lastPage = Math.ceil(props.productsCount / PER_PAGE);
  const currentPage = props.currentPage;
  const location = useLocation();
    const pageLinks = [];
    const visiblePages = 3; // Number of pages to show around the current page

    // Helper function to add a page link
  const addPageLink = (page) => {
      const isCurrentPage = +page === +currentPage;
      const linkClassName = isCurrentPage ? styles.active : "";
      pageLinks.push(
        <li key={page}>
          <Link to={`${location.pathname}?page=${page}`} className={linkClassName}>{page}</Link>
        </li>
      );
    };

    // Add the first page
    addPageLink(1);

    // Add dots if not on the first page
    if (currentPage > 1) {
      if (currentPage > visiblePages + 1) {
        pageLinks.push(<li key="More">...</li>);
      }

      // Add pages around the current page
      for (
        let i = Math.max(2, currentPage - visiblePages);
        i <= Math.min(lastPage - 1, currentPage + visiblePages);
        i++
      ) {
        addPageLink(i);
      }
    }

    // Add dots if not on the last page
    if (currentPage < lastPage) {
      if (currentPage < lastPage - visiblePages) {
        pageLinks.push(<li key="More">...</li>);
      }

      // Add the last page
      addPageLink(lastPage);
    }

  return <ul className={styles.pagination}>{pageLinks}</ul>;
};

export default Pagination;
