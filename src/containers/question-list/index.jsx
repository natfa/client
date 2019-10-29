import React from 'react';

import QuestionListItem from '../../components/question-list-item';
import questionAPI from '../../api/question';

import './styles.css';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionId: undefined,
      questions: [],
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

  handleOpen(id) {
    this.setState((state) => ({ ...state, questionId: id }));
  }

  handleClose() {
    this.setState({ questionId: undefined });
  }

  async handleUpdate(oldId, newId) {
    questionAPI.deleteOneById(oldId);
    const question = await questionAPI.getOneById(newId);

    this.setState((state) => {
      const questions = state.questions.map((q) => {
        if (q.id === oldId) {
          return {
            id: question.id,
            points: Number(question.points),
            text: question.text,
            subject: question.subject,
            theme: question.theme,
          };
        }
        return q;
      });

      return {
        questionId: undefined,
        questions: [...questions],
      };
    });
  }

  handleDelete(id) {
    questionAPI.deleteOneById(id);

    this.setState((state) => ({
      questions: state.questions.filter((q) => q.id !== id),
    }));
  }

  render() {
    const { questionId, questions } = this.state;

    return (
      <div className="question-list">
        {questions.map((question) => (
          <QuestionListItem
            open={question.id === questionId}
            questionId={question.id}
            key={question.id}
            text={question.text}
            subject={question.subject.name}
            theme={question.theme.name}
            onOpen={() => this.handleOpen(question.id)}
            onClose={this.handleClose}
            onUpdate={this.handleUpdate}
            onDelete={() => this.handleDelete(question.id)}
          />
        ))}
      </div>
    );
  }
}

export default QuestionList;
