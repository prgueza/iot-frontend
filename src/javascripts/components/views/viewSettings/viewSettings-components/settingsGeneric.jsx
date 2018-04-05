/* IMPORT MODULES */
import React from 'react';

/* IMPORT COMPONENTS */
import { AddButton } from '../../../buttons/addButton.jsx';

/* COMPONENTS */
export const SettingsGeneric = () => {
  return(
  <div className="card detalles">
    <div className="card-header">
      <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
        <li className="nav-item mr-auto">
          <h2 className="detalles-titulo text-center"><i className='fa-map-marker' aria-hidden="true"></i>Configuración</h2>
        </li>
      </ul>
    </div>
    <div className="card-body">
      <div className="text-center">
        <h1><i className="fa fa-arrow-left mr-3"></i>Seleccione qué desea configurar</h1>
      </div>
    </div>
  </div>
  );
};
