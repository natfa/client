import React from 'react'

import './styles.css'

import TestDetailsForm from '../TestDetailsForm'
import TestQuestionCountForm from '../TestQuestionCountForm'

class TestCreationForm extends React.Component {
  constructor(props) {
    super(props)


    // params.subjects { subject: { id: 1, name: 'Math' }, count: 10 }
    this.state = {
      isTestDefined: false,
      subjects: [],
      params: {
        name: '',
        questionTotal: 0,
        subjects: [],
      }
    }

    this.onProceed = this.onProceed.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onQuestionTotalChange = this.onQuestionTotalChange.bind(this)
    this.addSubjectParam = this.addSubjectParam.bind(this)
    this.onSubjectParamChange = this.onSubjectParamChange.bind(this)
    this.onSubjectParamDelete = this.onSubjectParamDelete.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.state.subjects.length === prevProps.subjects.length)
      return
    
    this.setState({subjects: this.props.subjects })
  }

  onProceed() {
    this.setState({ isTestDefined: true })
  }

  onNameChange(name) {
    this.setState((state) => ({
      params: Object.assign({}, state.params, {
        name: name,
      })
    }))
  }

  onQuestionTotalChange(total) {
    this.setState((state) => ({
      params: Object.assign({}, state.params, {
        questionTotal: total,
      })
    }))
  }

  addSubjectParam() {
    let rest = this.state.subjects.filter((subject) => {
      return !this.state.params.subjects.find(s => s.subject.id === subject.id)
    })

    if (rest.length === 0) {
      alert('No more subjects available')
      return
    }
    
    const newSubject = {
      subject: {
        id: rest[0].id,
        name: rest[0].name,
      },
      count: 0,
    }

    this.setState((state) => ({
      params: Object.assign({}, state.params, {
        subjects: [...state.params.subjects, newSubject]
      })
    }))
  }

  onSubjectParamChange(id, newParam) {
    const subjectParams = this.state.params.subjects.map((subjectParam) => {
      if (subjectParam.subject.id === id) {
        return newParam
      }
      return subjectParam
    })

    this.setState((state) => ({
      params: Object.assign({}, state.params, {
        subjects: subjectParams
      })
    }))
  }

  onSubjectParamDelete(id) {
    console.log(id)
    const subjectParams = this.state.params.subjects.filter((subjectParam) => {
      return subjectParam.subject.id !== id
    })

    this.setState((state) => ({
      params: Object.assign({}, state.params, {
        subjects: subjectParams
      })
    }))
  }

  render () {
    const component = this.state.isTestDefined ?
      <TestQuestionCountForm
        questionTotal={this.state.params.questionTotal}
        onQuestionTotalChange={this.onQuestionTotalChange}

        allSubjects={this.state.subjects}
        selectedSubjects={this.state.params.subjects}
        addSubjectParam={this.addSubjectParam}
        onSubjectParamChange={this.onSubjectParamChange}
        onSubjectParamDelete={this.onSubjectParamDelete}
      /> :
      <TestDetailsForm
        name={this.state.params.name}
        onNameChange={this.onNameChange}
        onProceed={this.onProceed}
      />

    return (
      <div className="TestCreationForm">
        {component}
      </div>
    )
  }
}

export default TestCreationForm