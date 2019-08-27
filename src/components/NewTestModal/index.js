import React from 'react'
import './styles.css'

import store from '../../store'
import pages from '../../store/pages'
import { changePage, populate } from '../../store/actions'

class NewTestModal extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      totalCount: 0,
      availableSubjects: [],
      subjectFilters: [],
      currentSubject: undefined,
    }

    this.renderSubjectFilters = this.renderSubjectFilters.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.addSubjectFilter = this.addSubjectFilter.bind(this)
    this.handleSubjectFilterChange = this.handleSubjectFilterChange.bind(this)
    this.onTotalCountChange = this.onTotalCountChange.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    const url = 'http://localhost:3001/api/subject'
    fetch(url)
      .then((data) => data.json())
      .then((subjects) => {

        this.setState({
          availableSubjects: subjects,
          currentSubject: (subjects && subjects.length > 0) ? subjects[0] : undefined,
        })
      })
      .catch((err) => console.error(err))

  }

  onTotalCountChange(e) {
    const count = Number(e.target.value.trim())

    if (isNaN(count))
      return

    this.setState({ totalCount: count})
  }

  renderSubjectFilters () {
    return this.state.subjectFilters.map((filter, i) => {
      return <SubjectFilter
          key={i}
          subject={filter.subject}
          count={filter.count}
          handleChange={this.handleSubjectFilterChange}
        />
    })
  }

  handleSelectChange (e) {
    this.setState({ currentSubject: e.target.value })
  }

  handleSubjectFilterChange (newSubject) {
    this.setState((state) => {
      return {
        subjectFilters: state.subjectFilters.map((subject) => {
          if (subject.subject === newSubject.subject)
            return { subject: newSubject.subject, count: newSubject.count }
          return subject
        })
      }
    })
  }

  submit () {
    const filters = this.state.subjectFilters.map((subject) => {
      return `subjects[${subject.subject}]=${subject.count}`
    })

    const url = `http://localhost:3001/api/test?total=${this.state.totalCount}&` +
      filters.join('&')

    fetch(url)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Error while fetching compiled test.\n${response.status} ${response.statusText}`)

        return response.json()
      })
      .then((data) => {
        const test = {
          name: data.name,
          questions: data.questions,
          start: null,
          end: null,
          timeToSolve: null,
        }

        store.dispatch(populate(test))
        store.dispatch(changePage(pages.TEST_EDIT))
      })
  }

  addSubjectFilter () {
    if (!this.state.currentSubject)
      return;

    this.setState((state) => {
      const availableSubjects = state.availableSubjects.filter((subject) => subject !== state.currentSubject)

      return {
        availableSubjects: availableSubjects,
        subjectFilters: [...state.subjectFilters, { subject: state.currentSubject, count: 0 }],
        currentSubject: (availableSubjects && availableSubjects.length > 0) ? availableSubjects[0] : undefined,
      }
    })
  }

  render () {
    const display = this.props.show ? 'block' : 'none'

    return (
      <div
        className="NewTestModal"
        style={{ display: display }}
      >
        <div className="content">
          <div className="header">
            <span onClick={this.props.handleClose}>x</span>
            <h2>Compilation filters</h2>
          </div>

          <div className="body">
            <div>
              <label htmlFor="number-of-questions">{"Брой въпроси"}</label>
              <input
                id="number-of-questions"
                type="text"
                value={this.state.totalCount}
                onChange={this.onTotalCountChange}
              />
            </div>
              {this.renderSubjectFilters()}
              {this.state.availableSubjects.length > 0 &&
                <div>
                  <select onChange={this.handleSelectChange}>
                    {this.state.availableSubjects.map((subject, i) => {
                      return <option key={i}>{subject}</option>
                    })}
                  </select>
                  <button onClick={this.addSubjectFilter}>+ Добавете филтър</button>
                </div>
              }
              <div>
                <button onClick={this.submit}>Submit</button>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

class SubjectFilter extends React.Component {
  constructor (props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (e) {
    const count = Number(e.target.value.trim())

    if (isNaN(count))
      return

    this.props.handleChange({ subject: this.props.subject, count })
  }

  render () {
    return (
      <div>
        <label htmlFor={`subject-filter-${this.props.subject}-${this.props.count}`}>
          {this.props.subject}
        </label>
        <input
          id={`subject-filter-${this.props.subject}-${this.props.count}`}
          type="text"
          value={this.props.count}
          onChange={this.handleInputChange}
        />
      </div>
    )
  }
}

export default NewTestModal
