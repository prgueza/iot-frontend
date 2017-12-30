/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');

/* COMPONENTS */
export class DisplayForm extends Component{

  constructor(props){
    super(props);
    this.state = {
      id: '',
      name: '',
      description: '',
      user: '',
      image_id: 'No asignar',
      group_id: 'No asignar',
      dimensions: {
        width: '',
        height: ''
      },
      location: '',
      tags: [],
      created_at: '',
      updated_at: '',

      opciones_grupos: [],
      opciones_imagenes: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const { images, groups, settings, user, display } = this.props;
    const opcionesImagenes = images.data.map((i) => <option value={i._id} key={i.id}>{i.name}</option>);
    const opcionesGrupos = groups.data.map((g) => <option value={g._id} key={g.id}>{g.name}</option>);
    fetch(display.url)
      .then(res => res.json())
      .then(display => {
        const created_at = moment(display.created_at).format("dddd, D [de] MMMM [de] YYYY");
        const updated_at = moment().format("dddd, D [de] MMMM [de] YYYY");
        this.setState({
          id: display.id,
          name: display.name,
          description: display.description,
          user: display.user,
          image_id: 'No asignar',
          group_id: 'No asignar',
          resolution: {
            width: display.resolution.width,
            height: display.resolution.height
          },
          tags: display.tags,
          opciones_imagenes: opcionesImagenes,
          opciones_grupos: opcionesGrupos,
        });
      });
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.name === 'tags' ? target.value.split(',') : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event){
    const form = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      user: this.state.user,
      image_id: this.state.image_id,
      group_id: this.state.group_id,
      resolution: {
        width: this.state.resolution.width,
        height: this.state.resolution.height
      },
      tags: this.state.tags,
    };

    event.preventDefault();
    fetch(this.props.display.url, {
      method: 'put',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(form)
    })
    .catch((err) => console.log(err));
  }

  render(){
    return(
      <div className="col detalles">
        <form onSubmit={this.handleSubmit}>
          <div className="card bg-transparent border-gray">
            <div className="card-header border-gray">
              <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
                <li className="nav-item mr-auto">
                  <h2 className="detalles-titulo"><i className="fa fa-pencil mr-3" aria-hidden="true"></i>Editar display</h2>
                </li>
                <li className="nav-item ml-2">
                  <button type="submit" className="btn btn-outline-display"><i className="fa fa-save mr-2" aria-hidden="true"></i>Guardar cambios</button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <div className="form-row">
                <div className="form-group col-1">
                  <label htmlFor="displayID"><i className="fa fa-hashtag mr-2"></i>ID</label>
                  <input type="text" className="form-control" id="displayID" placeholder="ID" name='id' value={this.state.id} readOnly></input>
                </div>
                <div className="form-group col-11">
                  <label htmlFor="nombre"><i className="fa fa-television mr-2"></i>Nombre</label>
                  <input type="text" className="form-control" id="nombre" placeholder="Nombre del display" name='name' value={this.state.name} onChange={this.handleInputChange}></input>
                </div>
              </div>
                <div className="form-group">
                  <label htmlFor="descripcion"><i className="fa fa-info-circle mr-2"></i>Descripcion</label>
                  <input type="text" className="form-control" id="descripcion" placeholder="Descripcion del Display" name='description' value={this.state.description} onChange={this.handleInputChange}></input>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="creador"><i className="fa fa-user-o mr-2"></i>Creador</label>
                    <input type="text" className="form-control" id="creador" name='user' value={this.state.user} readOnly></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="image"><i className="fa fa-picture-o mr-2"></i>Asignar nueva imagen</label>
                    <div>
                      <select className="custom-select" name='image_id' value={this.state.image_id} onChange={this.handleInputChange}>
                        {this.state.opciones_imagenes}
                      </select>
                    </div>
                  </div>
                  <div className="form-group col">
                    <label htmlFor="group"><i className="fa fa-list mr-2"></i>Incluir en un grupo</label>
                    <div>
                      <select className="custom-select" name='group_id' value={this.state.group_id} onChange={this.handleInputChange}>
                        {this.state.opciones_grupos}
                      </select>
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
            </div>
          </div>
        </form>
      </div>
    );
  }
};
