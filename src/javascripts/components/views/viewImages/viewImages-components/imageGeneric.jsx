/* IMPORT MODULES */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* IMPORT COMPONENTS */
import AddButton from '../../../buttons/addButton';

/* COMPONENT */
const ImageGeneric = () => (
		<div className="card card-detalles">
    <div className="card-header">
      <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
        <li className="nav-item mr-auto">
          <h2 className="detalles-titulo text-center"><FontAwesomeIcon icon={['far', 'images']} className="mr-3" fixedWidth />Detalles</h2>
        </li>
      </ul>
    </div>
    <div className="card-body">
      <div className="text-center">
        <h1><FontAwesomeIcon icon="arrow-left" className="mr-3" fixedWidth />Seleccione una imagen</h1>
        <hr className="card-division" />
        <p>O añada una nueva</p>
        <AddButton category="images" />
      </div>
    </div>
  </div>
);

export default ImageGeneric;
