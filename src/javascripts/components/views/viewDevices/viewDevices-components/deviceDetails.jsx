/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { BrowserRouter as Router, Link } from 'react-router-dom';

/* IMPORT COMPONENTS*/
import { Associated } from '../../associated.jsx';
import { Tag } from '../../../tags/tag.jsx';
import { Icon } from '../../../icons/icon.jsx';

/* COMPONENTS */
export class DeviceDetails extends Component {

	render() {
		// define constants from props for better readability
		const { _id, name, description, updated_at, created_by, mac, gateway, batt, rssi, init_code, found, userGroup } = this.props.device;
		// refactor date constants with format
		const updated = moment(updated_at).format("dddd, D [de] MMMM [de] YYYY");
		// define routes for edit and delete based on the id
		var battery_icon = "fa fa-fw fa-battery-empty mr-2"
		if( batt && batt < 25 ){ battery_icon = "fa fa-fw fa-battery-quarter mr-2" }
		else if ( batt && batt < 50){ battery_icon = "fa fa-fw fa-battery-half mr-2" }
		else if ( batt && batt < 75){ battery_icon = "fa fa-fw fa-battery-three-quarters mr-2" }
		else if ( batt ){ battery_icon = "fa fa-fw fa-battery-full mr-2" }

		const linktoEdit = '/devices/' + _id + '/edit';
		const linktoDelete = '/devices/' + _id + '/delete';

		return(
		<div className="card detalles">
			<div className="card-header">
				<ul className="nav nav-pills card-header-pills justify-content-end mx-1">
					<li className="nav-item mr-auto">
						<h2 className="detalles-titulo"><i className='fa fa-tablet mr-3' aria-hidden="true"></i>{name}</h2>
					</li>
					<li className="nav-item mr-2">
            <Link to={ linktoEdit }>
              <button type="button" className="btn btn-outline-warning"><i className="fa fa-pencil-square-o mr-1" aria-hidden="true"></i>Editar</button>
            </Link>
          </li>
          <li className="nav-item ml-2">
            <Link to={ linktoDelete }>
              <button type="button" className="btn btn-outline-danger"><i className="fa fa-trash-o" aria-hidden="true"></i>Eliminar</button>
            </Link>
          </li>
				</ul>
			</div>
			<div className="card-body">
				<div className="row">
					<div className="col">
						<p className="titulo">DETALLES</p>
						<p className="card-text"><Icon icon="info-circle" fw="true" mr="2"></Icon>{ description }</p>
						<p className="card-text"><Icon icon="server" fw="true" mr="2"></Icon>{ mac }</p>
						<p className={ found ? "card-text" : "card-text text-danger" }><Icon icon="battery" fw="true" mr="2" batt={ batt || 0 }></Icon>{ found ? batt + '%' : "Información no disponible" }</p>
						<p className={ found ? "card-text" : "card-text text-danger" }><Icon icon="signal" fw="true" mr="2"></Icon>{ found ? rssi : "Información no disponible"}</p>
						<p className={ (gateway && found) ? "card-text" : "card-text text-danger" }><Icon icon="sitemap" fw="true" mr="2"></Icon>{ (gateway && found) ? gateway.name : 'Información no disponible' }</p>
						<p className="card-text"><Icon icon="users" fw="true" mr="2"></Icon>{ userGroup ? userGroup.name : 'Dispositivo sin configurar' }</p>
						<p className="card-text"><Icon icon="calendar-o" fw="true" mr="2"></Icon>{ updated }</p>
						<p className="card-text"><Icon icon="user-o" fw="true" mr="2"></Icon>{ created_by ? created_by.name : 'Usuario eliminado' }</p>
					</div>
				</div>
				<div className="col">
				</div>
			</div>
		</div>
		);
	}
};
