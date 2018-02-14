/* IMPORT MODULES */
import React, { Component } from 'react';
import cookie from 'react-cookie';

/* COMPONENTS */
export class Login extends Component{

  constructor(props){
    super(props);
    this.state = {
      login: '',
      password: '',
      remember: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.setState({ login: localStorage.getItem('login') || '' });
    this.setState({ remember: localStorage.getItem('login') ? true : false });
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.name != 'remember' ? target.value : !this.state.remember;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event){
    if(this.state.remember){
      localStorage.setItem('login', this.state.login);
    }
  }

  render(){
    return(
      <div className="row login justify-content-center">
        <div className="col-4 align-self-center">
          <div className="card bg-transparent border-gray">
            <div className="card-body">
              <h1 className="text-center"><i className="fa fa-barcode fa-4x mb-3"></i></h1>
              <form action="/" method="post">
                <div className="form-group">
                  <label className="sr-only" htmlFor="login">Usuario</label>
                  <input onChange={this.handleInputChange} type="text" className="form-control" id="login" value={this.state.login} name="login" placeholder="Usuario"></input>
                </div>
                <div className="form-group">
                  <label className="sr-only" htmlFor="password">Password</label>
                  <input onChange={this.handleInputChange} type="password" className="form-control" id="password" value={this.state.password} name="password" placeholder="Contraseña"></input>
                </div>
                <button onClick={this.handleSubmit} type="submit" className="btn btn-block btn-outline-secondary">Entrar</button>
                <div className="form-group mt-2">
                  <label className="custom-control custom-checkbox">
                    <input onChange={this.handleInputChange} type="checkbox" checked={this.state.remember} name="remember" value={this.state.remember} className="custom-control-input"></input>
                    <span className="custom-control-indicator"></span>
                    <span className="custom-control-description">Recordar usuario</span>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )};
};
