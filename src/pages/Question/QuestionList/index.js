import React from 'react';

import './styles.css';

class QuestionList extends React.Component {

  editQuestion (id) {
    this.props.handleEdit(id)
  }

  deleteQuestion (id) {
    this.props.handleDelete(id)
  }

  renderQuestionList() {
    const listItems = this.props.questionList.map((question) => {
      return (
        <QuestionListItem
          text={question.text}
          subject={question.subject}
          key={question.id}
          id={question.id}
          handleEdit={() => this.editQuestion(question.id)}
          handleDelete={() => this.deleteQuestion(question.id)}
        />
      )
    })
    return listItems
  }

  render() {
    return (
      <div className="QuestionList">
        <div className="filters">
          <select>
            <option>Math</option>
            <option>Programming</option>
          </select>
          <input type="search" />
        </div>
        <div className="list">
          {this.renderQuestionList()}
        </div>
      </div>
    );
  }
}

function QuestionListItem(props) {
  return (
    <div className="QuestionListItem">
      <div className="info">
        <div className="text">{props.text}</div>
        <div className="subject">{props.subject}</div>
      </div>
      <button onClick={props.handleEdit}>Промени</button>
      <button onClick={props.handleDelete}>Изтрий</button>
    </div>
  );
}

export default QuestionList
