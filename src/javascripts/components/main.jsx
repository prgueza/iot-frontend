/* IMPORT MODULES */
import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import AlertContainer from 'react-alert';

/* IMPORT COMPONENTS */
import { ContentDisplays } from './views/viewDisplays/contentDisplays.jsx';
import { ContentImages } from './views/viewImages/contentImages.jsx';
import { ContentGroups } from './views/viewGroups/contentGroups.jsx';
import { ContentAccount } from './views/viewAccount/contentAccount.jsx';
import { ContentSettings } from './views/viewSettings/contentSettings.jsx';
import { ContentDocs } from './views/viewDocs/contentDocs.jsx';
import { Overview } from './views/overview.jsx';


/* COMPONENTS */
export class Main extends Component {

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
    fetch('http://localhost:4000/displays')
      .then(res => res.json())
      .then(displays => {
        this.setState({ displays })
      });
    fetch('http://localhost:4000/images')
      .then(res => res.json())
      .then(images => {
        this.setState({ images })
      });
    fetch('http://localhost:4000/groups')
      .then(res => res.json())
      .then(groups => {
        this.setState({ groups })
      });
    fetch('http://localhost:4000/settings')
      .then(res => res.json())
      .then(settings => {
        this.setState({ settings })
      });
    }

  render(){
    return(
      <div className="row main">
        <Navigation { ...this.state }/>
        <Content { ...this.state }/>
      </div>
    );
  }
};

class Navigation extends Component{
  render(){

    const { displays, images, groups, user } = this.props;

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
              <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-television mr-2" aria-hidden="true"></i> Displays <span className="pull-right">{displays ? displays.count : '...'}</span></button></li>
            </NavLink>
            <NavLink to={'/images'}>
              <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-picture-o mr-2" aria-hidden="true"></i> Imágenes <span className="pull-right">{images ? images.count : '...'}</span></button></li>
            </NavLink>
            <NavLink to={'/groups'}>
                <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-list mr-2" aria-hidden="true"></i> Grupos <span className="pull-right">{groups ? groups.count : '...'}</span></button></li>
            </NavLink>
          </ul>
        </div>
        <div className="navegacion mb-3">
          <p className="titulo-navegacion">AJUSTES</p>
          <ul className="nav-list">
            <NavLink to={'/account'}>
              <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-user-o mr-2" aria-hidden="true"></i> Cuenta</button></li>
            </NavLink>
            <NavLink to={'/docs'}>
              <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-book mr-2" aria-hidden="true"></i> Documentación</button></li>
            </NavLink>
              <li><a href="/disconect"><button type="button" className="btn btn-nav btn-block mb-1" ><i className="fa fa-sign-out mr-2" aria-hidden="true"></i> Desconectar</button></a></li>
          </ul>
        </div>
        <hr></hr>
        <p className="d-flex justify-content-between">
          <span>v0.0.5</span>
          <span>{ user ? user.name : 'Cargando...'}</span>
        </p>
      </div>
    );
  }
};

class Content extends Component{

  render(){
    const { displays, images, groups, user } = this.props;
    if ( displays && images && groups){
       var content =
        <div className="col">
          <Route exact={true} path="/" render={() => (<Overview { ...this.props }/>)}/>
          <Route path="/displays" render={() => (<ContentDisplays { ...this.props }/>)}/>
          <Route path="/images" render={() => (<ContentImages { ...this.props }/>)}/>
          <Route path="/groups" render={() => (<ContentGroups { ...this.props }/>)}/>
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
