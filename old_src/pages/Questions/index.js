import React from 'react'
import dispatcher from '../../dispatcher'

import './styles.css'

import QuestionForm from '../../components/QuestionForm'
import QuestionList from '../../components/QuestionList'
import Modal from '../../components/Modal'

class Questions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      subjects: [],
      questions: [],
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

  async componentDidMount() {
    try {
      const [questions, subjects] = await Promise.all([
        dispatcher.questions.getAll(),
        dispatcher.subjects.getAll(),
      ])

      if (!questions) {
        console.error(`dispatcher.questions.getAll() returned ${questions}`)
        return
      }

      if (!subjects) {
        console.error(`dispatcher.subjects.getAll() returned ${subjects}`)
        return
      }

      this.setState({ questions, subjects })
    }
    catch(err) {
      alert('Something went wrong')
      console.error(err)
    }
  }

  async getThemes(subject) {
    try {
      const themes = await dispatcher.themes.getAllBySubjectid(subject.id)

      if (!themes) {
        console.error(`dispatcher.themes.getAllBySubjectid(${subject.id}) returned ${themes}`)
        return
      }

      return themes
    }
    catch(err) {
      alert('Something went wrong')
      console.error(err)
    }
  }

  async createQuestion(formData) {
    try {
      const response = await dispatcher.questions.createOne(formData)

      if (!response.success) {
        console.error(response.data)
      }

      this.setState((state) => ({ questions: [...state.questions, response.data] }))
    }
    catch(err) {
      alert('Something went wrong')
      console.error(err)
    }
  }

  async deleteQuestion(id) {
    try {
      const success = await dispatcher.questions.deleteById(id)

      if (!success) {
        alert('Deletion failed')
        console.error(`dispatcher.questions.deleteById(${id}) failed`)
        return
      }

      this.setState((state) => {
        const questions = state.questions.filter((q) => q.id !== id)
        return { questions: questions }
      })
    }
    catch(err) {
      alert('Something went wrong')
      console.error(err)
    }
  }

  updateQuestion(questionId, formData) {
    this.deleteQuestion(questionId)
    this.createQuestion(formData)
    this.closeUpdateModal()
  }

  async openEditQuestion(id) {
    try {
      const question = await dispatcher.questions.getById(id)

      if (!question) {
        console.error(`dispatcher.questions.getById(${id}) returned ${question}`)
        return
      }

      this.setState({ question: { updating: true, data: question }})
    }
    catch(err) {
      alert('Something went wrong')
      console.error(err)
    }
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
            questions={this.state.questions}
            subjects={this.state.subjects}
            handleEdit={this.openEditQuestion}
            handleDelete={this.deleteQuestion}
          />
        </div>
      </div>
    )
  }
}

export default Questions
