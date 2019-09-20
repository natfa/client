import React from 'react';
import dispatcher from '../../dispatcher/'

import './styles.css';

class QuestionList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      allQuestions: [],
      displayedQuestions: null,
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
      this.setState({ allQuestions: questions })
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
      this.setState({ allQuestions: questions })
    }
    catch(err) {
      alert('Implement proper user feedback!')
      console.error(err)
    }
  }

  handleTextChange(e) {
    const text = e.target.value

    if (text.length < 3) {
      this.setState({ displayedQuestions: null })
    }
    else {
      const filtered = this.state.allQuestions.filter(q => q.text.toLowerCase().includes(text.toLowerCase()))
      this.setState({ displayedQuestions: filtered })
    }
  }

  renderQuestionList() {
    const questions = this.state.displayedQuestions === null ?
      this.state.allQuestions :
      this.state.displayedQuestions

    const listItems = questions.map((question) => {
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

    if (listItems.length === 0)
      return <p style={{'text-align': 'center'}}>Няма намерени въпроси</p>

    return listItems
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
