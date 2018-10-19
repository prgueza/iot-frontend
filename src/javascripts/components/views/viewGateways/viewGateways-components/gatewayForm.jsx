/* IMPORT MODULES */
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import PropTypes from 'prop-types';

const moment = require('moment');

moment.locale('es');

/* COMPONENTS */
class GatewayForm extends Component {
  constructor(props) {
    super(props);
    const { gateway, user } = this.props;
    const { locations } = this.props.data;
    this.state = {
      id: gateway ? gateway.id : '',
      name: gateway ? gateway.name : '',
      description: gateway ? gateway.description : '',
      createdBy: gateway ? (gateway.createdBy ? gateway.createdBy.name : 'Usuario eliminado') : user.name,
      updatedBy: user.name,
      createdAt: gateway ? moment(gateway.createdAt) : moment(),
      updatedAt: moment(),
      mac: gateway ? gateway.mac : '',
      port: gateway ? gateway.port : '',
      ip: gateway ? gateway.ip : '',
      location: gateway ? (gateway.location ? gateway.location._id : 'No hay localizaciones configuradas') : (locations[0] ? locations[0]._id : 'No hay localizaciones configuradas'),

      redirect: false,
      redirectLocation: '/gateways',
      error: null,
    };
  }

  /* INITIAL VALUES FOR FORM INPUTS */
  componentDidMount() {
    const { gateways, gateway } = this.props;
    // set state with initial values
    this.setState({
      redirectLocation: gateway ? `/gateways/${gateway._id}` : '/gateways', // Redirect url
    });
  }

	/* HANDLE INPUT CHANGE (CONTROLLED FORM) */
	handleInputChange = (event) => {
	  const target = event.target;
	  const name = target.name;
	  const value = target.value;

	  this.setState({
	    [name]: value,
	  });
	}

	/* HANDLE SUMBIT (PUT OR POST) */
	handleSubmit = () => {
	  const { gateway, token } = this.props;
	  // define form values to send
	  const form = {
	    id: this.state.id,
	    name: this.state.name,
	    description: this.state.description,
	    updatedBy: this.state.updatedBy._id, // send user_id
	    mac: this.state.mac,
	    ip: this.state.ip,
	    port: this.state.port,
	    location: this.props.data.locations.length > 0 ? this.state.location : undefined,
	  };
	  // possible empty fields
	  if (!this.props.gateway) form.createdBy = this.props.user._id;
	  // HTTP request
	  axios({
	    method: gateway ? 'put' : 'post',
	    url: gateway ? gateway.url : 'http://localhost:4000/gateways',
	    data: form,
	    headers: {
	      Accept: 'application/json',
	      'Content-Type': 'application/json',
	      Authorization: `Bearer ${token}`,
	    },
	  })
	    .then((res) => {
	      if (res.status == 201) {
	        this.props.notify('Puerta de enlace configurado con éxito', 'notify-success', 'upload', toast.POSITION.TOP_RIGHT);
	        const action = gateway ? 'edit' : 'add';
	        return this.props.update('gateways', res.data.resourceId, action, res.data.resource); // update dataset
	      }
	    })
	    .then(res => this.setState({ redirect: true }))
	    .catch(err => this.props.notify('Error al configurar la puerta de enlace', 'notify-error', 'exclamation-triangle', toast.POSITION.BOTTOM_LEFT));
	}

	/* RENDER COMPONENT */
	render() {
	  const { gateway } = this.props;

	  // Options
	  const optionsLocation = this.props.data.locations.sort((a, b) => a.name - b.name)
	    .map((location, index) => <option value={location._id} key={index}>{location.name}</option>);
	  if (optionsLocation.length == 0) optionsLocation.push(<option value="" key="0">No hay localizaciones configuradas</option>);

	  const linkBack = gateway ? `/gateways/${gateway._id}` : '/gateways';

	  // Render return
	  if (this.state.redirect) {
	    return (<Redirect to={this.state.redirectLocation} />);
	  }
	  return (
				<div className="card detalles">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
              <li className="nav-item mr-auto">
                { this.props.gateway
                  ? <h2 className="detalles-titulo"><i className="fa fa-pencil mr-3" aria-hidden="true" />Editar una puerta de enlace</h2>
                  : <h2 className="detalles-titulo"><i className="fa fa-plus-circle mr-3" aria-hidden="true" />Añadir una nueva puerta de enlace</h2>
                }
              </li>
							<li className="nav-item mr-2">
								<Link to={linkBack}>
									<button type="button" className="btn btn-warning">
										<i className="fa fa-times mr-2" aria-hidden="true" />Cancelar</button>
								</Link>
							</li>
              <li className="nav-item ml-2">
                { this.props.gateway
                  ? <button onClick={this.handleSubmit} type="button" className="btn btn-primary"><i className="fa fa-save mr-2" aria-hidden="true" />Guardar cambios</button>
                  : <button onClick={this.handleSubmit} type="button" className="btn btn-primary"><i className="fa fa-plus-circle mr-2" aria-hidden="true" />Añadir</button>
                }
              </li>
            </ul>
          </div>
          <div className="card-body">
            <form id="form">
              <div className="form-group">
                <label htmlFor="nombre"><i className="fa fa-sitemap mr-2" />Nombre</label>
                <input type="text" className="form-control" id="nombre" placeholder="Nombre de la puerta de enlace" name="name" value={this.state.name} onChange={this.handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="descripcion"><i className="fa fa-info-circle mr-2" />Descripción</label>
                <input type="text" className="form-control" id="descripcion" placeholder="Descripción de la puerta de enlace" name="description" value={this.state.description} onChange={this.handleInputChange} />
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="mac"><i className="fa fa-server mr-2" />Dirección MAC</label>
                  <input type="text" className="form-control" id="mac" placeholder="Dirección MAC de la puerta de enlace" name="mac" value={this.state.mac} onChange={this.handleInputChange} />
                </div>
                <div className="form-group col">
                  <label htmlFor="ip"><i className="fa fa-wifi mr-2" />Dirección IP</label>
                  <input type="text" className="form-control" id="ip" placeholder="Dirección IP de la puerta de enlace" name="ip" value={this.state.ip} onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="port"><i className="fa fa-exchange mr-2" />Puerto</label>
                  <input type="text" className="form-control" id="port" placeholder="Puerto de la puerta de enlace" name="port" value={this.state.port} onChange={this.handleInputChange} />
                </div>
                <div className="form-group col">
                  <label htmlFor="location"><i className="fa fa-map-marker mr-2" />Localización</label>
                  <div>
                    <select className="custom-select" name="location" onChange={this.handleInputChange} value={this.state.location} disabled={this.props.data.locations.length == 0}>
                      {optionsLocation}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="createdBy"><i className="fa fa-user-o mr-2" />Creador</label>
                <input type="text" className="form-control" id="createdBy" name="createdBy" value={this.state.createdBy} readOnly />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="fechaCreacion"><i className="fa fa-calendar-o mr-2" />Fecha de creación</label>
                  <input type="text" className="form-control" id="fechaCreacion" name="createdAt " value={moment(this.state.createdAt).format('dddd, D [de] MMMM [de] YYYY')} readOnly />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="fechaModificacion"><i className="fa fa-calendar-o mr-2" />Fecha de modificación</label>
                  <input type="text" className="form-control" id="fechaModificacion" name="updatedAt" value={moment(this.state.updatedAt).format('dddd, D [de] MMMM [de] YYYY')} readOnly />
                </div>
              </div>
            </form>
          </div>
        </div>
	  );
	}
}

GatewayForm.propTypes = {
  data: PropTypes.shape.isRequired,
};

export default GatewayForm;
