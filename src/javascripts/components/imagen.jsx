// Importacion de librerias
import React from 'react';
const moment = require('moment');
const ahora = moment(); moment.locale('es');
const cx = require('classnames');

// Importacion de componentes
const EtiquetaComponentes = require('./etiqueta.jsx');
// const ListaComponentes = require('./lista.jsx');
const Etiqueta = EtiquetaComponentes.comp;
// const ListaDetalles = ListaComponentes.listaDetalles;

// Declaracion de componentes

// Componente de la lista de Imagen de Vista General
module.exports.vistaGeneral = class Imagen extends React.Component{
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
      return(
        <a href="#" className={claseElemento}>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{this.props.imagen.nombre}</h5>
            <small><i className="fa fa-hashtag" aria-hidden="true"></i> {this.props.imagen.identificacion}</small>
          </div>
          <p className="mb-1">{this.props.imagen.descripcion}</p>
          <div className="d-flex w-100 justify-content-between">
            <small><i className={claseEtiquetas} aria-hidden="true"></i>{etiquetas}</small>
            <small>{tiempo}<i className="fa fa-calendar-o ml-1" aria-hidden="true"></i></small>
          </div>
        </a>
      );
  }
};

// Componente de la lista que aparece en los detalles de Displays o Grupos
// module.exports.listaDetalles = class ImagenListaDetalles extends React.Component{
//     render(){
//       var tiempo = moment(this.props.imagen.fecha).from(ahora);
//       var etiquetas = this.props.imagen.etiquetas.length;
//       var claseEtiquetas = cx(
//         {"fa fa-tags fa-flip-horizontal mr-1": etiquetas > 1},
//         {"fa fa-tag fa-flip-horizontal mr-1": etiquetas < 2}
//       );
//       var claseElemento = cx(
//         "list-group-item-action elemento-display list-group-item flex-column align-items-start"
//       );
//       return(
//         <a href="#" className={claseElemento}>
//           <div className="d-flex w-100 justify-content-between">
//             <h5 className="mb-1"><i className="fa fa-picture-o" aria-hidden="true"></i>{this.props.imagen.nombre}</h5>
//             <h5><i className="fa fa-hashtag" aria-hidden="true"></i> {this.props.imagen.identificacion}</h5>
//           </div>
//         </a>
//       );
//   }
// };

// Componente con detalles acerca de una Imagen en concreto
module.exports.detalles = class ImagenDetalles extends React.Component{
  render(){
    var fecha = moment(this.props.elemento.fecha).format("dddd, D [de] MMMM [de] YYYY");
    var etiquetas = [];
    var key = 0;
    this.props.elemento.etiquetas.forEach(function(etiqueta){
      etiquetas.push(<Etiqueta key={key} categoria="imagen" etiqueta={etiqueta}/>);
      key ++;
    });
    return(
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
    );
  }
};
