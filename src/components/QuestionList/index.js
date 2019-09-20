import React from 'react';

import './styles.css';

class QuestionList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filters: {
        text: '',
        subjectid: null,
      }
    }

    this.handleSubjectChange = this.handleSubjectChange.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  componentDidMount() {
    if (this.props.subjects.length === 0)
      return

    const subjectid = this.props.subjects[0].id
    this.setState((state) => ({
      filters: Object.assign({}, state.filters, {
        subjectid: subjectid,
      })
    }))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.subjects.length === this.props.subjects.length)
      return

    const subjectid = this.props.subjects[0].id
    this.setState((state) => ({
      filters: Object.assign({}, state.filters, {
        subjectid: subjectid,
      })
    }))
  }

  editQuestion (id) {
    this.props.handleEdit(id)
  }

  deleteQuestion (id) {
    this.props.handleDelete(id)
  }

  handleSubjectChange(e) {
    const selectedOption = e.target[e.target.selectedIndex]
    const subjectid = selectedOption.dataset.subjectid
    this.setState((state) => ({
      filters: Object.assign({}, state.filters, {
        subjectid: subjectid,
      })
    }))
  }

  handleTextChange(e) {
    const text = e.target.value
    this.setState((state) => ({
      filters: Object.assign({}, state.filters, {
        text: text,
      })
    }))
  }

  renderQuestionList() {
    const notFound = (<p style={{textAlign: 'center'}}>Няма намерени въпроси</p>)

    if (!this.props.questions || this.props.questions.length === 0)
      return notFound

    let questions = []

    if (this.state.filters.subjectid === null)
      questions = this.props.questions
    else
      questions = this.props.questions
        .filter(q => q.subject.id === this.state.filters.subjectid)

    if (this.state.filters.text && this.state.filters.text.length > 2)
      questions = questions
        .filter(q => q.text.toLowerCase().includes(this.state.filters.text.toLowerCase()))

    return questions.length > 0 ?
      questions.map((question) => {
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
      }) : notFound
  }

  renderSubjectsFilter() {
    return (
      <select onChange={this.handleSubjectChange}>
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
          <label>Филтър по предмет
            <div>
              {this.renderSubjectsFilter()}
            </div>
          </label>
          <label>
            Филтър по текст (поне 3 символа)
            <div>
              <input type="search" placeholder="Текст" onChange={this.handleTextChange} />
            </div>
          </label>
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
      <div>{props.text}</div>
      <div>
        <div className="subject">{props.subject}</div>
        <div className="controls">
          <button onClick={props.handleEdit}>Промени</button>
          <button onClick={props.handleDelete}>Изтрий</button>
        </div>
      </div>
    </div>
  );
}

export default QuestionList
