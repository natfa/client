import React from 'react';

import examApi from '../api/exam';

function allExams(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        exams: null,
      };
    }

    componentDidMount() {
      examApi
        .getAll()
        .then((exams) => {
          if (exams === null) {
            throw new Error('Fetched exams are null...');
          }

          this.setState((state) => ({ ...state, exams }));
        })
        .catch((err) => console.error(err));
    }

    render() {
      const { exams } = this.state;

      return (
        <Component {...this.props} exams={exams} />
      );
    }
  };
}

export default allExams;
