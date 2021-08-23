import React, { useState, useRef, useEffect } from "react";
import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import { debounce } from "utils";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Typography from '@material-ui/core/Typography';
import shortid from "shortid";

const SAVED_SEARCH_ID = "recent-search";

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    display: "flex",
    position: "relative",
    "@media (min-width: 720px)": {
      marginLeft: "20%",
      marginRight: "20%",
      marginTop: "1em",
      marginBottom: "1em",
    },
  },
  recentSearchPopupItem: {
    padding: theme.spacing(1),
    display: "block",
    textAlign: "left",
    "@media (max-width: 720px)": {
      width: "100%",
    },
    "@media (min-width: 720px)": {
      width: 300,
    },
    "&:hover": {
      backgroundColor: "#e4e4e4",
    },
    borderRadius: 4,
  },
  recentSearchPopup: {
    boxShadow: theme.shadows[5],
    position: "absolute",
    "@media (max-width: 720px)": {
      width: "100%",
    },
    top: 35,
  },
  searchInput: {
    flex: 1,
  },
  inputRoot: {
    color: "inherit",
    flex: 1,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    flex: 1,
    display: "flex",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  recentSearchButtonContainer: {
    display: 'flex'
  },
  recentSearchItemText: {
    marginLeft: '1em'
  },
  recentSearchCaption: {
    padding: theme.spacing(1)
  }
}));

function PhotoSearchInput({ onChange }) {
  const classes = useStyles();
  const [recentSearch, setRecentSearch] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    let recentSearch = getSavedSearchResult();
    setRecentSearch(recentSearch);
  }, []);

  const onChangeHandler = (text) => {
    onChangeAndSaveResult(text);
  };

  const onChangeAndSaveResult = (text) => {
    if (!Boolean(text)) return;
    onChange(text);
    let newResult = saveSearchResult(text);
    setRecentSearch(newResult);
  };

  const handleClickAway = () => {
    if(showDropDown) setShowDropDown(false);
  };

  const getSavedSearchResult = () => {
    return JSON.parse(localStorage.getItem(SAVED_SEARCH_ID)) || [];
  };

  const saveSearchResult = (search) => {
    let saveRecentSearch = getSavedSearchResult();
    if (saveRecentSearch.length > 10) {
      saveRecentSearch.pop();
    }
    saveRecentSearch.unshift(search);
    localStorage.setItem(SAVED_SEARCH_ID, JSON.stringify(saveRecentSearch));
    return saveRecentSearch;
  };

  const debounceOnChangeHandler = useRef(debounce(onChangeHandler, 500));

  const onClickRecentSearchItem = (text) => {
    setSearchText(text);
    if(showDropDown) setShowDropDown(false);
    onChangeAndSaveResult(text);
  };
  return (
    <Box className={classes.inputContainer}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onChange={(e) => {
            setSearchText(e.target.value);
            setShowDropDown(true);
            debounceOnChangeHandler.current(e.target.value);
          }}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={searchText}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      {showDropDown && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper elevation={0} className={classes.recentSearchPopup}>
          <Typography className={classes.recentSearchCaption} variant='caption'>Recent Searches</Typography>
            {recentSearch.length > 0 &&
              recentSearch.map((search) => (
                <ButtonBase
                  key={shortid.generate()}
                  className={classes.recentSearchPopupItem}
                  onClick={() => onClickRecentSearchItem(search)}
                > 
                <div className={classes.recentSearchButtonContainer}>
                  <SearchIcon />
                  <Typography className={classes.recentSearchItemText} variant='body1'>{search}</Typography>
                </div>
              </ButtonBase>
              ))}
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
}

export default PhotoSearchInput;
