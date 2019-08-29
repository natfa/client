import React from 'react';
import './styles.css';
import config from '../../../config/default'

// Answer signature
// answer: { text: String, correct: Boolean }

class QuestionForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      availableSubjects: [],
      correctAnswerInputs: 1,
      incorrectAnswerInputs: 1,
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderSelectSubjectComponent = this.renderSelectSubjectComponent.bind(this)
    this.renderCorrectAnswerInputs = this.renderCorrectAnswerInputs.bind(this)
    this.renderIncorrectAnswerInputs = this.renderIncorrectAnswerInputs.bind(this)
    this.addAnswer = this.addAnswer.bind(this)
  }

  componentDidMount() {
    const url = `http://${config.api.hostname}:${config.api.port}/api/subject`
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          alert('Връзка със сървъра не може да се осъществи!')
          throw new Error(`Error fetching subjects: ${response.status} ${response.statusText}`)
        }

        return response.json()
      })
      .then((subjects) => {
        this.setState({ availableSubjects: [...subjects]})
      })
  }

  count = function*(n) {
    for (let i = 1; i <= n; i++)
      yield i;
  }

  addAnswer(correct) {
    if (correct)
      this.setState((state) => ({ correctAnswerInputs: state.correctAnswerInputs + 1}))
    else
      this.setState((state) => ({ incorrectAnswerInputs: state.incorrectAnswerInputs + 1}))
  }

  handleSubmit(e) {
    e.preventDefault()
    const form = e.target

    const formData = new FormData(form)
    const correct = formData.getAll('correct[]').filter(a => a.length > 0)
    const incorrect = formData.getAll('incorrect[]').filter(a => a.length > 0)

    formData.delete('correct[]')
    formData.delete('incorrect[]')

    correct.map((answer) => formData.append('correct[]', answer))
    incorrect.map((answer) => formData.append('incorrect[]', answer))

    form.reset()
    this.setState({
      correctAnswerInputs: 1,
      incorrectAnswerInputs: 1,
    })

    this.props.addNewQuestion(formData)

  }

  renderSelectSubjectComponent() {
    return (
      <select name="subject">
        {this.state.availableSubjects.map((subject, i) => {
          return <option key={i}>{subject}</option>
        })}
      </select>
    )
  }

  renderCorrectAnswerInputs() {
    const children = [...this.count(this.state.correctAnswerInputs)].map((i) => {
      if (i === this.state.correctAnswerInputs)
        return <input key={i} type="text" name="correct[]" onChange={(e) => { this.addAnswer(true)}} />
      return <input key={i} type="text" name="correct[]" />
    })

    return (
      <div>
        {children}
      </div>
    )
  }

  renderIncorrectAnswerInputs() {
    const children = [...this.count(this.state.incorrectAnswerInputs)].map((i) => {
      if (i === this.state.incorrectAnswerInputs)
        return <input key={i} type="text" name="incorrect[]" onChange={(e) => { this.addAnswer(false)}} />
      return <input key={i} type="text" name="incorrect[]" />
    })

    return (
      <div>
        {children}
      </div>
    )
  }

  render () {
    return (
      <form 
        method="POST" 
        encType="multipart/form-data" 
        onSubmit={this.handleSubmit} 
        className="QuestionForm"
      >
        <div>
          <label>Текст *</label>
          <textarea 
            name="text" 
            maxLength="150" 
          />
        </div>
        <div>
          <label>Предмет *</label>
          {this.renderSelectSubjectComponent()}
        </div>
        <div>
          <label>Точки *</label>
          <input
            name="points"
            type="number"
          />
        </div>
        <div>
          <label>Снимки и видео</label>
          <input
            name="media"
            type="file"
            multiple
          />
        </div>
        <div className="answers">
          <div className="correct">
            <p>Верни отговори</p>
            {this.renderCorrectAnswerInputs()}
          </div>
          <div className="incorrect">
            <p>Неверни отговори</p>
            {this.renderIncorrectAnswerInputs()}
          </div>
        </div>
        <div>
          <button type="submit">Запази въпрос</button>
        </div>
      </form>
    );
  }
}

export default QuestionForm;
