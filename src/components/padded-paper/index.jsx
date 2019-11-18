import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';

const PaddedPaper = withStyles({
  root: {
    padding: '1rem',
  },
})(Paper);

export default PaddedPaper;
