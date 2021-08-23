import React from 'react'
import Box from '@material-ui/core/Box'

import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme)=>{
  return {
  placeholderContainer: {
    height: 'auto', 
    display: 'flex', 
    justifyContent: 'center',
    '@media (min-width: 480px)': {
      flexBasis: '100%',
    },
    '@media (min-width: 720px)': {
      flexBasis: '50%',
    },

  },
  div: {
    width: '100%', 
    height: 640,
    margin: '1px',
    animation: `$breath 1s infinite`,
    backgroundColor: '#464646'
  },
  "@keyframes breath": {
    "0%": {
      opacity: 0.2,
    },
    "50%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0.2,
    }
  }
}

})

function PhotoGalleryLoaderItem() {
  const classes = useStyles();
  return (<Box className={classes.placeholderContainer}>
    <div className={classes.div} />
    </Box>
  )
}

export default PhotoGalleryLoaderItem
