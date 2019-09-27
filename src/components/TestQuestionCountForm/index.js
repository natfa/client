import React from 'react'

import './styles.css'
import TestSubjectCountForm from '../TestSubjectCountForm'

class TestQuestionCountForm extends React.Component {
  constructor(props) {
    super(props)

    this.handleTotalChange = this.handleTotalChange.bind(this)
  }

  renderTestSubjectCountForms() {
    return this.props.selectedSubjects.map((s) => {

      const availableSubjects = this.props.allSubjects.filter((subject) => {
        return !this.props.selectedSubjects.find(s => s.subject.id === subject.id)
      })

      return (
        <TestSubjectCountForm
          availableSubjects={availableSubjects}
          key={s.subject.id}
          selectedSubject={s}
          onSubjectParamChange={this.props.onSubjectParamChange}
          onSubjectParamDelete={() => this.props.onSubjectParamDelete(s.subject.id)}
        />
      )
    })
  }

  handleTotalChange(e) {
    const value = e.target.value

    if(value !== '' && isNaN(Number(value)))
      return
    console.log('calling update')
    this.props.onQuestionTotalChange(value === '' ? 0 : Number(value))
  }

  render() {
    return (
      <div className="TestQuestionCountForm">
        <div className="total">
          <label htmlFor="questions-total">Брой въпроси</label>
          <input
            value={this.props.questionTotal}
            onChange={this.handleTotalChange}
            type="text"
            id="questions-total"
          />
        </div>

        <div className="subject-definitioins">
          {this.renderTestSubjectCountForms()}
        </div>

        <div className="end">
          <button onClick={this.props.addSubjectParam}>+ ПРЕДМЕТ</button>
          <button>КОМПИЛИРАЙ</button>
        </div>
      </div>
    )
  }
}

export default TestQuestionCountForm