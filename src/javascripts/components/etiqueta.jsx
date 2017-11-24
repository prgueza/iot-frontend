// Importacion de librerias
import React from 'react';
const moment = require('moment');
const ahora = moment(); moment.locale('es');
const cx = require('classnames');

// Declaracion del componente
export class Etiqueta extends React.Component{
  render(){
    const { categoria, etiqueta } = this.props;
    const claseEtiqueta = cx("btn mr-1",
      {"btn-outline-success": categoria === "displays"},
      {"btn-outline-info": categoria === "imagenes"},
      {"btn-outline-warning": categoria === "grupos"},
      "btn-tiny"
    );
    return(
      <button type="button" className={claseEtiqueta}>{etiqueta}</button>
    );
  }
};
