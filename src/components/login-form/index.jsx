import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './styles.css';

const LoginForm = ({
  email,
  isEmailValid,
  onEmailChange,
  password,
  onPasswordChange,
  onSubmit,
}) => (
  <form onSubmit={onSubmit}>
    <Grid
      className="LoginForm"
      container
      direction="column"
      spacing={1}
    >

      <Grid item>
        <TextField
          value={email}
          onChange={onEmailChange}
          error={!isEmailValid}
          type="email"
          required

          label="Email"

          margin="dense"
          autoFocus
          fullWidth
          variant="outlined"
        />
      </Grid>

      <Grid item>
        <TextField
          value={password}
          onChange={onPasswordChange}
          type="password"
          required

          label="Password"

          margin="dense"
          fullWidth
          variant="outlined"
        />
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          fullWidth
          type="submit"
        >
          Log In
        </Button>
      </Grid>

    </Grid>
  </form>
);

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  isEmailValid: PropTypes.bool,
  onEmailChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  isEmailValid: true,
};

export default LoginForm;
