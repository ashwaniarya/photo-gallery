import React from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(()=>({
  imgItemContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}))

function PhotoGalleryContainer({ children, onClickImage }) {
  const classes = useStyles();

  return (
    <Box onClick={(e)=>{ 
      typeof onClickImage === 'function' && onClickImage(e)
    }} className={classes.imgItemContainer}>
      {children}
    </Box>
  )
}

export default PhotoGalleryContainer
