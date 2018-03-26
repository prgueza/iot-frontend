/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { Redirect } from 'react-router-dom';
import axios from 'axios';

/* COMPONENTS */
export class GatewayForm extends Component{

  constructor(props){
    super(props);
    const { gateway, user, locations } = this.props;
    this.state = {
      id: gateway ? gateway.id : '',
      name: gateway ? gateway.name : '',
      description: gateway ? gateway.description : '',
      created_by: gateway ? ( gateway.created_by ? gateway.created_by.name : 'Usuario eliminado') : user.name,
      updated_by: user.name,
      created_at: gateway ? moment(gateway.created_at) : moment(),
      updated_at: moment(),
      mac_address: gateway ? gateway.mac_address : '',
      ip_address: gateway ? gateway.ip_address : '',
      location: gateway ? gateway.location._id : locations[0]._id,
      devices: gateway ? ( gateway.devices ? gateway.devices.map((d) => d._id) : [] ) : [],

      redirect: false,
      redirect_location: '/gateways',
      error: null
    };
  }

  /* INITIAL VALUES FOR FORM INPUTS */
  componentDidMount(){
    const { gateways, gateway } = this.props;
    // if in post mode get first free id value
    if (!gateway) {
      const identificaciones = gateways.map((d) => d.id); // get all ids
      var id = 1; // start from 1
      while (identificaciones.indexOf(id) != -1){id++} // stop at first free id value
    }
    // set state with initial values
    this.setState({
      id: gateway ? gateway.id : id,
      redirect_location: gateway ? '/gateways/' + gateway.id : '/gateways/' + id // Redirect url
    });
  }

  /* HANDLE INPUT CHANGE (CONTROLLED FORM) */
  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleCheckDevices = (event) => {
    // get value from the checkbox
    const target = event.target;
    const value = target.value;
    // check if the checkbox has been selected
    if (!this.state.devices.find((d) => d == value)){ // check if value is stored in state
      // if it is NOT stored, save the state, push the new value and save back the new state
      const prevState = this.state.devices;
      prevState.push(value);
      this.setState({devices: prevState});
      target.checked = true;
    } else {
      // if it IS stored, save the state, splice the old value and save back the new state
      const prevState = this.state.devices;
      prevState.splice(prevState.indexOf(value), 1);
      this.setState({devices: prevState});
      target.checked = false;
    }
  } // TODO: filter options and hide unselected options for reviewing / Also limit images could be an option

  /* HANDLE SUMBIT (PUT OR POST) */
  handleSubmit = () => {
    // define form values to send
    const form = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      updated_by: this.state.updated_by._id, // send user_id
      mac_address: this.state.mac_address,
      ip_address: this.state.ip_address,
      location: this.state.location,
    };
    // possible empty fields
    if (!this.props.gateway) form.created_by = this.props.user._id;
    if (this.state.devices.length > 0) form.devices = this.state.devices;
    // HTTP request
    axios({
      method: gateway ? 'put' : 'post',
      url: gateway ? gateway.url : 'http://localhost:4000/gateways',
      data: form,
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    })
    .then((res) => {
      if (res.status == 201){
        return this.props.update(this.props.user); // update dataset
      } else {
        return this.setState({ error: res.data }); // set error
      }
    })
    .then((res) => {
      this.setState({ redirect : true });
      return res;
    });
  }

  /* RENDER COMPONENT */
  render(){

    // Options
    const optionsLocation = this.props.locations.sort((a, b) => a.id - b.id).map((l, i) => <option value={l._id} key={i}>{l.name}</option>);
    const optionsDevices = this.props.devices.map((d) =>
      <label key={d._id} className="custom-control custom-checkbox">
        <input onChange={this.handleCheckDevices} type="checkbox" defaultChecked={this.state.devices.find((c) => c == d._id)} name={d._id} defaultValue={d._id} className="custom-control-input"></input>
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">{d.name}</span>
      </label>
    );

    // Render return
    if (this.state.redirect) {
      return( <Redirect to={this.state.redirect_location} /> );
    } else {
      return(
        <div className="col detalles">
          <form id='form'>
            <div className="card bg-transparent border-gray">
              <div className="card-header border-gray">
                <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
                  <li className="nav-item mr-auto">
                    { this.props.gateway ?
                      <h2 className="detalles-titulo"><i className="fa fa-pencil mr-3" aria-hidden="true"></i>Editar una puerta de enlace</h2> :
                      <h2 className="detalles-titulo"><i className="fa fa-plus-circle mr-3" aria-hidden="true"></i>Añadir una nueva puerta de enlace</h2>
                    }
                  </li>
                  <li className="nav-item ml-2">
                    { this.props.gateway ?
                      <button onClick={this.handleSubmit} type="button" className="btn btn-outline-success"><i className="fa fa-save mr-2" aria-hidden="true"></i>Guardar cambios</button> :
                      <button onClick={this.handleSubmit} type="button" className="btn btn-outline-success"><i className="fa fa-plus-circle mr-2" aria-hidden="true"></i>Añadir</button>
                    }
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="form-row">
                  <div className="form-group col-md-1">
                    <label htmlFor="gatewayID"><i className="fa fa-hashtag mr-2"></i>ID</label>
                    <input type="text" className="form-control" id="gatewayID" placeholder="ID" name='id' value={this.state.id} readOnly></input>
                  </div>
                  <div className="form-group col-md-11">
                    <label htmlFor="nombre"><i className="fa fa-sitemap mr-2"></i>Nombre</label>
                    <input type="text" className="form-control" id="nombre" placeholder="Nombre de la puerta de enlace" name='name' value={this.state.name} onChange={this.handleInputChange}></input>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="descripcion"><i className="fa fa-info-circle mr-2"></i>Descripcion</label>
                  <input type="text" className="form-control" id="descripcion" placeholder="Descripcion de la puerta de enlace" name='description' value={this.state.description} onChange={this.handleInputChange}></input>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="mac_address"><i className="fa fa-server mr-2"></i>Dirección MAC</label>
                    <input type="text" className="form-control" id="mac_address" placeholder="Dirección MAC de la puerta de enlace" name="mac_address" value={this.state.mac_address} onChange={this.handleInputChange}></input>
                  </div>
                  <div className="form-group col">
                    <label htmlFor="ip_address"><i className="fa fa-wifi mr-2"></i>Dirección IP</label>
                    <input type="text" className="form-control" id="ip_address" placeholder="Dirección IP de la puerta de enlace" name="ip_address" value={this.state.ip_address} onChange={this.handleInputChange}></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="location"><i className="fa fa-map-marker mr-2"></i>Location</label>
                    <div>
                      <select className="custom-select" name='location' onChange={this.handleInputChange}>
                        {optionsLocation}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="devices"><i className="fa fa-tablet mr-2"></i>Asociar uno o varios dispositivos</label>
                    <div className="custom-controls-stacked shadow">
                      {optionsDevices}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="created_by"><i className="fa fa-user-o mr-2"></i>Creador</label>
                  <input type="text" className="form-control" id="created_by" name="created_by" value={this.state.created_by} readOnly></input>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="fechaCreacion"><i className="fa fa-calendar-o mr-2"></i>Fecha de creación</label>
                    <input type="text" className="form-control" id="fechaCreacion" name='created_at ' value={moment(this.state.created_at).format('dddd, D [de] MMMM [de] YYYY')} readOnly></input>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="fechaModificacion"><i className="fa fa-calendar-o mr-2"></i>Fecha de modificación</label>
                    <input type="text" className="form-control" id="fechaModificacion" name='updated_at' value={moment(this.state.updated_at).format('dddd, D [de] MMMM [de] YYYY')} readOnly></input>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
};
