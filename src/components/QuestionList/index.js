import React from 'react';
import dispatcher from '../../dispatcher/'

import './styles.css';

class QuestionList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questions: [],
      filters: {
        disableDefault: false,
        subjectid: undefined,
        text: '',
      }
    }

    this.handleSubjectChange = this.handleSubjectChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.subjects.length === this.props.subjects.length)
      return

    try {
      const subjectid = this.props.subjects[0].id
      const questions = await this.getQuestionsBySubjectid(subjectid)
      this.setState({ questions })
    }
    catch(err) {
      alert('Implement proper user feedback!')
      console.error(err)
    }
  }

  editQuestion (id) {
    this.props.handleEdit(id)
  }

  deleteQuestion (id) {
    this.props.handleDelete(id)
  }

  async getQuestionsBySubjectid(subjectid) {
    try {
      const questions = await dispatcher.questions.getBySubjectid(subjectid)
      return questions.data
    }
    catch(err) {
      alert('Implement proper user feedback!')
      console.error(err)
    }
  }

  async handleSubjectChange(e) {
    const selectedOption = e.target[e.target.selectedIndex]
    const subjectid = selectedOption.dataset.subjectid

    if (!subjectid)
      return

    try {
      const questions = await this.getQuestionsBySubjectid(subjectid)
      this.setState({ questions })
    }
    catch(err) {
      alert('Implement proper user feedback!')
      console.error(err)
    }
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
    const listItems = this.state.questions.map((question) => {
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
        {this.props.subjects.map((subject) => {
          return <option data-subjectid={subject.id} key={subject.id}>{subject.name}</option>
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
