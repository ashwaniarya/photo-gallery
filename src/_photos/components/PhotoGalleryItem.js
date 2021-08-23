import React from 'react'
import Box from '@material-ui/core/Box'

import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme)=>{
  return {
  imgContainer: {
    height: 'auto', 
    display: 'flex', 
    justifyContent: 'center',
    cursor:'pointer',
    backgroundColor: 'grey', 
    '@media (min-width: 480px)': {
      flexBasis: '100%',
    },
    '@media (min-width: 720px)': {
      flexBasis: '50%',
    },

  },
  img: {
    width: '100%', 
    '@media (min-width: 480px)': {
      height: 'auto'
    },
    objectFit:'cover'
  }
}

})

function PhotoGalleryItem({ photoUrl,photoAlt, height, width }) {
  const classes = useStyles();
  return (<Box className={classes.imgContainer}>
    <img className={classes.img} src={photoUrl} alt={photoAlt} height={height} width={width}/>
    </Box>
  )
}

export default PhotoGalleryItem
