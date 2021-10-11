import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
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
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search..."
          inputProps={{ "aria-label": "Search..." }}
          value={props.searchValue || " "}
          required
          onChange={(event) => props.onChangeSearchValue(event.target.value)}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <ImageSearchIcon />
        </IconButton>
      </Paper>
    </Container>
  );
}
