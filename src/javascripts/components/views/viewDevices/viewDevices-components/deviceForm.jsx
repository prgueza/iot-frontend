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
      name: device.name,
      description: device.description,
      updated_by: user.name,
      created_at: moment(device.created_at),
      updated_at: moment(),
      mac: device.mac,
      pref_gateway: device.pref_gateway ? device.pref_gateway._id : gateways[0]._id,
      userGroup: device.userGroup ? device.userGroup._id : '',

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
      redirect_location: '/devices/' + device._id // Redirect url
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
      mac: this.state.mac,
    };
    if (this.state.userGroup) form.userGroup = this.state.userGroup;
    // HTTP request
    axios({
      method: 'put',
      url: device.url,
      data: form,
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    })
    .then((res) => {
      if (res.status == 201 || res.status == 200){
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
    const optionsUserGroup = this.props.userGroups.map((u, i) => <option value={u._id} key={i}>{u.name}</option>);

    const { screens, device } = this.props;
    const screen = screens.find((r) => r.screen_code == device.screen);
    const screen_name = screen.name || "No se encuentra la pantalla (código: " + device.screen + " )" ;

    // Render return
    if (this.state.redirect) {
      return( <Redirect to={this.state.redirect_location} /> );
    } else {
      return(
        <div className="card detalles">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
              <li className="nav-item mr-auto">
                <h2 className="detalles-titulo"><i className="fa fa-fw fa-pencil mr-3" aria-hidden="true"></i>Configurar un dispositivo físico</h2>
              </li>
              <li className="nav-item ml-2">
                <button onClick={this.handleSubmit} type="button" className="btn btn-outline-primary"><i className="fa  fa-fw fa-floppy-o mr-2" aria-hidden="true"></i>Guardar cambios</button>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <form id="form">
              <div className="form-group">
                <label htmlFor="nombre"><i className="fa fa-fw fa-tablet mr-2"></i>Nombre</label>
                <input type="text" className="form-control" id="nombre" placeholder="Nombre del dispositivo físico" name='name' value={this.state.name} onChange={this.handleInputChange}></input>
              </div>
              <div className="form-group">
                <label htmlFor="descripcion"><i className="fa fa-fw fa-info-circle mr-2"></i>Descripcion</label>
                <input type="text" className="form-control" id="descripcion" placeholder="Descripcion de la puerta de enlace" name='description' value={this.state.description} onChange={this.handleInputChange}></input>
              </div>
              <div className="form-group">
                <label htmlFor="mac"><i className="fa fa-fw fa-server mr-2"></i>Dirección MAC</label>
                <input type="text" className="form-control" id="mac" placeholder="Dirección MAC de la puerta de enlace" name="mac" value={this.state.mac} readOnly></input>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="screen"><i className="fa fa-fw fa-tint mr-2"></i>Pantalla</label>
                  <input type="text" className="form-control" id="screen" name="screen" value={screen_name} readOnly></input>
                </div>
                <div className="form-group col">
                  <label htmlFor="gateway"><i className="fa fa-fw fa-sitemap mr-2"></i>Puerta de enlace preferida</label>
                  <div>
                    <select className="custom-select" name="gateway" value={this.state.pref_gateway} onChange={this.handleInputChange}>
                      {optionsGateway}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="userGroup"><i className="fa fa-fw fa-users mr-2"></i>Grupo de gestión del dispositivo</label>
                <div>
                  <select className="custom-select" name="userGroup" value={this.state.userGroup} onChange={this.handleInputChange}>
                    <option value="" key="0">Ninguno seleccionado</option>
                    {optionsUserGroup}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="updated_by"><i className="fa fa-fw fa-user-o mr-2"></i>Ultima modificación por</label>
                <input type="text" className="form-control" id="updated_by" name="updated_by" value={this.state.updated_by} readOnly></input>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="fechaCreacion"><i className="fa fa-fw fa-calendar-o mr-2"></i>Fecha de creación</label>
                  <input type="text" className="form-control" id="fechaCreacion" name='created_at ' value={moment(this.state.created_at).format('dddd, D [de] MMMM [de] YYYY')} readOnly></input>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="fechaModificacion"><i className="fa fa-fw fa-calendar-o mr-2"></i>Fecha de modificación</label>
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
