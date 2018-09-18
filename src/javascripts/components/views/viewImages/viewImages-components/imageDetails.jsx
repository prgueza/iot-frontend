/* IMPORT MODULES */
import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
const moment = require( 'moment' )
moment.locale( 'es' )
import { toast } from 'react-toastify'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import axios from 'axios'

/* IMPORT COMPONENTS */
import { Associated } from '../../associated.jsx'
import { Tag } from '../../../tags/tag.jsx'

/* COMPONENTS */
export class ImageDetails extends Component { // TODO: transform to component

	constructor( props ) {
		super( props )
		this.state = {
			file: [],
			accepted: false,
			// image details
			src: null,
			file: '',
			size: ''
		}
	}

	componentDidMount() {
		const { src, extension, size } = this.props.image
		this.setState( { src, extension, size } )
	}

	componentWillReceiveProps( nextProps ) {
		const { src, extension, size } = nextProps.image
		this.setState( { src, extension, size } )
	}

	onDropAccepted = ( acceptedFile ) => {
		this.setState( { file: acceptedFile, accepted: true } )
		// Form
		const data = new FormData()
		data.append( 'image', acceptedFile[ 0 ] )

		// upload file
		axios.post( this.props.image.url, data )
			.then( ( res ) => {
				if ( res.status == 200 ) {
					this.props.update( 'images', res.data.resourceId, 'edit', res.data.resource )
					this.props.notify( 'Imagen cargada con éxito', 'notify-success', 'upload', toast.POSITION.TOP_RIGHT, res.data.notify )
				}
			} )
			.catch( err => { this.props.notify( 'Error al eliminar la imagen', 'notify-error', 'exclamation-triangle', toast.POSITION.TOP_RIGHT ) } )
	}

	render() {
		// define constants from props for better readability
		const { _id, name, description, src, createdAt, updatedAt, createdBy, colorProfile, resolution, category, groups, displays, tags } = this.props.image
		// refactor date constants with format
		const created = moment( createdAt )
			.format( 'dddd, D [de] MMMM [de] YYYY' )
		const updated = moment( updatedAt )
			.format( 'dddd, D [de] MMMM [de] YYYY' )
		// generate tag list
		const tagList = tags.map( ( tag, index ) => <Tag key={index} category='images' filterData={this.props.filterData} tag={tag}/> )
		// define routes for edit and delete based on the id
		const linktoEdit = '/images/' + _id + '/edit'
		const linktoDelete = '/images/' + _id + '/delete'

		return ( <div className='card detalles'>
      <div className='card-header'>
        <ul className='nav nav-pills card-header-pills justify-content-end mx-1'>
          <li className='nav-item mr-auto'>
            <h2 className='detalles-titulo'>
              <i className='fa fa-picture-o mr-3' aria-hidden='true'></i>{name}</h2>
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
        <div className='row'>
          <div className='col'>
            <p className='titulo'>DETALLES</p>
            <p className='card-text'>
              <i className='fa fa-fw fa-info-circle mr-2' aria-hidden='true'></i>{description}</p>
            <p className='card-text'>
              <i className='fa fa-fw fa-arrows-alt mr-2' aria-hidden='true'></i>{
                resolution
                  ? resolution.name
                  : 'Resolución no especificada'
              }</p>
            <p className='card-text'>
              <i className='fa fa-fw fa-file-image-o mr-2' aria-hidden='true'></i>{this.state.extension}</p>
            <p className='card-text'>
              <i className='fa fa-fw fa-database mr-2' aria-hidden='true'></i>{this.state.size}</p>
            <p className='card-text'>
              <i className='fa fa-fw fa-tint mr-2' aria-hidden='true'></i>{colorProfile}</p>
            <p className='card-text'>
              <i className='fa fa-fw fa-calendar-o mr-2' aria-hidden='true'></i>{created}</p>
            <p className='card-text'>
              <i className='fa fa-fw fa-user-o mr-2' aria-hidden='true'></i>{
                createdBy
                  ? createdBy.name
                  : 'Usuario eliminado'
              }</p>
            <p className='titulo'>ETIQUETAS</p>
            {tagList}
          </div>
          <div className='col'>
            <div className='vista-previa'>
              <p className='titulo text-right'>VISTA PREVIA</p>
              <Dropzone onDropAccepted={this.onDropAccepted} activeClassName='dropzone-accepted' className={this.state.accepted
                  ? 'dropzone dropzone-accepted'
                  : 'dropzone'}>
                <div className='vista-imagen d-flex w-100 justify-content-center'>
                  {
                    this.state.src
                      ? <img className='imagen' src={this.state.src}/>
                      : <div className='align-self-center'>
                          <h4>Arrastre una imagen</h4>
                          <small>formato: bmp</small>
                        </div>
                  }
                </div>
              </Dropzone>
            </div>
          </div>
        </div>
        <hr className='card-division'></hr>
        <div className='row'>
          <div className='col'>
            <div className='asociados'>
              <p className='titulo'>DISPLAYS ASOCIADOS ({displays.length})</p>
              <Associated content={displays} category='displays' appearance='elemento-display' icon='television'/>
            </div>
          </div>
          <div className='col'>
            <div className='asociados'>
              <p className='titulo'>GRUPOS ASOCIADOS ({groups.length})</p>
              <Associated content={groups} category='groups' appearance='elemento-grupo' icon='list'/>
            </div>
          </div>
        </div>
      </div>
    </div> )
	}
}
