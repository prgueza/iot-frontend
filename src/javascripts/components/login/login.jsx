/* IMPORT MODULES */
import React, { Component } from 'react';

/* COMPONENTS */
export class Login extends Component{
  render(){
    return(
      <div className="row login justify-content-center">
        <div className="col-4 align-self-center">
          <div className="card bg-transparent border-gray">
            <div className="card-body">
              <h1 className="text-center"><i className="fa fa-barcode fa-4x mb-3"></i></h1>
              <form action="/" method="post">
                <div className="form-group">
                  <label className="sr-only" htmlFor="user">Usuario</label>
                  <input type="text" className="form-control" id="user" name="user" placeholder="Usuario"></input>
                </div>
                <div className="form-group">
                  <label className="sr-only" htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" name="password" placeholder="Contraseña"></input>
                </div>
                <button type="submit" className="btn btn-block btn-outline-secondary">Entrar</button>
                <div className="form-group mt-2">
                  <label className="custom-control custom-checkbox">
                    <input type="checkbox" name="remind" className="custom-control-input"></input>
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
