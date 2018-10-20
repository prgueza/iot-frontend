/* IMPORT MODULES */
import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

/* IMPORT COMPONENTS */
import User from '../../../lists/lists-components/user';

/* COMPONENTS */
class ManageUsers extends Component {
  constructor(props) {
    super(props);
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
      admin: false,
    };
  }


  componentDidMount() {
    const { data: { users } } = this.props;
	  this.setState({ isLoaded: true, users });
  }

  componentWillReceiveProps(nextProps) {
	  this.setState({ isLoaded: true, users: nextProps.data.users });
  }

	handleInputChange = (event) => {
	  const { target, target: { name } } = event;
	  const { admin } = this.state;
	  const value = name !== 'admin' ? target.value : !admin;
	  this.setState({
	    [name]: value,
	  });
	}

	edit = (elementId) => {
	  const { users } = this.state;
	  const user = users.find(u => u._id === elementId);
	  this.setState({
	    login: user.login,
	    name: user.name,
	    email: user.email,
	    password: '',
	    checkPassword: '',
	    admin: user.admin,
	    userGroup: user.userGroup ? user.userGroup._id : '',
	    edit: true,
	    elementId,
	  });
	}

	cancel = () => {
	  this.setState({
	    login: '',
	    name: '',
	    email: '',
	    password: '',
	    checkPassword: '',
	    admin: false,
	    userGroup: '',
	    edit: false,
	    elementId: '',
	  });
	}

	/* HANDLE SUBMIT */
	handleSubmit = (method) => {
	  // FORM DATA
	  const {
	    name, login, email, admin, userGroup, password, checkPassword, edit, elementId,
	  } = this.state;
	  const { token, notify, update } = this.props;
	  const form = {
	    name,
	    login,
	    email,
	    admin,
	  };
	  if (userGroup !== '') { form.userGroup = userGroup; } else { form.userGroup = null; }
	  if (password !== '') { form.password = password; }
	  if (checkPassword !== '') { form.checkPassword = checkPassword; }
	  axios({
	    method,
	    url: edit ? `http://localhost:4000/users/${elementId}` : 'http://localhost:4000/users/signup',
	    data: form,
	    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
	  })
	    .then((res) => {
	      if (res.status === 201 || res.status === 200) {
	        switch (method) {
	          case 'put':
	            notify('Usuario modificado con éxito', 'notify-success', 'floppy-o', toast.POSITION.TOP_RIGHT, res.data.notify);
	            update('users', res.data.resourceId, 'edit', res.data.resource); // update dataset
	            break;
	          case 'post':
	            notify('Usuario creado con éxito', 'notify-success', 'upload', toast.POSITION.TOP_RIGHT);
	           	update('users', res.data.resourceId, 'add', res.data.resource); // update dataset
	            this.edit(res.data.resourceId);
	            break;
	          case 'delete':
	            notify('Usuario eliminado con éxito', 'notify-success', 'trash', toast.POSITION.TOP_RIGHT);
	            this.cancel();
	            update('users', res.data.resourceId, 'remove', res.data.resource); // update dataset
	            break;
	          default:
	            console.log('Something went wrong');
	        }
	      } else {
	        this.setState({
	          isLoaded: true,
	          error: res.data,
	        });
	      }
	    })
	    .catch(() => notify('Error al añadir/modificar usuario', 'notify-error', 'exclamation-triangle', toast.POSITION.TOP_RIGHT));
	}

	render() {
	  const { data } = this.props;
	  const {
	    users, error, isLoaded, elementId, edit, login, name, email, password, checkPassword, userGroup, admin,
	  } = this.state;
	  const optionsUserGroup = data.userGroups.map(user => <option value={user._id} key={user._id}>{user.name}</option>);

	  if (error) {
	    return null; // TODO: handle error
	  } if (!isLoaded) {
	    return null; // TODO: handle loading
	  }
	  const list = users.map((user) => {
	    if (user._id === elementId) {
	      return <User user={user} key={user._id} edit={this.edit} active />;
	    }
	      return <User user={user} key={user._id} edit={this.edit} active={false} />;
	  });
	  list.push(
				<div key="0" className="list-group-item-action list-group-item flex-column align-items-start">
          <div className="text-center elemento">
            <h4 className="mb-1">No se han encontrado {users.length > 0 && 'más'} usuarios</h4>
            <hr className="card-division" />
            <small>Número de usuarios: {users.length}</small>
          </div>
        </div>,
	  );
	  return (
				<div className="card card-settings">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
              <li className="nav-item mr-auto">
                <h2 className="detalles-titulo"><i className="fa fa-user mr-3" aria-hidden="true" />Usuarios</h2>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <h3>{edit ? 'Editar Usuario' : 'Añadir Usuario'}</h3>
                <hr className="card-division" />
                <form>
                  <div className="form-row">
                    <div className="form-group col">
                      <label htmlFor="login"><i className="fa fa-user-o mr-2" />Usuario</label>
                      <input type="text" className="form-control" id="login" placeholder="Nombre de usuario" name="login" value={login} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group col">
                      <label htmlFor="name"><i className="fa fa-id-card-o mr-2" />Nombre</label>
                      <input type="text" className="form-control" id="name" placeholder="Nombre completo" name="name" value={name} onChange={this.handleInputChange} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <label htmlFor="email"><i className="fa fa-envelope-o mr-2" />Correo electrónico</label>
                      <input type="email" className="form-control" id="email" placeholder="Correo electrónico" name="email" value={email} onChange={this.handleInputChange} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <label htmlFor="password"><i className="fa fa-key mr-2" />{edit ? 'Nueva contraseña' : 'Contraseña'}</label>
                      <input type="password" className="form-control" id="usuario" placeholder="Contraseña" name="password" value={password} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group col">
                      <label htmlFor="checkPassword"><i className="fa fa-key mr-2" />Confirmar contraseña</label>
                      <input type="password" className="form-control" id="checkPassword" placeholder="Confirmar contraseña" name="checkPassword" value={checkPassword} onChange={this.handleInputChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="userGroup"><i className="fa fa-users mr-2" />Grupo de gestión de dispositivos</label>
                    <div>
                      <select className="custom-select" name="userGroup" value={userGroup} onChange={this.handleInputChange}>
                        <option value="" key="0">Sin asignar</option>
                        {optionsUserGroup}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
										<div className="custom-control custom-checkbox">
											<input onChange={this.handleInputChange} id="admin" type="checkbox" checked={admin} name="remember" value={admin} className="custom-control-input" />
											<label className="custom-control-label" htmlFor="admin">Dar permisos de administrador</label>
										</div>
                  </div>
                  { !edit
                    ? <button onClick={() => this.handleSubmit('post')} type="button" className="btn btn-block btn-small btn-success"><i className="fa fa-plus-circle mr-1" aria-hidden="true" />Añadir</button>
                    : (
<div className="d-flex w-100 justify-content-between">
                      <button onClick={() => this.handleSubmit('put')} type="button" className="btn btn-block btn-small btn-success mr-2"><i className="fa fa-floppy-o mr-1" aria-hidden="true" />Actualizar</button>
                      <button onClick={() => this.handleSubmit('delete')} type="button" className="btn btn-block btn-small btn-danger ml-1 mr-1"><i className="fa fa-trash-o mr-1" aria-hidden="true" />Eliminar</button>
                      <button onClick={() => this.cancel()} type="button" className="btn btn-block btn-small btn-warning ml-2"><i className="fa fa-times mr-1" aria-hidden="true" />Cancelar</button>
                    </div>
                    )
                  }
                </form>
              </div>
              <div className="col-6">
                <h3 className="d-flex w-100 justify-content-between">Usuarios<span>{users.length}</span></h3>
                <hr className="card-division" />
                <div className="list settings-list">
                  <div className="list-group mb-3">
                    {list}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
	  );
	}
}

ManageUsers.propTypes = {
  data: PropTypes.shape.isRequired,
  token: PropTypes.string.isRequired,
  notify: PropTypes.shape.isRequired,
  update: PropTypes.shape.isRequired,
};

export default ManageUsers;
