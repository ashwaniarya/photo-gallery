import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import PhotoGalleryContainer from './PhotoGalleryContainer'
import PhotoGalleryItem from './../components/PhotoGalleryItem'
import PhotoGalleryLoaderItem from '_photos/components/PhotoGalleryLoaderItem';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import shortid from 'shortid';


const useStyles = makeStyles((theme) => ({
  container: {
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    boxShadow: theme.shadows[5],
    outline: 'none'
  },
  modalImage: {
    width: '100%',
    height: 'auto'
  }
}));

function PhotoGallery({ photos, showPlaceHolder = false}) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');
  const handleItemEvent = (e)=>{
    setSrc(e.target.currentSrc);
    setAlt(e.target.alt);
    setOpen(true);
  }
  if(photos.length < 0 ) return null;
  return (
    <div className={classes.container}>
       <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={()=>{ setOpen(false)}}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <img src={src} className={classes.modalImage} alt={alt}/>
          </div>
        </Fade>
      </Modal>
      <PhotoGalleryContainer onClickImage={handleItemEvent}>
        {photos.map(photo=>{
          return <PhotoGalleryItem key={photo.id} photoUrl={photo.url} photoAlt={photo.alt} height={photo.height} width={photo.width}/>
        })}
        {showPlaceHolder && Array(2).fill(1).map(()=>{
          let id = shortid.generate();
          return <PhotoGalleryLoaderItem key={id}/>
        })}
      </PhotoGalleryContainer>
    </div>
  )
}

export default PhotoGallery
