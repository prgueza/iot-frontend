/* IMPORT MODULES */
import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import ReactModal from 'react-modal'
const cx = require( 'classnames' )

/* IMPORT COMPONENTS */
import { Icon } from '../../../icons/icon.jsx'

/* COMPONENT */
export class EditImageForm extends Component {

	constructor( props ) {
		super( props )
		this.state = {
			images: null,
			activeImage: null,
			overlayImage: null,
			size: 50,
			xCoordinate: 0,
			yCoordinate: 0,
			options: null
		}
		this.coordinatesMap = null;
	}

	componentDidMount() {
		const { images, activeImage, overlayImage } = this.props.display
		const options = images.map( image => <option value={image._id} key={image._id}>{image.name}</option> )
		this.setState( {
			images,
			options,
			activeImage: activeImage,
			overlayImage: overlayImage ? overlayImage.image : null,
			size: overlayImage ? overlayImage.size : 50,
			xCoordinate: overlayImage ? overlayImage.xCoordinate : 0,
			yCoordinate: overlayImage ? overlayImage.yCoordinate : 0
		} )
	}

	setCoordinatesMap = ( element ) => {
		this.coordinatesMap = element
	}

	handleInputChange = ( event ) => {
		const value = event.target.value
		const name = event.target.name
		this.setState( {
			[ name ]: value
		} )
	}

	handleImageChange = ( event ) => {
		const value = event.target.value
		const name = event.target.name
		const image = this.state.images.find( image => image._id == value )
		this.setState( {
			[ name ]: image
		} )
	}

	handleSizeChange = ( event ) => {
		const value = event.target.value
		this.setState( {
			size: value
		} )
	}

	getCoordinates = ( event ) => {
		const width = this.coordinatesMap.offsetWidth
		const height = this.coordinatesMap.offsetHeight
		this.setState( {
			xCoordinate: Math.round( event.nativeEvent.offsetX / width * 100 ),
			yCoordinate: Math.round( event.nativeEvent.offsetY / height * 100 ),
		} )
	}

	handleSubmit = () => {
		const form = {
			activeImage: this.state.activeImage ? this.state.activeImage._id : null,
			overlayImage: this.state.overlayImage ? {
				image: this.state.overlayImage,
				size: this.state.size,
				xCoordinate: this.state.xCoordinate,
				yCoordinate: this.state.yCoordinate
			} : null
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
					this.props.notify( 'Imagen actualizada con éxito', 'notify-success', 'check', toast.POSITION.TOP_RIGHT, res.data.notify ) // notify success
					this.props.handleCloseModal()
				} else {
					this.props.notify( 'Error al actualizar la imagen', 'notify-error', 'times', toast.POSITION.TOP_RIGHT, res.data.notify ) // notify error
				}
			} )
			.catch( err => {
				this.props.notify( 'Error al actualizar la imagen', 'notify-error', 'times', toast.POSITION.TOP_RIGHT, res.data.notify ) // notify error
			} )
	}

	render() {
		const { images, activeImage, overlayImage, options } = this.state
		const src = activeImage && activeImage.src
		const src_overlay = overlayImage && overlayImage.src
		const overlayImageStyle = {
			left: this.state.xCoordinate + '%',
			top: this.state.yCoordinate + '%'
		}
		return (
			<div>
			<div className='row'>
				<div className='col-6'>
					<h3>Componer imagen</h3>
					<hr className='card-division'></hr>
				</div>
				<div className='col-6'>
						<h3 className='text-right'>Previsualización</h3>
						<hr className='card-division'></hr>
				</div>
			</div>
			<div className='row'>
				<div className='col-6'>
	        <form>
						<div className='form-group'>
							<label htmlFor='device'>
								<i className='fa fa-picture-o mr-2'></i>Imagen principal</label>
							<div>
								<select className='custom-select' name='activeImage' value={this.state.activeImage ? this.state.activeImage._id : ''} onChange={this.handleImageChange}>
									<option value='' key='0'>Ninguna imagen seleccionada</option>
									{options}
								</select>
							</div>
						</div>
						<hr className='card-division'></hr>
						<div className='form-group'>
							<label htmlFor='device'>
								<i className='fa fa-th-large mr-2'></i>Imagen superpuesta</label>
							<div>
								<select className='custom-select' name='overlayImage' value={this.state.overlayImage ? this.state.overlayImage._id : ''} onChange={this.handleImageChange}>
									<option value='' key='0'>Ninguna imagen seleccionada</option>
									{options}
								</select>
							</div>
						</div>
						<div className='form-row'>
						 <div className='form-group col-6'>
							 <label><Icon icon='arrows-alt' mr='2' fw={true}></Icon>Tamaño</label>
							 <input onChange={this.handleSizeChange} value={this.state.size} type='number' className='form-control' placeholder='100'></input>
						 </div>
						 <div className='form-group col'>
							 <label><Icon icon='long-arrow-right' mr='2' fw={true}></Icon>Posición</label>
							 <input onChange={this.handleInputChange} value={this.state.xCoordinate} name='xCoordinate' type='number' className='form-control' placeholder='0'></input>
						 </div>
						 <div className='form-group col'>
							 <label><Icon icon='long-arrow-up' mr='2' fw={true}></Icon>Posición</label>
							 <input onChange={this.handleInputChange} value={this.state.yCoordinate} name='yCoordinate' type='number' className='form-control' placeholder='0'></input>
						 </div>
					 </div>
					 <div className='d-flex w-100 justify-content-between'>
	 						<button onClick={() => this.handleSubmit()} type='button' className='btn btn-block btn-small btn-success mr-1'><i className='fa fa-floppy-o mr-1' aria-hidden='true'></i><strong>Confirmar</strong></button>
	 						<button onClick={() => this.props.handleCloseModal()} type='button' className='btn btn-block btn-small btn-warning ml-1'><i className='fa fa-times mr-1' aria-hidden='true'></i><strong>Cancelar</strong></button>
	 					</div>
				 </form>
				</div>
			<div className='col-6'>
				<div className = 'edit-image-view d-flex w-100 justify-content-center mb-3 shadow' >
						<div onClick={this.getCoordinates} className='coordinates-map' ref={this.setCoordinatesMap}></div> {
							src
								?
								<img className='main-image image-fluid' src={src}/> :
								<div className='image-preview-placeholder d-flex align-items-center'>
									<h4>Seleccione una imagen como imagen principal</h4>
								</div>
						}
						{ src_overlay && <img className='overlay-image shadow' height={this.state.size + '%'} width={'auto'} style={overlayImageStyle} src={src_overlay}/> }
						{	this.props.display.imageFromGroup &&
							<div className='image-warning d-flex w-100 justify-content-center'>
								<p className='d-flex image-warning-text'>Se está utilizando la imagen del grupo</p>
							</div>
						}
				</div>
			</div>
		</div>
	</div>
		)
	}

}
