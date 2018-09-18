/* IMPORT MODULES */
import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

/* IMPORT COMPONENTS */
import { Screen } from '../../../lists/lists-components/screen.jsx'

/* COMPONENTS */
export class ManageScreens extends Component {

	constructor( props ) {
		super( props )
		this.state = {
			users: null,
			isLoaded: false,
			error: null,
			edit: false,
			elementId: '',
			// form
			name: '',
			height: 0,
			width: 0,
			screenCode: '',
			colorProfile: 'grayscale',
			description: '',
		}
	}

	edit = ( elementId ) => {
		const screen = this.state.screens.find( screen => screen._id == elementId )
		this.setState( {
			name: screen.name,
			width: screen.size.width,
			height: screen.size.height,
			description: screen.description,
			screenCode: screen.screenCode,
			colorProfile: screen.colorProfile,
			elementId: elementId,
			edit: true
		} )
	}

	cancel = () => {
		this.setState( {
			name: '',
			width: '',
			height: '',
			description: '',
			screenCode: '',
			colorProfile: 'grayscale',
			elementId: '',
			edit: false
		} )
	}

	handleInputChange = ( event ) => {
		const target = event.target
		const name = target.name
		const value = target.value
		this.setState( {
			[ name ]: value
		} )
	}

	componentDidMount() {
		this.setState( { isLoaded: true, screens: this.props.data.screens } )
	}

	componentWillReceiveProps( nextProps ) {
		this.setState( { isLoaded: true, screens: nextProps.data.screens } )
	}

	/* HANDLE SUBMIT */
	handleSubmit = ( method ) => {
		// FORM DATA
		const form = {
			'name': this.state.name,
			'size': {
				'height': this.state.height,
				'width': this.state.width
			},
			'screenCode': this.state.screenCode,
			'colorProfile': this.state.colorProfile,
		}
		if ( this.state.description != '' ) { form.description = this.state.description }
		axios( {
				method: method,
				url: this.state.edit ? 'http://localhost:4000/screens/' + this.state.elementId : 'http://localhost:4000/screens',
				data: form,
				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.props.token },
			} )
			.then( ( res ) => {
				if ( res.status == 201 || res.status == 200 ) {
					switch ( method ) {
					case 'put':
						this.props.notify( 'Pantalla modificada con éxito', 'notify-success', 'floppy-o', toast.POSITION.TOP_RIGHT, res.data.notify )
						this.props.update( 'screens', res.data.resourceId, 'edit', res.data.resource ) // update dataset
						break
					case 'post':
						this.props.notify( 'Pantalla creada con éxito', 'notify-success', 'upload', toast.POSITION.TOP_RIGHT, res.data.notify )
						this.props.update( 'screens', res.data.resourceId, 'add', res.data.resource ) // update dataset
						this.edit( res.data.resourceId )
						break
					case 'delete':
						this.props.notify( 'Pantalla eliminada con éxito', 'notify-success', 'trash', toast.POSITION.TOP_RIGHT, res.data.notify )
						this.cancel()
						this.props.update( 'screens', res.data.resourceId, 'remove', res.data.resource ) // update dataset
						break
					default:
						console.log( 'Something went wrong' )
					}
				} else {
					this.setState( {
						isLoaded: true,
						error: res.data
					} )
				}
			} )
			.catch( err => this.props.notify( 'Error al añadir/modificar una pantalla', 'notify-error', 'exclamation-triangle', toast.POSITION.TOP_RIGHT ) )
	}

	render() {
		const { screens, error, isLoaded } = this.state

		if ( error ) {
			return null // TODO: handle error
		} else if ( !isLoaded ) {
			return null // TODO: handle loading
		} else {
			const list = screens.map( screen => {
				if ( screen._id == this.state.elementId ) {
					return <Screen screen={screen} key={screen._id} edit={this.edit} active={true}/>
				} else {
					return <Screen screen={screen} key={screen._id} edit={this.edit} active={false}/>
				}
			} )
			list.push(
				<div key='0' className='list-group-item-action list-group-item flex-column align-items-start'>
          <div className='text-center elemento'>
            <h4 className='mb-1'>No se han encontrado {screens.length > 0 && 'más'} pantallas</h4>
            <hr className='card-division'></hr>
            <small>Número de pantallas: {screens.length}</small>
          </div>
        </div>
			)
			return (
				<div className='card settings'>
          <div className='card-header'>
            <ul className='nav nav-pills card-header-pills justify-content-end mx-1'>
              <li className='nav-item mr-auto'>
                <h2 className='detalles-titulo'><i className='fa fa-window-maximize mr-3' aria-hidden='true'></i>Pantallas</h2>
              </li>
            </ul>
          </div>
          <div className='card-body'>
            <div className='row'>
              <div className='col-6'>
                <h3>{this.state.edit ? 'Editar pantalla' : 'Añadir pantalla'}</h3>
                <hr className='card-division'></hr>
                <form>
                  <div className='form-row'>
                    <div className='form-group col-6'>
                      <label htmlFor='name'><i className='fa fa-fw fa-window-maximize mr-2'></i>Nombre</label>
                      <input type='text' className='form-control' id='name' placeholder='Nombre de la resolución' name='name' value={this.state.name} onChange={this.handleInputChange}></input>
                    </div>
                    <div className='form-group col-3'>
                      <label htmlFor='heigth'><i className='fa fa-fw fa-arrows-v mr-2'></i>Alto</label>
                      <input type='text' className='form-control' id='heigth' placeholder='Alto' name='height' value={this.state.height} onChange={this.handleInputChange}></input>
                    </div>
                    <div className='form-group col-3'>
                      <label htmlFor='width'><i className='fa fa-fw fa-arrows-h mr-2'></i>Ancho</label>
                      <input type='text' className='form-control' id='width' placeholder='Ancho' name='width' value={this.state.width} onChange={this.handleInputChange}></input>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='description'><i className='fa fa-fw fa-info-circle mr-2'></i>Descripción</label>
                    <input type='text' className='form-control' id='description' placeholder='Descripción de la resolución' name='description' value={this.state.description} onChange={this.handleInputChange}></input>
                  </div>
                  <div className='form-row'>
                    <div className='form-group col'>
                      <label htmlFor='colorProfile'><i className='fa fa-adjust mr-2'></i>Color</label>
                      <div>
                        <select className='custom-select' name='colorProfile' value={this.state.colorProfile} onChange={this.handleInputChange}>
                          <option value='color'>Color</option>
                          <option value='grayscale'>Escala de grises</option>
                        </select>
                      </div>
                    </div>
                    <div className='form-group col'>
                      <label htmlFor='screenCode'><i className='fa fa-fw fa-code mr-2'></i>Código de pantalla</label>
                      <input type='text' className='form-control' id='screenCode' placeholder='Código' name='screenCode' value={this.state.screenCode} onChange={this.handleInputChange}></input>
                    </div>
                  </div>
                  { !this.state.edit ?
                    <button onClick={() => this.handleSubmit('post')} type='button' className='btn btn-block btn-small btn-success'><i className='fa fa-plus-circle mr-1' aria-hidden='true'></i>Añadir</button> :
                    <div className='d-flex w-100 justify-content-between'>
                      <button onClick={() => this.handleSubmit('put')} type='button' className='btn btn-block btn-small btn-success mr-2'><i className='fa fa-floppy-o mr-1' aria-hidden='true'></i>Actualizar</button>
                      <button onClick={() => this.handleSubmit('delete')} type='button' className='btn btn-block btn-small btn-danger ml-1 mr-1'><i className='fa fa-trash-o mr-1' aria-hidden='true'></i>Eliminar</button>
                      <button onClick={() => this.cancel()} type='button' className='btn btn-block btn-small btn-warning ml-2'><i className='fa fa-times mr-1' aria-hidden='true'></i>Cancelar</button>
                    </div>
                  }
                </form>
              </div>
              <div className='col-6'>
                <h3 className='d-flex w-100 justify-content-between'>Pantallas<span>{this.state.screens.length}</span></h3>
                <hr className='card-division'></hr>
                <div className='list settings-list'>
                  <div className='list-group mb-3'>
                    {list}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
			)
		}
	}
}
