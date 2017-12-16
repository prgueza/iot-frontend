/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { Redirect } from 'react-router-dom';


/* COMPONENTS */
export class ImageDelete extends Component{

  constructor(props){
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      end: false
    }
  }

  handleDelete(event){
    event.preventDefault();
    fetch(this.props.image.url, {
      method: 'delete'
    })
    .then(this.props.updateImages)
    .then(this.setState({ end: true }))
    .catch((err) => console.log(err));
  }

  render(){
    if (this.state.end) {
      return(<Redirect to="/images"/>);
    } else {
      return(
        <div className="col detalles">
            <div className="card bg-transparent border-gray">
              <div className="card-header border-gray">
                <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
                  <li className="nav-item mr-auto">
                    <h2 className="detalles-titulo"><i className="fa fa-trash mr-3" aria-hidden="true"></i>Eliminar Imagen</h2>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <h1>¿Eliminar imagen?</h1>
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
