/* IMPORT MODULES */
import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { Title } from '../../tags/title.jsx';
import { ManageUsers } from './viewSettings-components/manageUsers.jsx';
import { ManageUserGroups } from './viewSettings-components/manageUserGroups.jsx';
import { ManageLocations } from './viewSettings-components/manageLocations.jsx';
import { ManageResolutions } from './viewSettings-components/manageResolutions.jsx';
import { SettingsGeneric } from './viewSettings-components/settingsGeneric.jsx';
import { Icon } from '../../icons/icon.jsx';


/* COMPONENTS */
export class ContentSettings extends Component{

  render(){

      const menu_items = [
        {text: 'Usuarios', icon: 'user-o', location: '/settings/users'},
        {text: 'Grupos de gestión', icon: 'users', location: '/settings/groups'},
        {text: 'Localizaciones', icon: 'map-marker', location: '/settings/locations'},
        {text: 'Resoluciones', icon: 'arrows-alt', location: '/settings/resolutions'}
      ];

      const menu = menu_items.map((i, j) => {
        return(
        <div key={j} className="list-group-item flex-column align-items-start">
          <NavLink to={i.location}>
            <div className="d-flex elemento settings-menu-item">
              <p className="mb-0"><Icon icon={i.icon} mr={3}/>{i.text}</p>
            </div>
          </NavLink>
        </div>)
      });

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
              <Title total='Configuración' appearance="card title-settings" icon="cogs"/>
              <div className="row controls">
                <div className="col-2">
                  <div className="list-group list-group-small mb-3">
                    {menu}
                  </div>
                </div>
                <div className="col">
                  <Route exact path="/settings" render={() => (<SettingsGeneric { ...this.props }/>)}/>
                  <Route path="/settings/users" render={() => (<ManageUsers { ...this.props }/>)}/>
                  <Route path="/settings/groups" render={() => (<ManageUserGroups { ...this.props }/>)}/>
                  <Route path="/settings/locations" render={() => (<ManageLocations { ...this.props }/>)}/>
                  <Route path="/settings/resolutions" render={() => (<ManageResolutions { ...this.props }/>)}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
};
