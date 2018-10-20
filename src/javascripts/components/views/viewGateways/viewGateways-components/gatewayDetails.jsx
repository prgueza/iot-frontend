/* IMPORT MODULES */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
					<h2 className="detalles-titulo"><i className="fa fa-sitemap mr-3" aria-hidden="true" />{name}</h2>
				</li>
				<li className="nav-item mr-2">
          <Link to={linktoEdit}>
            <button type="button" className="btn btn-warning"><i className="fa fa-pencil-square-o mr-1" aria-hidden="true" />Editar</button>
          </Link>
        </li>
        <li className="nav-item ml-2">
          <Link to={linktoDelete}>
            <button type="button" className="btn btn-danger"><i className="fa fa-trash-o mr-1" aria-hidden="true" />Eliminar</button>
          </Link>
        </li>
			</ul>
		</div>
		<div className="card-body">
			<div className="row">
				<div className="col">
					<p className="titulo">DETALLES</p>
					<p className="card-text"><i className="fa fa-fw fa-info-circle mr-2" aria-hidden="true" />{description}</p>
					<p className="card-text"><i className="fa fa-fw fa-server mr-2" aria-hidden="true" />{mac}</p>
					<p className="card-text"><i className="fa fa-fw fa-wifi mr-2" aria-hidden="true" />{ip}</p>
					<p className="card-text"><i className="fa fa-fw fa-map-marker mr-2" aria-hidden="true" />{location ? location.name : 'Localización no especificada'}</p>
					<p className="card-text"><i className="fa fa-fw fa-calendar-o mr-2" aria-hidden="true" />{updated}</p>
					<p className="card-text"><i className="fa fa-fw fa-user-o mr-2" aria-hidden="true" />{createdBy ? createdBy.name : 'Usuario eliminado'}</p>
				</div>
				<div className="col">
					<div className="asociados">
						<p className="titulo text-right">DISPOSITIVOS ({devices.length})</p>
						<Associated content={devices} category="devices" appearance="elemento-dispositivo" icon="tablet" />
					</div>
				</div>
			</div>
		</div>
	</div>
  );
};

GatewayDetails.propTypes = {
  data: PropTypes.shape.isRequired,
  gateway: PropTypes.shape.isRequired,
};

export default GatewayDetails;
