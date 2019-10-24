import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import QuestionListItem from '../../components/question-list-item';
import questionAPI from '../../api/question';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
    };
  }

  async componentDidMount() {
    try {
      const questions = await questionAPI.getAll();
      console.log(questions);

      this.setState({ questions });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { questions } = this.state;

    return (
      <Grid
        container
        direction="column"
        spacing={2}
      >
        {questions.map((question) => (
          <QuestionListItem key={question.id} text={question.text} />
        ))}
      </Grid>
    );
  }
}

export default QuestionList;
