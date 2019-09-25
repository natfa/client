import React from 'react'

import './styles.css'

import TestCreationForm from '../../components/TestCreationForm'

class TestsPage extends React.Component {
  //TODO: Must have other possibilities to work on tests - 
  // should have something like the App component where it 
  // decides which component to render
  render () {
    return (
      <div className="TestsPage">
        <TestCreationForm />
      </div>
    )
  }
}

export default TestsPage