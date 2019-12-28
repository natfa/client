import React from 'react';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBack';
import ForwardIcon from '@material-ui/icons/ArrowForward';

import QuestionListItem from '../../components/question-list-item';
import LoadingAnimation from '../../components/loading-animation';

import questionApi from '../../api/question';

import './styles.css';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      questionId: undefined,
      questions: null,
      page: 1,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    questionApi
      .getAll()
      .then((questions) => {
        this.setState((state) => ({ ...state, questions }));
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

  handleSearchChange(e) {
    const { value } = e.target;

    this.setState((state) => ({ ...state, searchValue: value }));
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
      searchValue,
      page,
    } = this.state;

    if (questions === null) {
      return <LoadingAnimation />;
    }

    // round up so that all questions can be housed somewhere
    const pages = Math.ceil(questions.length / 10);

    return (
      <Grid
        container
        direction="column"
        spacing={2}
      >
        {questions.map((question, i) => {
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
        })}

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
