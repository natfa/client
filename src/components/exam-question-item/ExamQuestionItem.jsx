import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import PaddedPaper from '../padded-paper';

const answers = [
  {
    id: '1',
    text: 'Exampple correct 1',
    correct: true,
  },
  {
    id: '2',
    text: 'A very long incorrect answer that hopefully is going to wrap around and do stuff',
    correct: false,
  },
  {
    id: '3',
    text: 'Another relatively long answer blah blah lorem ipsum fuck you lala',
    correct: false,
  },
  {
    id: '4',
    text: 'Example incorrect 3',
    correct: false,
  },
];

const ExamQuestionItem = ({ question }) => (
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
            {answers.map((answer) => {
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
        <Button variant="text">прикачени файлове</Button>
      </Grid>
    </Grid>
  </PaddedPaper>
);

ExamQuestionItem.propTypes = {
  question: PropTypes.shape({
    text: PropTypes.string,
    points: PropTypes.number,
  }).isRequired,
};

export default ExamQuestionItem;
