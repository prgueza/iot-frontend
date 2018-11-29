/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const moment = require('moment');

moment.locale('es');

/* COMPONENTS */
const DeviceDetails = ({
  device: {
    _id, name, description, updatedAt, updatedBy, mac, gateway, batt, rssi, screen, found, lastFound, userGroup,
  },
  data: { screens },
}) => {
  // refactor date constants with format
  const updated = moment(updatedAt).format('dddd, D [de] MMMM [de] YYYY');
  const last = moment(lastFound).format('dddd, D [de] MMMM [de] YYYY [, a las] HH:mm:ss');

  const battery = [
    { icon: 'battery-empty', set: batt < 20 },
    { icon: 'battery-quarter', set: batt >= 20 && batt < 40 },
    { icon: 'battery-half', set: batt >= 40 && batt < 60 },
    { icon: 'battery-three-quarters', set: batt >= 60 && batt < 80 },
    { icon: 'battery-full', set: batt >= 80 },
  ];

  // FIXME: rename variables
  const screenObj = screens.find(r => r.screenCode === screen);
  console.log(screenObj);
  const screenName = screenObj ? screenObj.name : `No se encuentra la pantalla (código: ${screen} )`;
  const color = screenObj ? screenObj.color : `No se encuentra la pantalla (código: ${screen} )`;
  const size = screenObj ? `${screenObj.width} x ${screenObj.height}` : `No se encuentra la pantalla (código: ${screen} )`;

  const linktoEdit = `/devices/${_id}/edit`;
  const linktoDelete = `/devices/${_id}/delete`;

  return (
    <div className="card card-detalles detalles">
      <div className="card-header">
        <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
          <li className="nav-item mr-auto">
            <h2 className="detalles-titulo">
              <FontAwesomeIcon icon="tablet-alt" className="mr-3" fixedWidth />
              {name}
            </h2>
          </li>
          <li className="nav-item mr-2">
            <Link to={linktoEdit}>
              <button type="button" className="btn btn-warning">
                <FontAwesomeIcon icon={['far', 'edit']} className="mr-2" fixedWidth />
								Editar
              </button>
            </Link>
          </li>
          <li className="nav-item ml-2">
            <Link to={linktoDelete}>
              <button type="button" className="btn btn-danger">
                <FontAwesomeIcon icon="trash" className="mr-2" fixedWidth />
								Eliminar
              </button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <p className="titulo">DETALLES</p>
            <p className="card-text"><FontAwesomeIcon icon="info-circle" className="mr-2" fixedWidth />{ description }</p>
            <p className="card-text"><FontAwesomeIcon icon="server" className="mr-2" fixedWidth />{ mac }</p>
            <p className={lastFound ? 'card-text' : 'card-text text-danger'}><FontAwesomeIcon icon="sync-alt" className="mr-2" fixedWidth />{last}</p>
            <p className={found ? 'card-text' : 'card-text text-danger'}><FontAwesomeIcon icon={battery.find(bat => bat.set).icon} className="mr-2" fixedWidth />{found ? `${batt}%` : 'Información no disponible'}</p>
            <p className={found ? 'card-text' : 'card-text text-danger'}><FontAwesomeIcon icon="wifi" className="mr-2" fixedWidth />{found ? rssi : 'Información no disponible'}</p>
            <p className={found ? 'card-text' : 'card-text text-danger'}><FontAwesomeIcon icon={['far', 'window-maximize']} className="mr-2" fixedWidth />{screenName}</p>
            <p className={found ? 'card-text' : 'card-text text-danger'}><FontAwesomeIcon icon="adjust" className="mr-2" fixedWidth />{color}</p>
            <p className={found ? 'card-text' : 'card-text text-danger'}><FontAwesomeIcon icon="arrows-alt" className="mr-2" fixedWidth />{size}</p>
            <p className={(gateway && found) ? 'card-text' : 'card-text text-danger'}><FontAwesomeIcon icon="sitemap" className="mr-2" fixedWidth />{(gateway && found) ? gateway.name : 'Información no disponible'}</p>
            <p className="card-text"><FontAwesomeIcon icon="users" className="mr-2" fixedWidth />{userGroup ? userGroup.name : 'Dispositivo sin configurar'}</p>
            <p className="card-text"><FontAwesomeIcon icon={['far', 'calendar']} className="mr-2" fixedWidth />{updated}</p>
            <p className="card-text"><FontAwesomeIcon icon="user" className="mr-2" fixedWidth />{updatedBy ? updatedBy.name : 'Usuario eliminado'}</p>
          </div>
        </div>
        <div className="col" />
      </div>
    </div>
  );
};

DeviceDetails.propTypes = {
  device: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({}).isRequired,
};


export default DeviceDetails;
