import React from 'react'
import store from '../../store/'
import config from '../../config/default'
import { changePage } from '../../store/actions'

import './styles.css'

import QuestionForm from './QuestionForm/'
import QuestionList from './QuestionList/'

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: []
    }
  }

  componentDidMount() {
    const url = `http://${config.api.hostname}:${config.api.port}/api/question`
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

  handlePageChange() {
    store.dispatch(changePage('TEST_EDIT'))
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
