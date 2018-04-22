/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

/* COMPONENTS */
export class GroupForm extends Component{

  constructor(props){
    super(props);
    const { group, user } = this.props;
    this.state = {
      // form data stored in state
      name: group ? group.name : '',
      description: group ? group.description : '',
      created_by: group ? ( group.created_by ? group.created_by : 'Usuario eliminado') : user,
      updated_by: user.name,
      tags: group ? group.tags : [],
      active_image: group ? group.active_image ? group.active_image._id : '' : '',
      images: group ? group.images.map((i) => i._id) : [],
      displays: group ? group.displays.map((d) => d._id) : [],
      // form options stored in state
      optionsActiveImage: [],
      // redirect variables
      redirect: false,
      location: '', // Redirect url
      // error handling
      error: null
    };
  }

  /* INITIAL VALUES FOR FORM INPUTS */
  componentDidMount(){
    const { groups, images } = this.props; // Data from database
    const { group } = this.props;
    // options for select inputs
    const optionsActiveImage = images.filter((i) => this.state.images.find((c) => c == i._id)).map((i) => <option value={i._id} key={i._id}>{i.name}</option>);
    // set state with initial values
    this.setState({
      optionsActiveImage: optionsActiveImage,
      location: group ? '/groups/' + group._id : '/groups/',
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
      [name]:value
    });
  }

  /* HANDLE MULTIPLE CHECKBOX */
  handleCheckDisplays = (event) => {
    // get value from the checkbox
    const target = event.target;
    const value = target.value;
    // check if the checkbox has been selected
    if (!this.state.displays.find((c) => c == value)){ // check if value is stored in state
      // if it is NOT stored, save the state, push the new value and save back the new state
      const prevState = this.state.displays;
      prevState.push(value);
      this.setState({displays: prevState});
    } else {
      // if it IS stored, save the state, splice the old value and save back the new state
      const prevState = this.state.displays;
      prevState.splice(prevState.indexOf(value), 1);
      this.setState({displays: prevState});
    }
  }

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
      target.checked = true;
    } else {
      // if it IS stored, save the state, splice the old value and save back the new state
      const prevState = this.state.images;
      prevState.splice(prevState.indexOf(value), 1);
      this.setState({images: prevState});
      target.checked = false;
    }
    if (this.state.images.length == 1){
      // set when first image is selected
      this.setState({active_image: this.state.images[0]})
    } else if (this.state.images.length == 0){
      // if there are no images deselect
      this.setState({active_image: ''})
    }
    this.setState({optionsActiveImage: this.props.images.filter((i) => this.state.images.find((c) => c == i._id)).map((i) => <option value={i._id} key={i._id}>{i.name}</option>)});
  } // TODO: filter options and hide unselected options for reviewing / Also limit images could be an option

  /* HANDLE SUBMIT */
  handleSubmit = () => {
    // get image if any
    const { group } = this.props;
    // define form values to send
    const form = {
      name: this.state.name,
      description: this.state.description,
      updated_by: this.state.updated_by._id, // send user_id
      resolution: this.state.resolution,
      tags: this.state.tags,
      userGroup: this.props.userGroup._id
    };
    // possible empty fields
    if (!this.props.group) form.created_by = this.props.user._id;
    this.state.active_image != '' ? form.active_image = this.state.active_image : form.active_image = null;
    this.state.displays.length > 0 ? form.displays = this.state.displays : form.displays = [];
    this.state.images.length > 0 ? form.images = this.state.images : form.images = [];
    // HTTP request
    axios({
      method: group ? 'put' : 'post',
      url: group ? group.url : 'http://localhost:4000/groups',
      data: form,
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    })
    .then((res) => {
      if (res.status == 201){
        this.props.notify('Grupo configurada con éxito', 'notify-success', 'check', toast.POSITION.BOTTOM_LEFT);
        return this.props.update(this.props.user); // update dataset
      }
    })
    .then((res) => {
      this.setState({ redirect : true });
      return res;
    })
    .catch((err) => {
      console.log(err);
      return this.props.notify('Error al configurar el grupo', 'notify-error', 'exclamation-triangle', toast.POSITION.BOTTOM_LEFT);
    });
  }

  render(){

    // Options
    const optionsScreens = this.props.screens.sort((a, b) => a.updated_at - b.updated_at).map((r, i) => <option value={r._id} key={i}>{r.name}</option>);
    const optionsDisplays = this.props.displays.sort((a, b) => a.updated_at - b.updated_at).map((d) =>
      <label key={d._id} className="custom-control custom-checkbox">
        <input onChange={this.handleCheckDisplays} type="checkbox" defaultChecked={this.state.displays.find((c) => c == d._id)} name={d._id} defaultValue={d._id} className="custom-control-input"></input>
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">{d.name}</span>
      </label>
    );
    const optionsImages = this.props.images.sort((a, b) => a.updated_at - b.updated_at).map((i) =>
      <label key={i._id} className="custom-control custom-checkbox">
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
        <div className="card detalles">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
              <li className="nav-item mr-auto">
              { this.props.group ?
                <h2 className="detalles-titulo"><i className="fa fa-pencil mr-3" aria-hidden="true"></i>Editar un grupo</h2> :
                <h2 className="detalles-titulo"><i className="fa fa-plus-circle mr-3" aria-hidden="true"></i>Añadir un nuevo Grupo</h2>
              }
              </li>
              <li className="nav-item ml-2">
              { this.props.group ?
                <button onClick={() => this.handleSubmit()} type="button" className="btn btn-outline-success"><i className="fa fa-save mr-2" aria-hidden="true"></i>Guardar cambios</button> :
                <button onClick={() => this.handleSubmit()} type="button" className="btn btn-outline-success"><i className="fa fa-plus-circle mr-2" aria-hidden="true"></i>Añadir</button>
              }
              </li>
            </ul>
          </div>
          <div className="card-body">
            <form id="form">
              <div className="form-group">
                <label htmlFor="name"><i className="fa fa-picture-o mr-2"></i>Nombre</label>
                <input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Nombre del grupo"></input>
              </div>
              <div className="form-group">
                <label htmlFor="description"><i className="fa fa-info-circle mr-2"></i>Descripcion</label>
                <input type="text" className="form-control" id="description" name="description" value={this.state.description} onChange={this.handleInputChange} placeholder="Descripcion del Grupo"></input>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="active_image"><i className="fa fa-picture-o mr-2"></i>Seleccionar la imagen activa</label>
                  <select className="custom-select" id="active_image" name='active_image' value={this.state.active_image} onChange={this.handleInputChange}>
                    <option value={''} key={0}>Sin imagen activa</option>
                    {this.state.optionsActiveImage}
                  </select>
                </div>
                <div className="form-group col">
                  <label htmlFor="screens"><i className="fa fa-arrows-alt mr-2"></i>Resolución</label>
                  <div>
                    <select className="custom-select" name="resolution" value={this.state.resolution} onChange={this.handleInputChange}>
                      {optionsScreens}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="images"><i className="fa fa-picture-o mr-2"></i>Asociar una o varias imágenes</label>
                  <div className="custom-controls-stacked shadow">
                    {optionsImages}
                  </div>
                </div>
                <div className="form-group col">
                  <label htmlFor="displays"><i className="fa fa-television mr-2"></i>Asociar uno o varios displays</label>
                  <div className="custom-controls-stacked shadow">
                    {optionsDisplays}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="tags"><i className="fa fa-tags mr-2"></i>Etiquetas</label>
                  <input type="text" className="form-control" name="tags" id="tags" value={this.state.tags} onChange={this.handleInputChange}></input>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  {this.state.tags.map((t, i) => t.length > 1 ? <button type="button" className="btn mr-1 btn-outline-group btn-tiny" key={i}>{t}</button> : '')}
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
              <div className="form-group">
                <label htmlFor="creador"><i className="fa fa-user-o mr-2"></i>Creador</label>
                <input type="text" className="form-control" id="creador" name='user' value={this.state.created_by.name} readOnly></input>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
};
