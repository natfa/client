import React from 'react'

import './styles.css'

import QuestionForm from '../../components/QuestionForm'

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
      subjects: subjects,
      allThemes: themes,
    }

    this.getThemes = this.getThemes.bind(this)
    this.createQuestion = this.createQuestion.bind(this)
  }

  getThemes(subjectId) {
    return this.state.allThemes.filter((t) => t.subjectid === subjectId)
  }

  createQuestion(formData) {
    alert('Creating question')
    console.log(formData)
  }

  render() {
    return (
      <div className="QuestionsPage">
        <QuestionForm
          subjects={this.state.subjects}
          getThemes={this.getThemes}
          selectedSubject={this.state.subjects[1]}
          handleSubmit={this.createQuestion}
        />
        <div></div>
      </div>
    )
  }
}

export default QuestionsPage
