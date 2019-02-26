/* IMPORT MODULES */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Shapes } from '../util';

/* IMPORT COMPONENTS */
import NavButton from '../buttons/navButton';

/* COMPONENT */
class Navigation extends Component {
	/* HANDLE SEARCH */
	handleSearch = (event) => {
	  const { filterData } = this.props;
	  filterData(event.target.value);
	}

	/* RENDER COMPONENT */
	render() {
	  const {
	    data: {
	      displays, images, groups, devices, gateways,
	    }, user, syncStatus, token, filterValue, sync, syncApi,
	  } = this.props;

	  const estado = displays && displays.filter(display => display.updating === true).length > 0 ? 'Procesando...' : 'Estado';

	  const navigationUser = [
	    {
	      id: 1, exact: true, linkTo: '', text: 'Vista general', icon: 'eye', count: false, number: '',
	    },
	    {
	      id: 2, exact: false, linkTo: 'displays', text: 'Displays', icon: 'tv', count: true, number: displays ? `${displays.length}/${devices.length}` : '...',
	    },
	    {
	      id: 3, exact: false, linkTo: 'images', text: 'Imagenes', icon: ['far', 'images'], count: true, number: images ? String(images.length) : '...',
	    },
	    {
	      id: 4, exact: false, linkTo: 'groups', text: 'Grupos', icon: 'layer-group', count: true, number: groups ? String(groups.length) : '...',
	    },
	  ];

	  const navigationAdmin = [
	    {
	      id: 1, exact: true, linkTo: '', text: 'Vista general', icon: 'eye', count: false, number: '',
	    },
	    {
	      id: 2, exact: false, linkTo: 'devices', text: 'Dispositivos', icon: 'tablet-alt', count: true, number: devices ? String(devices.length) : '...',
	    },
	    {
	      id: 3, exact: false, linkTo: 'gateways', text: 'Puertas de enlace', icon: 'sitemap', count: true, number: gateways ? String(gateways.length) : '...',
	    },
	  ];

	  const nav = user && user.admin
	    ? navigationAdmin.map(navItem => <NavButton key={navItem.id} exact={navItem.exact} linkTo={navItem.linkTo} text={navItem.text} icon={navItem.icon} count={navItem.count} number={navItem.number} />)
	    : navigationUser.map(navItem => <NavButton key={navItem.id} exact={navItem.exact} linkTo={navItem.linkTo} text={navItem.text} icon={navItem.icon} count={navItem.count} number={navItem.number} />);

	  let syncButton;

	  switch (syncStatus) {
	    // unsynced
	    case 0:
	    {
	      syncButton = (
				  <li>
						<button onClick={() => syncApi(token)} type="button" className="btn btn-nav btn-block mb-1">
							<FontAwesomeIcon icon="sync" className="mr-2" fixedWidth />
							Buscar dispositivos
						</button>
				  </li>
	      );
	      break;
	    }

	    // syncReady
	    case 1:
	    {
	      syncButton = (
				  <li>
				    <button onClick={() => sync()} type="button" className="btn btn-nav btn-block mb-1">
				      <FontAwesomeIcon icon="link" className="mr-2" fixedWidth />
								Sincronizar
        		</button>
				  </li>
			  );
	      break;
	    }

	    // syncing
	    case 2:
	    {
	      syncButton = (
				  <li>
				    <button onClick={() => syncApi(token)} type="button" className="btn btn-nav btn-block mb-1" disabled>
				      <FontAwesomeIcon icon="sync" className="mr-2" fixedWidth spin />
							Sincronizando
				    </button>
				  </li>
	      );
	      break;
	    }
	    default: {
	      syncButton = '';
	    }
	  }

	  return (
  <div className="col-2 navigation">
    <div className="titulo mb-4 text-center">
      <h1>MENU</h1>
    </div>
    <hr />
    <div className="card card-menu menu">
      <div className="button-menu">
        <div className="busqueda mb-3">
          <p>BÚSQUEDA</p>
          <input onChange={this.handleSearch} value={filterValue} type="text" className="form-control input-no-border search" id="busqueda" aria-describedby="campoBusqueda" placeholder="Buscar..." />
        </div>
        <div className="mb-3">
          <p>NAVEGACIÓN</p>
          <ul className="nav-list">
            {nav}
          </ul>
        </div>
        <div className="mb-3">
          <p>SISTEMA</p>
          <ul className="nav-list">
						{ user && !user.admin && <NavButton key="state" linkTo="state" text={estado} icon="cloud-upload-alt" /> }
            {syncButton}
            { user && user.admin && <NavButton key="settings" linkTo="settings" text="Configuración" icon="cogs" /> }
            <li>
              <a tabIndex={-1} href="/disconect">
                <button type="button" className="btn btn-nav btn-block mb-1">
                  <FontAwesomeIcon icon="sign-out-alt" className="mr-2" fixedWidth />
									Desconectar
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="d-flex justify-content-between">
        <span>v0.1.5</span>
        <span>{user ? user.name : 'Cargando...'}</span>
      </p>
    </div>
  </div>
	  );
	}
}

Navigation.propTypes = {
  data: PropTypes.shape(Shapes.data),
  user: PropTypes.shape(Shapes.user),
  syncStatus: PropTypes.number.isRequired,
  token: PropTypes.string,
  filterValue: PropTypes.string,
  filterData: PropTypes.func,
  sync: PropTypes.func,
  syncApi: PropTypes.func,
};

Navigation.defaultProps = {
  data: null,
  user: null,
  token: null,
  filterValue: '',
  filterData: () => false,
  sync: () => false,
  syncApi: () => false,
};

export default Navigation;
