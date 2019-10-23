import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  TextField,
  Divider,
  Button,
  Typography,
} from '@material-ui/core';

import './styles.css';


const QuestionForm = ({
  subjects,
  subject,
  onSubjectChange,

  themes,
  theme,
  onThemeChange,

  text,
  onTextChange,

  points,
  onPointsChange,

  answers,
  onAnswerChange,

  onSubmit,
}) => {
  const subjectsList = () => (
    <datalist id="subjects-list">
      {subjects.map((subj) => (
        <option key={subj.id}>{subj.name}</option>
      ))}
    </datalist>
  );

  const themesList = () => (
    <datalist id="themes-list">
      {themes.map((t) => (
        <option key={t.id}>{t.name}</option>
      ))}
    </datalist>
  );

  return (
    <form onSubmit={onSubmit}>
      <Grid
        container
        direction="column"
        spacing={3}
      >
        <Grid
          container
          item
          direction="row"
          xs={12}
          justify="space-between"
          spacing={1}
        >
          <Grid item xs={12} sm={5}>
            <TextField
              value={subject}
              onChange={onSubjectChange}
              inputProps={{ list: 'subjects-list' }}
              fullWidth
              label="Subject"
              type="text"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              value={theme}
              onChange={onThemeChange}
              inputProps={{ list: 'themes-list' }}
              fullWidth
              label="Theme"
              type="text"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            {/* the points are in a type="text", since for whatever reason
            the material-ui component fucks up the number checking
            and doesn't display the correct value */}
            <TextField
              value={points}
              onChange={onPointsChange}
              fullWidth
              label="Points"
              type="text"
              variant="outlined"
            />
          </Grid>
          {subjectsList()}
          {themesList()}
        </Grid>

        <Divider />

        <Grid
          container
          item
          direction="row"
          xs={12}
          spacing={1}
        >
          <Grid item xs={12}>
            <TextField
              value={text}
              onChange={onTextChange}
              fullWidth
              multiline
              rows={3}
              label="Question text"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Divider />

        <Grid
          container
          item
          direction="column"
          wrap="nowrap"
          xs={12}
          spacing={1}
        >
          <Grid item xs={12}><Typography>Correct answers</Typography></Grid>
          {answers.filter((a) => a.correct).map((answer) => (
            <Grid key={answer.id} item xs={12}>
              <TextField
                value={answer.text}
                onChange={(e) => onAnswerChange(e, answer.id)}
                fullWidth
                type="text"
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>

        <Divider />

        <Grid
          container
          item
          direction="column"
          wrap="nowrap"
          spacing={1}
          xs={12}
        >
          <Grid item xs={12}><Typography>Incorrect answers</Typography></Grid>
          {answers.filter((a) => !a.correct).map((answer) => (
            <Grid key={answer.id} item xs={12}>
              <TextField
                value={answer.text}
                onChange={(e) => onAnswerChange(e, answer.id)}
                fullWidth
                type="text"
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>

        <Divider />

        <Grid
          container
          item
        >
          <Grid item xs={12}><Typography align="center" color="error" gutterBottom>Implmenet media selector</Typography></Grid>
        </Grid>

        <Divider />

        <Grid
          container
          item
          justify="flex-end"
          spacing={1}
        >
          <Grid item xs={12} sm={4}><Button type="submit" variant="contained" fullWidth>Submit</Button></Grid>
        </Grid>
      </Grid>
    </form>
  );
};

QuestionForm.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
  subject: PropTypes.string.isRequired,
  onSubjectChange: PropTypes.func.isRequired,

  themes: PropTypes.arrayOf(PropTypes.object).isRequired,
  theme: PropTypes.string.isRequired,
  onThemeChange: PropTypes.func.isRequired,

  text: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,

  points: PropTypes.number.isRequired,
  onPointsChange: PropTypes.func.isRequired,

  answers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAnswerChange: PropTypes.func.isRequired,

  onSubmit: PropTypes.func.isRequired,
};

export default QuestionForm;