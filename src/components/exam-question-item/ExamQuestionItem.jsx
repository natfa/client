import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import MediaList from '../media-list';
import MediaListItem from '../media-list-item';
import PaddedPaper from '../padded-paper';

class ExamQuestionItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
    };

    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  openDialog() {
    this.setState((state) => ({ ...state, dialogOpen: true }));
  }

  closeDialog() {
    this.setState((state) => ({ ...state, dialogOpen: false }));
  }

  render() {
    const { dialogOpen } = this.state;
    const { question } = this.props;

    return (
      <PaddedPaper square elevation={2}>
        <Grid
          container
          direction="column"
          justify="space-between"
          wrap="nowrap"
        >
          <Grid item>
            <Typography>{question.text}</Typography>
          </Grid>

          <Grid item>
            <ul>
              <Grid
                container
                direction="row"
                justify="space-between"
                wrap="wrap"
                spacing={2}
              >
                {question.answers.map((answer) => {
                  const props = answer.correct
                    ? { style: { color: 'green' } }
                    : { color: 'error' };

                  return (
                    <Grid key={answer.id} item xs={6}>
                      <li>
                        <Typography {...props}>
                          {answer.text}
                        </Typography>
                      </li>
                    </Grid>
                  );
                })}
              </Grid>
            </ul>
          </Grid>

          <Grid
            item
            container
            justify="space-between"
            alignItems="center"
          >
            <span>{`Точки: ${question.points}`}</span>
            <Button
              onClick={this.openDialog}
              disabled={!question.media}
              variant="text"
            >
              прикачени файлове
            </Button>
          </Grid>
        </Grid>

        {question.media
        && (
          <Dialog
            open={dialogOpen}
            onClose={this.closeDialog}
          >
            <DialogTitle align="center">Прикачени файлове</DialogTitle>
            <DialogContent dividers>
              <MediaList media={question.media} />
            </DialogContent>
          </Dialog>
        )}
      </PaddedPaper>
    );
  }
}

ExamQuestionItem.propTypes = {
  question: PropTypes.shape({
    text: PropTypes.string,
    points: PropTypes.number,
    answers: PropTypes.arrayOf(PropTypes.object),
    media: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default ExamQuestionItem;
