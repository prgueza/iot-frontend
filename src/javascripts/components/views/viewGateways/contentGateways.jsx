/* IMPORT MODULES */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { Title } from '../../tags/title.jsx';

/* COMPONENTS */
export const ContentGateway= ({ gateways, ...other }) => {
  return(
    <div className="col contenido">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>PUERTAS DE ENLACE</h1>
          </div>
          <hr></hr>
        </div>
      </div>
      <div className="ventana">
        <div className="row">
          <div className="col">
            <Title total={gateways.count} categoria='gateways'/>
          </div>
        </div>
        <div className="row mb-3">
         {/* // TODO: */}
        </div>
      </div>
    </div>
  );
};
