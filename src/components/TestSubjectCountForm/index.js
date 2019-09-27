import React from 'react'

import './styles.css'

class TestSubjectCountForm extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubjectChange = this.handleSubjectChange.bind(this)
    this.handleSubjectDelete = this.handleSubjectDelete.bind(this)
    this.handleCountChange = this.handleCountChange.bind(this)
  }

  handleCountChange(e) {
    const value = e.target.value

    if(value !== '' && isNaN(Number(value)))
      return
    
    this.props.onSubjectParamChange(this.props.selectedSubject.id, {
      id: this.props.selectedSubject.id,
      name: this.props.selectedSubject.name,
      count: value === '' ? 0 : Number(value),
      themes: this.props.selectedSubject.themes,
    })
  }

  handleSubjectChange(e) {
    const selectedOption = e.target[e.target.selectedIndex]
    const subjectid = selectedOption.dataset.subjectid

    const newSubject = this.props.availableSubjects.find((s) => s.id === subjectid)

    this.props.onSubjectParamChange(this.props.selectedSubject.id, {
      id: newSubject.id,
      name: newSubject.name,
      count: this.props.selectedSubject.count,
      themes: this.props.selectedSubject.themes,
    })
  }

  handleSubjectDelete() {
    this.props.onSubjectParamDelete()
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

  render() {
    return (
      <div className="TestSubjectCountForm">
        
        <div className="subject-row">
          {this.renderSubjectSelector()}
          <input
            type="text"
            value={this.props.selectedSubject.count}
            onChange={this.handleCountChange}
          />
          <i onClick={this.handleSubjectDelete} className="material-icons" style={{color: 'red'}}>delete</i>
        </div>

        {/*themes*/}

        <div className="last-row">
          <button>+ ТЕМА</button>
        </div>

      </div>
    )
  }
}

export default TestSubjectCountForm