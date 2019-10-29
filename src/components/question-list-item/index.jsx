import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Loop';
import CloseIcon from '@material-ui/icons/Close';

import QuestionFormManager from '../../containers/question-form-manager';

// TODO: find a way to use the theme's spacing
const PaddedPaper = withStyles({
  root: {
    padding: '1rem',
  },
})(Paper);

const QuestionListItem = ({
  open,
  questionId,

  text,
  subject,
  theme,

  onOpen,
  onClose,

  onUpdate,
  onDelete,
}) => (
  <PaddedPaper
    elevation={2}
    square
  >
    <Grid
      container
      direction="column"
      spacing={4}
    >
      <Grid
        item
        container
        spacing={1}
        direction="row"
        alignItems="center"
      >
        <Grid xs={10} item>
          <Typography variant="body1" color="textPrimary" gutterBottom paragraph>{text}</Typography>
          <Typography variant="subtitle1" color="textSecondary">{`${subject} • ${theme}`}</Typography>
        </Grid>

        <Grid style={{ textAlign: 'right' }} xs={1} sm item>
          {open ? (
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton onClick={onOpen}>
              <UpdateIcon />
            </IconButton>
          )}
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>


      <Grid item>
        <Collapse in={open}>
          <QuestionFormManager
            questionId={open ? questionId : undefined}
            onSubmit={onUpdate}
          />
        </Collapse>
      </Grid>
    </Grid>
  </PaddedPaper>
);

QuestionListItem.propTypes = {
  open: PropTypes.bool,
  questionId: PropTypes.string,

  text: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,

  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

QuestionListItem.defaultProps = {
  open: false,
  questionId: undefined,
};

export default QuestionListItem;
