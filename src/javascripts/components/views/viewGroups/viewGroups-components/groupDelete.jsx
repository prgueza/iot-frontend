/* IMPORT MODULES */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';


/* COMPONENTS */
export class GroupDelete extends Component{

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
    axios.delete(this.props.group.url)
    .then((res) => {
      if (res.status == 200){
        this.props.notify('Grupo eliminado con éxito', 'notify-success', 'trash-o', toast.POSITION.BOTTOM_LEFT);
        return this.props.update(this.props.user, false); // update dataset
      }
    })
    .then((res) => {
      this.setState({ redirect : true });
      return res;
    })
    .catch((err) => {
      console.log(err);
      return this.props.notify('Error al eliminar el grupo', 'notify-error', 'exclamation-triangle', toast.POSITION.BOTTOM_LEFT);
    });
  }

  render(){
    if (this.state.redirect) {
      return(<Redirect to="/groups"/>);
    } else {
      return(
        <div className="col detalles">
            <div className="card">
              <div className="card-header">
                <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
                  <li className="nav-item mr-auto">
                    <h2 className="detalles-titulo"><i className="fa fa-trash mr-3" aria-hidden="true"></i>Eliminar Grupo</h2>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <h1>¿Eliminar grupo?</h1>
                  <hr className="card-division"></hr>
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
