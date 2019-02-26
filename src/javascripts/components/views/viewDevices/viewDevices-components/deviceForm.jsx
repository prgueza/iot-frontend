/* IMPORT MODULES */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const moment = require('moment');

moment.locale('es');


/* COMPONENTS */
class DeviceForm extends Component {
  constructor(props) {
    super(props);
    const { device, user } = this.props;
    this.state = {
      name: device.name,
      description: device.description,
      updatedBy: user,
      createdAt: moment(device.createdAt),
      updatedAt: moment(),
      mac: device.mac,
      userGroup: device.userGroup ? device.userGroup._id : '',
      redirect: false,
      redirectLocation: '/devices',
    };
  }

  /* INITIAL VALUES FOR FORM INPUTS */
  componentDidMount() {
    const { device } = this.props;
    // set state with initial values
    this.setState({
      redirectLocation: `/devices/${device._id}`,
    });
  }

	/* HANDLE INPUT CHANGE (CONTROLLED FORM) */
	handleInputChange = (event) => {
	  const { target } = event;
	  const { name, value } = target;
	  this.setState({ [name]: value });
	}

	/* HANDLE SUBMIT (PUT OR POST) */
	handleSubmit = () => {
	  const {
	    device, token, notify, update,
	  } = this.props;
	  const {
	    name, description, mac, userGroup, updatedBy: { _id },
	  } = this.state;
	  // define form values to send
	  const form = {
	    name,
	    description,
	    mac,
	    userGroup: undefined,
	    updatedBy: _id, // send user_id
	  };
	  if (userGroup) form.userGroup = userGroup; // FIXME: include it within the declaration of form somehow
	  // HTTP request
	  axios({
	    method: 'put',
	    url: device.url,
	    data: form,
	    headers: {
	      Accept: 'application/json',
	      'Content-Type': 'application/json',
	      Authorization: `Bearer ${token}`,
	    },
	  })
	    .then((res) => {
	      if (res.status >= 200) {
	        notify('Dispositivo configurado con éxito', 'notify-success', device ? 'save' : 'upload', res.data.notify);
	        return update('devices', res.data.resourceId, device ? 'edit' : 'add', res.data.resource); // update dataset
	      }
	      return null;
	    })
	    .then(() => this.setState({ redirect: true }))
	    .catch(() => notify('Error al configurar el dispositivo', 'notify-error', 'exclamation-triangle', false, 'error'));
	}

	/* RENDER COMPONENT */
	render() {
	  const { device, data: { screens, userGroups } } = this.props;
	  const {
	    redirect, redirectLocation, name, description, updatedBy, updatedAt, createdAt, mac, userGroup,
	  } = this.state;

	  const linkBack = `/devices/${device._id}`;

	  // Options
	  const optionsUserGroup = userGroups.map(ug => <option value={ug._id} key={ug._id}>{ug.name}</option>);

	  const screen = screens.find(s => s.screenCode === device.screen);
	  const screenName = screen ? screen.name : `No se encuentra la pantalla (código: ${device.screen} )`;

	  // Render return
	  if (redirect) return <Redirect to={redirectLocation} />;
	  return (
  <div className="card card-detalles">
    <div className="card-header">
      <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
        <li className="nav-item mr-auto">
          <h2 className="detalles-titulo">
            <FontAwesomeIcon icon={['far', 'edit']} className="mr-3" fixedWidth />
						Configurar un dispositivo
          </h2>
        </li>
        <li className="nav-item mr-2">
          <Link to={linkBack}>
            <button type="button" className="btn btn-warning">
              <FontAwesomeIcon icon="times" className="mr-2" fixedWidth />
							Cancelar
            </button>
          </Link>
        </li>
        <li className="nav-item ml-2">
          <button onClick={this.handleSubmit} type="button" className="btn btn-primary">
            <FontAwesomeIcon icon="save" className="mr-2" fixedWidth />
						Guardar cambios
          </button>
        </li>
      </ul>
    </div>
    <div className="card-body">
      <form id="form">
        <div className="form-group">
          <label htmlFor="nombre">
            <FontAwesomeIcon icon="tablet-alt" className="mr-2" fixedWidth />
						Nombre
          </label>
          <input type="text" className="form-control" id="nombre" placeholder="Nombre del dispositivo físico" name="name" value={name} onChange={this.handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">
            <FontAwesomeIcon icon="info-circle" className="mr-2" fixedWidth />
						Descripcion
          </label>
          <input type="text" className="form-control" id="descripcion" placeholder="Descripcion de la puerta de enlace" name="description" value={description} onChange={this.handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="mac">
            <FontAwesomeIcon icon="server" className="mr-2" fixedWidth />
						Dirección MAC
          </label>
          <input type="text" className="form-control" id="mac" placeholder="Dirección MAC de la puerta de enlace" name="mac" value={mac} readOnly />
        </div>
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="screen">
              <FontAwesomeIcon icon={['far', 'window-maximize']} className="mr-2" fixedWidth />
							Pantalla
            </label>
            <input type="text" className="form-control" id="screen" name="screen" value={screenName} readOnly />
          </div>
          <div className="form-group col">
            <label htmlFor="userGroup">
              <FontAwesomeIcon icon="users" className="mr-2" fixedWidth />
  						Grupo de gestión del dispositivo
            </label>
            <div>
              <select className="custom-select" name="userGroup" value={userGroup} onChange={this.handleInputChange}>
                <option value="" key="0">Ninguno seleccionado</option>
                {optionsUserGroup}
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="updatedBy">
            <FontAwesomeIcon icon="user" className="mr-2" fixedWidth />
						Ultima modificación por
          </label>
          <input type="text" className="form-control" id="updatedBy" name="updatedBy" value={updatedBy.name} readOnly />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="fechaCreacion">
              <FontAwesomeIcon icon={['far', 'calendar']} className="mr-2" fixedWidth />Primera vez localizado
            </label>
            <input type="text" className="form-control" id="fechaCreacion" name="createdAt " value={moment(createdAt).format('dddd, D [de] MMMM [de] YYYY')} readOnly />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="fechaModificacion">
              <FontAwesomeIcon icon={['far', 'calendar']} className="mr-2" fixedWidth />Fecha de modificación
            </label>
            <input type="text" className="form-control" id="fechaModificacion" name="updatedAt" value={moment(updatedAt).format('dddd, D [de] MMMM [de] YYYY')} readOnly />
          </div>
        </div>
      </form>
    </div>
  </div>
	  );
	}
}

DeviceForm.propTypes = {
  device: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({}).isRequired,
  token: PropTypes.string.isRequired,
  notify: PropTypes.func,
  update: PropTypes.func,
};

DeviceForm.defaultProps = {
  notify: () => false,
  update: () => false,
};

export default DeviceForm;
