/* IMPORT MODULES */
import React, { Component } from 'react'
const moment = require('moment'); moment.locale('es')
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

/* COMPONENTS */
export class DisplayForm extends Component{

  constructor(props){
    super(props)
    const { display, user } = this.props
    this.state = {
      name: display ? display.name : '',
      description: display ? display.description : '',
      created_by: display ? ( display.created_by || { name:'Usuario eliminado' }) : user,
      updated_by: user,
      tags: display ? display.tags : [],
      category: display ? display.category : '',
      created_at: display ? moment(display.created_at) : moment(),
      updated_at: moment(),
      active_image: display ? display.active_image ? display.active_image._id : '' : '',
      images: display ? display.images.map((i) => i._id) : [],
      groups: display ? display.groups.map((g) => g._id) : [],
      device: '',
      deviceDescription: '',
      // form options stored in state
      optionsActiveImage: [],
      // redirect variables
      redirect: false,
      location: '/displays',
      // error handling
      error: null
    };
  }

  /* INITIAL VALUES FOR FORM INPUTS */
  componentDidMount(){
    const { data: { displays, devices, images }, display } = this.props
    // get options for active image
    const optionsActiveImage = images.filter((i) => this.state.images.find((c) => c == i._id)).map((i) => <option value={i._id} key={i._id}>{i.name}</option>)
    // get a list of unused devices
    const unusedDevices = devices.filter((d) => !d.display)
    // set state with initial values
    if (unusedDevices.length > 0 || display){
      this.setState({
      location: display ? '/displays/' + display._id : '/displays', // Redirect url
      device: display ? (display.device ? display.device._id : unusedDevices[0]._id ) : unusedDevices[0]._id,
      deviceDescription: display ? display.device.description : unusedDevices[0].description,
      optionsActiveImage: optionsActiveImage
      });
    } else {
      this.setState({
        device: null
      })
    }
  }

  /* HANDLE INPUT CHANGE (CONTROLLED FORM) */
  handleInputChange = (event) => {
    const target = event.target
    const name = target.name
    if (name === 'tags'){
      var value = target.value.split(',') // TODO: better string to array conversion
    } else {
      var value = target.value
    }

    if (name === 'device') {
      var unusedDevices = this.props.data.devices.filter((d) => !d.display)
      this.setState({ deviceDescription: unusedDevices.find((d) => d._id == value).description })
    }

    this.setState({
      [name]: value
    });
  }

  /* HANDLE MULTIPLE CHECKBOX */
  handleCheckImages = (event) => {
    // get value from the checkbox
    const target = event.target
    const value = target.value
    // check if the checkbox has been selected
    if (!this.state.images.find((c) => c == value)){ // check if value is stored in state
      // if it is NOT stored, save the state, push the new value and save back the new state
      const prevState = this.state.images
      prevState.push(value)
      this.setState({images: prevState})
    } else {
      // if it IS stored, save the state, splice the old value and save back the new state
      const prevState = this.state.images
      prevState.splice(prevState.indexOf(value), 1)
      this.setState({images: prevState})
    }
    if (this.state.images.length == 1){
      // set when first image is selected
      this.setState({active_image: this.state.images[0]})
    } else if (this.state.images.length == 0){
      // if there are no images deselect
      this.setState({active_image: ''})
    }
    this.setState({optionsActiveImage: this.props.data.images.filter((i) => this.state.images.find((c) => c == i._id)).map((i) => <option value={i._id} key={i.id}>{i.name}</option>)})
  }

  handleCheckGroups = (event) => {
    // get value from the checkbox
    const target = event.target
    const value = target.value
    // check if the checkbox has been selected
    if (!this.state.groups.find((c) => c == value)){ // check if value is stored in state
      // if it is NOT stored, save the state, push the new value and save back the new state
      const prevState = this.state.groups
      prevState.push(value);
      this.setState({groups: prevState})
      target.checked = true;
    } else {
      // if it IS stored, save the state, splice the old value and save back the new state
      const prevState = this.state.groups
      prevState.splice(prevState.indexOf(value), 1)
      this.setState({groups: prevState})
      target.checked = false
    }
  } // TODO: filter options and hide unselected options for reviewing / Also limit images could be an option

  /* HANDLE SUMBIT (PUT OR POST) */
  handleSubmit = () => {
    // get display if any
    const { display } = this.props
    // define form values to send
    const form = {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      updated_by: this.props.user._id, // send user_id
      tags: this.state.tags,
      device: this.state.device,
    };
    // possible empty fields
    if (!this.props.display) form.created_by = this.props.user._id
    this.state.active_image != '' ? form.active_image = this.state.active_image : form.active_image = null
    this.state.images.length > 0 ? form.images = this.state.images : form.images = []
    this.state.groups.length > 0 ? form.groups = this.state.groups : form.groups = []
    // HTTP request
    axios({
      method: display ? 'put' : 'post',
      url: display ? display.url : 'http://localhost:4000/displays',
      data: form,
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.props.token }
    })
    .then((res) => {
      if (res.status == 201){
        this.props.notify('Display configurado con éxito', 'notify-success', 'upload', toast.POSITION.BOTTOM_LEFT)
        var action = display ? 'edit' : 'add'
        return this.props.update('displays', res.resourceId, action, res.data.resource, res.data.devices) // update dataset
      }
    })
    .then((res) => {
      this.setState({ redirect : true })
      return res
    })
    .catch((err) => {
      console.log(err)
      return this.props.notify('Error al configurar el display', 'notify-error', 'exclamation-triangle', toast.POSITION.BOTTOM_LEFT)
    });
  }

  /* RENDER COMPONENT */
  render(){

    const { data: { devices, images, groups, displays }, display } = this.props;

    // Options
    const optionsDevices = devices.filter((d) => !d.display || d.display._id == (display && display._id)).map((d, i) => <option value={d._id} key={i}>{d.name}</option>)
    const optionsGroups = groups.map((g) =>
      <label key={g._id} className="custom-control custom-checkbox">
        <input onChange={this.handleCheckGroups} type="checkbox" defaultChecked={this.state.groups.find((c) => c == g._id)} name={g._id} defaultValue={g._id} className="custom-control-input"></input>
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">{g.name}</span>
      </label>
    )
    const optionsImages = images.sort((a, b) => a.updated_at - b.updated_at).map((i) =>
      <label key={i._id} className="custom-control custom-checkbox">
        <input onChange={this.handleCheckImages} type="checkbox" defaultChecked={this.state.images.find((c) => c == i._id)} name={i._id} defaultValue={i._id} className="custom-control-input"></input>
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">{i.name}</span>
      </label>
    )

    // Render return
    if (this.state.redirect) {
      return( <Redirect to={this.state.location} /> )
    } else if(this.state.device == null) {
      return(
        <div className="card detalles">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
              <li className="nav-item mr-auto">
                <h2 className="detalles-titulo text-center"><i className='fa-picture-o' aria-hidden="true"></i>Configurar dispositivo</h2>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div className="text-center">
              <h1>No hay dispositivos sin configurar</h1>
              <hr className="card-division"></hr>
              <small>Pida al administrador del sistema que de de alta un nuevo dispositivo para configurarlo.</small>
            </div>
          </div>
        </div>)
    } else {
      return(
        <div className="card detalles">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
              <li className="nav-item mr-auto">
                { display ?
                  <h2 className="detalles-titulo"><i className="fa fa-pencil mr-3" aria-hidden="true"></i>Editar un display</h2> :
                  <h2 className="detalles-titulo"><i className="fa fa-plus-circle mr-3" aria-hidden="true"></i>Configurar un nuevo display</h2>
                }
              </li>
              <li className="nav-item ml-2">
                { display ?
                  <button onClick={this.handleSubmit} type="button" className="btn btn-outline-success"><i className="fa fa-save mr-3" aria-hidden="true"></i>Guardar cambios</button> :
                  <button onClick={this.handleSubmit} type="button" className="btn btn-outline-success"><i className="fa fa-plus-circle mr-3" aria-hidden="true"></i>Guardar configuración</button>
                }
              </li>
            </ul>
          </div>
          <div className="card-body">
            <form id='form'>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="device"><i className="fa fa-tablet mr-2"></i>Dispositivo físico asociado</label>
                  <div>
                    <select className="custom-select" name='device' onChange={this.handleInputChange}>
                      {optionsDevices}
                    </select>
                  </div>
                </div>
                <div className="form-group col">
                  <label htmlFor="bt"><i className="fa fa-info-circle mr-2"></i>Descripción</label>
                  <input type="text" className="form-control text-truncate" id="bt" name="bt" value={this.state.deviceDescription} readOnly></input>
                </div>
              </div>
              <hr className="card-division"></hr>
              <div className="form-group">
                <label htmlFor="nombre"><i className="fa fa-television mr-2"></i>Nombre</label>
                <input type="text" className="form-control" id="nombre" placeholder="Nombre del display" name='name' value={this.state.name} onChange={this.handleInputChange}></input>
              </div>
              <div className="form-group">
                <label htmlFor="descripcion"><i className="fa fa-info-circle mr-2"></i>Descripcion</label>
                <input type="text" className="form-control" id="descripcion" placeholder="Descripcion del display" name='description' value={this.state.description} onChange={this.handleInputChange}></input>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="category"><i className="fa fa-arrows-alt mr-2"></i>Categoría</label>
                  <input type="text" className="form-control" id="category" placeholder="Categoría" name='category' value={this.state.category} onChange={this.handleInputChange}></input>
                </div>
                <div className="form-group col">
                  <label htmlFor="active_image"><i className="fa fa-picture-o mr-2"></i>Seleccionar la imagen activa</label>
                  <select className="custom-select" id="active_image" name='active_image' value={this.state.active_image} onChange={this.handleInputChange}>
                    <option value={''} key={0}>Sin imagen activa</option>
                    {this.state.optionsActiveImage}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="displays"><i className="fa fa-television mr-2"></i>Asociar una o varias imagenes</label>
                  <div className="custom-controls-stacked">
                    {optionsImages}
                  </div>
                </div>
                <div className="form-group col">
                  <label htmlFor="groups"><i className="fa fa-list mr-2"></i>Asociar a uno o varios grupos</label>
                  <div className="custom-controls-stacked">
                    {optionsGroups}
                  </div>
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
                  {this.state.tags.map((t, i) => t.length > 1 ? <button type="button" className="btn mr-1 btn-outline-display btn-tiny" key={i}>{t}</button> : '')}
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
      )
    }
  }
}
