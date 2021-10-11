import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
export default function Paginatie({
  searchValue,
  totalPages,
  curentPage,
  onChangePage,
  setImageList,
  onChangeTotalPages,
}) {
  const handleChange = async (event, value) => {
    const response = await axios.get(
      `https://pixabay.com/api/?key=23662182-a70494797e8140caffbf82463&q=${searchValue}&image_type=photo&pretty=true&per_page=10&page=${value}`
    );
    onChangePage(value);
    setImageList(response.data.hits);
    onChangeTotalPages(Math.floor(response.data.totalHits / 10));
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {curentPage}</Typography>
      <Pagination
        count={totalPages}
        page={curentPage}
        onChange={handleChange}
      />
    </Stack>
  );
}
