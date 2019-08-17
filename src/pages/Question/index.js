import React from 'react';

import './styles.css';

import QuestionForm from './QuestionForm/';
import QuestionList from './QuestionList/';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: []
    }
  }

  componentDidMount() {
    const url = 'http://localhost:3001/api/question';
    fetch(url, {
      method: 'GET',
      mode: 'cors',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ questions: data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="Question">
        <QuestionForm />
        <QuestionList questions={this.state.questions} />
      </div>
    );
  }
}

export default Question;
