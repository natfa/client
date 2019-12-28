import React from 'react';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';
import ForwardIcon from '@material-ui/icons/ArrowForward';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import QuestionListItem from '../../components/question-list-item';
import LoadingAnimation from '../../components/loading-animation';

import questionApi from '../../api/question';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    this.subjectSelectLabel = React.createRef();
    this.themeSelectLabel = React.createRef();

    this.state = {
      questionId: undefined,
      questions: null,
      page: 1,

      subjects: null,
      themes: null,

      textFilter: '',
      subjectFilter: null,
      themeFilter: null,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.handlePageChange = this.handlePageChange.bind(this);

    this.handleTextFilterChange = this.handleTextFilterChange.bind(this);
    this.handleSubjectFilterChange = this.handleSubjectFilterChange.bind(this);
    this.handleThemeFilterChange = this.handleThemeFilterChange.bind(this);
  }

  componentDidMount() {
    questionApi
      .getAll()
      .then((questions) => {
        let subjects = [];
        let themes = [];

        // populate subjects array
        questions.forEach((question) => {
          const subjectFound = subjects.find((subject) => subject.id === question.subject.id);
          const themeFound = themes.find((theme) => theme.id === question.theme.id);

          if (!subjectFound) {
            subjects = [...subjects, question.subject];
          }

          if (!themeFound) {
            themes = [...themes, question.theme];
          }
        });

        this.setState((state) => ({
          ...state,
          questions,
          subjects,
          themes,
        }));
      })
      .catch((err) => console.error(err));
  }

  handleOpen(id) {
    this.setState((state) => ({ ...state, questionId: id }));
  }

  handleClose() {
    this.setState({ questionId: undefined });
  }

  handleUpdate(data) {
    questionApi
      .updateOne(data)
      .then((response) => {
        if (!response.success) {
          console.error(response.data);
          return;
        }

        const question = response.data;

        this.setState((state) => {
          const questions = state.questions.map((q) => {
            if (q.id !== question.id) return q;
            return question;
          });

          return {
            ...state,
            questionId: undefined,
            questions,
          };
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleDelete(id) {
    questionApi.deleteOneById(id);

    this.setState((state) => ({
      questions: state.questions.filter((q) => q.id !== id),
    }));
  }

  handleTextFilterChange(e) {
    const { value } = e.target;

    this.setState((state) => ({
      ...state,
      textFilter: value,
      page: 1,
    }));
  }

  handleSubjectFilterChange(e) {
    const { value } = e.target;

    this.setState((state) => {
      const subject = state.subjects.find((s) => s.id === value);

      return {
        ...state,
        subjectFilter: subject,
        themeFilter: null, // reset the theme filter
        page: 1,
      };
    });
  }

  handleThemeFilterChange(e) {
    const { value } = e.target;

    this.setState((state) => {
      const theme = state.themes.find((t) => t.id === value);

      return {
        ...state,
        themeFilter: theme,
        page: 1,
      };
    });
  }

  handlePageChange(newPage) {
    this.setState((state) => ({ ...state, page: newPage }));

    // scroll to top automatically
    // the timeout is so that we can "make sure" that the page scrolls
    // since the setState function will execute sometime in the near future
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 100);
  }

  render() {
    const {
      questionId,
      questions,
      page,

      subjects,
      themes,

      textFilter,
      subjectFilter,
      themeFilter,
    } = this.state;

    if (questions === null) {
      return <LoadingAnimation />;
    }

    let availableThemeFilters = [];
    let filteredQuestions = questions;

    // filter by subject
    if (subjectFilter !== null) {
      filteredQuestions = filteredQuestions
        .filter((q) => q.subject.id === subjectFilter.id);

      availableThemeFilters = themes.filter((t) => t.subject.id === subjectFilter.id);
    }

    // filter by theme
    if (themeFilter !== null) {
      filteredQuestions = filteredQuestions
        .filter((q) => q.theme.id === themeFilter.id);
    }

    // filter by text
    if (textFilter !== '') {
      filteredQuestions = filteredQuestions
        .filter((q) => q.text.toLowerCase().includes(textFilter.toLowerCase()));
    }


    // round up so that all questions can be housed somewhere
    const pages = Math.ceil(filteredQuestions.length / 10);

    return (
      <Grid
        container
        direction="column"
        spacing={2}
      >

        <Grid
          item
          container
          direction="row"
          wrap="wrap"
          spacing={2}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Текст"
              onChange={this.handleTextFilterChange}
              variant="outlined"
              value={textFilter}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel ref={this.subjectSelectLabel} id="subject-filter-dropdown">Предмет</InputLabel>

              <Select
                value={subjectFilter ? subjectFilter.id : ''}
                onChange={this.handleSubjectFilterChange}
                labelId="subject-filter-dropdown"
                labelWidth={
                  this.subjectSelectLabel.current
                    ? this.subjectSelectLabel.current.offsetWidth
                    : 0
                }
              >
                {subjects.map((s) => (
                  <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl
              disabled={availableThemeFilters.length === 0}
              fullWidth
              variant="outlined"
            >
              <InputLabel ref={this.themeSelectLabel} id="theme-filter-dropdown">Тема</InputLabel>

              <Select
                value={themeFilter ? themeFilter.id : ''}
                onChange={this.handleThemeFilterChange}
                labelId="theme-filter-dropdown"
                labelWidth={
                  this.themeSelectLabel.current
                    ? this.themeSelectLabel.current.offsetWidth
                    : 0
                }
              >
                {availableThemeFilters.map((t) => (
                  <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

        </Grid>

        <Grid item>
          <Divider />
        </Grid>

        {filteredQuestions.length === 0
          ? (
            <Grid item>
              <Typography align="center" gutterBottom>Няма намерени въпроси</Typography>
            </Grid>
          ) : (
            filteredQuestions.map((question, i) => {
              const minIndex = page * 10 - 10;
              const maxIndex = page * 10 - 1;

              // skip rendering if not within own page
              if (i < minIndex || i > maxIndex) return null;

              return (
                <Grid
                  key={question.id}
                  item
                >
                  <QuestionListItem
                    key={question.id}
                    open={question.id === questionId}
                    question={question}
                    onOpen={() => this.handleOpen(question.id)}
                    onClose={this.handleClose}
                    onUpdate={this.handleUpdate}
                    onDelete={() => this.handleDelete(question.id)}
                  />
                </Grid>
              );
            })
          )}


        <Grid
          item
          container
          direction="row"
          wrap="nowrap"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <IconButton
              disabled={page <= 1}
              onClick={() => this.handlePageChange(page - 1)}
            >
              <BackIcon />
            </IconButton>
          </Grid>

          <Grid
            item
            container
            direction="row"
            wrap="nowrap"
            justify="center"
          >
            {[...Array(pages).keys()].map((_, i) => (
              <Grid
                key={i} // eslint-disable-line react/no-array-index-key
                item
              >
                <Button
                  size="large"
                  onClick={() => this.handlePageChange(i + 1)}
                  color={page === i + 1 ? 'primary' : 'default'}
                  variant={page === i + 1 ? 'outlined' : 'text'}
                >
                  {i + 1}
                </Button>
              </Grid>
            ))}
          </Grid>

          <Grid item>
            <IconButton
              disabled={page === pages}
              onClick={() => this.handlePageChange(page + 1)}
            >
              <ForwardIcon />
            </IconButton>
          </Grid>
        </Grid>

      </Grid>
    );
  }
}

export default QuestionList;
