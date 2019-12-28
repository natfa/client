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
      this.setState((state) => ({ ...state, questions }));
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

  handleUpdate(data) {
    questionAPI
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
            key={question.id}
            open={question.id === questionId}
            question={question}
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
