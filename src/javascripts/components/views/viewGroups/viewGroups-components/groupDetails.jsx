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
import { EditImageForm } from '/Users/Pedro/Documents/Universidad/TFG/iot-frontend/src/javascripts/components/views/viewGroups/viewGroups-components/editImageForm.jsx'

/* COMPONENTS */
export class GroupDetails extends Component {

	constructor( props ) {
		super( props )
		const { group, user } = this.props
		this.state = {
			group: '',
			activeImage: '',
			images: '',
			modal: false,
			error: null
		}
	}

	componentDidMount() {
		// get data
		const { activeImage } = this.props.group
		// state
		this.setState( {
			group: this.props.group,
			activeImage: activeImage ? activeImage._id : '',
			src: activeImage ? activeImage.src : null
		} )
	}

	componentWillReceiveProps( nextProps ) {
		// get data
		const { activeImage } = nextProps.group
		// state
		this.setState( {
			group: nextProps.group,
			activeImage: activeImage ? activeImage._id : '',
			src: activeImage ? activeImage.src : null
		} )
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
		const image = this.props.images.find( image => value == image._id )
		const form = { activeImage: image ? image._id : null, userGroup: this.props.userGroup._id }
		axios( {
				method: 'put',
				url: this.state.group.url,
				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
				data: form
			} )
			.then( ( res ) => {
				if ( res.status == 201 ) {
					const newImage = this.state.group.images.find( image => value == image._id )
					const src = newImage ? newImage.src : null
					this.props.notify( 'Imagen cambiada con éxito', 'notify-success', 'upload', toast.POSITION.BOTTOM_LEFT )
					this.props.update( this.props.user )
				} else {
					this.setState( { error: res.data } )
				}
			} )
	}

	render() {
		// define constants from props for better readability
		const { _id, name, description, createdAt, updatedAt, createdBy, displays, images, activeImage, overlayImage, tags } = this.props.group
		// refactor date constants with format
		const created = moment( createdAt )
			.format( 'dddd, D [de] MMMM [de] YYYY' )
		const updated = moment( updatedAt )
			.format( 'dddd, D [de] MMMM [de] YYYY' )
		// generate tag list
		const tagList = tags.map( ( tag, index ) => <Tag filterData={this.props.filterData} key={index} category='groups' tag={tag} /> )
		// check if activeImage is set and if not set the undefined img
		const src = activeImage && activeImage.src
		const srcOverlay = overlayImage && overlayImage.image.src
		const overlayImageStyle = {
			left: overlayImage && overlayImage.xCoordinate + '%',
			top: overlayImage && overlayImage.yCoordinate + '%'
		} // define routes for edit and delete based on the id
		const linktoEdit = '/groups/' + _id + '/edit'
		const linktoDelete = '/groups/' + _id + '/delete'
		const imagesOptions = images.map( image => <option value={image._id} key={image._id}>{image.name}</option> )

		return (
			<div className='card detalles'>
      <div className='card-header'>
        <ul className='nav nav-pills card-header-pills justify-content-end mx-1'>
          <li className='nav-item mr-auto'>
            <h2 className='detalles-titulo'><i className='fa fa-list mr-3' aria-hidden='true'></i>{name}</h2>
          </li>
          <li className='nav-item mr-2'>
            <Link to={linktoEdit}>
              <button type='button' className='btn btn-warning'><i className='fa fa-pencil-square-o mr-1' aria-hidden='true'></i>Editar</button>
            </Link>
          </li>
          <li className='nav-item ml-2'>
            <Link to={linktoDelete}>
              <button type='button' className='btn btn-danger'><i className='fa fa-trash-o' aria-hidden='true'></i>Eliminar</button>
            </Link>
          </li>
        </ul>
      </div>
      <div className='card-body'>
				<ReactModal isOpen={this.state.modal} ariaHideApp={false} className="modal-content">
					<EditImageForm handleCloseModal={this.handleCloseModal} {...this.props}/>
				</ReactModal>
        <div className='row'>
          <div className='col-lg-6'>
            <p className='titulo'>DETALLES</p>
            <p className='card-text'><i className='fa fa-fw fa-info-circle mr-2' aria-hidden='true'></i>{description}</p>
            <p className='card-text'><i className='fa fa-fw fa-calendar-o mr-2' aria-hidden='true'></i>{created}</p>
            <p className='card-text'><i className='fa fa-fw fa-user-o mr-2' aria-hidden='true'></i> {createdBy ? createdBy.name : 'Usuario eliminado'}</p>
            <p className='titulo'>ETIQUETAS</p>
            {tagList}
          </div>
					<div className='col-lg-6'>
            <div className='vista-imagen-display d-flex w-100 align-items-center mb-3 shadow'>
              {
                src
                  ? <img className='main-image' src={src}/>
									: <div className='image-placeholder d-flex align-items-center'>
                      <div>
												<h4>La imagen activa aun no ha sido determinada</h4>
                        <small>Haga click para determinarla</small>
											</div>
                    </div>
              }
							{ srcOverlay && <img className='overlay-image shadow' height={overlayImage.size + '%'} width={'auto'} style={overlayImageStyle} src={srcOverlay}/> }
							<div className="overlay d-flex w-100 justify-content-center" onClick={this.handleOpenModal}>
						    <p className="d-flex overlay-text">Haga click para editar la imagen</p>
						  </div>
            </div>
				</div>
        </div>
        <hr className='card-division'></hr>
        <div className='row'>
          <div className='col'>
            <div className='asociados'>
              <p className='titulo'>DISPLAYS ({displays.length})</p>
              <Associated content={displays} category='displays' appearance='elemento-display' icon='television'/>
            </div>
          </div>
          <div className='col'>
            <div className='asociados'>
              <p className='titulo text-right'>IMAGENES ASOCIADAS ({images.length})</p>
              <Associated content={images} category='images' appearance='elemento-imagen' icon='picture-o' active={this.state.activeImage}/>
            </div>
          </div>
        </div>
      </div>
    </div>
		)
	}
}
