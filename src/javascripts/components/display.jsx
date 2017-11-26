// Importacion de librerias
import React from 'react';
import { BrowserRouter as Router, Link, NavLink, Route } from 'react-router-dom';
const moment = require('moment');
const ahora = moment(); moment.locale('es');
const cx = require('classnames');

// Importacion de componentes
import { Etiqueta } from './etiqueta.jsx';

// Declaracion de componentes

// Componente de la lista de Displays de Vista General
export const Display = ({ display }) => {
  const tiempo = moment(display.fecha).from(ahora);
  const claseEtiquetas = cx(
    {"fa fa-tags fa-flip-horizontal mr-1": display.etiquetas.length > 1},
    {"fa fa-tag fa-flip-horizontal mr-1": display.etiquetas.length < 2}
  );
  const claseElemento = cx("list-group-item-action elemento-display list-group-item flex-column align-items-start");
  const location = {
    pathname: '/displays/' + display.identificacion
  }
  return(
      <div className={claseElemento}>
        <NavLink to={location}>
          <div className="elemento">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1 w-75">{display.nombre}</h5>
              <small><i className="fa fa-hashtag" aria-hidden="true"></i> {display.identificacion}</small>
            </div>
            <p className="mb-1">{display.descripcion}</p>
            <div className="d-flex w-100 justify-content-between mt-1">
              <small><i className={claseEtiquetas} aria-hidden="true"></i>{display.etiquetas.length}</small>
              <small>{tiempo}<i className="fa fa-calendar-o ml-1" aria-hidden="true"></i></small>
            </div>
          </div>
          </NavLink>
      </div>
  );
};

export const DetallesDisplay = ({ elemento }) => {
  const fecha = moment(elemento.fecha).format("dddd, D [de] MMMM [de] YYYY");
  var key = 0;
  const etiquetas = elemento.etiquetas.map(( etiqueta ) => <Etiqueta key={key++} categoria='displays' etiqueta={etiqueta}/>);
  return(
  <div className="col">
    <div className="card detalles bg-transparent border-gray">
      <div className="card-header border-gray">
        <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
          <li className="nav-item mr-auto">
            <h2 className="detalles-titulo"><i className='fa-television' aria-hidden="true"></i>{elemento.nombre}</h2>
          </li>
          <li className="nav-item mr-2">
            <button type="button" className="btn btn-outline-warning"><i className="fa fa-pencil-square-o mr-1" aria-hidden="true"></i>Editar</button>
          </li>
          <li className="nav-item ml-2">
            <button type="button" className="btn btn-outline-danger"><i className="fa fa-trash-o" aria-hidden="true"></i>Eliminar</button>
          </li>
        </ul>
      </div>
      <div>
        <div className="row">
          <div className="col-7">
            <div className="card-body">
              <p className="titulo">DETALLES</p>
              <p className="card-text"><i className="fa fa-hashtag mr-1" aria-hidden="true"></i>{elemento.identificacion}</p>
              <p className="card-text"><i className="fa fa-info-circle mr-1" aria-hidden="true"></i> {elemento.descripcion}</p>
              <p className="card-text"><i className="fa fa-arrows-alt mr-1" aria-hidden="true"></i> {elemento.dimensiones.ancho} x {elemento.dimensiones.alto}</p>
              <p className="card-text"><i className="fa fa-calendar-o mr-1" aria-hidden="true"></i> {fecha}</p>
              <p className="card-text"><i className="fa fa-user-o mr-1" aria-hidden="true"></i> {elemento.creador}</p>
              <p className="titulo">ETIQUETAS</p>
              {etiquetas}
            </div>
          </div>
          <div className="col-5">
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
