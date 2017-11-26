// Importacion de librerias
import React from 'react';
import { BrowserRouter as Router, Link, NavLink, Route } from 'react-router-dom';
const moment = require('moment');
const ahora = moment(); moment.locale('es');
const cx = require('classnames');

import { BotonAdd } from './botones.jsx';


export const Info = ({ categoria }) => {
  const claseBoton = cx("btn btn-block btn-small",
   {"btn-outline-success": categoria === 'displays'},
   {"btn-outline-info": categoria === 'imagenes'},
   {"btn-outline-warning": categoria === 'grupos'}
  );
  if (categoria === 'displays') {
  var texto = ['Seleccione un display', 'O añada uno nuevo'];
  }
  if (categoria === 'imagenes') {
  var texto = ['Seleccione una imagen', 'O añada una nueva'];
  }
  if (categoria === 'grupos') {
  var texto = ['Seleccione un grupo', 'O añada uno nuevo'];
  }
  return(
  <div className="col">
    <div className="card detalles bg-transparent border-gray">
      <div className="card-header border-gray">
        <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
          <li className="nav-item mr-auto">
            <h2 className="detalles-titulo text-center"><i className='fa-picture-o' aria-hidden="true"></i>Detalles</h2>
          </li>
        </ul>
      </div>
      <div className="card-body">
        <div className="text-center">
          <h1><i className="fa fa-arrow-left mr-3"></i>{texto[0]}</h1>
          <hr></hr>
          <p>{texto[1]}</p>
          <BotonAdd categoria={categoria}/>
        </div>
      </div>
    </div>
  </div>
  );
};
