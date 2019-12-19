import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import examApi from '../../api/exam';

class StudentExamResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { examId } = match.params;
    // TODO: Grab the student id somehow
    const studentId = 3;

    examApi
      .getStudentExamResults(examId, studentId)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <p>Student exam result component renders!</p>
    );
  }
}

StudentExamResult.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      examId: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(StudentExamResult);
