/* IMPORT MODULES */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { User } from '../../../lists/lists-components/user.jsx';

/* COMPONENTS */
export class ManageUsers extends Component {

  constructor(props){
    super(props);
    const { user } = this.props;
    this.state = {
      users: null,
      isLoaded: false,
      error: null,
      edit: false,
      element_id: '',
      // form
      login: '',
      name: '',
      password: '',
      checkPassword: '',
      email: '',
      admin: false
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = name != 'admin' ? target.value : !this.state.admin;
    this.setState({[name]:value});
  }

  componentDidMount(){
    fetch("http://localhost:4000/users")
      .then(res => res.json())
      .then(
        (users) => { // resolve callback
          this.setState({ isLoaded: true, users });
        },
        (error) => { // reject callback
          this.setState({ isLoaded: true, error });
        }
      )
  }

  edit = (element_id) => {
    const user = this.state.users.find(u => u._id == element_id);
    this.setState({
      login: user.login,
      name: user.name,
      email: user.email,
      password: '',
      checkPassword: '',
      admin: user.admin,
      edit: true,
      element_id: element_id
    })
  }

  cancel = () => {
    this.setState({
      login: '',
      name: '',
      email: '',
      password: '',
      checkPassword: '',
      admin: false,
      edit: false,
      element_id: '',
    })
  }

  /* HANDLE SUBMIT */
  handleSubmit = (method) => {
    // FORM DATA
    const form = {
      'name'    : this.state.name,
      'login'   : this.state.login,
      'email'   : this.state.email,
      'admin'   : this.state.admin,
    };
    if(this.state.password != ''){ form.password = this.state.password };
    if(this.state.checkPassword != ''){ form.checkPassword = this.state.checkPassword };
    fetch( this.state.edit ? 'http://localhost:4000/users/' + this.state.element_id : 'http://localhost:4000/users/signup',
      {
      method: method, // post, delete or put method
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(form)
      }
    )
    .then(() => fetch('http://localhost:4000/users/'))
    .then(res => res.json())
    .then(
      (users) => { // resolve callback
        this.setState({
          isLoaded: true,
          users,
          login: '',
          name: '',
          email: '',
          password: '',
          checkPassword: '',
          admin: false,
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
    const { users, error, isLoaded } = this.state;

    if (error) {
      return null // TODO: handle error
    } else if (!isLoaded) {
      return null // TODO: handle loading
    } else {
      const list = users.map(user => {
        if (user._id == this.state.element_id){
          return <User user={user} key={user._id} edit={this.edit} active={true}/>
        } else {
          return <User user={user} key={user._id} edit={this.edit} active={false}/>
        }
      });
      return(
        <div className="row mb-3">
          <div className="col">
            <div className="card detalles bg-transparent border-gray">
              <div className="card-header border-gray">
                <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
                  <li className="nav-item mr-auto">
                    <h2 className="detalles-titulo"><i className='fa fa-users mr-3' aria-hidden="true"></i>Usuarios</h2>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <h3>{ this.state.edit ? 'Editar Usuario' : 'Añadir Usuario'}</h3>
                    <hr></hr>
                    <form>
                      <div className="form-row">
                        <div className="form-group col">
                          <label htmlFor="login"><i className="fa fa-user-o mr-2"></i>Usuario</label>
                          <input type="text" className="form-control" id="login" placeholder="Nombre de usuario" name="login" value={this.state.login} onChange={this.handleInputChange}></input>
                        </div>
                        <div className="form-group col">
                          <label htmlFor="name"><i className="fa fa-id-card-o mr-2"></i>Nombre</label>
                          <input type="text" className="form-control" id="name"  placeholder="Nombre completo" name="name" value={this.state.name} onChange={this.handleInputChange}></input>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col">
                          <label htmlFor="email"><i className="fa fa-envelope-o mr-2"></i>Correo electrónico</label>
                          <input type="email" className="form-control" id="email" placeholder="Correo electrónico" name="email" value={this.state.email} onChange={this.handleInputChange}></input>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col">
                          <label htmlFor="password"><i className="fa fa-key mr-2"></i>{ this.state.edit ? 'Nueva contraseña' : 'Contraseña' }</label>
                          <input type="password" className="form-control" id="usuario" placeholder="Contraseña" name="password" value={this.state.password} onChange={this.handleInputChange}></input>
                        </div>
                        <div className="form-group col">
                          <label htmlFor="checkPassword"><i className="fa fa-key mr-2"></i>Confirmar contraseña</label>
                          <input type="password" className="form-control" id="checkPassword"  placeholder="Confirmar contraseña" name="checkPassword" value={this.state.checkPassword} onChange={this.handleInputChange}></input>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="custom-control custom-checkbox">
                          <input onChange={this.handleInputChange} type="checkbox" checked={this.state.admin} name="admin" value={this.state.admin} className="custom-control-input"></input>
                          <span className="custom-control-indicator"></span>
                          <span className="custom-control-description">Dar permisos de administrador</span>
                        </label>
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
                    <h3 className="d-flex w-100 justify-content-between">Usuarios<span>{this.state.users.length}</span></h3>
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
