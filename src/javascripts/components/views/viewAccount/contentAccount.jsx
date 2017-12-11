/* IMPORT MODULES */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { Title } from '../../tags/title.jsx';

/* COMPONENTS */
export const ContentAccount = ({ user, ...other }) => {
  return(
    <div className="col contenido">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>CUENTA</h1>
          </div>
          <hr></hr>
        </div>
      </div>
      <div className="ventana">
        <div className="row">
          <div className="col">
            <Title total='Administrador' categoria='account'/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <div className="card detalles bg-transparent border-gray">
              <div>
                <div className="row">
                  <div className="col">
                    <div className="card-body">
                      <p className="titulo">DETALLES</p>
                      <p className="titulo">ETIQUETAS</p>
                    </div>
                  </div>
                  <div className="col">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
