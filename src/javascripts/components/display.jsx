// Importacion de librerias
import React from 'react';
const moment = require('moment');
const ahora = moment(); moment.locale('es');
const cx = require('classnames');

// Importacion de componentes
const EtiquetaComponentes = require('./etiqueta.jsx');
const Etiqueta = EtiquetaComponentes.comp;

// Declaracion de componentes

// Componente de la lista de Displays de Vista General
module.exports.vistaGeneral = class Display extends React.Component{
  render(){
    var tiempo = moment(this.props.display.fecha).from(ahora);
    var etiquetas = this.props.display.etiquetas.length;
    var claseEtiquetas = cx(
      {"fa fa-tags fa-flip-horizontal mr-1": etiquetas > 1},
      {"fa fa-tag fa-flip-horizontal mr-1": etiquetas < 2}
    );
    var key = 0;
    var claseElemento = cx(
      "list-group-item-action elemento-display list-group-item flex-column align-items-start"
    );
    return(
      <a href="#" className={claseElemento}>
        <div className="elemento-activo">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1 w-75">{this.props.display.nombre}</h5>
            <small><i className="fa fa-hashtag" aria-hidden="true"></i> {this.props.display.identificacion}</small>
          </div>
          <p className="mb-1">{this.props.display.descripcion}</p>
          <div className="d-flex w-100 justify-content-between mt-1">
            <small><i className={claseEtiquetas} aria-hidden="true"></i>{etiquetas}</small>
            <small>{tiempo}<i className="fa fa-calendar-o ml-1" aria-hidden="true"></i></small>
          </div>
        </div>
      </a>
    );
  }
};

// Componente de la lista que aparece en los detalles de Imagenes o Grupos
// module.exports.listaDetalles = class DisplayListaDetalles extends React.Component{
//   render(){
//     var claseElemento = cx(
//       "list-group-item-action elemento-display list-group-item flex-column align-items-start"
//     );
//     return(
//       <a href="#" className={claseElemento}>
//         <div className="d-flex w-100 justify-content-between">
//           <h5 className="mb-1"><i className="fa fa-picture-o" aria-hidden="true"></i>{this.props.display.nombre}</h5>
//           <h5><i className="fa fa-hashtag" aria-hidden="true"></i> {this.props.display.identificacion}</h5>
//         </div>
//       </a>
//     );
//   }
// };

// Componente con detalles acerca de un Display en concreto
module.exports.detalles = class DisplayDetalles extends React.Component{
  render(){
    var fecha = moment(this.props.elemento.fecha).format("dddd, D [de] MMMM [de] YYYY");
    var etiquetas = [];
    var categoria = "display";
    var key = 0;
    this.props.elemento.etiquetas.forEach(function(etiqueta){
      etiquetas.push(<Etiqueta key={key} categoria={categoria} etiqueta={etiqueta}/>);
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
              <p className="card-text"><i className="fa fa-calendar-o mr-1" aria-hidden="true"></i> {fecha}</p>
              <p className="card-text"><i className="fa fa-user-o mr-1" aria-hidden="true"></i> {this.props.elemento.creador}</p>
              <p className="titulo">ETIQUETAS</p>
              {etiquetas}
            </div>
          </div>
          <div className="col-5">
          </div>
        </div>
      </div>
    );
  }
};
