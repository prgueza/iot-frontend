/* IMPORT MODULES */
import React, { Component } from 'react'
const moment = require( 'moment' )
moment.locale( 'es' )
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import ReactModal from 'react-modal'

/* IMPORT COMPONENTS */
import { Associated } from '../../associated.jsx'
import { Tag } from '../../../tags/tag.jsx'
import { Icon } from '../../../icons/icon.jsx'
import { EditImageForm } from '/Users/Pedro/Documents/Universidad/TFG/iot-frontend/src/javascripts/components/views/viewDisplays/viewDisplays-components/editImageForm.jsx'

/* COMPONENT */
export class DisplayDetails extends Component {

	constructor( props ) {
		super( props )
		this.state = {
			display: this.props.display,
			activeImage: '',
			syncing: false,
			syncingTo: '',
			error: null,
			modal: false
		}
	}

	componentDidMount() {
		const { activeImage } = this.props.display
		this.setState( {
			activeImage: activeImage ? activeImage._id : '',
		} )
	}

	componentWillReceiveProps( nextProps ) {
		if ( nextProps != this.props ) {
			const { activeImage } = nextProps.display
			this.setState( {
				display: nextProps.display,
				activeImage: activeImage ? activeImage._id : '',
				syncing: false,
				syncingTo: ''
			} )
		}
	}

	/* MODAL */
	handleOpenModal = () => {
		this.setState( { modal: true } )
	}

	handleCloseModal = () => {
		this.setState( { modal: false } )
	}

	/* HANDLE INPUT CHANGE */
	handleInputChange = ( event ) => {
		const value = event.target.value
		const image = this.props.data.images.find( image => value == image._id )
		this.setState( { syncing: true, syncingTo: image._id } )
		const url = process.env.API_URL + 'update/' + this.state.display._id // set url for the request
		const body = { // set body containing the image to be uploaded to the device
			image_id: image._id
		}
		axios.put( url, body, { // send request
				timeout: process.env.TIMEOUT,
				headers: {
					Authorization: 'Bearer ' + this.props.token
				}
			} )
			.then( res => {
				if ( res.status == 201 ) { // with success
					this.props.update( 'displays', res.data.resourceId, 'edit', res.data.resource ) // update the device info with new activeImage
					this.props.notify( 'Imagen sincronizada con éxito', 'notify-success', 'check', toast.POSITION.BOTTOM_LEFT ) // notify success
				} else {
					this.props.notify( 'Error al sincronizar la imagen', 'notify-error', 'times', toast.POSITION.BOTTOM_LEFT ) // notify error
					this.setState( { syncing: false, syncingTo: '' } )
				}
			} )
			.catch( err => {
				this.props.notify( 'Error al sincronizar la imagen', 'notify-error', 'times', toast.POSITION.BOTTOM_LEFT ) // notify error
				this.setState( { syncing: false, syncingTo: '' } )
			} )
	}

	render() {
		// define constants from state for better readability
		const { _id, name, description, group, images, activeImage, device, tags, updatedAt, updatedBy } = this.state.display
		// refactor date constants with format
		const updated = moment( updatedAt )
			.format( 'dddd, D [de] MMMM [de] YYYY' )
		// generate tag list
		const tagList = tags.map( ( tag, index ) => <Tag filterData={this.props.filterData} key={index} category='displays' tag={tag}/> )
		// define routes for edit and delete based on the id
		const linktoEdit = '/displays/' + _id + '/edit'
		const linktoDelete = '/displays/' + _id + '/delete'
		// check if activeImage is set and if not set the undefined img
		const src = activeImage && activeImage.src_url
		// get screen info
		const screen = this.props.data.screens.find( screen => screen.screenCode == device.screen )

		return (
			<div className='card detalles'>
		      <div className='card-header'>
		        <ul className='nav nav-pills card-header-pills justify-content-end mx-1'>
		          <li className='nav-item mr-auto'>
		            <h2 className='detalles-titulo'>
		              <i className='fa fa-television mr-3' aria-hidden='true'></i>{name}</h2>
		          </li>
		          <li className='nav-item mr-2'>
		            <Link to={linktoEdit}>
		              <button type='button' className='btn btn-warning'>
		                <i className='fa fa-pencil-square-o mr-2' aria-hidden='true'></i>Editar</button>
		            </Link>
		          </li>
		          <li className='nav-item ml-2'>
		            <Link to={linktoDelete}>
		              <button type='button' className='btn btn-danger'>
		                <i className='fa fa-trash-o mr-2' aria-hidden='true'></i>Eliminar</button>
		            </Link>
		          </li>
		        </ul>
		      </div>
      <div className='card-body'>
				<ReactModal isOpen={this.state.modal} ariaHideApp={false} className="modal-content">
					<EditImageForm handleCloseModal={this.handleCloseModal} display={this.props.display}/>
				</ReactModal>
        <div className='row'>
          <div className='col'>
            <p className='titulo'>DETALLES</p>
            <p className='card-text'>
              <i className='fa fa-fw fa-info-circle mr-2' aria-hidden='true'></i>{description}</p>
            <p className='card-text'>
              <i className='fa fa-fw fa-map-marker mr-2' aria-hidden='true'></i>{
                device.gateway
                  ? (
                    device.gateway.location
                    ? device.gateway.location.name
                    : 'Localización no especificada')
                  : 'Localización no especificada'
              }</p>
            <p className='card-text'>
              <i className='fa fa-fw fa-arrows-alt mr-2' aria-hidden='true'></i>{
                screen != -1
                  ? screen.name
                  : device.screen
              }</p>
            <p className='card-text'>
              <i className='fa fa-fw fa-calendar-o mr-2' aria-hidden='true'></i>{updated}</p>
            <p className='card-text'>
              <i className='fa fa-fw fa-user-o mr-2' aria-hidden='true'></i>{
                updatedBy
                  ? updatedBy.name
                  : 'Usuario eliminado'
              }</p>
            <p className='titulo'>ETIQUETAS</p>
            {tagList}
          </div>
          <div className='col'>
            <div className='vista-previa'>
              {
                this.state.syncing
                  ? <p className='titulo text-right'><i className='fa fa-fw fa-refresh fa-spin mr-2' aria-hidden='true'></i>SINCRONIZANDO IMAGEN</p>
                  : <p className='titulo text-right'>IMAGEN ACTIVA</p>
              }
              <div className='vista-imagen-display d-flex w-100 align-items-center mb-3 shadow'>
                {
                  src
                    ? <img className='imagen' src={src}/>
                    : <div className='image-placeholder align-self-center'>
                        <h4>La imagen activa aun no ha sido determinada</h4>
                        <small>Suba una imagen al servidor</small>
                      </div>
                }
								<div className="overlay d-flex w-100 justify-content-center" onClick={this.handleOpenModal}>
							    <p className="d-flex overlay-text">Haga click para editar la imagen</p>
							  </div>
              </div>
            </div>
				</div>
			</div>
			<hr className='card-division'></hr>
			<div className='row'>
          <div className='col'>
            <div className='asociados'>
              <p className='titulo'>IMAGENES ASOCIADAS ({images.length})</p>
              <Associated content={images} category='images' appearance='elemento-imagen' icon='picture-o' active={this.state.activeImage}/>
            </div>
          </div>
          <div className='col'>
            <div className='asociados'>
              <p className='titulo text-right'>GRUPO</p>
              <Associated content={group} category='groups' appearance='elemento-grupo' icon='list'/>
            </div>
          </div>
        </div>
			</div>
		</div> )
	}
}
