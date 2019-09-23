import React from 'react'
import dispatcher from '../../dispatcher'

import './styles.css'

import SideBar from '../../components/SideBar'
import QuestionsPage from '../QuestionsPage'
import LoginPage from '../LoginPage'
import LoadingComponent from '../../components/LoadingComponent'

class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.pages = {
      login: { id: 'LOGIN_PAGE', repr: 'Влез' },
      questions: { id: 'QUESTIONS_PAGE', repr: 'Въпроси' },
      accounts: { id: 'ACCOUNTS_PAGE', repr: 'Акаунти' },
    }
    
    this.state = {
      account: null,
      currentPage: null,
    }
    
    this.changePage = this.changePage.bind(this)
    this.login = this.login.bind(this)
  }
  
  async componentDidMount() {
    try {
      const account = await dispatcher.session.getActiveSession()
      if (account) {
        this.setState({ account, currentPage: this.pages.questions })
      } else {
        this.setState({ currentPage: this.pages.login })
      }
    } 
    catch(err) {
      console.error(err)
    }
  }

  async login(email, password) {
    try {
      const success = await dispatcher.session.authenticate(email, password)
      if (!success)
        return
      
      const account = await dispatcher.session.getActiveSession()
      this.setState({ account, currentPage: this.pages.questions })
    }
    catch(err) {
      console.error(err)
    }
  }
  
  // receives the id of the page to be 
  changePage(newPage) {
    for (let page in this.pages) {
      if (newPage === this.pages[page].id){
        this.setState({ currentPage: this.pages[page] })
        break
      }
    }
  }
  
  render() {
    let page
    let sidebarPages = []

    if (this.state.account) {
      sidebarPages = [this.pages.questions]

      if (this.state.account.isAdmin) {
        sidebarPages = [...sidebarPages, this.pages.accounts]
      }
    }

    
    if (this.state.currentPage) {
      switch(this.state.currentPage.id) {
        case 'LOGIN_PAGE':
          page = <LoginPage
            login={this.login}
          />
          break
        case 'QUESTIONS_PAGE':
          page = <QuestionsPage />
          break
        case 'ACCOUNTS_PAGE':
          page = <h1>Not Implemented</h1>
          break
        default:
          page = <h1>An error has occurred?!</h1>
      }
    } else {
      page = <LoadingComponent />
    }
    
    return (
      <div className="App">
        <div className="side">
          <SideBar pages={sidebarPages} handlePageChange={this.changePage} />
        </div>
        <div className="page">
          {page}
        </div>
      </div>
      )
    }
  }
  
  export default App
  