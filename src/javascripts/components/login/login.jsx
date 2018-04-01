/* IMPORT MODULES */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookie';
import axios from 'axios'

/* IMPORT COMPONENTS */
import { Error } from '../tags/error.jsx';
import { Notification } from '../tags/notification.jsx';

/* COMPONENTS */
export class Login extends Component{

  constructor(props){
    super(props);
    this.state = {
      // form fields
      login: '', // username
      password: '', // pasword
      remember: false, // if true save login in local sotorage
      // error handling
      error: null
    }
  }

  componentDidMount(){ // on component mount
    this.setState({ login: localStorage.getItem('login') || '' }); // get login from local storage
    this.setState({ remember: localStorage.getItem('login') ? true : false }); // set the checkbox to true if login was found
  }

  /* HANDLE INPUT CHANGE */
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.name != 'remember' ? target.value : !this.state.remember;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  /* HANDLE LOGIN */
  handleSubmit = (event) => {
    event.preventDefault(); // prevent default from submit
    if(this.state.remember){ // if checkbox checked save login to local storage
      localStorage.setItem('login', this.state.login);
    }
    // login request
    axios.post( '/users/login', {
        login: this.state.login,
        password: this.state.password
      })
      .then(
        (res) => { // resolve callback
          if (res.status == 200){ // if auth is successful
            return this.props.login(res.data.user, res.data.token); // login function
          }
        },
        (error) => { // reject callback
          this.setState({ error }); // set error on failure
        }
      );
  }

  render(){
    return(
      <div className="row login justify-content-center">
        <div className="col-4 align-self-center">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center"><i className="fa fa-barcode fa-4x mb-3"></i></h1>
              <small className="float-right">v0.1.0</small>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className="sr-only" htmlFor="login">Usuario</label>
                  <input onChange={this.handleInputChange} type="text" className="form-control" id="login" value={this.state.login} name="login" placeholder="Usuario"></input>
                </div>
                <div className="form-group">
                  <label className="sr-only" htmlFor="password">Password</label>
                  <input onChange={this.handleInputChange} type="password" className="form-control" id="password" value={this.state.password} name="password" placeholder="Contraseña"></input>
                </div>
                <button onClick={this.handleSubmit} type="submit" className="btn btn-block btn-outline-primary">Entrar</button>
                <div className="form-group mt-2">
                  <label className="custom-control custom-checkbox">
                    <input onChange={this.handleInputChange} type="checkbox" checked={this.state.remember} name="remember" value={this.state.remember} className="custom-control-input"></input>
                    <span className="custom-control-indicator"></span>
                    <span className="custom-control-description">Recordar usuario</span>
                  </label>
                </div>
              </form>
              { this.state.error && <p className="text-center"><i className="fa fa-times mr-2"></i>Usuario o contraseña incorrectos</p> }
            </div>
          </div>
        </div>
      </div>
    )};
};
