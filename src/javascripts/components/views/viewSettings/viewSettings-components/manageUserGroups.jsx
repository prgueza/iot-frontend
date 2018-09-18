/* IMPORT MODULES */
import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

/* IMPORT COMPONENTS */
import { UserGroup } from '../../../lists/lists-components/userGroup.jsx'

/* COMPONENTS */
export class ManageUserGroups extends Component {

	constructor( props ) {
		super( props )
		this.state = {
			userGroups: null,
			isLoaded: false,
			error: null,
			edit: false,
			elementId: '',
			// form
			name: '',
			description: '',
		}
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
		this.setState( { isLoaded: true, userGroups: this.props.data.userGroups } )
	}

	componentWillReceiveProps( nextProps ) {
		this.setState( { isLoaded: true, userGroups: nextProps.data.userGroups } )
	}

	edit = ( elementId ) => {
		const userGroup = this.state.userGroups.find( userGroup => userGroup._id == elementId )
		this.setState( {
			name: userGroup.name,
			description: userGroup.description,
			edit: true,
			elementId: elementId
		} )
	}

	cancel = () => {
		this.setState( {
			name: '',
			description: '',
			edit: false,
			elementId: '',
		} )
	}

	/* HANDLE SUBMIT */
	handleSubmit = ( method ) => {
		// FORM DATA
		const form = {
			'name': this.state.name,
			'description': this.state.description,
		}
		axios( {
				method: method,
				url: this.state.edit ? 'http://localhost:4000/userGroups/' + this.state.elementId : 'http://localhost:4000/userGroups',
				data: form,
				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.props.token },
			} )
			.then( ( res ) => { // resolve callback
				if ( res.status == 201 || res.status == 200 ) {
					switch ( method ) {
					case 'put':
						this.props.notify( 'Grupo modificado con éxito', 'notify-success', 'floppy-o', toast.POSITION.TOP_RIGHT, res.data.notify )
						this.props.update( 'userGroups', res.data.resourceId, 'edit', res.data.resource ) // update dataset
						break
					case 'post':
						this.props.notify( 'Grupo creado con éxito', 'notify-success', 'upload', toast.POSITION.TOP_RIGHT, res.data.notify )
						this.props.update( 'userGroups', res.data.resourceId, 'add', res.data.resource ) // update dataset
						this.edit( res.data.resourceId )
						break
					case 'delete':
						this.props.notify( 'Grupo eliminado con éxito', 'notify-success', 'trash', toast.POSITION.TOP_RIGHT, res.data.notify )
						this.cancel()
						this.props.update( 'userGroups', res.data.resourceId, 'remove', res.data.resource ) // update dataset
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
			.catch( err => this.props.notify( 'Error al añadir/modificar grupo', 'notify-error', 'exclamation-triangle', toast.POSITION.TOP_RIGHT ) )
	}

	render() {
		const { userGroups, error, isLoaded } = this.state

		if ( error ) {
			return null // TODO: handle error
		} else if ( !isLoaded ) {
			return null // TODO: handle loading
		} else {
			const list = userGroups.map( userGroup => {
				if ( userGroup._id == this.state.elementId ) {
					return <UserGroup userGroup={userGroup} key={userGroup._id} edit={this.edit} active={true}/>
				} else {
					return <UserGroup userGroup={userGroup} key={userGroup._id} edit={this.edit} active={false}/>
				}
			} )
			list.push(
				<div key='0' className='list-group-item-action list-group-item flex-column align-items-start'>
          <div className='text-center elemento'>
            <h4 className='mb-1'>No se han encontrado {userGroups.length > 0 && 'más'} grupos de gestión</h4>
            <hr className='card-division'></hr>
            <small>Número de grupos de gestión: {userGroups.length}</small>
          </div>
        </div>
			)

			return (
				<div className='card settings'>
          <div className='card-header'>
            <ul className='nav nav-pills card-header-pills justify-content-end mx-1'>
              <li className='nav-item mr-auto'>
                <h2 className='detalles-titulo'><i className='fa fa-users mr-3' aria-hidden='true'></i>Grupos de gestión</h2>
              </li>
            </ul>
          </div>
          <div className='card-body'>
            <div className='row'>
              <div className='col-6'>
                <h3>{this.state.edit ? 'Editar Grupo de gestión' : 'Añadir Grupo de gestión'}</h3>
                <hr className='card-division'></hr>
                <form>
                  <div className='form-row'>
                    <div className='form-group col'>
                      <label htmlFor='name'><i className='fa fa-users mr-2'></i>Nombre</label>
                      <input type='text' className='form-control' id='name'  placeholder='Nombre del grupo de gestión' name='name' value={this.state.name} onChange={this.handleInputChange}></input>
                    </div>
                  </div>
                  <div className='form-row'>
                    <div className='form-group col'>
                      <label htmlFor='description'><i className='fa fa-info-circle mr-2'></i>Descripción</label>
                      <input type='description' className='form-control' id='description' placeholder='Descripción del grupo de gestión' name='description' value={this.state.description} onChange={this.handleInputChange}></input>
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
                <h3 className='d-flex w-100 justify-content-between'>Grupos de gestión<span>{this.state.userGroups.length}</span></h3>
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
