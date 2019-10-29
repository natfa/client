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

  async handleUpdate(id, formData) {
    const response = await questionAPI.createOne(formData);
    if (!response.success) {
      alert('Something went wrong');
      console.error(response.data);
      return;
    }

    const question = response.data;
    questionAPI.deleteOneById(id);

    this.setState((state) => {
      const questions = state.questions.filter((q) => q.id !== id);

      return {
        questionId: undefined,
        questions: [...questions, question],
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
            onUpdate={(formData) => this.handleUpdate(question.id, formData)}
            onDelete={() => this.handleDelete(question.id)}
          />
        ))}
      </div>
    );
  }
}

export default QuestionList;
