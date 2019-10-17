import React from 'react'

import './styles.css'

import LoginForm from '../../components/LoginForm'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this)
  }

  handleLoginFormSubmit(formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    this.props.login(email, password)
  }

  render() {
    return (
      <div className="LoginPage">
        <LoginForm onSubmit={this.handleLoginFormSubmit} />
      </div>
    )
  }
}

export default Login