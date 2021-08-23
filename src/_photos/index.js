import { useEffect, useRef, useState } from "react";
import { NavHeader } from "ui-kit";
import Container from "@material-ui/core/Container";
import PhotoGallery from "./containers/PhotoGallery";
import PhotoSearchInput from "./containers/PhotoSearchInput";
import { useBottomReached } from "./hooks";

import { PhotoService } from "sdk";
import { makeStyles } from "@material-ui/core/styles";
import shortid from "shortid";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import { ITEM_PER_REQUEST, EXTRAS, DEFAULT_IMG_HEIGTH, DEFAULT_IMG_WIDTH } from './constants'

const useStyles = makeStyles((theme) => ({
  galleryContainer: {
    boxShadow: theme.shadows[5],
    padding: 0,
    "@media (min-width: 720px)": {
      marginTop: "1em",
    },
  },
  searchEndBox: {
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
   
  },
  searchEndBoxText: {
    color: theme.palette.grey[300]
  }
}));

function PhotoMain() {
  const classes = useStyles();
  const rootRef = useRef();
  const [isAtBootom] = useBottomReached(rootRef, 400);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const stopFetching = useRef(false);
  const [isFetching, setIsFetching] = useState(false);

  const error = useRef(null);
  const pageNumber = useRef(1);

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    if (Boolean(searchQuery)) {
      stopFetching.current = false;
      fetchPhotos();
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!stopFetching.current && isAtBootom) {
      fetchPhotos();
    }
  }, [isAtBootom]);

  const ProcessItems = (promise) => {
    promise
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (pageNumber.current > data.photos.pages) {
          stopFetching.current = true;
          setIsFetching(false);
          return;
        }

        let photosItems = data.photos.photo.map((item) => {
          return {
            url: item.url_c,
            alt: item.title,
            height: item.height_c || DEFAULT_IMG_HEIGTH,
            width: item.width_c || DEFAULT_IMG_WIDTH,
            id: shortid.generate(),
          };
        });
        let newItem = [...items, ...photosItems];
        if (items.length > 0) {
          setItems(newItem);
        } else {
          setItems(photosItems);
        }
        setIsFetching(false);
      })
      .catch((error) => {
        error.current = error;
      });
  };

  const fetchPhotos = () => {
    if (!Boolean(error.current)) {
      setIsFetching(true);
      if (searchQuery) {
        ProcessItems(
          PhotoService.serchPhotos({
            page: pageNumber.current,
            perPage: ITEM_PER_REQUEST,
            extras: EXTRAS,
            searchQuery,
          })
        );
      } else {
        ProcessItems(
          PhotoService.getRecentPhotos({
            page: pageNumber.current,
            perPage: ITEM_PER_REQUEST,
            extras: EXTRAS,
          })
        );
      }
    }
  };

  const onChangeInpuHandler = (text) => {
    if (text) setItems([]);
    setSearchQuery(text);
  };

  const renderEndReached = () => {
    return (
      <Box className={classes.searchEndBox}>
        {items.length > 0 ? (
          <Typography className={classes.searchEndBoxText}>No more photos to show</Typography>
        ) : (
          <Typography className={classes.searchEndBoxText}>
            No photos found, try serching with differnet keyword
          </Typography>
        )}
      </Box>
    );
  };
  return (
    <div ref={rootRef}>
      <NavHeader>
        <PhotoSearchInput onChange={onChangeInpuHandler} />
      </NavHeader>
      <Container maxWidth={"lg"} className={classes.galleryContainer}>
        <PhotoGallery photos={items} showPlaceHolder={isFetching} />
        {!isFetching && stopFetching.current && renderEndReached()}
      </Container>
    </div>
  );
}

export default PhotoMain;
