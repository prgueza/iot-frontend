// Importacion de librerias
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
const cx = require('classnames');

export const AddButton = ({ categoria }) => {
  const claseBoton = cx("btn btn-block btn-small",
     {"btn-outline-success": categoria === 'displays'},
     {"btn-outline-info": categoria === 'images'},
     {"btn-outline-warning": categoria === 'groups'}
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
