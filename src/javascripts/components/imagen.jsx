// Importacion de librerias
import React from 'react';
import { BrowserRouter as Router, Link, NavLink, Route } from 'react-router-dom';
const moment = require('moment');
const ahora = moment(); moment.locale('es');
const cx = require('classnames');

// Importacion de componentes
import { Etiqueta } from './etiqueta.jsx';

// Declaracion de componentes

// Componente de la lista de Imagen de Vista General
export class Imagen extends React.Component{
    render(){
      var tiempo = moment(this.props.imagen.fecha).from(ahora);
      var etiquetas = this.props.imagen.etiquetas.length;
      var claseEtiquetas = cx(
        {"fa fa-tags fa-flip-horizontal mr-1": etiquetas > 1},
        {"fa fa-tag fa-flip-horizontal mr-1": etiquetas < 2}
      );
      var claseElemento = cx(
        "list-group-item-action elemento-display list-group-item flex-column align-items-start"
      );
      var location = {
        pathname: '/imagenes/' + this.props.imagen.identificacion
      }
      return(
        <div className={claseElemento}>
          <NavLink to={location}>
            <div className="elemento">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{this.props.imagen.nombre}</h5>
                <small><i className="fa fa-hashtag" aria-hidden="true"></i> {this.props.imagen.identificacion}</small>
              </div>
              <p className="mb-1">{this.props.imagen.descripcion}</p>
              <div className="d-flex w-100 justify-content-between">
                <small><i className={claseEtiquetas} aria-hidden="true"></i>{etiquetas}</small>
                <small>{tiempo}<i className="fa fa-calendar-o ml-1" aria-hidden="true"></i></small>
              </div>
            </div>
        </NavLink>
      </div>
      );
  }
};

export class DetallesImagen extends React.Component{
  render(){
    const { elemento } = this.props;
    const fecha = moment(elemento.fecha).format("dddd, D [de] MMMM [de] YYYY");
    const etiquetas = [];
    var key = 0;
    elemento.etiquetas.forEach(function(etiqueta){
      etiquetas.push(<Etiqueta key={key} categoria='imagenes' etiqueta={etiqueta}/>);
      key ++;
    });
    return(
    <div className="col">
      <div className="card detalles bg-transparent border-gray">
        <div className="card-header border-gray">
          <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
            <li className="nav-item mr-auto">
              <h2 className="detalles-titulo"><i className='fa-picture-o' aria-hidden="true"></i>{elemento.nombre}</h2>
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
                <p className="card-text"><i className="fa fa-hashtag mr-1" aria-hidden="true"></i>{this.props.elemento.identificacion}</p>
                <p className="card-text" data-toggle="tooltip" data-placement="left" title="descripción"><i className="fa fa-info-circle mr-1" aria-hidden="true"></i> {this.props.elemento.descripcion}</p>
                <p className="card-text"><i className="fa fa-arrows-alt mr-1" aria-hidden="true"></i> {this.props.elemento.dimensiones.ancho} x {this.props.elemento.dimensiones.alto}</p>
                <p className="card-text"><i className="fa fa-file-image-o mr-1" aria-hidden="true"></i> {this.props.elemento.formato}</p>
                <p className="card-text"><i className="fa fa-database mr-1" aria-hidden="true"></i> {this.props.elemento.bytes}</p>
                <p className="card-text"><i className="fa fa-calendar-o mr-1" aria-hidden="true"></i> {fecha}</p>
                <p className="card-text"><i className="fa fa-user-o mr-1" aria-hidden="true"></i> {this.props.elemento.creador}</p>
                <p className="titulo">ETIQUETAS</p>
                {etiquetas}
              </div>
            </div>
            <div className="col-5">
            </div>
          </div>
          <div className="row">
              <div className="col-6">
              </div>
              <div className="col-6">
              </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
};
