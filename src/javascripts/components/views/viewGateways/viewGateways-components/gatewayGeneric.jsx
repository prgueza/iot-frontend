/* IMPORT MODULES */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* IMPORT COMPONENTS */
import AddButton from '../../../buttons/addButton';

/* COMPONENTS */
const GatewayGeneric = () => (
		<div className="card card-detalles">
    <div className="card-header">
      <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
        <li className="nav-item mr-auto">
          <h2 className="detalles-titulo text-center"><FontAwesomeIcon icon="sitemap" className="mr-3" fixedWidth />Detalles</h2>
        </li>
      </ul>
    </div>
    <div className="card-body">
      <div className="text-center">
        <h1><FontAwesomeIcon icon="arrow-left" className="mr-3" fixedWidth />Seleccione una puerta de enlace</h1>
        <hr className="card-division" />
        <p>O añada una nueva</p>
        <AddButton category="gateways" />
      </div>
    </div>
  </div>
);

export default GatewayGeneric;
