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
	}

	componentDidMount() {
		const { images, active_image, overlay_image } = this.props.display
		const options = images.map( image => <option value={image._id} key={image._id}>{image.name}</option> )
		this.setState( {
			images,
			options,
			activeImage: active_image,
			overlayImage: overlay_image ? overlay_image.image : null,
			size: overlay_image ? overlay_image.size : 50,
			xCoordinate: overlay_image ? overlay_image.xCoordinate : 0,
			yCoordinate: overlay_image ? overlay_image.yCoordinate : 0
		} )
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
		this.setState( {
			xCoordinate: event.nativeEvent.offsetX,
			yCoordinate: event.nativeEvent.offsetY,
		} )
	}

	handleSubmit = () => {
		const form = {
			active_image: this.state.activeImage,
			overlay_image: {
				image: this.state.overlayImage,
				size: this.state.size,
				xCoordinate: this.state.xCoordinate,
				yCoordinate: this.state.yCoordinate
			}
		}
	}

	render() {
		const { images, activeImage, overlayImage, options } = this.state
		const src = activeImage && activeImage.src_url
		const src_aditional = overlayImage && overlayImage.src_url
		const overlayImageStyle = {
			left: this.state.xCoordinate + 'px',
			top: this.state.yCoordinate + 'px'
		}
		return (
			<div>
        <h3>Componer imagen</h3>
				<hr className='card-division'></hr>
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
				 	<hr className='card-division'></hr>
					<div className='edit-image-view d-flex w-100 justify-content-center mb-3 shadow'>
						<div onClick={this.getCoordinates} className="coordinates-map"></div>
						{
							src
								? <img className='main-image image-fluid' src={src}/>
								: <div className='image-placeholder align-self-center'>
										<h4>Seleccione una imagen como imagen principal</h4>
									</div>
						}
						{ src_aditional && <img className='aditional-image shadow' height={this.state.size + '%'} width={'auto'} style={overlayImageStyle} src={src_aditional}/>}
					</div>
					<div className='d-flex w-100 justify-content-between'>
						<button onClick={() => this.handleSubmit()} type='button' className='btn btn-block btn-small btn-success mr-1'><i className='fa fa-floppy-o mr-1' aria-hidden='true'></i><strong>Confirmar</strong></button>
						<button onClick={() => this.props.handleCloseModal()} type='button' className='btn btn-block btn-small btn-warning ml-1'><i className='fa fa-times mr-1' aria-hidden='true'></i><strong>Cancelar</strong></button>
					</div>
        </form>
      </div>
		)
	}

}
