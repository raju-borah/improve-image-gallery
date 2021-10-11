import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
const { REACT_APP_PIXABAY_KEY } = process.env;
export default function NewSearchBar(props) {
  let [tags, setTags] = useState([""]);
  const suggestionHandler = async (search) => {
    if (search) {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${REACT_APP_PIXABAY_KEY}&q=${search}}&image_type=photo&pretty=true`
      );
      if (response.data.hits.length > 0) {
        setTags(response.data.hits[0].tags.split(","));
      }
    }
  };

  const submitHandler = () => {
    props.onSearch(props.searchValue);
  };

  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Paper
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={tags}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              onChange={(event) => {
                props.onChangeSearchValue(event.target.value);
                suggestionHandler(event.target.value);
              }}
            />
          )}
        />
      </Paper>
    </Container>
  );
}
