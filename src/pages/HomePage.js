import React, { useState, useEffect } from "react";
import SimpleContainer from "../components/UI/SimpleContainer";
import SearchBar from "../components/Form/SearchBar";
import StandardImageList from "../components/List/StandardImageList";
import Paginate from "../components/Paginate/Paginate";
import axios from "axios";
import NewSearchBar from "../components/Form/newSearchBar";

const { REACT_APP_PIXABAY_KEY } = process.env;

const HomePage = () => {
  const [imageList, setImageList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("Car");
  const searchHandlder = async () => {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${REACT_APP_PIXABAY_KEY}&q=${search}&image_type=photo&pretty=true&per_page=10&page=1}`
    );
    setPage(1);
    setImageList(response.data.hits);
    setTotalPages(Math.floor(response.data.totalHits / 10));
  };
  useEffect(
    () => searchHandlder(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <SimpleContainer>
      <h1 style={{ textAlign: "center" }}>PixaBay Image Gallery</h1>
      {/* SearchBar */}
      {/* <SearchBar
        searchValue={search}
        onChangeSearchValue={setSearch}
        onSearch={searchHandlder}
      /> */}
      <NewSearchBar
        searchValue={search}
        onChangeSearchValue={setSearch}
        onSearch={searchHandlder}
      ></NewSearchBar>
      {/* {imageList.length} */}
      <StandardImageList images={imageList}></StandardImageList>
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
