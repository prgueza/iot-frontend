// Importacion de librerias
import React from 'react';
import { BrowserRouter as Router, Link, NavLink, Route } from 'react-router-dom';
const moment = require('moment');
const ahora = moment(); moment.locale('es');
const cx = require('classnames');

export const BotonAdd = ({ categoria }) => {
  const claseBoton = cx("btn btn-block btn-small",
     {"btn-outline-success": categoria === 'displays'},
     {"btn-outline-info": categoria === 'imagenes'},
     {"btn-outline-warning": categoria === 'grupos'}
  );
  const location = {
      pathname: '/' + categoria + '/add'
  }
  return(
    <Link to={location}>
      <button type="button" className={claseBoton}><i className="fa fa-plus-circle mr-1" aria-hidden="true"></i>Añadir</button>
    </Link>
  );
};
