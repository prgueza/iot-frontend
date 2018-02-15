/* IMPORT MODULES */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { UserGroup } from '../../../lists/lists-components/userGroup.jsx';

/* COMPONENTS */
export class ManageUserGroups extends Component {

  constructor(props){
    super(props);
    this.state = {
      userGroups: null,
      isLoaded: false,
      error: null,
      edit: false,
      element_id: '',
      // form
      name: '',
      description: '',
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({[name]:value});
  }

  componentDidMount(){
    fetch("http://localhost:4000/userGroups")
      .then(res => res.json())
      .then(
        (userGroups) => { // resolve callback
          this.setState({ isLoaded: true, userGroups });
        },
        (error) => { // reject callback
          this.setState({ isLoaded: true, error });
        }
      )
  }

  edit = (element_id) => {
    const userGroup = this.state.userGroups.find(u => u._id == element_id);
    this.setState({
      name: userGroup.name,
      description: userGroup.description,
      edit: true,
      element_id: element_id
    })
  }

  cancel = () => {
    this.setState({
      name: '',
      description: '',
      edit: false,
      element_id: '',
    })
  }

  /* HANDLE SUBMIT */
  handleSubmit = (method) => {
    // FORM DATA
    const form = {
      'name': this.state.name,
      'description': this.state.description,
    };
    fetch( this.state.edit ? 'http://localhost:4000/userGroups/' + this.state.element_id : 'http://localhost:4000/userGroups',
      {
      method: method, // post, delete or put method
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(form)
      }
    )
    .then(() => fetch('http://localhost:4000/userGroups/'))
    .then(res => res.json())
    .then(
      (userGroups) => { // resolve callback
        this.setState({
          userGroups: userGroups,
          isLoaded: true,
          name: '',
          description: '',
          edit: false,
          element_id: '',
        });
      },
      (error) => { // reject callback
        this.setState({ isLoaded: true, error });
      }
    )
  }

  render(){
    const { userGroups, error, isLoaded } = this.state;

    if (error) {
      return null // TODO: handle error
    } else if (!isLoaded) {
      return null // TODO: handle loading
    } else {
      const list = userGroups.map(userGroup => {
        if (userGroup._id == this.state.element_id){
          return <UserGroup userGroup={userGroup} key={userGroup._id} edit={this.edit} active={true}/>
        } else {
          return <UserGroup userGroup={userGroup} key={userGroup._id} edit={this.edit} active={false}/>
        }
      });
      list.push(
        <div key="0" className="list-group-item-action elemento-display list-group-item flex-column align-items-start">
          <div className="text-center elemento elemento-display">
            <h4 className="mb-1">No se han encontrado {userGroups.length > 0 && 'más'} grupos de gestión</h4>
            <hr></hr>
            <small>Número de grupos de gestión: {userGroups.length}</small>
          </div>
        </div>
      );
      return(
        <div className="row mb-3">
          <div className="col">
            <div className="card detalles bg-transparent border-gray">
              <div className="card-header border-gray">
                <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
                  <li className="nav-item mr-auto">
                    <h2 className="detalles-titulo"><i className='fa fa-users mr-3' aria-hidden="true"></i>Grupos de gestión</h2>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <h3>{ this.state.edit ? 'Editar Grupo de gestión' : 'Añadir Grupo de gestión'}</h3>
                    <hr></hr>
                    <form>
                      <div className="form-row">
                        <div className="form-group col">
                          <label htmlFor="name"><i className="fa fa-users mr-2"></i>Nombre</label>
                          <input type="text" className="form-control" id="name"  placeholder="Nombre del grupo de gestión" name="name" value={this.state.name} onChange={this.handleInputChange}></input>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col">
                          <label htmlFor="description"><i className="fa fa-info-circle mr-2"></i>Descripción</label>
                          <input type="description" className="form-control" id="description" placeholder="Descripción del grupo de gestión" name="description" value={this.state.description} onChange={this.handleInputChange}></input>
                        </div>
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
                    <h3 className="d-flex w-100 justify-content-between">Grupos de gestión<span>{this.state.userGroups.length}</span></h3>
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
