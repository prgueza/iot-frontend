/* IMPORT MODULES */
import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { NavButton } from '../buttons/navButton.jsx';

/* COMPONENT */
export class Navigation extends Component{

  /* HANDLE SEARCH */
  handleSearch = (event) => {
    this.props.filterData(event.target.value);
  }

  /* RENDER COMPONENT */
  render(){
    // get
    const { displays, images, groups, user, devices, gateways } = this.props;
    const navigationUser = [
      {exact: true, linkTo: "", text:"Vista general", icon:"eye", count:false, number:''},
      {exact: false, linkTo: "displays", text:"Displays", icon:"television", count:true, number: displays ? displays.length : '...'},
      {exact: false, linkTo: "images", text:"Imagenes", icon:"picture-o", count:true, number: images ? images.length : '...'},
      {exact: false, linkTo: "groups", text:"Grupos", icon:"list", count:true, number: groups ? groups.length : '...'}
    ];

    const navigationAdmin = [
      {exact: true, linkTo: "", text:"Vista general", icon:"eye", count: false, number:''},
      {exact: false, linkTo: "devices", text:"Dispositivos", icon:"tablet", count:true, number: devices ? devices.length : '...'},
      {exact: false, linkTo: "gateways", text:"Puertas de enlace", icon:"sitemap", count:true, number: gateways ? gateways.length : '...'}
    ]

    const nav = user && user.admin ?
      navigationAdmin.map((nav, i) => <NavButton key={i} exact={nav.exact} linkTo={nav.linkTo} text={nav.text} icon={nav.icon} count={nav.count} number={nav.number}/> ) :
      navigationUser.map((nav, i) => <NavButton key={i} exact={nav.exact} linkTo={nav.linkTo} text={nav.text} icon={nav.icon} count={nav.count} number={nav.number}/> );

    return(
      <div className="col-2 navegacion">
        <div className="titulo mb-4 text-center">
          <h1>MENU</h1>
        </div>
        <hr></hr>
        <div className="busqueda mb-3">
          <p className="titulo-navegacion">BÚSQUEDA</p>
          <input onChange={this.handleSearch} type="text" className="form-control buscar" id="busqueda" aria-describedby="campoBusqueda" placeholder="Buscar..."></input>
        </div>
        <div className="navegacion mb-3">
          <p className="titulo-navegacion">NAVEGACIÓN</p>
          <ul className="nav-list">
            {nav}
          </ul>
        </div>
        <div className="navegacion mb-3">
          <p className="titulo-navegacion">AJUSTES</p>
          <ul className="nav-list">
            <NavLink to={'/docs'}>
              <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-book mr-2" aria-hidden="true"></i> Documentación</button></li>
            </NavLink>
          { user && user.admin &&
            <NavLink to={'/settings'}>
              <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-cogs mr-2" aria-hidden="true"></i> Configuración</button></li>
            </NavLink>
          }
              <li><a href="/disconect"><button type="button" className="btn btn-nav btn-block mb-1" ><i className="fa fa-sign-out mr-2" aria-hidden="true"></i> Desconectar</button></a></li>
              <li><button onClick={() => this.props.update(user, true)} type="button" className="btn btn-nav btn-block mb-1" ><i className="fa fa-refresh mr-2" aria-hidden="true"></i> Actualizar</button></li>
          </ul>
        </div>
        <hr></hr>
        <p className="d-flex justify-content-between">
          <span>v0.1.0</span>
          <span>{ user ? user.name : 'Cargando...' }</span>
        </p>
      </div>
    );
  }
};
