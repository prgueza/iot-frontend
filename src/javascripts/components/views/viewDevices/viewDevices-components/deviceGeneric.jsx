/* IMPORT MODULES */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* COMPONENTS */
const DeviceGeneric = () => (
  <div className="card card-detalles">
    <div className="card-header">
      <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
        <li className="nav-item mr-auto">
          <h2 className="detalles-titulo text-center">
            <FontAwesomeIcon icon="tablet-alt" className="mr-3" fixedWidth />
						Detalles
          </h2>
        </li>
      </ul>
    </div>
    <div className="card-body">
      <div className="text-center">
        <h1>
          <FontAwesomeIcon icon="arrow-left" className="mr-3" fixedWidth />
					Seleccione un dispositivo físico
        </h1>
      </div>
    </div>
  </div>
);

export default DeviceGeneric;
