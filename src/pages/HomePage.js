import React, { useState, useEffect ,useCallback} from "react";
import SimpleContainer from "../components/UI/SimpleContainer";
import StandardImageList from "../components/List/StandardImageList";
import Paginate from "../components/Paginate/Paginate";
import axios from "axios";
import NewSearchBar from "../components/Form/newSearchBar";
import debounce from 'lodash.debounce';
import CircularProgress from '@mui/material/CircularProgress';
const { REACT_APP_PIXABAY_KEY } = process.env;

const HomePage = () => {
  const [imageList, setImageList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("Car");
  const [tags, setTags] = useState([""]);
  const [isLoading,setIsLoading] =useState(true);

  const searchHandlder = async (search="car") => {
    setIsLoading(true);
    const response = await axios.get(
      `https://pixabay.com/api/?key=${REACT_APP_PIXABAY_KEY}&q=${search}&image_type=photo&pretty=true&per_page=10&page=1}`
    );
    setIsLoading(false);
    if (response.data.hits.length > 0) {
      let suggestion= response.data.hits.map((el)=>{
          return el.tags.split(",");
      });
      suggestion = suggestion.flat();
      suggestion =  [...new Set(suggestion)];
      setTags(suggestion);
      }
    setPage(1);
    setImageList(response.data.hits);
    setTotalPages(Math.floor(response.data.totalHits / 10));
  };
  useEffect(
    () => searchHandlder(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const debouncedChangeHandler = useCallback(
    debounce(searchHandlder, 0)
  , [search]);
  return (
    <SimpleContainer>
      <h1 style={{ textAlign: "center" }}>PixaBay Image Gallery</h1>
      {/* SearchBar */}
      <NewSearchBar
        searchValue={search}
        onChangeSearchValue={setSearch}
        onSearch={debouncedChangeHandler}
        tags={tags}
      />
      {/* {imageList.length} */}
      {isLoading && <div style={{display:"flex",justifyContent:"center", padding:"20px"}}><CircularProgress disableShrink /></div>}
      {!isLoading &&  <StandardImageList images={imageList}/>}
      <Paginate
        searchValue={search}
        totalPages={totalPages}
        curentPage={page}
        onChangePage={setPage}
        setImageList={setImageList}
        onChangeTotalPages={setTotalPages}
      />
    </SimpleContainer>
  );
};

export default HomePage;
