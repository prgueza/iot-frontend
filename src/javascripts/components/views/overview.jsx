/* IMPORT MODULES */
import React from 'react';

/* IMPORT COMPONENTS */
import { Panel } from '../lists/panel.jsx';

/* COMPONENTS */
export const Overview = ({ displays, images, groups }) => {
  return(
    <div className="col contenido">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>VISTA GENERAL</h1>
          </div>
          <hr></hr>
        </div>
      </div>
      <div className="ventana">
        <div className="row mb-3">
          <Panel contenido={displays} categoria="displays"/>
          <Panel contenido={images} categoria="images"/>
          <Panel contenido={groups} categoria="groups"/>
        </div>
      </div>
    </div>
  );
};
