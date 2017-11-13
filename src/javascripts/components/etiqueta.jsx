// Importacion de librerias
import React from 'react';
const moment = require('moment');
const ahora = moment(); moment.locale('es');
const cx = require('classnames');

// Declaracion del componente
module.exports.comp = class Etiqueta extends React.Component{
  render(){
    var claseEtiqueta = cx("btn mr-1",
      {"btn-outline-success": this.props.categoria === "display"},
      {"btn-outline-info": this.props.categoria === "imagen"},
      {"btn-outline-warning": this.props.categoria === "grupo"},
      "btn-tiny"
    );
    return(
      <button type="button" className={claseEtiqueta}>{this.props.etiqueta}</button>
    );
  }
};
