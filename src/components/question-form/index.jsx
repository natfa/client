import React from 'react';
import PropTypes from 'prop-types';

import Zoom from '@material-ui/core/Zoom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';

import MediaUploader from '../media-uploader';
import MediaList from '../media-list';
import MediaListItem from '../media-list-item';

import './styles.css';


const QuestionForm = ({
  subjectError,
  themeError,
  textError,
  pointsError,
  correctAnswersError,
  incorrectAnswersError,

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
  onAnswerDelete,
  onAddAnswer,

  media,
  onMediaUpload,
  onMediaDelete,

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

  const renderAnswers = (correct) => {
    const errorMessage = correct ? correctAnswersError : incorrectAnswersError;

    let header = `${correct ? 'Верни' : 'Неверни'} отговори`;
    if (errorMessage) {
      header += ` * ${errorMessage}`;
    }

    return (
      <Grid
        container
        item
        direction="column"
        wrap="nowrap"
        spacing={1}
      >
        <Grid item xs={12}>
          <Typography
            color={errorMessage !== undefined ? 'error' : 'textPrimary'}
          >
            {header}
          </Typography>
        </Grid>

        {answers.filter((a) => a.correct === correct).map((answer) => (
          <Grid
            container
            item
            key={answer.id}
            xs={12}
          >
            <Grid item xs={11}>
              <TextField
                value={answer.text}
                onChange={(e) => onAnswerChange(e, answer.id)}
                fullWidth
                type="text"
                variant="outlined"
              />
            </Grid>
            <Grid style={{ textAlign: 'center' }} item xs={1}>
              <IconButton onClick={() => onAnswerDelete(answer.id)}><DeleteIcon /></IconButton>
            </Grid>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button onClick={() => onAddAnswer(correct)} startIcon="+" color="secondary">
            отговор
          </Button>
        </Grid>
      </Grid>
    );
  };

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
              label="Предмет"
              type="text"
              variant="outlined"
              error={subjectError !== undefined}
              helperText={subjectError}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              value={theme}
              onChange={onThemeChange}
              inputProps={{ list: 'themes-list' }}
              fullWidth
              label="Тема"
              type="text"
              variant="outlined"
              error={themeError !== undefined}
              helperText={themeError}
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
              label="Точки"
              type="text"
              variant="outlined"
              error={pointsError !== undefined}
              helperText={pointsError}
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
              label="Текст"
              variant="outlined"
              error={textError !== undefined}
              helperText={textError}
            />
          </Grid>
        </Grid>

        <Divider />

        {renderAnswers(true)}

        <Divider />

        {renderAnswers(false)}

        <Divider />

        <Grid
          container
          item
          spacing={1}
        >
          <Grid item xs={12}>
            <MediaUploader onUpload={onMediaUpload} />
          </Grid>
          <Grid item xs={12}>
            <MediaList>
              {media.map((m) => (
                <Zoom in key={m.url}>
                  <MediaListItem src={m.url} onRemove={() => onMediaDelete(m.url)} />
                </Zoom>
              ))}
            </MediaList>
          </Grid>
        </Grid>

        <Divider />

        <Grid
          container
          item
          justify="flex-end"
          spacing={1}
        >
          <Grid item xs={12} sm={4}>
            <Button color="primary" type="submit" variant="contained" fullWidth>
              запази
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

QuestionForm.propTypes = {
  subjectError: PropTypes.string,
  themeError: PropTypes.string,
  textError: PropTypes.string,
  pointsError: PropTypes.string,
  correctAnswersError: PropTypes.string,
  incorrectAnswersError: PropTypes.string,

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
  onAnswerDelete: PropTypes.func.isRequired,
  onAddAnswer: PropTypes.func.isRequired,

  media: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMediaUpload: PropTypes.func.isRequired,
  onMediaDelete: PropTypes.func.isRequired,

  onSubmit: PropTypes.func.isRequired,
};

QuestionForm.defaultProps = {
  subjectError: undefined,
  themeError: undefined,
  textError: undefined,
  pointsError: undefined,
  correctAnswersError: undefined,
  incorrectAnswersError: undefined,
};

export default QuestionForm;
