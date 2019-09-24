import React from 'react'

import './styles.css'

class AccountCreationForm extends React.Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    const form = e.target

    const email = form['email'].value
    const password = form['password'].value
    const isAdmin = form['isAdmin'].checked
    
    if (this.props.handleSubmit)
      if (typeof(this.props.handleSubmit) === 'function')
        this.props.handleSubmit(email, password, isAdmin)
  }

  render() {
    return (
      <form
        className="AccountCreationForm"
        onSubmit={this.handleSubmit}
      >
        <div className="normal-input">
          <label htmlFor="email">Mail</label>
          <input type="email" name="email" id="email" required />
        </div>
      
        <div className="normal-input">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>

        <div className="checkbox">
          <input type="checkbox" name="isAdmin" id="isAdmin" />
          <label htmlFor="isAdmin">Account is an admin</label>
        </div>
        
        <div className="submit-button">
          <button>Submit</button>
        </div>
      </form>
    )
  }
}

export default AccountCreationForm