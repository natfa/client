import React from 'react'

import './styles.css'
import TestSubjectCountForm from '../TestSubjectCountForm'

class TestQuestionCountForm extends React.Component {
  constructor(props) {
    super(props)

    this.handleTotalChange = this.handleTotalChange.bind(this)
  }

  renderTestSubjectCountForms() {
    return this.props.selectedSubjects.map((subject) => {

      const availableSubjects = this.props.allSubjects.filter((subject) => {
        return !this.props.selectedSubjects
          .find(selectedSubject => selectedSubject.id === subject.id)
      })

      return (
        <TestSubjectCountForm
          availableSubjects={availableSubjects}
          key={subject.id}
          selectedSubject={subject}
          onSubjectParamChange={this.props.onSubjectParamChange}
          onSubjectParamCountChange={this.props.onSubjectParamCountChange}
          onSubjectParamDelete={() => this.props.onSubjectParamDelete(subject.id)}
          onSubjectParamThemeChange={this.props.onSubjectParamThemeChange}
        />
      )
    })
  }

  handleTotalChange(e) {
    const value = e.target.value

    if(value !== '' && isNaN(Number(value)))
      return

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