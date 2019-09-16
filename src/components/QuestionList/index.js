import React from 'react';

import './styles.css';

class QuestionList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filters: {
        disableDefault: false,
        subjectid: undefined,
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
    // This will disable the default value for the filter droplist
    if (!this.state.filters.disableDefault)
      this.setState((state) => ({ filters: Object.assign({}, state.filters, { disableDefault: true })}))

    const subject = {
      id: e.target.selectedOptions[0].dataset.id,
      name: e.target.value,
    }

    if (!subject.id)
      return

    this.setState((state) => ({
      filters: Object.assign({}, state.filters, {
        subjectid: subject.id,
      })
    }))

    if (this.state.filters.text.length > 2)
      this.props.filterQuestions(subject.id, this.state.filters.text)
    else
      this.props.filterQuestions(subject.id)
  }

  handleTextChange(e) {
    const text = e.target.value
    this.setState((state) => ({ filters: Object.assign({}, state.filters, { text }) }))

    if (this.state.filters.subjectid !== undefined) {
      if (text.length > 2)
        this.props.filterQuestions(this.state.filters.subjectid, text)
      else if (this.state.filters.text.length > 2)
        this.props.filterQuestions(this.state.filters.subjectid)
    }
  }

  renderQuestionList() {
    const listItems = this.props.questionList.map((question) => {
      return (
        <Item
          text={question.text}
          subject={question.subject.name}
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
          return <option data-id={subject.id} key={subject.id}>{subject.name}</option>
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
