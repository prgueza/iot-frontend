/* IMPORT MODULES */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { Title } from '../../tags/title.jsx';
import { ManageUsers } from './viewSettings-components/manageUsers.jsx';
import { ManageUserGroups } from './viewSettings-components/manageUserGroups.jsx';
import { ManageLocations } from './viewSettings-components/manageLocations.jsx';
import { ManageResolutions } from './viewSettings-components/manageResolutions.jsx';


/* COMPONENTS */
export class ContentSettings extends Component{
  
  render(){
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
                <Title total='Configuración' category='settings'/>
              </div>
            </div>
            <ManageUsers {...this.props}/>
            <ManageUserGroups {...this.props}/>
            <ManageLocations {...this.props}/>
            <ManageResolutions {...this.props}/>
          </div>
        </div>);
    }
};
