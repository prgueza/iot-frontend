/* IMPORT MODULES */
import React from 'react';

/* IMPORT COMPONENTS */
import { Panel } from '../lists/panel.jsx';

/* COMPONENTS */
export const Overview = ({ displays, images, groups, user, devices, gateways, filterValue }) => {
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
        { !user.admin &&
          <div className="row mb-3">
            <Panel filterValue={filterValue} content={displays} category="displays" size="small"/>
            <Panel filterValue={filterValue} content={images} category="images" size="small"/>
            <Panel filterValue={filterValue} content={groups} category="groups" size="small"/>
          </div>
        }
        { user.admin &&
          <div className="row mb-3">
            <Panel filterValue={filterValue} content={devices} category="devices" size="big"/>
            <Panel filterValue={filterValue} content={gateways} category="gateways" size="big"/>
          </div>
        }
      </div>
    </div>
  );
};
