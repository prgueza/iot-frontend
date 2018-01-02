/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { Redirect } from 'react-router-dom';

/* COMPONENTS */
export class ImageForm extends Component{

  /* STATE */
  constructor(props){
    super(props);
    const { image } = this.props;
    this.state = {
      id: image ? image.id : '',
      name: image ? image.name : '',
      description: image ? image.description : '',
      user: this.props.user,
      resolution: image ? image.resolution._id : '',
      tags: image ? image.tags : [],
      created_at: image ? moment(image.created_at) : moment(),
      updated_at: moment(),
      displays: image ? image.displays.map((d) => d._id) : [],
      groups: image ? image.groups.map((g) => g._id) : [],

      redirect: false,
      location: '/images'
    };
  }

  /* INITIAL VALUES FOR FORM INPUTS */
  componentDidMount(){
    const { images, image } = this.props;
    // if in post mode get first free id value
    if (!image) {
      const identificaciones = images.data.map((i) => i.id); // get all ids
      var id = 1; // start from 1
      while (identificaciones.indexOf(id) != -1){id++} // stop at first free id value
    }
    // set state with initial values
    this.setState({
      id: image ? image.id : id,
      location: image ? '/images/' + image.id : '/images/' + id // Redirect url
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
  handleSubmit = (event) => {
    // define form values to send
    const form = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      user: this.props.user._id, // send user_id
      resolution: this.state.resolution,
      tags: this.state.tags,
    };
    // include group/display assignation if needed
    if(this.state.display){form.display = this.state.display}
    if(this.state.group){form.group = this.state.group}
    // TODO: include image file
    // prevent form default event
    event.preventDefault();
    // if in edit mode use put and image url
    if (image){
      fetch(image.url, {
        method: 'put', // put method
        headers: {
            'Accept': 'form-data',
            'Content-Type': 'form-data'
          },
        body: JSON.stringify(form)
      })
      .then(() => this.setState({ redirect: true }))
      .catch((err) => console.log(err)); // TODO: error handling
    // if in post mode use post url for images
    } else {
      fetch('http://localhost:4000/images', {
        method: 'post', // post method
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(form)
      })
      .then(() => this.setState({ redirect: true }))
      .catch((err) => console.log(err)); // TODO: error handling
    }
  }

  /* RENDER COMPONENT */
  render(){

    // Options
    const optionsResolution = this.props.resolutions.map((r, i) => <option value={r._id} key={i}>{r.name}</option>);
    const optionsGroups = this.props.groups.data.map((g) => {
      return(<label key={g.id} className="custom-control custom-checkbox">
        <input onChange={this.handleCheckGroups} type="checkbox" checked={this.state.groups.find((c) => c == g._id)} name={g._id} value={g._id} className="custom-control-input"></input>
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">{g.name}</span>
      </label>);
    });
    const optionsDisplays = this.props.displays.data.map((d) => {
      return(<label key={d.id} className="custom-control custom-checkbox">
        <input onChange={this.handleCheckDisplays} type="checkbox" checked={this.state.displays.find((c) => c == d._id)} name={d._id} value={d._id} className="custom-control-input"></input>
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">{d.name}</span>
      </label>);
    });

    if(this.state.redirect){
      return( <Redirect to={this.state.location} /> );
    } else {
      return(
        <div className="col detalles">
          <form id='form'>
            <div className="card bg-transparent border-gray">
              <div className="card-header border-gray">
                <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
                  <li className="nav-item mr-auto">
                    <h2 className="detalles-titulo"><i className="fa fa-plus-circle mr-3" aria-hidden="true"></i>Añadir una nueva imagen</h2>
                  </li>
                  <li className="nav-item ml-2">
                    <button onClick={this.handleSubmit} type="button" className="btn btn-outline-imagen"><i className="fa fa-plus-circle mr-2" aria-hidden="true"></i>Añadir</button>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="form-row">
                  <div className="form-group col-md-2">
                    <label htmlFor="imagenID"><i className="fa fa-hashtag mr-2"></i>ID</label>
                    <input type="text" className="form-control" id="imagenID" placeholder="ID" name='id' value={this.state.id} readOnly></input>
                  </div>
                  <div className="form-group col-md-10">
                    <label htmlFor="nombre"><i className="fa fa-television mr-2"></i>Nombre</label>
                    <input type="text" className="form-control" id="nombre" placeholder="Nombre de la imagen" name='name' value={this.state.name} onChange={this.handleInputChange}></input>
                  </div>
                </div>
                  <div className="form-group">
                    <label htmlFor="descripcion"><i className="fa fa-info-circle mr-2"></i>Descripcion</label>
                    <input type="text" className="form-control" id="descripcion" placeholder="Descripcion de la imagen" name='description' value={this.state.description} onChange={this.handleInputChange}></input>
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <label htmlFor="creador"><i className="fa fa-user-o mr-2"></i>Creador</label>
                      <input type="text" className="form-control" id="creador" name='user' value={this.state.user.name} readOnly></input>
                    </div>
                    <div className="form-group col">
                      <label htmlFor="resolucion"><i className="fa fa-file-image-o mr-2"></i>Archivo</label>
                      <div>
                        <label className="custom-file">
                          <input type="file" id="archivo" className="custom-file-input"></input>
                          <span className="custom-file-control"></span>
                        </label>
                      </div>
                    </div>
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
                      <label htmlFor="displays"><i className="fa fa-television mr-2"></i>Asociar uno o varios displays</label>
                      <div className="custom-controls-stacked shadow">
                        {optionsDisplays}
                      </div>
                    </div>
                    <div className="form-group col">
                      <label htmlFor="groups"><i className="fa fa-list mr-2"></i>Asociar uno o varios grupos</label>
                      <div className="custom-controls-stacked shadow">
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
                      {this.state.tags.map((t, i) => t.length > 1 ? <button type="button" className="btn mr-1 btn-outline-imagen btn-tiny" key={i}>{t}</button> : '')}
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
              </div>
            </div>
          </form>
          <div>
            <p>{this.state.displays}</p>
            <p>{this.state.groups}</p>
          </div>
        </div>
      );
    }
  }
};
