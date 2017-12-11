/* IMPORT MODULES */
import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { ContentDisplays } from './views/viewDisplays/contentDisplays.jsx';
import { ContentImages } from './views/viewImages/contentImages.jsx';
import { ContentGroups } from './views/viewGroups/contentGroups.jsx';
import { ContentAccount } from './views/viewAccount/contentAccount.jsx';
import { ContentSettings } from './views/viewSettings/contentSettings.jsx';
import { ContentDocs } from './views/viewDocs/contentDocs.jsx';
import { Overview } from './views/overview.jsx';

/* COMPONENTS */
export const Main = () => {
  return(
    <div className="row main">
      <Navigation/>
      <Content/>
    </div>
  );
};

const Navigation = () => {
  return(
    <div className="col-2 navegacion">
      <div className="titulo mb-4 text-center">
        <h1>MENU</h1>
      </div>
      <hr></hr>
      <div className="busqueda mb-3">
        <p className="titulo-navegacion">BÚSQUEDA</p>
        <input type="text" className="form-control buscar" id="busqueda" aria-describedby="campoBusqueda" placeholder="Buscar..."></input>
      </div>
      <div className="navegacion mb-3">
        <p className="titulo-navegacion">NAVEGACIÓN</p>
        <ul className="nav-list">
          <NavLink exact to={'/'}>
            <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-eye mr-2" aria-hidden="true"></i> Vista general</button></li>
          </NavLink>
          <NavLink to={'/displays'}>
            <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-television mr-2" aria-hidden="true"></i> Displays</button></li>
          </NavLink>
          <NavLink to={'/images'}>
            <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-picture-o mr-2" aria-hidden="true"></i> Imágenes</button></li>
          </NavLink>
          <NavLink to={'/groups'}>
              <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-list mr-2" aria-hidden="true"></i> Grupos</button></li>
          </NavLink>
        </ul>
      </div>
      <div className="navegacion mb-3">
        <p className="titulo-navegacion">AJUSTES</p>
        <ul className="nav-list">
          <NavLink to={'/account'}>
            <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-user-o mr-2" aria-hidden="true"></i> Cuenta</button></li>
          </NavLink>
          <NavLink to={'/settings'}>
            <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-cogs mr-2" aria-hidden="true"></i> Configuración</button></li>
          </NavLink>
          <NavLink to={'/docs'}>
            <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-book mr-2" aria-hidden="true"></i> Documentación</button></li>
          </NavLink>
            <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-sign-out mr-2" aria-hidden="true"></i> Desconectar</button></li>
        </ul>
      </div>
      <hr></hr>
      <p>v0.0.5</p>
    </div>
  );
};

class Content extends Component{

  constructor(props){
    super(props);
    this.state = {
      displays: null,
      images: null,
      groups: null,
      settings: null,
      user: null
    };
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/displays')
      .then(res => res.json())
      .then(displays => {
        this.setState({ displays })
      });
    fetch('http://localhost:3000/api/images')
      .then(res => res.json())
      .then(images => {
        this.setState({ images })
      });
    fetch('http://localhost:3000/api/groups')
      .then(res => res.json())
      .then(groups => {
        this.setState({ groups })
      });
    fetch('http://localhost:3000/api/settings')
      .then(res => res.json())
      .then(settings => {
        this.setState({ settings })
      });
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(user => {
        this.setState({ user })
      });
    }

  render(){
    const { displays, images, groups, user } = this.state;
    if ( displays && images && groups){
       var content = <div className="col">
          <Route exact={true} path="/" render={() => (<Overview {...this.state}/>)}/>
          <Route path="/displays" render={() => (<ContentDisplays {...this.state}/>)}/>
          <Route path="/images" render={() => (<ContentImages {...this.state}/>)}/>
          <Route path="/groups" render={() => (<ContentGroups {...this.state}/>)}/>
          <Route path="/account" render={() => (<ContentAccount {...this.state}/>)}/>
          <Route path="/settings" render={() => (<ContentSettings {...this.state}/>)}/>
          <Route path="/docs" render={() => (<ContentDocs {...this.state}/>)}/>
        </div>;
    } else {
       var content =
        <div className="col text-center d-flex align-items-center justify-content-center">
          <h1><i className="fa fa-circle-o-notch fa-spin fa-fw mr-4"></i>Cargando</h1>
        </div>;
    }
    return( content );
  }
};
