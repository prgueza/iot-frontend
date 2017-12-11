/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');

/* COMPONENTS */
export class GroupForm extends Component{

  constructor(props){
    super(props);
    this.state = {
      identificacion: '',
      nombre: '',
      descripccion: '',
      creador: '',
      resolucion: '',
      etiquetas: [],
      fecha_creacion: '',
      fecha_modificacion: '',
      displays: [],
      grupos: [],

      opcionesGrupos: [],
      opcionesDisplays: [],
      opcionesResolucion: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  render(){
    var fecha = ahora.format('dddd, D [de] MMMM [de] YYYY');
    return(
      <div className="col detalles">
        <form>
          <div className="card bg-transparent border-gray">
            <div className="card-header border-gray">
              <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
                <li className="nav-item mr-auto">
                  <h2 className="detalles-titulo"><i className="fa fa-plus-circle mr-3" aria-hidden="true"></i>Añadir una nueva Imagen</h2>
                </li>
                <li className="nav-item ml-2">
                  <button type="submit" className="btn btn-outline-grupo"><i className="fa fa-plus-circle mr-2" aria-hidden="true"></i>Añadir</button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <div className="form-row">
                <div className="form-group col-md-1">
                  <label htmlFor="displayID"><i className="fa fa-hashtag mr-2"></i>ID</label>
                  <input type="text" className="form-control" id="displayID" placeholder="ID" value="1" readOnly></input>
                </div>
                <div className="form-group col-md-11">
                  <label for="nombre"><i className="fa fa-picture-o mr-2"></i>Nombre</label>
                  <input type="text" className="form-control" id="nombre" placeholder="Nombre del display"></input>
                </div>
              </div>
              <div className="form-group">
                <label for="descripcion"><i className="fa fa-info-circle mr-2"></i>Descripcion</label>
                <input type="text" className="form-control" id="descripcion" placeholder="Descripcion del Display"></input>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label for="creador"><i className="fa fa-user-o mr-2"></i>Creador</label>
                  <input type="text" className="form-control" id="creador" value="Pedro Rodriguez Alia" readOnly></input>
                </div>
                <div className="form-group col-md-6">
                  <label for="fecha"><i className="fa fa-calendar-o mr-2"></i>Fecha</label>
                  <input type="text" className="form-control" id="fecha" value={fecha} readOnly></input>
                </div>
              </div>
              <div className="form-row align-items-center">
                <div className="form-group col-2">
                  <label for="resolucion"><i className="fa fa-arrows-alt mr-2"></i>Resolución</label>
                  <div>
                    <Select
                      name="form-field-name"
                      value={this.state.value}
                      onChange={this.handleChange}
                      options={[
                        { value: 'one', label: 'One' },
                        { value: 'two', label: 'Two' },
                      ]}
                    />
                  </div>
                </div>
                <div className="form-group col-4">
                  <label for="resolucion"><i className="fa fa-file-image-o mr-2"></i>Archivo</label>
                  <div>
                    <label className="custom-file">
                      <input type="file" id="file" className="custom-file-input"></input>
                      <span className="custom-file-control"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
};
