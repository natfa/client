import React from 'react'
import dispatcher from '../../dispatcher/'

import './styles.css'

import QuestionForm from '../../components/QuestionForm'
import QuestionList from '../../components/QuestionList'

class QuestionsPage extends React.Component {
  constructor(props) {
    super(props)

    const subjects = [
      { id: 1, name: 'Programming' },
      { id: 2, name: 'Math' },
    ]

    const themes = [
      { id: 1, subjectid: 1, name: 'Web development' },
      { id: 2, subjectid: 1, name: 'Software development' },
      { id: 3, subjectid: 2, name: 'Calculus' },
      { id: 4, subjectid: 2, name: 'Geometry' },
    ]

    this.state = {
      questions: [],
      subjects: subjects,
      allThemes: themes,
    }

    this.getThemes = this.getThemes.bind(this)

    this.createQuestion = this.createQuestion.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
  }

  componentDidMount() {
    dispatcher.questions.getAll()
      .then((res) => {
        if (!res.success) {
          alert('Implement proper user feedback!')
          console.log(res)
          return
        }

        this.setState({ questions: res.data })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  getThemes(subjectId) {
    return this.state.allThemes.filter((t) => t.subjectid === subjectId)
  }

  createQuestion(formData) {
    dispatcher.questions.createOne(formData)
      .then((res) => {
        if (!res.success) {
          alert('Implement proper user feedback!')
          console.error(res)
        }

        this.setState((state) => ({ questions: [...state.questions, res.data] }))
      })
      .catch((err) => {
        alert('Implement proper user feedback!')
        console.error(err)
      })
  }

  deleteQuestion(id) {
    dispatcher.questions.deleteById(id)
      .then((res) => {
        if (!res.success) {
          alert('Implement proper user feedback!')
          console.error(res)
        }

        this.setState((state) => {
          const questions = state.questions.filter((q) => q.id !== id)
          return { questions: questions }
        })
      })
      .catch((err) => {
        alert('Implement proper user feedback!')
        console.error(err)
      })
  }

  render() {
    return (
      <div className="QuestionsPage">
        <div className="form">
          <QuestionForm
            subjects={this.state.subjects}
            getThemes={this.getThemes}
            handleSubmit={this.createQuestion}
          />
        </div>
        <div className="list">
          <QuestionList
            subjects={this.state.subjects}
            questionList={this.state.questions}
            handleEdit={() => alert('Implement handle edit question')}
            handleDelete={this.deleteQuestion}
          />
        </div>
      </div>
    )
  }
}

export default QuestionsPage
