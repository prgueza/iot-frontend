/* IMPORT MODULES */
import React, { Component } from 'react'
const moment = require( 'moment' )
moment.locale( 'es' )
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

/* COMPONENTS */
export class GatewayForm extends Component {

	constructor( props ) {
		super( props )
		const { gateway, user, locations } = this.props
		this.state = {
			id: gateway ? gateway.id : '',
			name: gateway ? gateway.name : '',
			description: gateway ? gateway.description : '',
			created_by: gateway ? ( gateway.created_by ? gateway.created_by.name : 'Usuario eliminado' ) : user.name,
			updated_by: user.name,
			created_at: gateway ? moment( gateway.created_at ) : moment(),
			updated_at: moment(),
			mac: gateway ? gateway.mac : '',
			port: gateway ? gateway.port : '',
			ip: gateway ? gateway.ip : '',
			location: gateway ? gateway.location._id : locations[ 0 ]._id,

			redirect: false,
			redirect_location: '/gateways',
			error: null
		}
	}

	/* INITIAL VALUES FOR FORM INPUTS */
	componentDidMount() {
		const { gateways, gateway } = this.props
		// set state with initial values
		this.setState( {
			redirect_location: gateway ? '/gateways/' + gateway._id : '/gateways' // Redirect url
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

	/* HANDLE SUMBIT (PUT OR POST) */
	handleSubmit = () => {
		const { gateway } = this.props
		// define form values to send
		const form = {
			id: this.state.id,
			name: this.state.name,
			description: this.state.description,
			updated_by: this.state.updated_by._id, // send user_id
			mac: this.state.mac,
			ip: this.state.ip,
			port: this.state.port,
			location: this.state.location,
		}
		// possible empty fields
		if ( !this.props.gateway ) form.created_by = this.props.user._id
		// HTTP request
		axios( {
				method: gateway ? 'put' : 'post',
				url: gateway ? gateway.url : 'http://localhost:4000/gateways',
				data: form,
				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
			} )
			.then( ( res ) => {
				if ( res.status == 201 || res.status == 200 ) {
					this.props.notify( 'Puerta de enlace configurada con éxito', 'notify-success', 'upload', toast.POSITION.BOTTOM_LEFT )
					return this.props.update( this.props.user ) // update dataset
				}
			} )
			.then( res => this.setState( { redirect: true } ) )
			.catch( err => this.props.notify( 'Error al configurar la puerta de enlace', 'notify-error', 'exclamation-triangle', toast.POSITION.BOTTOM_LEFT ) )
	}

	/* RENDER COMPONENT */
	render() {

		// Options
		const optionsLocation = this.props.data.locations.sort( ( a, b ) => a.name - b.name )
			.map( ( location, index ) => <option value={location._id} key={index}>{location.name}</option> )

		// Render return
		if ( this.state.redirect ) {
			return ( <Redirect to={this.state.redirect_location} /> )
		} else {
			return (
				<div className='card detalles'>
          <div className='card-header'>
            <ul className='nav nav-pills card-header-pills justify-content-end mx-1'>
              <li className='nav-item mr-auto'>
                { this.props.gateway
                  ? <h2 className='detalles-titulo'><i className='fa fa-pencil mr-3' aria-hidden='true'></i>Editar una puerta de enlace</h2>
                  : <h2 className='detalles-titulo'><i className='fa fa-plus-circle mr-3' aria-hidden='true'></i>Añadir una nueva puerta de enlace</h2>
                }
              </li>
              <li className='nav-item ml-2'>
                { this.props.gateway
                  ? <button onClick={this.handleSubmit} type='button' className='btn btn-outline-primary'><i className='fa fa-save mr-2' aria-hidden='true'></i>Guardar cambios</button>
                  : <button onClick={this.handleSubmit} type='button' className='btn btn-outline-primary'><i className='fa fa-plus-circle mr-2' aria-hidden='true'></i>Añadir</button>
                }
              </li>
            </ul>
          </div>
          <div className='card-body'>
            <form id='form'>
              <div className='form-group'>
                <label htmlFor='nombre'><i className='fa fa-sitemap mr-2'></i>Nombre</label>
                <input type='text' className='form-control' id='nombre' placeholder='Nombre de la puerta de enlace' name='name' value={this.state.name} onChange={this.handleInputChange}></input>
              </div>
              <div className='form-group'>
                <label htmlFor='descripcion'><i className='fa fa-info-circle mr-2'></i>Descripcion</label>
                <input type='text' className='form-control' id='descripcion' placeholder='Descripcion de la puerta de enlace' name='description' value={this.state.description} onChange={this.handleInputChange}></input>
              </div>
              <div className='form-row'>
                <div className='form-group col'>
                  <label htmlFor='mac'><i className='fa fa-server mr-2'></i>Dirección MAC</label>
                  <input type='text' className='form-control' id='mac' placeholder='Dirección MAC de la puerta de enlace' name='mac' value={this.state.mac} onChange={this.handleInputChange}></input>
                </div>
                <div className='form-group col'>
                  <label htmlFor='ip'><i className='fa fa-wifi mr-2'></i>Dirección IP</label>
                  <input type='text' className='form-control' id='ip' placeholder='Dirección IP de la puerta de enlace' name='ip' value={this.state.ip} onChange={this.handleInputChange}></input>
                </div>
              </div>
              <div className='form-row'>
                <div className='form-group col'>
                  <label htmlFor='port'><i className='fa fa-exchange mr-2'></i>Puerto</label>
                  <input type='text' className='form-control' id='port' placeholder='Puerto de la puerta de enlace' name='mac' value={this.state.port} onChange={this.handleInputChange}></input>
                </div>
                <div className='form-group col'>
                  <label htmlFor='location'><i className='fa fa-map-marker mr-2'></i>Location</label>
                  <div>
                    <select className='custom-select' name='location' onChange={this.handleInputChange}>
                      {optionsLocation}
                    </select>
                  </div>
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='created_by'><i className='fa fa-user-o mr-2'></i>Creador</label>
                <input type='text' className='form-control' id='created_by' name='created_by' value={this.state.created_by} readOnly></input>
              </div>
              <div className='form-row'>
                <div className='form-group col-md-6'>
                  <label htmlFor='fechaCreacion'><i className='fa fa-calendar-o mr-2'></i>Fecha de creación</label>
                  <input type='text' className='form-control' id='fechaCreacion' name='created_at ' value={moment(this.state.created_at).format('dddd, D [de] MMMM [de] YYYY')} readOnly></input>
                </div>
                <div className='form-group col-md-6'>
                  <label htmlFor='fechaModificacion'><i className='fa fa-calendar-o mr-2'></i>Fecha de modificación</label>
                  <input type='text' className='form-control' id='fechaModificacion' name='updated_at' value={moment(this.state.updated_at).format('dddd, D [de] MMMM [de] YYYY')} readOnly></input>
                </div>
              </div>
            </form>
          </div>
        </div>
			)
		}
	}
}
