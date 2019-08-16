import React from 'react';

import QuestionForm from './QuestionForm/';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div>
        <QuestionForm />
      </div>
    );
  }
}

export default Question;
