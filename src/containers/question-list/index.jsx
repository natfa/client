import React from 'react';

import QuestionListItem from '../../components/question-list-item';
import questionAPI from '../../api/question';

import './styles.css';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    try {
      const questions = await questionAPI.getAll();
      this.setState({ questions });
    } catch (err) {
      console.error(err);
    }
  }

  handleUpdate(id) {
    console.error('Not implemented');
  }

  handleDelete(id) {
    questionAPI.deleteOneById(id);

    this.setState((state) => ({
      questions: state.questions.filter((q) => q.id !== id),
    }));
  }

  render() {
    const { questions } = this.state;

    return (
      <div className="question-list">
        {questions.map((question) => (
          <QuestionListItem
            key={question.id}
            text={question.text}
            subject={question.subject.name}
            theme={question.theme.name}
            onUpdate={() => this.handleUpdate(question.id)}
            onDelete={() => this.handleDelete(question.id)}
          />
        ))}
      </div>
    );
  }
}

export default QuestionList;
