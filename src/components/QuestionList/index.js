import React from 'react';

import './styles.css';

class QuestionList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filters: {
        disableDefault: false,
        subject: undefined,
        text: '',
      }
    }

    this.handleSubjectChange = this.handleSubjectChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  editQuestion (id) {
    this.props.handleEdit(id)
  }

  deleteQuestion (id) {
    this.props.handleDelete(id)
  }

  handleSubjectChange(e) {
    const subject = e.target.value

    if (this.state.filters.text.length > 2)
      this.filterQuestions(subject, this.state.filters.text)
    else
      this.filterQuestions(subject)

    this.setState((state) => ({
      filters: {
        subject: subject,
        text: state.filters.text,
        disableDefault: true,
      }
    }))
  }

  handleTextChange(e) {
    const text = e.target.value

    if (this.state.filters.subject) {
      if (text.length > 2) {
        this.filterQuestions(this.state.filters.subject, text)
      } else if (this.state.filters.text.length > 2) {
        this.filterQuestions(this.state.filters.subject)
      }
    }

    this.setState((state) => ({
      filters: {
        subject: state.filters.subject,
        text: text,
        disableDefault: state.filters.disableDefault,
      }
    }))
  }

  filterQuestions(subject, text) {
    if (subject) {
      let filters = { subject }

      if (text && text.length > 2)
        filters = Object.assign({}, filters, { text })

      this.props.filterQuestions(filters)
    }
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
      <select value={this.state.filters.subject} onChange={this.handleSubjectChange}>
        {!this.state.filters.disableDefault &&
          <option> -- select a filter -- </option>
        }
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
          <input type="search" value={this.state.filters.text} onChange={this.handleTextChange} />
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
