import React from 'react'

import './styles.css'

class TestSubjectCountForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newThemeInput: null,
    }

    this.handleSubjectChange = this.handleSubjectChange.bind(this)
    this.handleSubjectDelete = this.handleSubjectDelete.bind(this)
    this.handleCountChange = this.handleCountChange.bind(this)
    this.handleAddTheme = this.handleAddTheme.bind(this)
    this.handleThemeChange = this.handleThemeChange.bind(this)
    this.handleThemeCountChange = this.handleThemeCountChange.bind(this)
    this.handleThemeBlur = this.handleThemeBlur.bind(this)
  }

  handleCountChange(e) {
    const value = e.target.value

    if(value !== '' && isNaN(Number(value)))
      return
    
    const count = value === '' ? 0 : Number(value)
    this.props.onSubjectParamCountChange(this.props.selectedSubject.id, count)
  }

  handleSubjectChange(e) {
    const selectedOption = e.target[e.target.selectedIndex]
    const subjectid = selectedOption.dataset.subjectid

    const newSubject = this.props.availableSubjects.find((s) => s.id === subjectid)

    this.props.onSubjectParamChange(this.props.selectedSubject.id, newSubject.id)
  }

  handleSubjectDelete() {
    this.props.onSubjectParamDelete()
  }

  handleAddTheme() {
    this.setState({ newThemeInput: '' })
  }

  handleThemeChange(e) {
    const element = e.target

    if (element.className === 'error')
      element.className = ''

    this.setState({ newThemeInput: e.target.value })
  }

  handleThemeBlur(e) {
    const element = e.target
    const theme = element.value.trim()
    const themeObj = this.props.selectedSubject.themes.find(t => t.name === theme)
    
    // handle 'non existing theme' and theme already inputted
    if(!themeObj || themeObj.count !== undefined) {
      element.className = 'error'
      return
    }

    // send the correct update upstream
    this.setState({ newThemeInput: null })
    this.props.onSubjectParamThemeChange(this.props.selectedSubject.id, themeObj.id, 0)
  }

  handleThemeCountChange(e, themeid) {
    const value = e.target.value

    if(value !== '' && isNaN(Number(value)))
      return
    
    const count = value === '' ? 0 : Number(value)
    this.props.onSubjectParamThemeChange(this.props.selectedSubject.id, themeid, count)
  }

  handleThemeDelete(themeid) {
    this.props.onSubjectParamThemeChange(this.props.selectedSubject.id, themeid, null)
  }
  
  renderSubjectSelector() {
    return (
      <select
        value={this.props.selectedSubject.name}
        onChange={this.handleSubjectChange}
      >
        <option
          data-subjectid={this.props.selectedSubject.id}
          key={this.props.selectedSubject.id}
        >
          {this.props.selectedSubject.name}
        </option>
        {this.props.availableSubjects.map((subject) => {
          return <option data-subjectid={subject.id} key={subject.id}>{subject.name}</option>
        })}
      </select>
    )
  }

  renderThemeDatalist() {
    const datalistID = this.props.selectedSubject.name + '-theme-list'

    return (
      <datalist id={datalistID}>
        {this.props.selectedSubject.themes.map((theme) => {
          return <option key={theme.id} value={theme.name}></option>
        })}
      </datalist>
    )
  }

  renderThemeInputs() {
    const datalistID = this.props.selectedSubject.name + '-theme-list'

    const themes = this.props.selectedSubject.themes.filter(theme => theme.count !== undefined)

    let themeInputs = themes.map((theme) => {
      return (
        <div
          className="theme-row"
          key={theme.id}
        >
          <input
            type="text"
            value={theme.name}
            list={datalistID}
            disabled={true}
          />
          <input
            type="text"
            value={theme.count}
            onChange={(e) => this.handleThemeCountChange(e, theme.id)}
          />
          <i onClick={() => this.handleThemeDelete(theme.id)} className="material-icons">delete</i>
        </div>
      )
    })

    // If there is a new theme to be added, render an additional empty input
    if (this.state.newThemeInput !== null) {
      themeInputs = [...themeInputs, (
        <div
          className="theme-row"
          key={themeInputs.length}
        >
          <input
            type="text"
            value={this.state.newThemeInput}
            onBlur={this.handleThemeBlur}
            list={datalistID}
            onChange={this.handleThemeChange}
          />
          <input
            type="text"
            value={0}
            disabled={true}
          />
          {/* <i onClick={() => this.handleThemeDelete()} className="material-icons">delete</i> */}
        </div>
      )]
    }

    return themeInputs
  }

  render() {
    const isButtonDisabled = !this.props.selectedSubject.themes.find(theme => theme.count === undefined)

    return (
      <div className="TestSubjectCountForm">

        {this.renderThemeDatalist()}
        
        <div className="subject-row">
          {this.renderSubjectSelector()}
          <input
            type="text"
            value={this.props.selectedSubject.count}
            onChange={this.handleCountChange}
          />
          <i onClick={this.handleSubjectDelete} className="material-icons" style={{color: 'red'}}>delete</i>
        </div>

        {this.renderThemeInputs()}

        <div className="last-row">
          <button disabled={isButtonDisabled} onClick={this.handleAddTheme}>+ ТЕМА</button>
        </div>

      </div>
    )
  }
}

export default TestSubjectCountForm