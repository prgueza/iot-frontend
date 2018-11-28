/* IMPORT MODULES */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/* IMPORT COMPONENTS */
import Icon from '../../../icons/icon';

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

  // FIXME: rename variables
  const screenObj = screens.find(r => r.screenCode === screen);
  console.log(screenObj);
  const screenName = screenObj ? screenObj.name : `No se encuentra la pantalla (código: ${screen} )`;
  const color = screenObj ? screenObj.colorProfile : `No se encuentra la pantalla (código: ${screen} )`;
  const size = screenObj ? `${screenObj.width} x ${screenObj.height}` : `No se encuentra la pantalla (código: ${screen} )`;

  const linktoEdit = `/devices/${_id}/edit`;
  const linktoDelete = `/devices/${_id}/delete`;

  return (
    <div className="card card-detalles detalles">
      <div className="card-header">
        <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
          <li className="nav-item mr-auto">
            <h2 className="detalles-titulo">
              <i className="fa fa-tablet mr-3" aria-hidden="true" />
              {name}
            </h2>
          </li>
          <li className="nav-item mr-2">
            <Link to={linktoEdit}>
              <button type="button" className="btn btn-warning">
                <i className="fa fa-pencil-square-o mr-1" aria-hidden="true" />
								Editar
              </button>
            </Link>
          </li>
          <li className="nav-item ml-2">
            <Link to={linktoDelete}>
              <button type="button" className="btn btn-danger">
                <i className="fa fa-trash-o mr-1" aria-hidden="true" />
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
            <p className="card-text">
              <Icon icon="info-circle" fw="true" mr={2} />
              { description }
            </p>
            <p className="card-text">
              <Icon icon="server" fw="true" mr={2} />
              { mac }
            </p>
            <p className={lastFound ? 'card-text' : 'card-text text-danger'}>
              <Icon icon="refresh" fw="true" mr={2} />
              {last}
            </p>
            <p className={found ? 'card-text' : 'card-text text-danger'}>
              <Icon icon="battery" fw="true" mr={2} batt={batt || 0} />
              {found ? `${batt}%` : 'Información no disponible'}
            </p>
            <p className={found ? 'card-text' : 'card-text text-danger'}>
              <Icon icon="signal" fw="true" mr={2} />
              {found ? rssi : 'Información no disponible'}
            </p>
            <p className={found ? 'card-text' : 'card-text text-danger'}>
              <Icon icon="tint" fw="true" mr={2} />
              {screenName}
            </p>
            <p className={found ? 'card-text' : 'card-text text-danger'}>
              <Icon icon="adjust" fw="true" mr={2} />
              {color}
            </p>
            <p className={found ? 'card-text' : 'card-text text-danger'}>
              <Icon icon="arrows-alt" fw="true" mr={2} />
              {size}
            </p>
            <p className={(gateway && found) ? 'card-text' : 'card-text text-danger'}>
              <Icon icon="sitemap" fw="true" mr={2} />
              {(gateway && found) ? gateway.name : 'Información no disponible'}
            </p>
            <p className="card-text">
              <Icon icon="users" fw="true" mr={2} />
              {userGroup ? userGroup.name : 'Dispositivo sin configurar'}
            </p>
            <p className="card-text">
              <Icon icon="calendar-o" fw="true" mr={2} />
              {updated}
            </p>
            <p className="card-text">
              <Icon icon="user-o" fw="true" mr={2} />
              {updatedBy ? updatedBy.name : 'Usuario eliminado'}
            </p>
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
