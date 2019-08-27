import React from 'react'
import './styles.css'

import store from '../../store/'
import { changePage } from '../../store/actions'

class SideBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pages: this.props.pages
    }

    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handlePageChange(page) {
    store.dispatch(changePage(page))
  }

  renderNavigationLinks() {
    return this.state.pages.map((page, i) => {
      return (
        <div key={i}>
          <span onClick={() => { this.handlePageChange(page.page) }}>{page.name}</span>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="SideBar">
        <div>
          <h2>Some title or logo here</h2>
        </div>
        {this.renderNavigationLinks()}
      </div>
    )
  }
}

export default SideBar
