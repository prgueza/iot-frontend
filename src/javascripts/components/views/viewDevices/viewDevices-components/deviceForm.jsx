/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

/* COMPONENTS */
export class DeviceForm extends Component{

  constructor(props){
    super(props);
    const { device, user, resolutions, gateways, userGroups } = this.props;
    this.state = {
      name: device ? device.name : '',
      description: device ? device.description : '',
      created_by: device ? ( device.created_by ? device.created_by.name : 'Usuario eliminado') : user.name,
      updated_by: user.name,
      created_at: device ? moment(device.created_at) : moment(),
      updated_at: moment(),
      resolution: device ? device.resolution._id : resolutions[0]._id,
      mac: device ? device.mac : '',
      pref_gateway: device ? (device.pref_gateway ? device.pref_gateway._id : gateways[0]._id) : gateways[0]._id,
      userGroup: device ? device.userGroup._id : userGroups[0]._id,

      redirect: false,
      redirect_location: '/devices',
      error: null
    };
  }

  /* INITIAL VALUES FOR FORM INPUTS */
  componentDidMount(){
    const { devices, device } = this.props;
    // set state with initial values
    this.setState({
      redirect_location: device ? '/devices/' + device._id : '/devices' // Redirect url
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

  /* HANDLE SUBMIT (PUT OR POST) */
  handleSubmit = () => {
    const { device } = this.props;
    // define form values to send
    const form = {
      name: this.state.name,
      description: this.state.description,
      updated_by: this.state.updated_by._id, // send user_id
      pref_gateway: this.state.pref_gateway,
      resolution: this.state.resolution,
      mac: this.state.mac,
      userGroup: this.state.userGroup,
    };
    // possible empty fields
    if (!this.props.device) form.created_by = this.props.user._id;
    // HTTP request
    axios({
      method: device ? 'put' : 'post',
      url: device ? device.url : 'http://localhost:4000/devices',
      data: form,
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    })
    .then((res) => {
      if (res.status == 201){
        this.props.notify('Dispositivo configurado con éxito', 'notify-success', 'upload', toast.POSITION.BOTTOM_LEFT);
        return this.props.update(this.props.user); // update dataset
      }
    })
    .then((res) => {
      this.setState({ redirect : true });
      return res;
    })
    .catch((err) => {
      console.log(err);
      return this.props.notify('Error al configurar el dispositivo', 'notify-error', 'exclamation-triangle', toast.POSITION.BOTTOM_LEFT)
    });
  }

  /* RENDER COMPONENT */
  render(){

    // Options
    const optionsGateway = this.props.gateways.map((g, i) => <option value={g._id} key={i}>{g.name}</option>);
    const optionsResolution = this.props.resolutions.map((r, i) => <option value={r._id} key={i}>{r.name}</option>);
    const optionsUserGroup = this.props.userGroups.map((u, i) => <option value={u._id} key={i}>{u.name}</option>);

    // Render return
    if (this.state.redirect) {
      return( <Redirect to={this.state.redirect_location} /> );
    } else {
      return(
        <div className="card detalles">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
              <li className="nav-item mr-auto">
                { this.props.device ?
                  <h2 className="detalles-titulo"><i className="fa fa-pencil mr-3" aria-hidden="true"></i>Editar un dispositivo físico</h2> :
                  <h2 className="detalles-titulo"><i className="fa fa-plus-circle mr-3" aria-hidden="true"></i>Añadir un nuevo dispositivo físico</h2>
                }
              </li>
              <li className="nav-item ml-2">
                { this.props.device ?
                  <button onClick={this.handleSubmit} type="button" className="btn btn-outline-primary"><i className="fa fa-save mr-2" aria-hidden="true"></i>Guardar cambios</button> :
                  <button onClick={this.handleSubmit} type="button" className="btn btn-outline-primary"><i className="fa fa-plus-circle mr-2" aria-hidden="true"></i>Añadir</button>
                }
              </li>
            </ul>
          </div>
          <div className="card-body">
            <form id="form">
              <div className="form-group">
                <label htmlFor="nombre"><i className="fa fa-tablet mr-2"></i>Nombre</label>
                <input type="text" className="form-control" id="nombre" placeholder="Nombre del dispositivo físico" name='name' value={this.state.name} onChange={this.handleInputChange}></input>
              </div>
              <div className="form-group">
                <label htmlFor="descripcion"><i className="fa fa-info-circle mr-2"></i>Descripcion</label>
                <input type="text" className="form-control" id="descripcion" placeholder="Descripcion de la puerta de enlace" name='description' value={this.state.description} onChange={this.handleInputChange}></input>
              </div>
              <div className="form-group">
                <label htmlFor="mac"><i className="fa fa-server mr-2"></i>Dirección MAC</label>
                <input type="text" className="form-control" id="mac" placeholder="Dirección MAC de la puerta de enlace" name="mac" value={this.state.mac} readOnly></input>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="resolution"><i className="fa fa-arrows-alt mr-2"></i>Resolución</label>
                  <div>
                    <select className="custom-select" name="resolution" value={this.state.resolution} onChange={this.handleInputChange}>
                      {optionsResolution}
                    </select>
                  </div>
                </div>
                <div className="form-group col">
                  <label htmlFor="gateway"><i className="fa fa-sitemap mr-2"></i>Puerta de enlace preferida</label>
                  <div>
                    <select className="custom-select" name="gateway" value={this.state.pref_gateway} onChange={this.handleInputChange}>
                      {optionsGateway}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="userGroup"><i className="fa fa-users mr-2"></i>Grupo de gestión del dispositivo</label>
                <div>
                  <select className="custom-select" name="userGroup" value={this.state.userGroup} onChange={this.handleInputChange}>
                    {optionsUserGroup}
                  </select>
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
            </form>
          </div>
        </div>
      );
    }
  }
};
