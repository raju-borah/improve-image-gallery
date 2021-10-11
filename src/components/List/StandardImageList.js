import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useHistory } from "react-router-dom";
export default function StandardImageList({ images }) {
  const history = useHistory();
  const imageHandler = (id) => {
    history.push(`/single-image/${id}`);
  };
  return (
    <ImageList cols={3}>
      {images.map((image) => (
        <ImageListItem key={image.id}>
          <img
            src={image.largeImageURL}
            srcSet={image.largeImageURL}
            alt={image.title}
            loading="lazy"
            onClick={() => imageHandler(image.id)}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
