/* IMPORT MODULES */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* IMPORT COMPONENTS */
import Associated from '../../associated';

const moment = require('moment');

moment.locale('es');

/* COMPONENTS */
const GatewayDetails = ({
  data,
  gateway: {
    _id, name, description, location, updatedAt, createdBy, mac, ip,
  },
}) => {
  const devices = data.devices.filter(device => device.gateway && device.gateway._id === _id);
  // refactor date constants with format
  const updated = moment(updatedAt)
    .format('dddd, D [de] MMMM [de] YYYY');
  // define routes for edit and delete based on the id
  const linktoEdit = `/gateways/${_id}/edit`;
  const linktoDelete = `/gateways/${_id}/delete`;

  return (
		<div className="card card-detalles detalles">
		<div className="card-header">
			<ul className="nav nav-pills card-header-pills justify-content-end mx-1">
				<li className="nav-item mr-auto">
					<h2 className="detalles-titulo"><FontAwesomeIcon icon="sitemap" className="mr-3" fixedWidth />{name}</h2>
				</li>
				<li className="nav-item mr-2">
          <Link to={linktoEdit}>
            <button type="button" className="btn btn-warning"><FontAwesomeIcon icon={['far', 'edit']} className="mr-2" fixedWidth />Editar</button>
          </Link>
        </li>
        <li className="nav-item ml-2">
          <Link to={linktoDelete}>
            <button type="button" className="btn btn-danger"><FontAwesomeIcon icon="trash" className="mr-2" fixedWidth />Eliminar</button>
          </Link>
        </li>
			</ul>
		</div>
		<div className="card-body">
			<div className="row">
				<div className="col">
					<p className="titulo">DETALLES</p>
					<p className="card-text"><FontAwesomeIcon icon="info-circle" className="mr-2" fixedWidth />{description}</p>
					<p className="card-text"><FontAwesomeIcon icon="server" className="mr-2" fixedWidth />{mac}</p>
					<p className="card-text"><FontAwesomeIcon icon="wifi" className="mr-2" fixedWidth />{ip}</p>
					<p className="card-text"><FontAwesomeIcon icon="map-marker-alt" className="mr-2" fixedWidth />{location ? location.name : 'Localización no especificada'}</p>
					<p className="card-text"><FontAwesomeIcon icon={['far', 'calendar']} className="mr-2" fixedWidth />{updated}</p>
					<p className="card-text"><FontAwesomeIcon icon="user" className="mr-2" fixedWidth />{createdBy ? createdBy.name : 'Usuario eliminado'}</p>
				</div>
				<div className="col">
					<div className="asociados">
						<p className="titulo text-right">DISPOSITIVOS ({devices.length})</p>
						<Associated content={devices} category="devices" appearance="elemento-dispositivo" icon="tablet-alt" />
					</div>
				</div>
			</div>
		</div>
	</div>
  );
};

GatewayDetails.propTypes = {
  data: PropTypes.shape({}).isRequired,
  gateway: PropTypes.shape({}).isRequired,
};

export default GatewayDetails;
