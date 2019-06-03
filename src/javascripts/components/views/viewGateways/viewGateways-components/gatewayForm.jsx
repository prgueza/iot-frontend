/* IMPORT MODULES */
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const moment = require('moment');

moment.locale('es');

/* COMPONENTS */
class GatewayForm extends Component {
  constructor(props) {
    super(props);
    const { gateway, user, data: { locations } } = this.props;
    let createdBy = user.name;
    let location = 'No hay localizaciones configuradas';
    if (gateway && gateway.createdBy) {
      createdBy = gateway.createdBy.name;
    } else if (gateway) {
      createdBy = 'Usuario eliminado';
    }
    if (gateway && gateway.location) {
      location = gateway.location._id;
    } else if (locations.length > 0) {
      [location] = locations;
    }
    this.state = {
      createdBy,
      location,
      name: gateway ? gateway.name : '',
      description: gateway ? gateway.description : '',
      updatedBy: user.name,
      createdAt: gateway ? moment(gateway.createdAt) : moment(),
      updatedAt: moment(),
      mac: gateway ? gateway.mac : '',
      port: gateway ? gateway.port : '',
      ip: gateway ? gateway.ip : '',
      redirect: false,
      redirectLocation: '/gateways',
    };
  }

  /* INITIAL VALUES FOR FORM INPUTS */
  componentDidMount() {
    const { gateway } = this.props;
    // set state with initial values
    this.setState({
      redirectLocation: gateway ? `/gateways/${gateway._id}` : '/gateways', // Redirect url
    });
  }

	/* HANDLE INPUT CHANGE (CONTROLLED FORM) */
	handleInputChange = (event) => {
	  const { target: { value, name } } = event;
	  this.setState({
	    [name]: value,
	  });
	}

	/* HANDLE SUMBIT (PUT OR POST) */
	handleSubmit = () => {
	  const {
	    gateway, token, update, notify, data, user,
	  } = this.props;
	  const {
	    name, description, updatedBy, mac, ip, port, location,
	  } = this.state;
	  // define form values to send
	  const form = {
	    name,
	    description,
	    mac,
	    ip,
	    port,
	    updatedBy: updatedBy._id, // send user_id
	    location: data.locations.length > 0 ? location : undefined,
	  };
	  // possible empty fields
	  if (!gateway) form.createdBy = user._id;
	  // HTTP request
	  axios({
	    method: gateway ? 'put' : 'post',
	    url: gateway ? gateway.url : `${process.env.API_URL}gateways`,
	    data: form,
	    headers: {
	      Accept: 'application/json',
	      'Content-Type': 'application/json',
	      Authorization: `Bearer ${token}`,
	    },
	  })
	    .then((res) => {
	      if (res.status >= 200) {
	        notify('Puerta de enlace configurada con éxito', 'notify-success', gateway ? 'save' : 'upload', res.data.notify);
	        return update('gateways', res.data.resourceId, gateway ? 'edit' : 'add', res.data.resource); // update dataset
	      }
	      return null;
	    })
	    .then(() => this.setState({ redirect: true }))
	    .catch(() => notify('Error al configurar la puerta de enlace', 'notify-error', 'exclamation-triangle', false, 'error'));
	}

	/* RENDER COMPONENT */
	render() {
	  const { gateway, data } = this.props;
	  const {
	    redirect, redirectLocation, name, description, mac, ip, port, location, createdBy, createdAt, updatedAt,
	  } = this.state;

	  // Options
	  const optionsLocation = data.locations.sort((a, b) => a.name - b.name)
	    .map(l => <option value={l._id} key={l._id}>{l.name}</option>);
	  if (optionsLocation.length === 0) optionsLocation.push(<option value="" key="0">No hay localizaciones configuradas</option>);

	  const linkBack = gateway ? `/gateways/${gateway._id}` : '/gateways';

	  // Render return
	  if (redirect) {
	    return (<Redirect to={redirectLocation} />);
	  }
	  return (
				<div className="card card-detalles">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
              <li className="nav-item mr-auto">
                { gateway
                  ? <h2 className="detalles-titulo"><FontAwesomeIcon icon={['far', 'edit']} className="mr-3" fixedWidth />Editar una puerta de enlace</h2>
                  : <h2 className="detalles-titulo"><FontAwesomeIcon icon="plus-circle" className="mr-3" fixedWidth />Añadir una nueva puerta de enlace</h2>
                }
              </li>
							<li className="nav-item mr-2">
								<Link to={linkBack}>
									<button type="button" className="btn btn-warning">
										<FontAwesomeIcon icon="times" className="mr-2" fixedWidth />Cancelar</button>
								</Link>
							</li>
              <li className="nav-item ml-2">
                { gateway
                  ? <button onClick={this.handleSubmit} type="button" className="btn btn-primary"><FontAwesomeIcon icon="save" className="mr-2" fixedWidth />Guardar cambios</button>
                  : <button onClick={this.handleSubmit} type="button" className="btn btn-primary"><FontAwesomeIcon icon="save" className="mr-2" fixedWidth />Añadir</button>
                }
              </li>
            </ul>
          </div>
          <div className="card-body">
            <form id="form">
              <div className="form-group">
                <label htmlFor="nombre"><FontAwesomeIcon icon="sitemap" className="mr-2" fixedWidth />Nombre</label>
                <input type="text" className="form-control" id="nombre" placeholder="Nombre de la puerta de enlace" name="name" value={name} onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="descripcion"><FontAwesomeIcon icon="info-circle" className="mr-2" fixedWidth />Descripción</label>
                <input type="text" className="form-control" id="descripcion" placeholder="Descripción de la puerta de enlace" name="description" value={description} onChange={this.handleInputChange} />
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="mac"><FontAwesomeIcon icon="server" className="mr-2" fixedWidth />Dirección MAC</label>
                  <input type="text" className="form-control" id="mac" placeholder="Dirección MAC de la puerta de enlace" name="mac" value={mac} onChange={this.handleInputChange} />
                </div>
                <div className="form-group col">
                  <label htmlFor="ip"><FontAwesomeIcon icon="wifi" className="mr-2" fixedWidth />Dirección IP</label>
                  <input type="text" className="form-control" id="ip" placeholder="Dirección IP de la puerta de enlace" name="ip" value={ip} onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="port"><FontAwesomeIcon icon="exchange-alt" className="mr-2" fixedWidth />Puerto</label>
                  <input type="text" className="form-control" id="port" placeholder="Puerto de la puerta de enlace" name="port" value={port} onChange={this.handleInputChange} />
                </div>
                <div className="form-group col">
                  <label htmlFor="location"><FontAwesomeIcon icon="map-marker-alt" className="mr-2" fixedWidth />Localización</label>
                  <div>
                    <select className="custom-select" name="location" onChange={this.handleInputChange} value={location} disabled={data.locations.length === 0}>
                      {optionsLocation}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="createdBy"><FontAwesomeIcon icon="user" className="mr-2" fixedWidth />Creador</label>
                <input type="text" className="form-control" id="createdBy" name="createdBy" value={createdBy} readOnly />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="fechaCreacion"><FontAwesomeIcon icon={['far', 'calendar']} className="mr-2" fixedWidth />Fecha de creación</label>
                  <input type="text" className="form-control" id="fechaCreacion" name="createdAt " value={moment(createdAt).format('dddd, D [de] MMMM [de] YYYY')} readOnly />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="fechaModificacion"><FontAwesomeIcon icon={['far', 'calendar']} className="mr-2" fixedWidth />Fecha de modificación</label>
                  <input type="text" className="form-control" id="fechaModificacion" name="updatedAt" value={moment(updatedAt).format('dddd, D [de] MMMM [de] YYYY')} readOnly />
                </div>
              </div>
            </form>
          </div>
        </div>
	  );
	}
}

GatewayForm.propTypes = {
  data: PropTypes.shape({}).isRequired,
  gateway: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  token: PropTypes.string.isRequired,
  update: PropTypes.func,
  notify: PropTypes.func,
};

GatewayForm.defaultProps = {
  update: () => false,
  notify: () => false,
};

export default GatewayForm;
