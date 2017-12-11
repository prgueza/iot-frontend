/* IMPORT MODULES */
import React, { Component } from 'react';

/* COMPONENTS */
export class Login extends Component{

  render(){
    return(
      <div className="row">
        <div className="col-4">
          <form action="/login" method="post">
            <div class="form-group">
              <label className="sr-only" htmlFor="user">Usuario</label>
              <input type="text" class="form-control" id="user" name="user" placeholder="Usuario"></input>
            </div>
            <div class="form-group">
              <label className="sr-only" htmlFor="password">Password</label>
              <input type="password" class="form-control" id="password" name="password" placeholder="Contraseña"></input>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input type="checkbox" class="form-check-input"></input>
                Recordar usuario
              </label>
            </div>
            <button type="submit" class="btn btn-secondary">Entrar</button>
          </form>
        </div>
      </div>
    }
};
