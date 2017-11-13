// Importacion de librerias
import React from 'react';
const moment = require('moment');
const ahora = moment(); moment.locale('es');
const cx = require('classnames');

// Importacion de componentes
const DisplayComponentes = require('./display.jsx');
const ImagenComponentes = require('./imagen.jsx');
const GrupoComponentes = require('./grupo.jsx');
const DisplayDetalles = DisplayComponentes.detalles;
const ImagenDetalles = ImagenComponentes.detalles;
const GrupoDetalles = GrupoComponentes.detalles;

// Declaracion del componente
module.exports.comp = class Detalles extends React.Component{
  render(){
    var categoria = this.props.categoria;
    var claseIcono = cx("fa mr-3",
      {"fa-television": categoria === 'display'},
      {"fa-picture-o": categoria === 'imagen'},
      {"fa-list": categoria === 'grupo'}
    );
    return(
      <div className="col detalles">
        <div className="card bg-transparent border-gray">
          <div className="card-header border-gray">
            <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
              <li className="nav-item mr-auto">
                <h2 className="detalles-titulo"><i className={claseIcono} aria-hidden="true"></i>{this.props.elemento.nombre}</h2>
              </li>
              <li className="nav-item mr-2">
                <button type="button" className="btn btn-outline-warning"><i className="fa fa-pencil-square-o mr-1" aria-hidden="true"></i>Editar</button>
              </li>
              <li className="nav-item ml-2">
                <button type="button" className="btn btn-outline-danger"><i className="fa fa-trash-o" aria-hidden="true"></i>Eliminar</button>
              </li>
            </ul>
          </div>
          <ImagenDetalles elemento={this.props.elemento}/>
        </div>
      </div>
    );
  }
};
