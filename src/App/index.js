import './App.css';
import { makeStyles } from '@material-ui/core/styles';

import PhotoMain from '../_photos'
 
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: '#383838',
    minHeight: '100vh'
  }
})
)

function App() {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <PhotoMain />
    </div>
  );
}

export default App;
