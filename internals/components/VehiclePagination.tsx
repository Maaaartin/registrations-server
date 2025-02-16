import { Pagination, PaginationItem } from '@mui/material';
import Link from 'next/link';
import React from 'react';

type Props = {
  currentPage: number;
  getPageLink: (page: number) => string;
};

export default function VehiclePagination({ currentPage, getPageLink }: Props) {
  return (
    <Pagination
      showFirstButton
      showLastButton
      page={currentPage}
      count={currentPage + 1}
      siblingCount={1}
      boundaryCount={2}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          href={getPageLink(item.page || 1)}
          {...item}
        />
      )}
    ></Pagination>
  );
}
