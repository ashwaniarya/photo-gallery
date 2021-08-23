import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    padding: theme.spacing(1),
    backgroundColor: '#00126b'
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
}));

function NavHeader({ children }) {
  const classes = useStyles();

  return (
      <AppBar position="sticky" className={classes.toolbar}>
          {children}
      </AppBar>
  );
}

NavHeader.defaultProps = {

}


export default NavHeader



