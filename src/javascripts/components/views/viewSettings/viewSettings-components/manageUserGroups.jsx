/* IMPORT MODULES */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

/* IMPORT COMPONENTS */
import UserGroup from '../../../lists/lists-components/userGroup';

/* COMPONENTS */
class ManageUserGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userGroups: null,
      isLoaded: false,
      error: null,
      edit: false,
      elementId: '',
      // form
      name: '',
      description: '',
    };
  }

  componentDidMount() {
    const { data: { userGroups } } = this.props;
	  this.setState({ isLoaded: true, userGroups });
  }

  componentWillReceiveProps(nextProps) {
    const { data: { userGroups } } = nextProps;
	  this.setState({ isLoaded: true, userGroups });
  }

	handleInputChange = (event) => {
	  const { target: { name, value } } = event;
	  this.setState({
	    [name]: value,
	  });
	}

	edit = (elementId) => {
	  const { userGroups } = this.state;
	  const { name, description } = userGroups.find(u => u._id === elementId);
	  this.setState({
	    name,
	    description,
	    elementId,
	    edit: true,
	  });
	}

	cancel = () => {
	  this.setState({
	    name: '',
	    description: '',
	    edit: false,
	    elementId: '',
	  });
	}

	/* HANDLE SUBMIT */
	handleSubmit = (method) => {
	  const {
	    name, description, edit, elementId,
	  } = this.state;
	  const { token, update, notify } = this.props;
	  // FORM DATA
	  const form = {
	    name,
	    description,
	  };
	  axios({
	    method,
	    url: edit ? `http://localhost:4000/userGroups/${elementId}` : 'http://localhost:4000/userGroups',
	    data: form,
	    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
	  })
	    .then((res) => { // resolve callback
	      if (res.status === 201 || res.status === 200) {
	        switch (method) {
	          case 'put':
	            notify('Grupo modificado con éxito', 'notify-success', 'floppy-o', res.data.notify);
	            update('userGroups', res.data.resourceId, 'edit', res.data.resource); // update dataset
	            break;
	          case 'post':
	            notify('Grupo creado con éxito', 'notify-success', 'upload', res.data.notify);
	            update('userGroups', res.data.resourceId, 'add', res.data.resource); // update dataset
	            this.edit(res.data.resourceId);
	            break;
	          case 'delete':
	            notify('Grupo eliminado con éxito', 'notify-success', 'trash', res.data.notify);
	            this.cancel();
	            update('userGroups', res.data.resourceId, 'remove', res.data.resource); // update dataset
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
	    .catch(() => notify('Error al añadir/modificar grupo', 'notify-error', 'exclamation-triangle'));
	}

	render() {
	  const {
	    userGroups, error, isLoaded, elementId, edit, name, description,
	  } = this.state;

	  if (error) {
	    return null; // TODO: handle error
	  } if (!isLoaded) {
	    return null; // TODO: handle loading
	  }
	  const list = userGroups.map((userGroup) => {
	    if (userGroup._id === elementId) {
	      return <UserGroup userGroup={userGroup} key={userGroup._id} edit={this.edit} active />;
	    }
	      return <UserGroup userGroup={userGroup} key={userGroup._id} edit={this.edit} active={false} />;
	  });
	  list.push(
				<div key="0" className="list-group-item-action list-group-item flex-column align-items-start">
          <div className="text-center elemento">
            <h4 className="mb-1">No se han encontrado {userGroups.length > 0 && 'más'} grupos de gestión</h4>
            <hr className="card-division" />
            <small>Número de grupos de gestión: {userGroups.length}</small>
          </div>
        </div>,
	  );

	  return (
				<div className="card card-settings">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
              <li className="nav-item mr-auto">
                <h2 className="detalles-titulo"><i className="fa fa-users mr-3" aria-hidden="true" />Grupos de gestión</h2>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <h3>{edit ? 'Editar Grupo de gestión' : 'Añadir Grupo de gestión'}</h3>
                <hr className="card-division" />
                <form>
                  <div className="form-row">
                    <div className="form-group col">
                      <label htmlFor="name"><i className="fa fa-users mr-2" />Nombre</label>
                      <input type="text" className="form-control" id="name" placeholder="Nombre del grupo de gestión" name="name" value={name} onChange={this.handleInputChange} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <label htmlFor="description"><i className="fa fa-info-circle mr-2" />Descripción</label>
                      <input type="description" className="form-control" id="description" placeholder="Descripción del grupo de gestión" name="description" value={description} onChange={this.handleInputChange} />
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
                <h3 className="d-flex w-100 justify-content-between">Grupos de gestión<span>{userGroups.length}</span></h3>
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

ManageUserGroups.propTypes = {
  data: PropTypes.shape({}).isRequired,
  token: PropTypes.string.isRequired,
  update: PropTypes.func,
  notify: PropTypes.func,
};

ManageUserGroups.defaultProps = {
  update: () => false,
  notify: () => false,
};

export default ManageUserGroups;
