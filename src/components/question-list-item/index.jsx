import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Loop';
import CloseIcon from '@material-ui/icons/Close';

import PaddedPaper from '../padded-paper';
import QuestionFormManager from '../../containers/question-form-manager';

const QuestionListItem = ({
  open,
  question,

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
          <Typography variant="body1" color="textPrimary" gutterBottom paragraph>{question.text}</Typography>
          <Typography variant="subtitle1" color="textSecondary">{`${question.subject.name} • ${question.theme.name}`}</Typography>
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
          {open
          && (
            <QuestionFormManager
              question={question}
              onSubmit={(newId) => onUpdate(question.id, newId)}
            />
          )}
        </Collapse>
      </Grid>
    </Grid>
  </PaddedPaper>
);

QuestionListItem.propTypes = {
  open: PropTypes.bool,
  question: PropTypes.shape({
    id: PropTypes.string,
    points: PropTypes.number,
    text: PropTypes.string,
    subject: PropTypes.object,
    theme: PropTypes.object,
    answers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,

  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

QuestionListItem.defaultProps = {
  open: false,
};

export default QuestionListItem;
