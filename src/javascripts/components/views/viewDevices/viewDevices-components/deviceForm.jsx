/* IMPORT MODULES */
import React, { Component } from 'react'
const moment = require( 'moment' )
moment.locale( 'es' )
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

/* COMPONENTS */
export class DeviceForm extends Component {

	constructor( props ) {
		super( props )
		const { device, user, data: { screens, gateways, userGroups } } = this.props
		this.state = {
			name: device.name,
			description: device.description,
			updatedBy: user.name,
			createdAt: moment( device.created_at ),
			updatedAt: moment(),
			mac: device.mac,
			prefGateway: device.pref_gateway ? device.pref_gateway._id : gateways[ 0 ]._id,
			userGroup: device.userGroup ? device.userGroup._id : '',

			redirect: false,
			redirectLocation: '/devices',
			error: null
		}
	}

	/* INITIAL VALUES FOR FORM INPUTS */
	componentDidMount() {
		const { device } = this.props
		// set state with initial values
		this.setState( {
			redirectLocation: '/devices/' + device._id
		} )
	}

	/* HANDLE INPUT CHANGE (CONTROLLED FORM) */
	handleInputChange = ( event ) => {
		const target = event.target
		const name = target.name
		const value = target.value

		this.setState( {
      [ name ]: value
		} )
	}

	/* HANDLE SUBMIT (PUT OR POST) */
	handleSubmit = () => {
		const { device } = this.props
		// define form values to send
		const form = {
			name: this.state.name,
			description: this.state.description,
			updated_by: this.state.updated_by._id, // send user_id
			pref_gateway: this.state.prefGateway,
			mac: this.state.mac,
		}
		if ( this.state.userGroup ) form.userGroup = this.state.userGroup // FIXME: include it within the declaration of form somehow
		// HTTP request
		axios( {
				method: 'put',
				url: device.url,
				data: form,
				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
			} )
			.then( ( res ) => {
				if ( res.status == 201 || res.status == 200 ) {
					this.props.notify( 'Dispositivo configurado con éxito', 'notify-success', 'upload', toast.POSITION.BOTTOM_LEFT )
					return this.props.update( this.props.user ) // update dataset
				}
			} )
			.then( ( res ) => {
				this.setState( { redirect: true } )
				return res
			} )
			.catch( ( err ) => {
				console.log( err )
				return this.props.notify( 'Error al configurar el dispositivo', 'notify-error', 'exclamation-triangle', toast.POSITION.BOTTOM_LEFT )
			} )
	}

	/* RENDER COMPONENT */
	render() {

		const { device, data: { gateways, screens, userGroups } } = this.props

		// Options
		const optionsGateway = gateways.map( ( gateway, index ) => <option value={gateway._id} key={index}>{gateway.name}</option> )
		const optionsUserGroup = userGroups.map( ( userGroup, index ) => <option value={userGroup._id} key={index}>{userGroup.name}</option> )

		const screen = screens.find( screen => screen.screen_code == device.screen )
		const screenName = screen ? screen.name : 'No se encuentra la pantalla (código: ' + device.screen + ' )'

		// Render return
		if ( this.state.redirect ) {
			return ( <Redirect to={this.state.redirectLocation} /> )
		} else {
			return (
				<div className='card detalles'>
          <div className='card-header'>
            <ul className='nav nav-pills card-header-pills justify-content-end mx-1'>
              <li className='nav-item mr-auto'>
                <h2 className='detalles-titulo'><i className='fa fa-fw fa-pencil mr-3' aria-hidden='true'></i>Configurar un dispositivo físico</h2>
              </li>
              <li className='nav-item ml-2'>
                <button onClick={this.handleSubmit} type='button' className='btn btn-outline-primary'><i className='fa  fa-fw fa-floppy-o mr-2' aria-hidden='true'></i>Guardar cambios</button>
              </li>
            </ul>
          </div>
          <div className='card-body'>
            <form id='form'>
              <div className='form-group'>
                <label htmlFor='nombre'><i className='fa fa-fw fa-tablet mr-2'></i>Nombre</label>
                <input type='text' className='form-control' id='nombre' placeholder='Nombre del dispositivo físico' name='name' value={this.state.name} onChange={this.handleInputChange}></input>
              </div>
              <div className='form-group'>
                <label htmlFor='descripcion'><i className='fa fa-fw fa-info-circle mr-2'></i>Descripcion</label>
                <input type='text' className='form-control' id='descripcion' placeholder='Descripcion de la puerta de enlace' name='description' value={this.state.description} onChange={this.handleInputChange}></input>
              </div>
              <div className='form-group'>
                <label htmlFor='mac'><i className='fa fa-fw fa-server mr-2'></i>Dirección MAC</label>
                <input type='text' className='form-control' id='mac' placeholder='Dirección MAC de la puerta de enlace' name='mac' value={this.state.mac} readOnly></input>
              </div>
              <div className='form-row'>
                <div className='form-group col'>
                  <label htmlFor='screen'><i className='fa fa-fw fa-tint mr-2'></i>Pantalla</label>
                  <input type='text' className='form-control' id='screen' name='screen' value={screenName} readOnly></input>
                </div>
                <div className='form-group col'>
                  <label htmlFor='gateway'><i className='fa fa-fw fa-sitemap mr-2'></i>Puerta de enlace preferida</label>
                  <div>
                    <select className='custom-select' name='gateway' value={this.state.prefGateway} onChange={this.handleInputChange}>
                      {optionsGateway}
                    </select>
                  </div>
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='userGroup'><i className='fa fa-fw fa-users mr-2'></i>Grupo de gestión del dispositivo</label>
                <div>
                  <select className='custom-select' name='userGroup' value={this.state.userGroup} onChange={this.handleInputChange}>
                    <option value='' key='0'>Ninguno seleccionado</option>
                    {optionsUserGroup}
                  </select>
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='updated_by'><i className='fa fa-fw fa-user-o mr-2'></i>Ultima modificación por</label>
                <input type='text' className='form-control' id='updated_by' name='updated_by' value={this.state.updatedBy} readOnly></input>
              </div>
              <div className='form-row'>
                <div className='form-group col-md-6'>
                  <label htmlFor='fechaCreacion'><i className='fa fa-fw fa-calendar-o mr-2'></i>Fecha de creación</label>
                  <input type='text' className='form-control' id='fechaCreacion' name='created_at ' value={moment(this.state.createdAt).format('dddd, D [de] MMMM [de] YYYY')} readOnly></input>
                </div>
                <div className='form-group col-md-6'>
                  <label htmlFor='fechaModificacion'><i className='fa fa-fw fa-calendar-o mr-2'></i>Fecha de modificación</label>
                  <input type='text' className='form-control' id='fechaModificacion' name='updated_at' value={moment(this.state.updatedAt).format('dddd, D [de] MMMM [de] YYYY')} readOnly></input>
                </div>
              </div>
            </form>
          </div>
        </div>
			)
		}
	}
}
