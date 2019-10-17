import React from 'react'
import dispatcher from '../../dispatcher'

import './styles.css'

import TestDetailsForm from '../TestDetailsForm'
import TestQuestionCountForm from '../TestQuestionCountForm'

class TestCreationForm extends React.Component {
  constructor(props) {
    super(props)


    // params.subjects { id: 1, name: 'Math', count: 10, themes: [ { id: 1, name: 'Geometry', count: 10 } ] }
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
    this.onSubjectParamCountChange = this.onSubjectParamCountChange.bind(this)
    this.onSubjectParamDelete = this.onSubjectParamDelete.bind(this)
    this.onSubjectParamThemeChange = this.onSubjectParamThemeChange.bind(this)
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

  async addSubjectParam() {
    let rest = this.state.subjects.filter((subject) => {
      return !this.state.params.subjects.find(s => s.id === subject.id)
    })

    if (rest.length === 0) {
      alert('No more subjects available')
      return
    }

    try {
      const subject = rest[0]
      const themes = await dispatcher.themes.getAllBySubjectid(subject.id)

      if (!themes)
        throw new Error(`dispatcher.themes.getAllBySubjectid(${subject.id}) returned ${themes}`)
      
      const newSubject = {
        id: subject.id,
        name: subject.name,
        count: 0,
        themes: themes,
      }
  
      this.setState((state) => ({
        params: Object.assign({}, state.params, {
          subjects: [...state.params.subjects, newSubject]
        })
      }))
    }
    catch (err) {
      alert('Server not responding or subject with that id was not found')
      console.error(err)
    }
  }

  // updates a subject object from this.state.params.subjects
  async onSubjectParamChange(id, newSubjectid) {
    let subjects = []
    let subject

    for (subject of this.state.params.subjects) {
      if (subject.id !== id) {
        subjects = [...subjects, subject]
      }

      try {
        const newSubject = this.state.subjects.find(s => s.id === newSubjectid)

        const themes = await dispatcher.themes.getAllBySubjectid(newSubject.id)

        if (!themes)
          throw new Error(`dispatcher.themes.getAllBySubjectid(${subject.id}) returned ${themes}`)

        subjects = [...subjects, {
          id: newSubject.id,
          name: newSubject.name,
          count: 0,
          themes: themes,
        }]
      }
      catch(err) {
        alert('Server not responding or subject with that id was not found')
        throw err
      }
    }

    this.setState((state) => ({
      params: Object.assign({}, state.params, {
        subjects: subjects
      })
    }))
  }

  onSubjectParamCountChange(id, count) {
    const subjects = this.state.params.subjects.map((subject) => {
      if (subject.id !== id)
        return subject
      
      return {
        id: subject.id,
        name: subject.name,
        count: count,
        themes: subject.themes,
      }
    })

    this.setState((state) => ({
      params: Object.assign({}, state.params, {
        subjects: subjects
      })
    }))
  }

  // deletes a subject object from this.state.params.subjects
  onSubjectParamDelete(id) {
    const rest = this.state.params.subjects.filter((subject) => {
      return subject.id !== id
    })

    this.setState((state) => ({
      params: Object.assign({}, state.params, {
        subjects: rest
      })
    }))
  }

  onSubjectParamThemeChange(subjectid, themeid, count) {
    const subjects = this.state.params.subjects.map((subject) => {
      if (subject.id !== subjectid)
        return subject
      
      const themes = subject.themes.map((theme) => {
        if (theme.id !== themeid)
          return theme
        
        const newTheme = {
          id: theme.id,
          name: theme.name,
          subjectid: theme.subjectid,
        }

        if (count !== null)
          newTheme.count = count        
        return newTheme
      })

      return {
        id: subject.id,
        name: subject.name,
        count: subject.count,
        themes: themes,
      }
    })

    this.setState((state) => ({
      params: Object.assign({}, state.params, {
        subjects: subjects,
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
        onSubjectParamCountChange={this.onSubjectParamCountChange}
        onSubjectParamDelete={this.onSubjectParamDelete}

        onSubjectParamThemeChange={this.onSubjectParamThemeChange}
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
