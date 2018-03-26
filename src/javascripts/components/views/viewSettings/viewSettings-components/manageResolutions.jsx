/* IMPORT MODULES */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { Resolution } from '../../../lists/lists-components/resolution.jsx';

/* COMPONENTS */
export class ManageResolutions extends Component {

  constructor(props){
    super(props);
    this.state = {
      users: null,
      isLoaded: false,
      error: null,
      edit: false,
      element_id: '',
      // form
      name: '',
      height: 0,
      width: 0,
      description: '',
    };
  }

  edit = (element_id) => {
    const resolution = this.state.resolutions.find(r => r._id == element_id);
    this.setState({
      name: resolution.name,
      width: resolution.size.width,
      height: resolution.size.height,
      description: resolution.description,
      element_id: element_id,
      edit: true
    })
  }

  cancel = () => {
    this.setState({
      name: '',
      width: '',
      height: '',
      description: '',
      element_id: '',
      edit: false
    })
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]:value});
  }

  componentDidMount(){
    fetch("http://localhost:4000/resolutions")
      .then(res => res.json())
      .then(
        (resolutions) => { // resolve callback
          this.setState({ isLoaded: true, resolutions });
        },
        (error) => { // reject callback
          this.setState({ isLoaded: true, error });
        }
      )
  }

  /* HANDLE SUBMIT */
  handleSubmit = (method) => {
    // FORM DATA
    const form = {
      'name': this.state.name,
      'size': {
        'height': this.state.height,
        'width': this.state.width
      },
    };
    if(this.state.description != ''){form.description = this.state.description}
    fetch( this.state.edit ? 'http://localhost:4000/resolutions/' + this.state.element_id : 'http://localhost:4000/resolutions',
      {
      method: method, // post, delete or put method
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(form)
      }
    )
    .then(() => fetch('http://localhost:4000/resolutions'))
    .then(res => res.json())
    .then(
      (resolutions) => { // resolve callback
        this.setState({
          isLoaded: true,
          resolutions,
          name: '',
          width: '',
          height: '',
          description: '',
          element_id: '',
          edit: false
        });
      },
      (error) => { // reject callback
        this.setState({ isLoaded: true, error });
      }
    )
  }

  render(){
    const { resolutions, error, isLoaded } = this.state;

    if (error) {
      return null // TODO: handle error
    } else if (!isLoaded) {
      return null // TODO: handle loading
    } else {
      const list = resolutions.map(resolution => {
        if (resolution._id == this.state.element_id){
          return <Resolution resolution={resolution} key={resolution._id} edit={this.edit} active={true}/>
        } else {
          return <Resolution resolution={resolution} key={resolution._id} edit={this.edit} active={false}/>
        }
      });
      list.push(
        <div key="0" className="list-group-item-action elemento-display list-group-item flex-column align-items-start">
          <div className="text-center elemento elemento-display">
            <h4 className="mb-1">No se han encontrado {resolutions.length > 0 && 'más'} resoluciones</h4>
            <hr></hr>
            <small>Número de resoluciones: {resolutions.length}</small>
          </div>
        </div>
      );
      return(
        <div className="row mb-3 pb-3">
          <div className="col">
            <div className="card detalles bg-transparent border-gray">
              <div className="card-header border-gray">
                <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
                  <li className="nav-item mr-auto">
                    <h2 className="detalles-titulo"><i className='fa fa-arrows-alt mr-3' aria-hidden="true"></i>Resoluciones</h2>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <h3>{ this.state.edit ? 'Editar Resolución' : 'Añadir Resolución'}</h3>
                    <hr></hr>
                    <form>
                      <div className="form-row">
                        <div className="form-group col-6">
                          <label htmlFor="name"><i className="fa fa-arrows-alt mr-2"></i>Nombre</label>
                          <input type="text" className="form-control" id="name" placeholder="Nombre de la resolución" name="name" value={this.state.name} onChange={this.handleInputChange}></input>
                        </div>
                        <div className="form-group col-3">
                          <label htmlFor="heigth"><i className="fa fa-arrows-v mr-2"></i>Alto</label>
                          <input type="text" className="form-control" id="heigth" placeholder="Alto" name="height" value={this.state.height} onChange={this.handleInputChange}></input>
                        </div>
                        <div className="form-group col-3">
                          <label htmlFor="width"><i className="fa fa-arrows-h mr-2"></i>Ancho</label>
                          <input type="text" className="form-control" id="width" placeholder="Ancho" name="width" value={this.state.width} onChange={this.handleInputChange}></input>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="description"><i className="fa fa-info-circle mr-2"></i>Descripción</label>
                        <input type="text" className="form-control" id="description" placeholder="Descripción de la resolución" name="description" value={this.state.description} onChange={this.handleInputChange}></input>
                      </div>
                      { !this.state.edit ?
                        <button onClick={() => this.handleSubmit('post')} type="button" className="btn btn-block btn-small btn-outline-success"><i className="fa fa-plus-circle mr-1" aria-hidden="true"></i>Añadir</button> :
                        <div className="d-flex w-100 justify-content-between">
                          <button onClick={() => this.handleSubmit('put')} type="button" className="btn btn-block btn-small btn-outline-success mr-2"><i className="fa fa-floppy-o mr-1" aria-hidden="true"></i>Actualizar</button>
                          <button onClick={() => this.handleSubmit('delete')} type="button" className="btn btn-block btn-small btn-outline-danger ml-1 mr-1"><i className="fa fa-trash-o mr-1" aria-hidden="true"></i>Eliminar</button>
                          <button onClick={() => this.cancel()} type="button" className="btn btn-block btn-small btn-outline-warning ml-2"><i className="fa fa-times mr-1" aria-hidden="true"></i>Cancelar</button>
                        </div>
                      }
                    </form>
                  </div>
                  <div className="col-6">
                    <h3 className="d-flex w-100 justify-content-between">Resoluciones<span>{this.state.resolutions.length}</span></h3>
                    <hr></hr>
                    <div className="lista">
                      <div className="list-group mb-3">
                        {list}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};
