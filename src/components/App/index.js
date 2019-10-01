import React from 'react'

import './styles.css'

import router from '../../utils/router'
import dispatcher from '../../dispatcher'

import SideBar from '../SideBar'
import LoadingComponent from '../../components/LoadingComponent'

import Index from '../../pages/index'
import NotFound from '../../pages/notfound'
import Questions from '../../pages/Questions'
import Tests from '../../pages/Tests'
import Accounts from '../../pages/Accounts'
import Login from '../../pages/Login'

const PAGES = {
  '/': {
    name: 'Начало',
    component: Index,
    renderInNav: false,
  },
  '/login': {
    name: 'Login',
    component: Login,
    renderInNav: false,
  },
  '/questions': {
    name: 'Въпроси',
    component: Questions,
    renderInNav: true,
    adminOnly: false,
  },
  '/tests': {
    name: 'Тестове',
    component: Tests,
    renderInNav: true,
    adminOnly: false,
  },
  '/accounts': {
    name: 'Акаунти',
    component: Accounts,
    renderInNav: true,
    adminOnly: true,
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)

    // WARNING: this function is a hack! (by my standsrds)
    // what it does is it TRIES to prevent the browser from making changes
    // to the window.location object by going forward in time, every time 
    // the back button of the browser is clicked.
    // NOTE: this function actually prevents the use of the forward browser button
    // **** have only tested in Firefox 69.0.1 ****
    window.onpopstate = e => {
      e.preventDefault()
      const pathname = e.target.location.pathname
      window.history.go(1)
      router.push(pathname)
    }

    this.state = {
      initialLoad: true,
      pathname: props.pathname,
      account: null,
    }

    this.login = this.login.bind(this)
  }

  async componentDidMount() {
    this.subscribeToRouter()

    try {
      const authenticated = await dispatcher.session.getActiveSession()
      if (!authenticated) {
        router.push('/login')
        this.setState({ initialLoad: false })
      } else {
        this.setState({ account: authenticated, initialLoad: false })
      }
    }
    catch (err) {
      alert('Something went wrong')
      console.error(err)
    }
  }

  componentWillUnmount() {
    this.unsubscribeFromRouter()
  }

  async login(email, password) {
    try {
      const authenticated = await dispatcher.session.authenticate(email, password)
      if (!authenticated) {
        alert('Wrong credentials')
        return
      }
      const account = await dispatcher.session.getActiveSession()
      this.setState({ account })
      router.push('/')
    }
    catch (err) {
      alert('Something went wrong')
      console.error(err)
    }
  }

  subscribeToRouter() {
    router.subscribe("App", (pathname) => {
      this.setState({ pathname })
    })
  }

  unsubscribeFromRouter() {
    router.unsubscribe("App")
  }

  compileLinks() {
    let links = []
    let page

    if (!this.state.account) {
      return links
    }

    for (page in PAGES) {
      if (!PAGES[page].renderInNav) {
        continue
      }

      if (PAGES[page].adminOnly && !this.state.account.isAdmin) {
        continue
      }

      links = [...links, { pathname: page, name: PAGES[page].name }]
    }

    return links
  }

  render() {
    console.log(`Rendering UI for path ${this.state.pathname}`)
    let page

    if (this.state.initialLoad) {
      page = <LoadingComponent />
    } else {
      switch (this.state.pathname) {
        case '/':
          page = <Index />
          break
        case '/questions':
          page = <Questions />
          break
        case '/login':
          page = <Login login={this.login} />
          break
        case '/accounts':
          page = <Accounts />
          break
        case '/tests':
          page = <Tests />
          break
        default:
          page = <NotFound pathname={this.state.pathname} />
      }
    }

    return (
      <div className="App">
        <div className="side">
          <SideBar links={this.compileLinks()} />
        </div>
        <div className="page">
          {page}
        </div>
      </div>
    )
  }
}

export default App