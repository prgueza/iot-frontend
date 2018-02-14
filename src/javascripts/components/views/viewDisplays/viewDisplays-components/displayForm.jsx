/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { Redirect } from 'react-router-dom';

/* COMPONENTS */
export class DisplayForm extends Component{

  constructor(props){
    super(props);
    const { display, user, resolutions } = this.props;
    this.state = {
      id: display ? display.id : '',
      name: display ? display.name : '',
      description: display ? display.description : '',
      created_by: display ? ( display.created_by ? display.created_by.name : 'Usuario eliminado') : user.name,
      updated_by: user.name,
      resolution: display ? ( display.resolution ? display.resolution._id : resolutions[0]._id ) : resolutions[0]._id,
      tags: display ? display.tags : [],
      created_at: display ? moment(display.created_at) : moment(),
      updated_at: moment(),
      images: display ? display.images.map((i) => i._id) : [],
      groups: display ? display.groups.map((g) => g._id) : [],
      device: display ? (display.device ? display.device._id : this.props.devices.data[0]._id ) : this.props.devices.data[0]._id,

      redirect: false,
      location: '/displays',
      error: null
    };
  }

  /* INITIAL VALUES FOR FORM INPUTS */
  componentDidMount(){
    const { displays, display } = this.props;
    // if in post mode get first free id value
    if (!display) {
      const identificaciones = displays.data.map((d) => d.id); // get all ids
      var id = 1; // start from 1
      while (identificaciones.indexOf(id) != -1){id++} // stop at first free id value
    }
    // set state with initial values
    this.setState({
      id: display ? display.id : id,
      location: display ? '/displays/' + display.id : '/displays/' + id // Redirect url
    });
  }

  /* HANDLE INPUT CHANGE (CONTROLLED FORM) */
  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    if (name === 'tags'){
      var value = target.value.split(','); // TODO: better string to array conversion
    } else {
      var value = target.value;
    }

    this.setState({
      [name]: value
    });
  }

  /* HANDLE MULTIPLE CHECKBOX */
  handleCheckImages = (event) => {
    // get value from the checkbox
    const target = event.target;
    const value = target.value;
    // check if the checkbox has been selected
    if (!this.state.images.find((c) => c == value)){ // check if value is stored in state
      // if it is NOT stored, save the state, push the new value and save back the new state
      const prevState = this.state.images;
      prevState.push(value);
      this.setState({images: prevState});
    } else {
      // if it IS stored, save the state, splice the old value and save back the new state
      const prevState = this.state.images;
      prevState.splice(prevState.indexOf(value), 1);
      this.setState({images: prevState});
    }
  }

  handleCheckGroups = (event) => {
    // get value from the checkbox
    const target = event.target;
    const value = target.value;
    // check if the checkbox has been selected
    if (!this.state.groups.find((c) => c == value)){ // check if value is stored in state
      // if it is NOT stored, save the state, push the new value and save back the new state
      const prevState = this.state.groups;
      prevState.push(value);
      this.setState({groups: prevState});
      target.checked = true;
    } else {
      // if it IS stored, save the state, splice the old value and save back the new state
      const prevState = this.state.groups;
      prevState.splice(prevState.indexOf(value), 1);
      this.setState({groups: prevState});
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
      resolution: this.state.resolution,
      tags: this.state.tags,
      device: this.state.device
    };
    // possible empty fields
    if (!this.props.display) form.created_by = this.props.user._id;
    if (this.state.images.length > 0) form.images = this.state.images;
    if (this.state.groups.length > 0) form.groups = this.state.groups;
    fetch( this.props.display ? 'http://localhost:4000/displays/' + this.props.display._id : 'http://localhost:4000/displays',
      {
        method: this.props.display ? 'put' : 'post', // post or put method
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(form)
      }
    )
    .then((res) => res.json())
    .then((res) => {
      if (this.props.display) {
        this.props.updateOne('display', res.result) // IDEA: Alert on updateOne at main
      } else {
        this.props.addOne('display', res.result)
      }
    }) // update dataset
    // TODO: alert with success
    // TODO: throw error and alert with error
    .then(
      (success) => { // resolve callback
        this.setState({ redirect: true })
      },
      (error) => { // reject callback
        this.setState({ error })
      }
    );// TODO: error handling
  }

  /* RENDER COMPONENT */
  render(){

    // Options
    const optionsResolution = this.props.resolutions.sort((a, b) => a.id - b.id).map((r, i) => <option value={r._id} key={i}>{r.name}</option>);
    const optionsDevices = this.props.devices.data.map((d, i) => <option value={d._id} key={i}>{d.name}</option>);
    const optionsGroups = this.props.groups.data.map((g) =>
      <label key={g.id} className="custom-control custom-checkbox">
        <input onChange={this.handleCheckGroups} type="checkbox" defaultChecked={this.state.groups.find((c) => c == g._id)} name={g._id} defaultValue={g._id} className="custom-control-input"></input>
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">{g.name}</span>
      </label>
    );
    const optionsImages = this.props.images.data.sort((a, b) => a.id - b.id).map((i) =>
      <label key={i.id} className="custom-control custom-checkbox">
        <input onChange={this.handleCheckImages} type="checkbox" defaultChecked={this.state.images.find((c) => c == i._id)} name={i._id} defaultValue={i._id} className="custom-control-input"></input>
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">{i.name}</span>
      </label>
    );

    // Render return
    if (this.state.redirect) {
      return( <Redirect to={this.state.location} /> );
    } else {
      return(
        <div className="col detalles">
          <form id='form'>
            <div className="card bg-transparent border-gray">
              <div className="card-header border-gray">
                <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
                  <li className="nav-item mr-auto">
                    { this.props.display ?
                      <h2 className="detalles-titulo"><i className="fa fa-pencil mr-3" aria-hidden="true"></i>Editar un display</h2> :
                      <h2 className="detalles-titulo"><i className="fa fa-plus-circle mr-3" aria-hidden="true"></i>Añadir un nuevo display</h2>
                    }
                  </li>
                  <li className="nav-item ml-2">
                    { this.props.display ?
                      <button onClick={this.handleSubmit} type="button" className="btn btn-outline-success"><i className="fa fa-save mr-2" aria-hidden="true"></i>Guardar cambios</button> :
                      <button onClick={this.handleSubmit} type="button" className="btn btn-outline-success"><i className="fa fa-plus-circle mr-2" aria-hidden="true"></i>Añadir</button>
                    }
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="device"><i className="fa fa-tablet mr-2"></i>Dispositivo físico asociado</label>
                    <div>
                      <select className="custom-select" name='devices' onChange={this.handleInputChange}>
                        {optionsDevices}
                      </select>
                    </div>
                  </div>
                  <div className="form-group col">
                    <label htmlFor="ip"><i className="fa fa-wifi mr-2"></i>Dirección IP</label>
                    <input type="text" className="form-control" id="ip" name="ip" readOnly></input>
                  </div>
                </div>
                <hr></hr>
                <div className="form-row">
                  <div className="form-group col-md-1">
                    <label htmlFor="displayID"><i className="fa fa-hashtag mr-2"></i>ID</label>
                    <input type="text" className="form-control" id="displayID" placeholder="ID" name='id' value={this.state.id} readOnly></input>
                  </div>
                  <div className="form-group col-md-11">
                    <label htmlFor="nombre"><i className="fa fa-television mr-2"></i>Nombre</label>
                    <input type="text" className="form-control" id="nombre" placeholder="Nombre del display" name='name' value={this.state.name} onChange={this.handleInputChange}></input>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="descripcion"><i className="fa fa-info-circle mr-2"></i>Descripcion</label>
                  <input type="text" className="form-control" id="descripcion" placeholder="Descripcion del display" name='description' value={this.state.description} onChange={this.handleInputChange}></input>
                </div>
                <div className="form-group">
                  <label htmlFor="creador"><i className="fa fa-user-o mr-2"></i>Creador</label>
                  <input type="text" className="form-control" id="creador" name='user' value={this.state.created_by} readOnly></input>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="resolucion"><i className="fa fa-arrows-alt mr-2"></i>Resolución</label>
                    <div>
                      <select className="custom-select" name='resolution' onChange={this.handleInputChange}>
                        {optionsResolution}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="displays"><i className="fa fa-television mr-2"></i>Asociar una o varias imagenes</label>
                    <div className="custom-controls-stacked shadow">
                      {optionsImages}
                    </div>
                  </div>
                  <div className="form-group col">
                    <label htmlFor="groups"><i className="fa fa-list mr-2"></i>Asociar a uno o varios grupos</label>
                    <div className="custom-controls-stacked shadow">
                      {optionsGroups}
                    </div>
                  </div>
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
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="etiquetas"><i className="fa fa-tags mr-2"></i>Etiquetas</label>
                    <input type="text" className="form-control" name="tags" id="etiquetas" value={this.state.tags} onChange={this.handleInputChange}></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    {this.state.tags.map((t, i) => t.length > 1 ? <button type="button" className="btn mr-1 btn-outline-imagen btn-tiny" key={i}>{t}</button> : '')}
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
