/* IMPORT MODULES */
import React, { Component } from 'react'
const moment = require( 'moment' )
moment.locale( 'es' )
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

/* COMPONENT */
export class DisplayDelete extends Component {

	constructor( props ) {
		super( props )
		this.state = {
			// for redirect after deletion
			redirect: false
		}
	}

	/* HANDLE DELETE EVENT */
	handleDelete = ( event ) => {
		event.preventDefault()
		axios.delete( this.props.display.url, {
				headers: {
					Authorization: 'Bearer ' + this.props.token
				}
			} )
			.then( ( res ) => {
				if ( res.status == 200 ) {
					this.props.notify( 'Display eliminado con éxito', 'notify-success', 'trash-o' )
					this.props.update( 'displays', res.resourceId, 'remove', res.data.resource, res.data.devices ) // update dataset
				}
			} )
			.then( res => this.setState( { redirect: true } ) )
			.catch( err => this.props.notify( 'Error al eliminar el display', 'notify-error', 'exclamation-triangle' ) )
	}

	render() {
		if ( this.state.redirect ) {
			return ( <Redirect to='/displays'/> )
		} else {
			return ( <div className='card detalles'>
        <div className='card-header'>
          <ul className='nav nav-pills card-header-pills justify-content-end mx-1'>
            <li className='nav-item mr-auto'>
              <h2 className='detalles-titulo'>
                <i className='fa fa-trash mr-3' aria-hidden='true'></i>Eliminar configuración</h2>
            </li>
          </ul>
        </div>
        <div className='card-body'>
          <div className='text-center'>
            <h1>¿Eliminar configuración?</h1>
            <hr className='card-division'></hr>
            <p>Esta acción no se puede deshacer</p>
            <button onClick={this.handleDelete} type='button' className='btn btn-block btn-danger'>
              <i className='fa fa-trash mr-1' aria-hidden='true'></i>Eliminar</button>
          </div>
        </div>
      </div> )
		}
	}
}
