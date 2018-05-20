/* IMPORT MODULES */
import React, { Component } from 'react'
const moment = require( 'moment' )
moment.locale( 'es' )
import { Redirect, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

/* IMPORT COMPONENTS */
import { Tag } from '../../../tags/tag.jsx'

/* COMPONENTS */
export class DisplayForm extends Component {

	constructor( props ) {
		super( props )
		const { display, user } = this.props
		this.state = {
			name: display ? display.name : '',
			description: display ? display.description : '',
			createdBy: display ? ( display.createdBy || { name: 'Usuario eliminado' } ) : user,
			updatedBy: user,
			tags: display ? display.tags : [],
			category: display ? display.category : '',
			createdAt: display ? moment( display.createdAt ) : moment(),
			updatedAt: moment(),
			activeImage: display ? display.activeImage ? display.activeImage._id : '' : '',
			images: display ? display.images.map( image => image._id ) : [],
			group: display ? display.group : '',
			device: '',
			deviceDescription: '',
			// form options stored in state
			optionsActiveImage: [],
			previewImage: '',
			// redirect variables
			redirect: false,
			location: '/displays',
			// error handling
			error: null
		};
	}

	/* INITIAL VALUES FOR FORM INPUTS */
	componentDidMount() {
		const { display, data: { displays, devices, images } } = this.props
		// get options for active image
		const optionsActiveImage = images.filter( image => this.state.images.find( c => c == image._id ) )
			.map( image => <option value={image._id} key={image._id}>{image.name}</option> )
		// get a list of unused devices
		const unusedDevices = devices.filter( device => !device.display )
		// set state with initial values
		if ( unusedDevices.length > 0 || display ) {
			this.setState( {
				location: display ? '/displays/' + display._id : '/displays', // Redirect url
				device: display ? ( display.device ? display.device._id : unusedDevices[ 0 ]._id ) : unusedDevices[ 0 ]._id,
				deviceDescription: display ? display.device.description : unusedDevices[ 0 ].description,
				optionsActiveImage: optionsActiveImage
			} );
		} else {
			this.setState( { device: '' } )
		}
	}

	handleOnMouseEnter = ( imageId ) => {
		const previewImage = this.props.data.images.find( image => image._id == imageId )
		this.setState( { previewImage } )
	}

	handleOnMouseLeave = () => {
		this.setState( { previewImage: '' } )
	}

	/* HANDLE INPUT CHANGE (CONTROLLED FORM) */
	handleInputChange = ( event ) => {
		const target = event.target
		const name = target.name
		if ( name === 'tags' ) {
			var value = target.value.split( ',' ) // TODO: better string to array conversion
		} else {
			var value = target.value
		}

		if ( name === 'device' ) {
			const unusedDevices = this.props.data.devices.filter( device => !device.display )
			const device = unusedDevices.find( device => device._id == value )
			this.setState( {
				deviceDescription: device.description
			} )
		}

		this.setState( {
			[ name ]: value
		} )
	}

	/* HANDLE MULTIPLE CHECKBOX */
	handleCheckImages = ( event ) => {
		// get value from the checkbox
		const target = event.target
		const value = target.value
		// check if the checkbox has been selected
		if ( !this.state.images.find( ( c ) => c == value ) ) { // check if value is stored in state
			// if it is NOT stored, save the state, push the new value and save back the new state
			const prevState = this.state.images
			prevState.push( value )
			this.setState( { images: prevState } )
		} else {
			// if it IS stored, save the state, splice the old value and save back the new state
			const prevState = this.state.images
			prevState.splice( prevState.indexOf( value ), 1 )
			this.setState( { images: prevState } )
		}
		if ( this.state.images.length == 1 ) {
			// set when first image is selected
			this.setState( { activeImage: this.state.images[ 0 ] } )
		} else if ( this.state.images.length == 0 ) {
			// if there are no images deselect
			this.setState( { activeImage: '' } )
		}
		this.setState( {
			optionsActiveImage: this.props.data.images.filter( image => this.state.images.find( ( c ) => c == image._id ) )
				.map( image => <option value={image._id} key={image._id}>{image.name}</option> )
		} )
	}

	/* HANDLE SUMBIT (PUT OR POST) */
	handleSubmit = () => { // FIXME: handleSubmit (method) specify method beforehand from the buttom
		// get display if any
		const { display } = this.props
		// define form values to send
		const form = {
			name: this.state.name,
			description: this.state.description,
			category: this.state.category,
			updatedBy: this.props.user._id, // send user_id
			tags: this.state.tags,
			device: this.state.device
		};
		// possible empty fields
		if ( !this.props.display ) form.createdBy = this.props.user._id
		this.state.activeImage != '' ? form.activeImage = this.state.activeImage : form.activeImage = null
		this.state.images.length > 0 ? form.images = this.state.images : form.images = []
		this.state.group != '' ? form.group = this.state.group : form.group = null
		// HTTP request
		axios( {
				method: display ? 'put' : 'post',
				url: display ? display.url : process.env.API_URL + 'displays',
				data: form,
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + this.props.token
				}
			} )
			.then( ( res ) => {
				if ( res.status == 201 ) {
					this.props.notify( 'Display configurado con éxito', 'notify-success', 'upload', toast.POSITION.TOP_RIGHT )
					var action = display ? 'edit' : 'add'
					return this.props.update( 'displays', res.data.resourceId, action, res.data.resource, res.data.devices ) // update dataset
				}
			} )
			.then( res => this.setState( { redirect: true } ) )
			.catch( err => this.props.notify( 'Error al configurar el display', 'notify-error', 'exclamation-triangle', toast.POSITION.BOTTOM_LEFT ) );
	}

	/* RENDER COMPONENT */
	render() {

		const { display, data: { devices, images, groups, displays } } = this.props;

		const linkBack = display ? '/displays/' + display._id : '/displays'

		// Options
		const optionsDevices = devices.filter( device => !device.display || device.display._id == ( display && display._id ) )
			.map( ( device, index ) => <option value={device._id} key={index}>{device.name}</option> )
		const optionsGroup = groups.map( group => ( <option value={group._id} key={group._id}>{group.name}</option> ) )
		const optionsImages = images.sort( ( a, b ) => a.updatedAt - b.updatedAt )
			.map( image =>
				<div key={image._id} onMouseEnter={() => this.handleOnMouseEnter(image._id)} onMouseLeave={this.handleOnMouseLeave} className='custom-control custom-checkbox'>
				  <input onChange={this.handleCheckImages} id={image._id} type='checkbox' defaultChecked={this.state.images.find((c) => c == image._id)} name={image._id} defaultValue={image._id} className='custom-control-input'></input>
				  <label className='custom-control-label' htmlFor={image._id}>{image.name}</label>
				</div>
			)

		// Render return
		if ( this.state.redirect ) {
			return ( <Redirect to={this.state.location}/> )
		} else if ( !this.state.device ) {
			return ( <div className='card detalles'>
        <div className='card-header'>
          <ul className='nav nav-pills card-header-pills justify-content-end mx-1'>
            <li className='nav-item mr-auto'>
              <h2 className='detalles-titulo text-center'>
                <i className='fa-picture-o' aria-hidden='true'></i>Configurar dispositivo</h2>
            </li>
          </ul>
        </div>
        <div className='card-body'>
          <div className='text-center'>
            <h1>No hay dispositivos sin configurar</h1>
            <hr className='card-division'></hr>
            <small>Pida al administrador del sistema que de de alta un nuevo dispositivo para configurarlo.</small>
          </div>
        </div>
      </div> )
		} else {
			return ( <div className='card detalles'>
        <div className='card-header'>
          <ul className='nav nav-pills card-header-pills justify-content-end mx-1'>
            <li className='nav-item mr-auto'>
              {
                display
                  ? <h2 className='detalles-titulo'>
                      <i className='fa fa-pencil mr-3' aria-hidden='true'></i>Editar un display</h2>
                  : <h2 className='detalles-titulo'>
                      <i className='fa fa-plus-circle mr-3' aria-hidden='true'></i>Configurar un nuevo display</h2>
              }
            </li>
						<li className='nav-item mr-2'>
							<Link to={linkBack}>
								<button type='button' className='btn btn-warning'>
									<i className='fa fa-times mr-2' aria-hidden='true'></i>Cancelar</button>
							</Link>
						</li>
            <li className='nav-item ml-2'>
              {
                display
                  ? <button onClick={this.handleSubmit} type='button' className='btn btn-success'>
                      <i className='fa fa-save mr-2' aria-hidden='true'></i>Guardar cambios</button>
                  : <button onClick={this.handleSubmit} type='button' className='btn btn-success'>
                      <i className='fa fa-plus-circle mr-2' aria-hidden='true'></i>Guardar configuración</button>
              }
            </li>
          </ul>
        </div>
        <div className='card-body'>
          <form id='form'>
            <div className='form-row'>
              <div className='form-group col'>
                <label htmlFor='device'>
                  <i className='fa fa-tablet mr-2'></i>Dispositivo físico asociado</label>
                <div>
                  <select className='custom-select' name='device' onChange={this.handleInputChange}>
                    {optionsDevices}
                  </select>
                </div>
              </div>
              <div className='form-group col'>
                <label htmlFor='bt'>
                  <i className='fa fa-info-circle mr-2'></i>Descripción</label>
                <input type='text' className='form-control text-truncate' id='bt' name='bt' value={this.state.deviceDescription} readOnly='readOnly'></input>
              </div>
            </div>
            <hr className='card-division'></hr>
            <div className='form-group'>
              <label htmlFor='nombre'>
                <i className='fa fa-television mr-2'></i>Nombre</label>
              <input type='text' className='form-control' id='nombre' placeholder='Nombre del display' name='name' value={this.state.name} onChange={this.handleInputChange}></input>
            </div>
            <div className='form-group'>
              <label htmlFor='descripcion'>
                <i className='fa fa-info-circle mr-2'></i>Descripcion</label>
              <input type='text' className='form-control' id='descripcion' placeholder='Descripcion del display' name='description' value={this.state.description} onChange={this.handleInputChange}></input>
            </div>
            <div className='form-row'>
              <div className='form-group col'>
                <label htmlFor='category'><i className='fa fa-arrows-alt mr-2'></i>Categoría</label>
                <input type='text' className='form-control' id='category' placeholder='Categoría' name='category' value={this.state.category} onChange={this.handleInputChange}></input>
              </div>
              <div className='form-group col'>
								<label htmlFor='group'><i className='fa fa-list mr-2'></i>Incluir en un grupo</label>
									<select className='custom-select' id='group' name='group' value={this.state.group} onChange={this.handleInputChange}>
										<option value={''} key={0}>Sin grupo asignado</option>
										{optionsGroup}
									</select>
              </div>
            </div>
            <div className='form-group'>
							<label htmlFor='activeImage'><i className='fa fa-picture-o mr-2'></i>Seleccionar la imagen activa</label>
							<select className='custom-select' id='activeImage' name='activeImage' value={this.state.activeImage} onChange={this.handleInputChange}>
								<option value={''} key={0}>Sin imagen activa</option>
								{this.state.optionsActiveImage}
							</select>
						</div>
						<div className='form-row'>
	            <div className='form-group col'>
	              <label htmlFor='images'><i className='fa fa-television mr-2'></i>Asociar una o varias imagenes</label>
								{optionsImages.length > 0
										? <div className='custom-controls-stacked'>{optionsImages}</div>
										: <div className='no-image-available d-flex w-100 align-items-center justify-content-center'>
												<p>No hay imágenes disponibles</p>
											</div>
								}
	            </div>
							<div className='form-group col'>
								<label htmlFor='images'><i className='fa fa-eye mr-2'></i>Previsualización de la imagen <small>(Puede aparecer recortada)</small></label>
									{ this.state.previewImage
										 ? ( this.state.previewImage.src
											 ? <div className='preview-image d-flex w-100 align-items-center shadow'>
													<img className='imagen' src={this.state.previewImage.src}/>
												</div>
										  : <div className='preview-image-empty d-flex w-100 align-items-center justify-content-center shadow'>
													<p>La imagen aun no ha sido determinada</p>
												</div>)
										 : <div className='preview-image-empty d-flex w-100 align-items-center'>
												<p>Pase el raton por encima de los nombres de las imágenes para previsualizarlas</p>
											</div>
									}
							</div>
						</div>
            <div className='form-row'>
              <div className='form-group col'>
                <label htmlFor='etiquetas'>
                  <i className='fa fa-tags mr-2'></i>Etiquetas</label>
                <input type='text' className='form-control' name='tags' id='etiquetas' value={this.state.tags} onChange={this.handleInputChange}></input>
              </div>
            </div>
            <div className='form-row'>
              <div className='form-group col'>
                {
                  this.state.tags.map(
                    (tag, index) => tag.length > 1
                    ? <Tag key={index} tag={tag} category={'displays'}/>
                    : '')
                }
              </div>
            </div>
            <div className='form-row'>
              <div className='form-group col-md-6'>
                <label htmlFor='fechaCreacion'>
                  <i className='fa fa-calendar-o mr-2'></i>Fecha de creación</label>
                <input type='text' className='form-control' id='fechaCreacion' name='createdAt ' value={moment(this.state.createdAt).format('dddd, D [de] MMMM [de] YYYY')} readOnly='readOnly'></input>
              </div>
              <div className='form-group col-md-6'>
                <label htmlFor='fechaModificacion'>
                  <i className='fa fa-calendar-o mr-2'></i>Fecha de modificación</label>
                <input type='text' className='form-control' id='fechaModificacion' name='updatedAt' value={moment(this.state.updatedAt).format('dddd, D [de] MMMM [de] YYYY')} readOnly='readOnly'></input>
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='creador'>
                <i className='fa fa-user-o mr-2'></i>Creador</label>
              <input type='text' className='form-control' id='creador' name='user' value={this.state.createdBy.name} readOnly='readOnly'></input>
            </div>
          </form>
        </div>
      </div> )
		}
	}
}
