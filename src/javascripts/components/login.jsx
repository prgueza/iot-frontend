// Importacion de librerias
import React from 'react';
const moment = require('moment');
const ahora = moment(); moment.locale('es');
const cx = require('classnames');


// Declaracion del componente
module.exports.comp = class Login extends React.Component{
  render(){
    return(
      <div className="row justify-content-center login">
        <div className="col-2  align-self-center">
          <form className="login-form">
              <div className="form-group">
                <label className="sr-only">Usuario</label>
                <input type="text" className="form-control border border-secondary" id="campoUsuario" placeholder="Usuario"></input>
              </div>
              <div className="form-group">
                <label className="sr-only">Contraseña</label>
                <input type="password" className="form-control border border-secondary" id="campoContrasena" placeholder="Contraseña"></input>
              </div>
              <div className="form-group">
                <label className="custom-control custom-checkbox my-2">
                  <input type="checkbox" className="custom-control-input"></input>
                  <span className="custom-control-indicator"></span>
                  <span className="custom-control-description">Recordar usuario</span>
                </label>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-outline-secondary btn-block">Entrar</button>
              </div>
          </form>
        </div>
        <div className="col-5 align-self-center">
        <div className="bienvenida text-right my-4">
          <h1><i className="fa fa-television fa-5x" aria-hidden="true"></i></h1>
          <h1 className="display-2">Panel de control</h1>
        </div>
        </div>
      </div>
    );
  }
}
