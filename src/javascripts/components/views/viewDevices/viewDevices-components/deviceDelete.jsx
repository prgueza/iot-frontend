/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { Redirect } from 'react-router-dom';


/* COMPONENTS */
export class DeviceDelete extends Component{

  constructor(props){
    super(props);
    this.state = {
      // for redirect after deletion
      redirect: false
    }
  }

  /* HANDLE DELETE EVENT */
  handleDelete = (event) =>{
    event.preventDefault();
    fetch(this.props.device.url, {
      method: 'delete'
    })
    .then(this.props.update) // TODO: promises
    .then(this.setState({ redirect: true })) // redirect
    .catch((err) => console.log(err));
  }

  render(){
    if (this.state.redirect) {
      return(<Redirect to="/devices"/>);
    } else {
      return(
        <div className="col detalles">
            <div className="card bg-transparent border-gray">
              <div className="card-header border-gray">
                <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
                  <li className="nav-item mr-auto">
                    <h2 className="detalles-titulo"><i className="fa fa-trash mr-3" aria-hidden="true"></i>Eliminar dispositivo físico</h2>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <h1>¿Eliminar dispositivo físico</h1>
                  <hr></hr>
                  <p>Esta acción no se puede deshacer</p>
                  <button onClick={this.handleDelete} type="button" className="btn btn-block btn-outline-danger"><i className="fa fa-trash mr-1" aria-hidden="true"></i>Eliminar</button>
                </div>
              </div>
            </div>
        </div>
      );
    }
  }
};
