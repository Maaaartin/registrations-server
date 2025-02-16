import { Pagination } from '@mui/material';
import React from 'react';

type Props = {
  currentPage: number;
  setPage: (page: number) => void;
};

export default function VehiclePagination({ currentPage, setPage }: Props) {
  return (
    <Pagination
      showFirstButton
      showLastButton
      page={currentPage}
      count={currentPage + 1}
      onChange={(event, page) => {
        setPage(page);
      }}
    ></Pagination>
  );
}
