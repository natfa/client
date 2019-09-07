import React from 'react'

import './styles.css'

import SideBar from '../../components/SideBar'
import QuestionsPage from '../QuestionsPage'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.changePage = this.changePage.bind(this)
  }

  changePage(newPage) {
    alert('Not yet implemented')
  }

  render() {
    // page format { name: string, repr: string }
    const pages = [
      { name: 'QUESTIONS_PAGE', repr: 'Въпроси'},
      { name: 'TESTS_PAGE', repr: 'Тестове'},
    ]

    return (
      <div className="App">
        <div className="side">
          <SideBar pages={pages} handlePageChange={this.changePage} />
        </div>
        <div className="page">
          <QuestionsPage />
        </div>
      </div>
    )
  }
}

export default App
