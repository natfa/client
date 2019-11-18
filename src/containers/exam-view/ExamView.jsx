import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ExamQuestionList from '../../components/exam-question-list';
import LoadingAnimation from '../../components/loading-animation';
import examApi from '../../api/exam';

class ExamView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exam: null,
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    try {
      const response = await examApi.getOneById(match.params.id);
      if (!response.success) {
        console.error(response.data);
        return;
      }

      this.setState((state) => ({ ...state, exam: response.data }));
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { exam } = this.state;

    if (exam === null) {
      return <LoadingAnimation />;
    }

    return (
      <Grid container direction="row">
        <Grid item sm={9}>
          <Typography>{exam.name}</Typography>

          <ExamQuestionList
            questions={exam.questions}
          />
        </Grid>

        <Grid item sm={3}>
          Sidebar
        </Grid>
      </Grid>
    );
  }
}

ExamView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default withRouter(ExamView);
