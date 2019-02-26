/* IMPORT MODULES */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* COMPONENTS */
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      remember: false,
      error: null,
    };
  }

  componentDidMount() {
    // get login from local storage
    this.setState({ login: localStorage.getItem('login') || '' });
    // set the checkbox to true if login was found
    this.setState({ remember: !!localStorage.getItem('login') });
  }

  /* RESET ERROR */
  resetError = () => {
    this.setState({ error: null });
  }

	/* HANDLE INPUT CHANGE */
	handleInputChange = (event) => {
	  this.resetError();
	  const { target } = event;
	  const { remember } = this.state;
	  const { name } = target;
	  const value = name !== 'remember' ? target.value : !remember;
	  this.setState({
	    [name]: value,
	  });
	}

	/* HANDLE LOGIN */
	handleSubmit = (event) => {
	  event.preventDefault();
	  const { remember, login, password } = this.state;
	  const { loginAction } = this.props;
	  // if checkbox checked save login to local storage
	  if (remember) {
	    localStorage.setItem('login', login);
	  }

	  // login request
	  axios.post('/users/login', {
	    login,
	    password,
	  })
	    .then((res) => {
	      if (res.status === 200) {
	        loginAction(res.data.user, res.data.token, res.data.data);
	        // TODO: render loading status
	      }
	    })
	    .catch(error => this.setState({ error }));
	}

	render() {
	  const {
	    remember, login, password, error,
	  } = this.state;
	  return (
  <div className="row login justify-content-center">
    <div className="col-lg-4 col-md-8 col-sm-12 align-self-center">
      <div className="card card-login">
        <div className="card-body">
          <h1 className="text-center"><FontAwesomeIcon icon="barcode" size="5x" /></h1>
          <small className="float-right">v0.1.5</small>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="sr-only" htmlFor="login">Usuario</label>
              <input onChange={this.handleInputChange} type="text" className="form-control input-no-border" id="login" value={login} name="login" placeholder="Usuario" />
            </div>
            <div className="form-group">
              <label className="sr-only" htmlFor="password">Password</label>
              <input onChange={this.handleInputChange} autoComplete="on" type="password" className="form-control input-no-border" id="password" value={password} name="password" placeholder="Contraseña" />
            </div>
            <button onClick={this.handleSubmit} type="submit" className="btn btn-block btn-primary">Entrar</button>
            <div className="form-group mt-2">
              <div className="custom-control custom-checkbox">
                <input onChange={this.handleInputChange} id="remember" type="checkbox" checked={remember} name="remember" value={remember} className="custom-control-input" />
                <label className="custom-control-label" htmlFor="remember">Recordar usuario</label>
              </div>
            </div>
          </form>
          <p className="text-center text-danger login-error">
            { error && (
              <span>
                <i className="fa fa-times mr-2" />
    						Usuario o contraseña incorrectos
              </span>
            ) }
          </p>
        </div>
      </div>
    </div>
  </div>
	  );
	}
}

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
};

export default Login;
