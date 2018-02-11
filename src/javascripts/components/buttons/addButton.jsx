// Importacion de librerias
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
const cx = require('classnames');

export const AddButton = ({ category }) => {
  const claseBoton = cx("btn btn-block btn-small",
     {"btn-outline-success": category === 'displays'},
     {"btn-outline-info": category === 'images'},
     {"btn-outline-warning": category === 'groups'}
  );
  const location = {
      pathname: '/' + category + '/add'
  }
  return(
    <Link to={location}>
      <button type="button" className={claseBoton}><i className="fa fa-plus-circle mr-1" aria-hidden="true"></i>Añadir</button>
    </Link>
  );
};
