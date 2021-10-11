import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import NewSearchBar from "./newSearchBar";

const { REACT_APP_PIXABAY_KEY } = process.env;
export default function SearchBar(props) {
  useEffect(() => {
    props.onChangeSearchValue(props.searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchValue]);
  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Paper
        component="form"
        sx={{
          p: "4px 4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 0px 1px 1px green",
          width: "400px",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          props.onSearch(props.searchValue);
        }}
      >
        <NewSearchBar props={props}></NewSearchBar>
        {/* <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <ImageSearchIcon />
        </IconButton> */}
      </Paper>
    </Container>
  );
}
