/* IMPORT MODULES */
import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

/* IMPORT COMPONENTS */
import { User } from '../../../lists/lists-components/user.jsx'

/* COMPONENTS */
export class ManageUsers extends Component {

	constructor( props ) {
		super( props )
		this.state = {
			users: null,
			isLoaded: false,
			error: null,
			edit: false,
			elementId: '',
			// form
			login: '',
			name: '',
			password: '',
			checkPassword: '',
			email: '',
			userGroup: '',
			admin: false
		}
	}

	handleInputChange = ( event ) => {
		const target = event.target
		const name = target.name
		const value = name != 'admin' ? target.value : !this.state.admin
		this.setState( {
			[ name ]: value
		} )
	}

	componentDidMount() {
		this.setState( { isLoaded: true, users: this.props.data.users } )
	}

	componentWillReceiveProps( nextProps ) {
		this.setState( { isLoaded: true, users: nextProps.data.users } )
	}

	edit = ( elementId ) => {
		const user = this.state.users.find( user => user._id == elementId )
		this.setState( {
			login: user.login,
			name: user.name,
			email: user.email,
			password: '',
			checkPassword: '',
			admin: user.admin,
			userGroup: user.userGroup ? user.userGroup._id : '',
			edit: true,
			elementId: elementId
		} )
	}

	cancel = () => {
		this.setState( {
			login: '',
			name: '',
			email: '',
			password: '',
			checkPassword: '',
			admin: false,
			userGroup: '',
			edit: false,
			elementId: '',
		} )
	}

	/* HANDLE SUBMIT */
	handleSubmit = ( method ) => {
		// FORM DATA
		const form = {
			'name': this.state.name,
			'login': this.state.login,
			'email': this.state.email,
			'admin': this.state.admin,
		}
		if ( this.state.userGroup != '' ) { form.userGroup = this.state.userGroup } else { form.userGroup = null }
		if ( this.state.password != '' ) { form.password = this.state.password }
		if ( this.state.checkPassword != '' ) { form.checkPassword = this.state.checkPassword }
		axios( {
				method: method,
				url: this.state.edit ? 'http://localhost:4000/users/' + this.state.elementId : 'http://localhost:4000/users/signup',
				data: form,
				headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.props.token },
			} )
			.then( ( res ) => {
				if ( res.status == 201 || res.status == 200 ) {
					switch ( method ) {
					case 'put':
						this.props.notify( 'Usuario modificado con éxito', 'notify-success', 'floppy-o', toast.POSITION.TOP_RIGHT, res.data.notify )
						this.props.update( 'users', res.data.resourceId, 'edit', res.data.resource ) // update dataset
						break
					case 'post':
						this.props.notify( 'Usuario creado con éxito', 'notify-success', 'upload', toast.POSITION.TOP_RIGHT )
						this.props.update( 'users', res.data.resourceId, 'add', res.data.resource ) // update dataset
						this.edit( res.data.resourceId )
						break
					case 'delete':
						this.props.notify( 'Usuario eliminado con éxito', 'notify-success', 'trash', toast.POSITION.TOP_RIGHT )
						this.cancel()
						this.props.update( 'users', res.data.resourceId, 'remove', res.data.resource ) // update dataset
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
			.catch( err => this.props.notify( 'Error al añadir/modificar usuario', 'notify-error', 'exclamation-triangle', toast.POSITION.TOP_RIGHT ) )
	}

	render() {
		const { users, error, isLoaded } = this.state
		const optionsUserGroup = this.props.data.userGroups.map( ( user, index ) => <option value={user._id} key={index}>{user.name}</option> )

		if ( error ) {
			return null // TODO: handle error
		} else if ( !isLoaded ) {
			return null // TODO: handle loading
		} else {
			const list = users.map( user => {
				if ( user._id == this.state.elementId ) {
					return <User user={user} key={user._id} edit={this.edit} active={true}/>
				} else {
					return <User user={user} key={user._id} edit={this.edit} active={false}/>
				}
			} )
			list.push(
				<div key='0' className='list-group-item-action list-group-item flex-column align-items-start'>
          <div className='text-center elemento'>
            <h4 className='mb-1'>No se han encontrado {users.length > 0 && 'más'} usuarios</h4>
            <hr className='card-division'></hr>
            <small>Número de usuarios: {users.length}</small>
          </div>
        </div>
			)
			return (
				<div className='card settings'>
          <div className='card-header'>
            <ul className='nav nav-pills card-header-pills justify-content-end mx-1'>
              <li className='nav-item mr-auto'>
                <h2 className='detalles-titulo'><i className='fa fa-user mr-3' aria-hidden='true'></i>Usuarios</h2>
              </li>
            </ul>
          </div>
          <div className='card-body'>
            <div className='row'>
              <div className='col-6'>
                <h3>{this.state.edit ? 'Editar Usuario' : 'Añadir Usuario'}</h3>
                <hr className='card-division'></hr>
                <form>
                  <div className='form-row'>
                    <div className='form-group col'>
                      <label htmlFor='login'><i className='fa fa-user-o mr-2'></i>Usuario</label>
                      <input type='text' className='form-control' id='login' placeholder='Nombre de usuario' name='login' value={this.state.login} onChange={this.handleInputChange}></input>
                    </div>
                    <div className='form-group col'>
                      <label htmlFor='name'><i className='fa fa-id-card-o mr-2'></i>Nombre</label>
                      <input type='text' className='form-control' id='name'  placeholder='Nombre completo' name='name' value={this.state.name} onChange={this.handleInputChange}></input>
                    </div>
                  </div>
                  <div className='form-row'>
                    <div className='form-group col'>
                      <label htmlFor='email'><i className='fa fa-envelope-o mr-2'></i>Correo electrónico</label>
                      <input type='email' className='form-control' id='email' placeholder='Correo electrónico' name='email' value={this.state.email} onChange={this.handleInputChange}></input>
                    </div>
                  </div>
                  <div className='form-row'>
                    <div className='form-group col'>
                      <label htmlFor='password'><i className='fa fa-key mr-2'></i>{this.state.edit ? 'Nueva contraseña' : 'Contraseña'}</label>
                      <input type='password' className='form-control' id='usuario' placeholder='Contraseña' name='password' value={this.state.password} onChange={this.handleInputChange}></input>
                    </div>
                    <div className='form-group col'>
                      <label htmlFor='checkPassword'><i className='fa fa-key mr-2'></i>Confirmar contraseña</label>
                      <input type='password' className='form-control' id='checkPassword'  placeholder='Confirmar contraseña' name='checkPassword' value={this.state.checkPassword} onChange={this.handleInputChange}></input>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='userGroup'><i className='fa fa-users mr-2'></i>Grupo de gestión de dispositivos</label>
                    <div>
                      <select className='custom-select' name='userGroup' value={this.state.userGroup} onChange={this.handleInputChange}>
                        <option value='' key='0'>Sin asignar</option>
                        {optionsUserGroup}
                      </select>
                    </div>
                  </div>
                  <div className='form-group'>
										<div className='custom-control custom-checkbox'>
											<input onChange={this.handleInputChange} id='admin' type='checkbox' checked={this.state.admin} name='remember' value={this.state.admin} className='custom-control-input'></input>
											<label className='custom-control-label' htmlFor='admin'>Dar permisos de administrador</label>
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
                <h3 className='d-flex w-100 justify-content-between'>Usuarios<span>{this.state.users.length}</span></h3>
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
