/* IMPORT MODULES */
import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import cookie from 'react-cookie';

/* IMPORT COMPONENTS */
import { ContentDisplays } from './views/viewDisplays/contentDisplays.jsx';
import { ContentImages } from './views/viewImages/contentImages.jsx';
import { ContentGroups } from './views/viewGroups/contentGroups.jsx';
import { ContentAccount } from './views/viewAccount/contentAccount.jsx';
import { ContentSettings } from './views/viewSettings/contentSettings.jsx';
import { ContentDocs } from './views/viewDocs/contentDocs.jsx';
import { Overview } from './views/overview.jsx';
import { Icon } from './icons/icon.jsx';
import { NavButton } from './buttons/navButton.jsx';

/* COMPONENTS */
export class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      displays: null,
      images: null,
      groups: null,
      settings: null,
      user: null,
      userID: cookie.load('userID')
    };
    this.update = this.update.bind(this);
  }

  // fetch all data from API
  update(){
    Promise.all([
      fetch('http://localhost:4000/displays').then(res => res.json()),
      fetch('http://localhost:4000/images').then(res => res.json()),
      fetch('http://localhost:4000/groups').then(res => res.json()),
    ])
    .then((docs) => {
      this.setState({displays: docs[0]});
      this.setState({images: docs[1]});
      this.setState({groups: docs[2]});
    })
    .catch((err) => console.log(err)); // TODO: error handling
  }

  componentDidMount(){
    this.update();
    fetch('http://localhost:4000/users/' + this.state.userID).then(res => res.json()).then((user) =>  this.setState({ user }));
  }

  render(){
    return(
      <div className="row main">
        <Navigation update={this.update} { ...this.state }/>
        <Content update={this.update} { ...this.state }/>
      </div>
    );
  }
};

class Navigation extends Component{
  render(){

    const { displays, images, groups, user } = this.props;

    const navigationUser = [
      {exact: true, linkTo: "", text:"Vista general", icon:"eye", count:false, number:''},
      {exact: false, linkTo: "displays", text:"Displays", icon:"television", count:true, number:displays ? displays.count : '...'},
      {exact: false, linkTo: "images", text:"Imagenes", icon:"picture-o", count:true, number:images ? images.count : '...'},
      {exact: false, linkTo: "groups", text:"Grupos", icon:"list", count:true, number:groups ? groups.count : '...'}
    ];

    const navigationAdmin = [
      {exact: true, linkTo: "", text:"Vista general", icon:"eye", count:false, number:''},
      {exact: false, linkTo: "displays", text:"Displays", icon:"television", count:true, number:displays ? displays.count : '...'}
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
          <input type="text" className="form-control buscar" id="busqueda" aria-describedby="campoBusqueda" placeholder="Buscar..."></input>
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
            <NavLink to={'/account'}>
              <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-user-o mr-2" aria-hidden="true"></i> Cuenta</button></li>
            </NavLink>
            <NavLink to={'/docs'}>
              <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-book mr-2" aria-hidden="true"></i> Documentación</button></li>
            </NavLink>
          {user && user.admin &&
            <NavLink to={'/settings'}>
              <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-cogs mr-2" aria-hidden="true"></i> Configuración</button></li>
            </NavLink>
          }
              <li><a href="/disconect"><button type="button" className="btn btn-nav btn-block mb-1" ><i className="fa fa-sign-out mr-2" aria-hidden="true"></i> Desconectar</button></a></li>
              <li><button onClick={this.props.update} type="button" className="btn btn-nav btn-block mb-1" ><i className="fa fa-refresh mr-2" aria-hidden="true"></i> Actualizar</button></li>
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
