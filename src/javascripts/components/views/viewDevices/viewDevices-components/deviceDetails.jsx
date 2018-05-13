/* IMPORT MODULES */
import React, { Component } from 'react'
const moment = require( 'moment' )
moment.locale( 'es' )
import { BrowserRouter as Router, Link } from 'react-router-dom'

/* IMPORT COMPONENTS*/
import { Associated } from '../../associated.jsx'
import { Tag } from '../../../tags/tag.jsx'
import { Icon } from '../../../icons/icon.jsx'

/* COMPONENTS */
export class DeviceDetails extends Component {

	render() {
		// define constants from props for better readability
		const { _id, name, description, updatedAt, updatedBy, mac, gateway, batt, rssi, screen, initcode, found, userGroup } = this.props.device
		const { data: { screens } } = this.props

		// refactor date constants with format
		const updated = moment( updatedAt )
			.format( 'dddd, D [de] MMMM [de] YYYY' )

		// define routes for edit and delete based on the id
		var batteryIcon = 'fa fa-fw fa-battery-empty mr-2'
		if ( batt && batt < 25 ) { batteryIcon = 'fa fa-fw fa-battery-quarter mr-2' } else if ( batt && batt < 50 ) { batteryIcon = 'fa fa-fw fa-battery-half mr-2' } else if ( batt && batt < 75 ) { batteryIcon = 'fa fa-fw fa-battery-three-quarters mr-2' } else if ( batt ) { batteryIcon = 'fa fa-fw fa-battery-full mr-2' }

		// FIXME: rename variables
		const screenObj = screens.find( ( r ) => r.screenCode == screen )
		const screenName = screenObj ? screenObj.name : 'No se encuentra la pantalla (código: ' + screen + ' )'
		const color = screenObj ? screenObj.colorProfile : 'No se encuentra la pantalla (código: ' + screen + ' )'
		const size = screenObj ? screenObj.size.width + 'x' + screenObj.size.height : 'No se encuentra la pantalla (código: ' + screen + ' )'

		const linktoEdit = '/devices/' + _id + '/edit'
		const linktoDelete = '/devices/' + _id + '/delete'

		return (
			<div className='card detalles'>
			<div className='card-header'>
				<ul className='nav nav-pills card-header-pills justify-content-end mx-1'>
					<li className='nav-item mr-auto'>
						<h2 className='detalles-titulo'><i className='fa fa-tablet mr-3' aria-hidden='true'></i>{name}</h2>
					</li>
					<li className='nav-item mr-2'>
            <Link to={linktoEdit}>
              <button type='button' className='btn btn-warning'><i className='fa fa-pencil-square-o mr-1' aria-hidden='true'></i>Editar</button>
            </Link>
          </li>
          <li className='nav-item ml-2'>
            <Link to={linktoDelete}>
              <button type='button' className='btn btn-danger'><i className='fa fa-trash-o mr-1' aria-hidden='true'></i>Eliminar</button>
            </Link>
          </li>
				</ul>
			</div>
			<div className='card-body'>
				<div className='row'>
					<div className='col'>
						<p className='titulo'>DETALLES</p>
						<p className='card-text'><Icon icon='info-circle' fw='true' mr='2'></Icon>{ description }</p>
						<p className='card-text'><Icon icon='server' fw='true' mr='2'></Icon>{ mac }</p>
						<p className={found ? 'card-text' : 'card-text text-danger' }><Icon icon='battery' fw='true' mr='2' batt={batt || 0}></Icon>{found ? batt + '%' : 'Información no disponible'}</p>
						<p className={found ? 'card-text' : 'card-text text-danger' }><Icon icon='signal' fw='true' mr='2'></Icon>{found ? rssi : 'Información no disponible'}</p>
						<p className={found ? 'card-text' : 'card-text text-danger' }><Icon icon='tint' fw='true' mr='2'></Icon>{screenName}</p>
						<p className={found ? 'card-text' : 'card-text text-danger' }><Icon icon='adjust' fw='true' mr='2'></Icon>{color}</p>
						<p className={found ? 'card-text' : 'card-text text-danger' }><Icon icon='arrows-alt' fw='true' mr='2'></Icon>{size}</p>
						<p className={(gateway && found) ? 'card-text' : 'card-text text-danger' }><Icon icon='sitemap' fw='true' mr='2'></Icon>{(gateway && found) ? gateway.name : 'Información no disponible'}</p>
						<p className='card-text'><Icon icon='users' fw='true' mr='2'></Icon>{userGroup ? userGroup.name : 'Dispositivo sin configurar'}</p>
						<p className='card-text'><Icon icon='calendar-o' fw='true' mr='2'></Icon>{updated}</p>
						<p className='card-text'><Icon icon='user-o' fw='true' mr='2'></Icon>{updatedBy ? updatedBy.name : 'Usuario eliminado'}</p>
					</div>
				</div>
				<div className='col'>
				</div>
			</div>
		</div>
		)
	}
}
