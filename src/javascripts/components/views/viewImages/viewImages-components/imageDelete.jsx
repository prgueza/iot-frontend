/* IMPORT MODULES */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


/* COMPONENTS */
export class ImageDelete extends Component{

  constructor(props){
    super(props);
    this.state = {
      // for redirect after deletion
      redirect: false
    }
  }

  /* HANDLE DELETE EVENT */
  handleDelete = (event) => {
    event.preventDefault();
    axios.delete(this.props.image.url)
    .then(this.props.update(this.props.user))
    .then(
      (success) => { // resolve callback
        this.setState({ redirect: true })
      },
      (error) => { // reject callback
        this.setState({ error })
      }
    );// TODO: error handling
  }

  render(){
    if (this.state.redirect) {
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
