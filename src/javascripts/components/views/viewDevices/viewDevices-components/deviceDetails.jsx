/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { BrowserRouter as Router, Link } from 'react-router-dom';

/* IMPORT COMPONENTS*/
import { Associated } from '../../associated.jsx';
import { Tag } from '../../../tags/tag.jsx';

/* COMPONENTS */
export class DeviceDetails extends Component {

	render() {
		// define constants from props for better readability
		const { id, name, description, created_at, updated_at, created_by, mac_address, bt_address, gateway, userGroup } = this.props.device;
		// refactor date constants with format
		const created = moment(created_at).format("dddd, D [de] MMMM [de] YYYY");
		const updated = moment(updated_at).format("dddd, D [de] MMMM [de] YYYY");
		// define routes for edit and delete based on the id
		const linktoEdit = '/devices/' + id + '/edit';
		const linktoDelete = '/devices/' + id + '/delete';

		return(
		<div className="col">
			<div className="card detalles">
				<div className="card-header">
					<ul className="nav nav-pills card-header-pills justify-content-end mx-1">
						<li className="nav-item mr-auto">
							<h2 className="detalles-titulo"><i className='fa fa-tablet mr-3' aria-hidden="true"></i>{name}</h2>
						</li>
						<li className="nav-item mr-2">
              <Link to={linktoEdit}>
                <button type="button" className="btn btn-outline-warning"><i className="fa fa-pencil-square-o mr-1" aria-hidden="true"></i>Editar</button>
              </Link>
            </li>
            <li className="nav-item ml-2">
              <Link to={linktoDelete}>
                <button type="button" className="btn btn-outline-danger"><i className="fa fa-trash-o" aria-hidden="true"></i>Eliminar</button>
              </Link>
            </li>
					</ul>
				</div>
				<div>
					<div className="row">
						<div className="col">
							<div className="card-body">
								<p className="titulo">DETALLES</p>
								<p className="card-text"><i className="fa fa-fw fa-hashtag mr-1" aria-hidden="true"></i>{id}</p>
								<p className="card-text"><i className="fa fa-fw fa-info-circle mr-2" aria-hidden="true"></i>{description}</p>
								<p className="card-text"><i className="fa fa-fw fa-server mr-2" aria-hidden="true"></i>{mac_address}</p>
								<p className="card-text"><i className="fa fa-fw fa-bluetooth-b mr-2" aria-hidden="true"></i>{bt_address}</p>
								<p className={gateway ? "card-text" : "card-text text-danger"}><i className="fa fa-fw fa-sitemap mr-2" aria-hidden="true"></i>{gateway ? gateway.name : 'Dispositivo sin asignar'}</p>
								<p className="card-text"><i className="fa fa-fw fa-users mr-2" aria-hidden="true"></i>{userGroup.name}</p>
								<p className="card-text"><i className="fa fa-fw fa-calendar-o mr-2" aria-hidden="true"></i>{updated}</p>
								<p className="card-text"><i className="fa fa-fw fa-user-o mr-2" aria-hidden="true"></i>{created_by ? created_by.name : 'Usuario eliminado'}</p>
							</div>
						</div>
						<div className="col">
						</div>
					</div>
				</div>
			</div>
		</div>
		);
	}
};
