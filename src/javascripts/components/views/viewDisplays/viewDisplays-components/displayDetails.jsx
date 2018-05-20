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
				activeImage: activeImage ? activeImage._id : ''
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

	/* HANDLE SHOW GROUP IMAGE */
	handleShowGroupImage = () => {
		const form = {
			imageFromGroup: !this.props.display.imageFromGroup
		}
		axios.put( this.props.display.url, form, { // send request
				timeout: process.env.TIMEOUT,
				headers: {
					Authorization: 'Bearer ' + this.props.token
				}
			} )
			.then( res => {
				if ( res.status == 201 ) { // with success
					this.props.update( 'displays', res.data.resourceId, 'edit', res.data.resource ) // update the device info with new activeImage
					this.props.notify( 'Cambios realizados', 'notify-success', 'check', toast.POSITION.TOP_RIGHT, res.data.notify ) // notify success
				} else {
					this.props.notify( 'Error al realizar los cambios', 'notify-error', 'times', toast.POSITION.TOP_RIGHT, res.data.notify ) // notify error
				}
			} )
			.catch( err => {
				this.props.notify( 'Error al realizar los cambios', 'notify-error', 'times', toast.POSITION.TOP_RIGHT, res.data.notify ) // notify error
			} )
	}

	render() {
		// define constants from state for better readability
		const { _id, name, description, group, images, activeImage, imageFromGroup, device, tags, updatedAt, updatedBy } = this.state.display
		// refactor date constants with format
		const updated = moment( updatedAt )
			.format( 'dddd, D [de] MMMM [de] YYYY' )
		// generate tag list
		const tagList = tags.map( ( tag, index ) => <Tag filterData={this.props.filterData} key={index} category='displays' tag={tag}/> )
		// define routes for edit and delete based on the id
		const linktoEdit = '/displays/' + _id + '/edit'
		const linktoDelete = '/displays/' + _id + '/delete'
		// check if activeImage is set and if not set the undefined img
		const src = imageFromGroup ? ( group.activeImage && group.activeImage.src ) : ( activeImage && activeImage.src )
		const groupImageIcon = imageFromGroup ? 'toggle-on' : 'toggle-off'
		// get screen info
		const screen = device && this.props.data.screens.find( screen => screen.screenCode == device.screen )

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
					<EditImageForm handleCloseModal={this.handleCloseModal} {...this.props}/>
				</ReactModal>
        <div className='row'>
          <div className='col'>
            <p className='titulo'>DETALLES</p>
            <p className='card-text'>
              <i className='fa fa-fw fa-info-circle mr-2' aria-hidden='true'></i>{description}</p>
            <p className='card-text'>
              <i className='fa fa-fw fa-map-marker mr-2' aria-hidden='true'></i>{
                device && device.gateway
                  ? (
                    device.gateway.location
                    ? device.gateway.location.name
                    : 'Localización no especificada')
                  : 'Localización no especificada'
              }</p>
            <p className='card-text'>
              <i className='fa fa-fw fa-arrows-alt mr-2' aria-hidden='true'></i>{
                screen != -1
                  ? screen && screen.name
                  : device ? device.screen : 'Dispositivo no asignado'
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
              <div className='vista-imagen-display d-flex w-100 align-items-center mb-3 shadow'>
                {
                  src
                    ? <img className='imagen' src={src}/>
                    : <div className='image-placeholder d-flex align-items-center'>
                        <div>
													<h4>La imagen activa aun no ha sido determinada</h4>
	                        <small>Haga click para determinarla</small>
												</div>
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
              <p onClick={this.handleShowGroupImage} className='titulo text-right toggle'>MOSTRAR IMAGEN DE GRUPO<Icon icon={groupImageIcon} fw={true} ml='1'/></p>
							<Associated content={[group]} category='groups' appearance='elemento-grupo' icon='list' active={this.props.display.group._id}/>
            </div>
          </div>
        </div>
			</div>
		</div> )
	}
}
