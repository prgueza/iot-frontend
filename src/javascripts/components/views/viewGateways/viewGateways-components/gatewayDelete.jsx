/* IMPORT MODULES */
import React, { Component } from 'react'
const moment = require( 'moment' )
moment.locale( 'es' )
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

/* COMPONENTS */
export class GatewayDelete extends Component {

	constructor( props ) {
		super( props )
		this.state = {
			redirect: false
		}
	}

	/* HANDLE DELETE EVENT */
	handleDelete = ( event ) => {
		event.preventDefault()
		axios.delete( this.props.gateway.url, {
				headers: {
					Authorization: 'Bearer ' + this.props.token
				}
			} )
			.then( ( res ) => {
				if ( res.status == 200 ) {
					this.props.notify( 'Puerta de enlace eliminado con éxito', 'notify-success', 'trash-o' )
					this.props.update( 'gateways', res.resourceId, 'remove', res.data.resource ) // update dataset
				}
			} )
			.then( res => this.setState( { redirect: true } ) )
			.catch( err => this.props.notify( 'Error al eliminar la puerta de enlace', 'notify-error', 'exclamation-triangle' ) )
	}

	render() {
		if ( this.state.redirect ) {
			return ( <Redirect to='/gateways'/> )
		} else {
			return (
				<div className='card detalles'>
          <div className='card-header'>
            <ul className='nav nav-pills card-header-pills justify-content-end mx-1'>
              <li className='nav-item mr-auto'>
                <h2 className='detalles-titulo'><i className='fa fa-trash mr-3' aria-hidden='true'></i>Eliminar Puerta de enlace</h2>
              </li>
            </ul>
          </div>
          <div className='card-body'>
            <div className='text-center'>
              <h1>¿Eliminar puerta de enlace?</h1>
              <hr className='card-division'></hr>
              <p>Esta acción no se puede deshacer</p>
              <button onClick={this.handleDelete} type='button' className='btn btn-block btn-danger'><i className='fa fa-trash mr-1' aria-hidden='true'></i>Eliminar</button>
            </div>
          </div>
        </div>
			)
		}
	}
}
