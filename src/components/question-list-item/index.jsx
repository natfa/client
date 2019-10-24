import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Loop';

const FullWidthPaper = withStyles({
  root: {
    padding: '1rem',
    width: '100%',
  }
})(Paper);

const QuestionListItem = ({
  text,
}) => (
  <Grid
    container
    item
  >
    <FullWidthPaper
      elevation={2}
      square
    >
      <Grid
        container
        justify="space-between"
      >
        <Grid item>
          <Typography>{text}</Typography>
        </Grid>

        <Grid item>
          <IconButton>
            <UpdateIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </FullWidthPaper>
  </Grid>
);

QuestionListItem.propTypes = {
  text: PropTypes.string.isRequired,
};

export default QuestionListItem;
