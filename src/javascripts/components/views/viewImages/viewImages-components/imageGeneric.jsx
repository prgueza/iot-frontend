/* IMPORT MODULES */
import React from 'react';

/* IMPORT COMPONENTS */
import { AddButton } from '../../../buttons/addButton.jsx';

/* COMPONENT */
export const ImageGeneric = () => {
  return(
  <div className="col">
    <div className="card detalles">
      <div className="card-header">
        <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
          <li className="nav-item mr-auto">
            <h2 className="detalles-titulo text-center"><i className='fa-picture-o' aria-hidden="true"></i>Detalles</h2>
          </li>
        </ul>
      </div>
      <div className="card-body">
        <div className="text-center">
          <h1><i className="fa fa-arrow-left mr-3"></i>Seleccione una imagen</h1>
          <hr className="card-division"></hr>
          <p>O añada una nueva</p>
          <AddButton category='images'/>
        </div>
      </div>
    </div>
  </div>
  );
};
