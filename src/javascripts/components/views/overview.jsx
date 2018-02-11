/* IMPORT MODULES */
import React from 'react';

/* IMPORT COMPONENTS */
import { Panel } from '../lists/panel.jsx';

/* COMPONENTS */
export const Overview = ({ displays, images, groups, user, devices }) => {
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
            <Panel content={displays.data} category="displays" size="small"/>
            <Panel content={images.data} category="images" size="small"/>
            <Panel content={groups.data} category="groups" size="small"/>
          </div>
        }
        { user.admin &&
          <div className="row mb-3">
            <Panel content={devices.data} category="devices" size="big"/>
          </div>
        }
      </div>
    </div>
  );
};
