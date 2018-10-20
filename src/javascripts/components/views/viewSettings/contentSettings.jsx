/* IMPORT MODULES */
import React from 'react';
import { NavLink, Route } from 'react-router-dom';

/* IMPORT COMPONENTS */
import Title from '../../tags/title';
import ManageUsers from './viewSettings-components/manageUsers';
import ManageUserGroups from './viewSettings-components/manageUserGroups';
import ManageLocations from './viewSettings-components/manageLocations';
import ManageScreens from './viewSettings-components/manageScreens';
import Icon from '../../icons/icon';

/* COMPONENTS */
const ContentSettings = (props) => {
  const menuItems = [
    {
      id: 1, exact: true, text: 'Usuarios', icon: 'user-o', location: '/settings',
    },
    {
      id: 2, exact: false, text: 'Grupos', icon: 'users', location: '/settings/groups',
    },
    {
      id: 3, exact: false, text: 'Localizaciones', icon: 'map-marker', location: '/settings/locations',
    },
    {
      id: 4, exact: false, text: 'Pantallas', icon: 'window-maximize', location: '/settings/screens',
    },
  ];

  const menu = menuItems.map(item => (
			<div key={item.id} className="list-group-item flex-column align-items-start">
        <NavLink exact={item.exact} to={item.location}>
          <div className="d-flex elemento settings-menu-item">
            <p className="mb-0"><Icon icon={item.icon} mr={3} />{item.text}</p>
          </div>
        </NavLink>
      </div>));

  return (
		<div className="overview">
        <div className="row">
          <div className="col">
            <div className="titulo mb-4 text-right">
              <h1>SISTEMA</h1>
            </div>
            <hr />
          </div>
        </div>
        <div className="row-panel">
          <div className="panel">
            <Title total="Configuración" appearance="card title-settings" icon="cogs" />
            <div className="row controls">
              <div className="col-2">
                <div className="list-group list-group-small mb-3">
                  {menu}
                </div>
              </div>
              <div className="col">
                <Route exact path="/settings" render={() => <ManageUsers {...props} />} />
                <Route path="/settings/groups" render={() => <ManageUserGroups {...props} />} />
                <Route path="/settings/locations" render={() => <ManageLocations {...props} />} />
                <Route path="/settings/screens" render={() => <ManageScreens {...props} />} />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ContentSettings;
