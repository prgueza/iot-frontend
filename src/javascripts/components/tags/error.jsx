/* IMPORT MODULES */
import React, { Component } from 'react';

/* COMPONENTS */
export class Error extends Component{
  render(){
    return(
      <div className="row login justify-content-center">
        <div className="col-4 align-self-center">
          <div className="card bg-transparent border-gray">
            <div className="card-body">
              <h1 className="text-center"><i className="fa fa-exclamation-triangle fa-4x mb-3"></i></h1>
              <hr></hr>
              <h3 className="text-center text-warning">{this.props.error.message}</h3>
            </div>
          </div>
        </div>
      </div>
    )};
};
