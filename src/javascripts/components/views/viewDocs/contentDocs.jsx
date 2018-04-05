/* IMPORT MODULES */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { Title } from '../../tags/title.jsx';

/* COMPONENTS */
export const ContentDocs = ({ user, ...other }) => {
  return(
    <div className="overview">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>CUENTA</h1>
          </div>
          <hr></hr>
        </div>
      </div>
      <div className="row-panel">
        <div className="panel">
          <Title total='Documentación' appearance="card title-docs" icon="book"/>
          <div className="row controls">
            <div className="col">
              <div className="card detalles">
                <div className="card-body docs-body d-flex w-100 justify-content-center">
                  <div className="align-self-center">
                    <h1><i className="fa fa-wrench mr-3" aria-hidden="true"></i>En desarrollo</h1>
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
