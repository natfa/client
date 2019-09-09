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
        <Item
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

  renderSubjectsFilter() {
    return (
      <select>
        {this.props.subjects.map((subject) => {
          return <option key={subject.id}>{subject.name}</option>
        })}
      </select>
    )
  }

  render() {
    return (
      <div className="QuestionList">
        <div className="filters">
          {this.renderSubjectsFilter()}
          <input type="search" />
        </div>
        <div className="list">
          {this.renderQuestionList()}
        </div>
      </div>
    );
  }
}

function Item(props) {
  return (
    <div className="Item">
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
