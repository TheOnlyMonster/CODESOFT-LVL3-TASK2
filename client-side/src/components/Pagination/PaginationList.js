import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Pagination.module.css";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
const PaginationList = (props) => {
  const PER_PAGE = props.pageItems;
  const lastPage = Math.ceil(props.productsCount / PER_PAGE);
  const currentPage = props.currentPage;
  const location = useLocation();
  return (
    <Pagination
      className={styles.pagination}
      page={currentPage}
      count={lastPage}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`${location.pathname}?page=${item.page}`}
          {...item}
        />
      )}
    />
  );
};

export default PaginationList;
