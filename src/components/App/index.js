import React from 'react'
import store from '../../store/'
import pages from '../../store/pages'
import './styles.css'

import SideBar from '../SideBar/'
import QuestionPage from '../../pages/Question'
import TestsView from '../../pages/TestsView'
import TestEdit from '../../pages/TestEdit'

class App extends React.Component {
  constructor (props) {
    super(props);
    const storeState = store.getState()

    this.state = {
      page: storeState.page,
    }

    this.handleStoreDispatch = this.handleStoreDispatch.bind(this)

    store.subscribe(() => { this.handleStoreDispatch() })
  }

  handleStoreDispatch() {
    const storeState = store.getState()

    if (storeState.page !== this.state.page)
      this.setState({ page: storeState.page})
  }

  render() {
    const storeState = store.getState()
    let page

    switch (this.state.page) {
      case pages.QUESTIONS:
        page = <QuestionPage />
        break;
      case pages.TESTS_VIEW:
        page = <TestsView />
        break;
      case pages.TEST_EDIT:
        if (!storeState.test)
          page = <TestEdit />
        else
          page = <TestEdit
            name={storeState.test.name}
            questions={storeState.test.questions}
            start={storeState.test.start}
            end={storeState.test.end}
            timeToSolve={storeState.test.timeToSolve}
          />
        break;
      default:
        page = <h1>Welcome to our website!</h1>
    }

    const sidebarPages = [
      {
        page: pages.QUESTIONS,
        name: 'Въпроси',
      },
      {
        page: pages.TESTS_VIEW,
        name: 'Тестове',
      },
    ]

    return (
      <div className="App">
        <div className="sidebar">
          <SideBar pages={sidebarPages} />
        </div>
        <div className="page">
          {page}
        </div>
      </div>
    );
  }
}

export default App;
