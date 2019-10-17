import React from 'react'
import './styles.css'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    if (this.props.onSubmit && typeof(this.props.onSubmit) === 'function')
      this.props.onSubmit(formData)
  }

  render() {
    return (
      <form
        className="LoginForm"
        onSubmit={this.handleSubmit}
      >
      <div>
        <label>
          Мейл<br/>
          <input required type="email" name="email" />
        </label>
      </div>
      
      <div>
        <label>
          Парола<br/>
          <input required type="password" name="password" />
        </label>
      </div>
      
      <div>
        <button>Влез</button>
      </div>
      </form>
    )
  }
}

export default LoginForm