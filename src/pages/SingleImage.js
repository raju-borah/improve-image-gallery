import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const { REACT_APP_PIXABAY_KEY } = process.env;
const SimgleImage = () => {
  const { id } = useParams();
  const [img, setImg] = useState("");
  const searchHandlder = async () => {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${REACT_APP_PIXABAY_KEY}&id=${id}&image_type=photo&pretty=true`
    );
    setImg(response.data.hits[0]);
  };

  useEffect(
    () => searchHandlder(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  console.log(img);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={img.largeImageURL}
        srcSet={img.largeImageURL}
        alt={img.title}
        width="700"
        loading="lazy"
      />
      <h1>Tags: {img.tags}</h1>
    </div>
  );
};

export default SimgleImage;
