import React,{useState} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
export default function NewSearchBar(props) {
  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
        <Autocomplete
          disablePortal
          onChange={(event,newValue)=>{
            props.onSearch(newValue);
          }}
          id="combo-box-demo"
          options={props.tags}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              required
              value={props.searchValue}
              onChange={(event)=>{
                let search = event.target.value;
                props.onSearch(search);

              }}
            />
          )}
        />
    </Container>
  );
}
