/* IMPORT MODULES */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* COMPONENT */
const DisplayGeneric = () => (
		<div className="card card-detalles">
    <div className="card-header">
      <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
        <li className="nav-item mr-auto">
          <h2 className="detalles-titulo text-center"><FontAwesomeIcon icon="tv" className="mr-3" fixedWidth />Detalles</h2>
        </li>
      </ul>
    </div>
    <div className="card-body">
      <div className="text-center">
        <h1><FontAwesomeIcon icon="arrow-left" className="mr-3" fixedWidth />Seleccione un display</h1>
        <hr className="card-division" />
        <p>Para configurar un nuevo display compruebe que hay dispositivos disponibles</p>
      </div>
    </div>
  </div>
);

export default DisplayGeneric;
