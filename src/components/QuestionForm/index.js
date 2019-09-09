import React from 'react'

import './styles.css'

class QuestionForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      correctInputs: 1,
      incorrectInputs: 3,
      selectedSubject: null,
      themes: [],
    }

    this.addAnswer = this.addAnswer.bind(this)
    this.renderAnswers = this.renderAnswers.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubjectChange = this.handleSubjectChange.bind(this)

    this.renderSubjects = this.renderSubjects.bind(this)
    this.renderThemes = this.renderThemes.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.subjects === prevProps.subjects)
      return

    const selectedSubject = this.props.selectedSubject ?
      this.props.selectedSubject :
      this.props.subjects[0]

    this.getAndSetThemes(selectedSubject)
    this.setState({ selectedSubject })
  }

  getAndSetThemes(subject) {
    this.props.getThemes(subject)
      .then((themes) => {
        this.setState({ themes })
      })
  }

  handleSubjectChange(e) {
    const subjectName = e.target.value
    const subject = this.props.subjects.find((s) => s === subjectName)

    if (!subject)
      return

    this.getAndSetThemes(subject)
  }

  handleSubmit(e) {
    e.preventDefault()
    const form = e.target

    const formData = new FormData(form)
    const correct = formData.getAll('correctAnswers[]').filter(a => a.length > 0)
    const incorrect = formData.getAll('incorrectAnswers[]').filter(a => a.length > 0)

    formData.delete('correctAnswers[]')
    formData.delete('incorrectAnswers[]')

    correct.map((answer) => formData.append('correctAnswers[]', answer))
    incorrect.map((answer) => formData.append('incorrectAnswers[]', answer))

    form.reset()
    this.setState({
      correctInputs: 1,
      incorrectInputs: 3,
    })

    if (this.props.handleSubmit)
      this.props.handleSubmit(formData)
  }

  addAnswer(correct) {
    if (correct)
      this.setState((state) => ({ correctInputs: state.correctInputs + 1}))
    else
      this.setState((state) => ({ incorrectInputs: state.incorrectInputs + 1}))
  }

  renderAnswers(correct) {
    const n = correct ? this.state.correctInputs : this.state.incorrectInputs
    const name = correct ? 'correctAnswers[]' : 'incorrectAnswers[]'

    return [...Array(n).keys()].map((i) => {
      if (i === n-1) {
      return (
        <input type="text" key={i} name={name}
          onChange={(e) => this.addAnswer(correct)} />
        )
      }
      return (
        <input type="text" key={i} name={name} />
      )
    })
  }

  renderSubjects() {
    return (
      <select
        defaultValue={this.state.selectedSubject}
        onChange={this.handleSubjectChange}
        name="subject"
      >
        {this.props.subjects.map((subject) => {
          return <option key={subject}>{subject}</option>
        })}
      </select>
    )
  }

  renderThemes() {
    return (
      <select name="theme">
        {this.state.themes.map((theme) => {
          return <option key={theme}>{theme}</option>
        })}
      </select>
    )
  }

  render() {
    return (
      <form
        className="QuestionForm"
        onSubmit={this.handleSubmit}
      >

        <div className="subject">
          <label><p>Subject:</p></label>{this.renderSubjects()}

          <label><p>Theme:</p></label>{this.renderThemes()}
        </div>

        <div className="question">
          <label><p>Question:</p></label>
          <textarea name="text" />
          <input type="number" name="points" />
        </div>

        <div className="answers">
          <fieldset>
            <legend>Correct</legend>
            {this.renderAnswers(true)}
          </fieldset>

          <fieldset>
            <legend>Incorrect</legend>
            {this.renderAnswers(false)}
          </fieldset>
        </div>

        <div className="media">
          <Media />
        </div>

        <div className="submit">
          <button>Submit</button>
        </div>

      </form>
    )
  }
}

function Media(props) {
  return (
    <fieldset>
      <legend>Media</legend>
      <input name="media" type="file" multiple />
    </fieldset>
  )
}

export default QuestionForm
