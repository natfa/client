import React from 'react';

import LoginForm from '../../components/login-form';

import { authenticate } from '../../api/session';
import withLayout from '../../utils/withLayout';

import './styles.css';

class LandingApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      isEmailValid: true,
      password: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    const { value } = e.target;

    this.setState({ email: value });
  }

  handlePasswordChange(e) {
    const { value } = e.target;

    this.setState({ password: value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;

    const account = await authenticate(email, password);

    if (!account) {
      alert('Invalid credentials');
      return;
    }

    if (account.roles.includes('teacher')) {
      window.location.pathname = '/teacher';
    } else if (account.roles.includes('student')) {
      window.location.pathname = '/student';
    } else if (account.roles.includes('admin')) {
      window.location.pathname = '/admin';
    } else {
      window.location.pathname = '/403';
    }
  }

  render() {
    const { email, password, isEmailValid } = this.state;

    return (
      <LoginForm
        email={email}
        isEmailValid={isEmailValid}
        onEmailChange={this.handleEmailChange}
        password={password}
        onPasswordChange={this.handlePasswordChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default withLayout(LandingApp);
