import React, { useState,useCallback} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import Container from "@mui/material/Container";
import debounce from 'lodash.debounce';
const { REACT_APP_PIXABAY_KEY } = process.env;
export default function NewSearchBar(props) {
  let [tags, setTags] = useState([""]);
  const [searchValue,setSearchValue]=useState(props.searchValue);
  const suggestionHandler = async (search) => {
    if (search) {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${REACT_APP_PIXABAY_KEY}&q=${search}}&image_type=photo&pretty=true`
      );
      if (response.data.hits.length > 0) {
        let suggestion= response.data.hits.map((el)=>{
            return el.tags.split(",");
        });
        suggestion = suggestion.flat();
        suggestion =  [...new Set(suggestion)];
        setTags(suggestion);
        }
     
    }
  };
  const debouncedChangeHandler = useCallback(
    debounce((searchValue)=>props.onSearch(searchValue), 500)
  , [searchValue]);
  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
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
                setSearchValue(event.target.value);
                props.onChangeSearchValue(event.target.value);
                suggestionHandler(event.target.value);
                debouncedChangeHandler();
              }}
            />
          )}
        />
    </Container>
  );
}
