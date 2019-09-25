import React from 'react'
import dispatcher from '../../dispatcher'

import './styles.css'

import TestCreationForm from '../../components/TestCreationForm'

class TestsPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      subjects: [],
    }
  }

  async componentDidMount() {
    try {
      const subjects = await dispatcher.subjects.getAll()
      this.setState({ subjects: subjects.data })
    }
    catch(err) {
      alert("Server probably not responding")
      console.error(err)
    }
  }

  //TODO: Must have other possibilities to work on tests - 
  // should have something like the App component where it 
  // decides which component to render
  render () {
    return (
      <div className="TestsPage">
        <TestCreationForm subjects={this.state.subjects} />
      </div>
    )
  }
}

export default TestsPage