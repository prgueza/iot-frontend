/* IMPORT MODULES */
import React from 'react';

/* COMPONENT */
const DisplayGeneric = () => (
		<div className="card card-detalles">
    <div className="card-header">
      <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
        <li className="nav-item mr-auto">
          <h2 className="detalles-titulo text-center"><i className="fa fa-television mr-3" aria-hidden="true" />Detalles</h2>
        </li>
      </ul>
    </div>
    <div className="card-body">
      <div className="text-center">
        <h1><i className="fa fa-arrow-left mr-3" />Seleccione un display</h1>
        <hr className="card-division" />
        <p>Para configurar un nuevo display compruebe que hay dispositivos disponibles</p>
      </div>
    </div>
  </div>
);

export default DisplayGeneric;
