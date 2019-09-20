import React from 'react'
import dispatcher from '../../dispatcher/'

import './styles.css'

import QuestionForm from '../../components/QuestionForm'
import QuestionList from '../../components/QuestionList'
import Modal from '../../components/Modal'

class QuestionsPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      subjects: [],
      question: {
        updating: false,
        data: null,
      },
    }

    this.createQuestion = this.createQuestion.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
    this.openEditQuestion = this.openEditQuestion.bind(this)
    this.closeUpdateModal = this.closeUpdateModal.bind(this)
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

    dispatcher.subjects.getAll()
      .then((res) => {
        if (!res.success) {
          alert('Implement proper user feedback!')
          console.error(res)
          return
        }

        this.setState({ subjects: res.data })
      })
      .catch((err) => {
      })
  }

  getThemes(subject) {
    return new Promise((resolve, reject) => {
      dispatcher.themes.getAllBySubjectid(subject.id)
        .then((res) => {
          if (!res.success) {
            alert('Implement proper user feedback!')
            console.error(res)
            return
          }

          return resolve(res.data)
        })
        .catch((err) => {
          alert('Implement proper user feedback!')
          console.error(err)
        })
    })
  }

  createQuestion(formData) {
    dispatcher.questions.createOne(formData)
      .then((res) => {
        if (!res.success) {
          alert('Implement proper user feedback!')
          console.error(res)
          return
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
          return
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

  updateQuestion(questionId, formData) {
    this.deleteQuestion(questionId)
    this.createQuestion(formData)
    this.closeUpdateModal()
  }

  openEditQuestion(id) {
    dispatcher.questions.getById(id)
      .then((res) => {
        if (!res.success) {
          alert('Implement proper user feedback!')
          console.error(res)
          return
        }

        const question = res.data
        this.setState({ question: { updating: true, data: question }})
      })
  }

  closeUpdateModal() {
    this.setState({ question: { updating: false, data: null }})
  }

  renderUpdateModal() {
    if (!this.state.question.updating) {
      return
    }

    const question = this.state.question.data

    return (
        <Modal
          show={this.state.question.updating}
          handleClose={this.closeUpdateModal}
          header={'Updating question'}
        >
          <QuestionForm
            subjects={this.state.subjects}
            getThemes={this.getThemes}
            handleSubmit={(formData) => this.updateQuestion(question.id, formData)}
            text={question.text}
            points={question.points}
            answers={question.answers}
            subject={question.subject}
            theme={question.theme}
            showMedia={false}
          />
        </Modal>
    )
  }

  render() {
    return (
      <div className="QuestionsPage">

        {this.renderUpdateModal()}

        <div className="form">
          <QuestionForm
            showMedia={true}
            subjects={this.state.subjects}
            getThemes={this.getThemes}
            handleSubmit={this.createQuestion}
          />
        </div>
        <div className="list">
          <QuestionList
            subjects={this.state.subjects}
            handleEdit={this.openEditQuestion}
            handleDelete={this.deleteQuestion}
          />
        </div>
      </div>
    )
  }
}

export default QuestionsPage
