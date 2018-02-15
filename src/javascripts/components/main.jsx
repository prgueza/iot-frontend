/* IMPORT MODULES */
import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import cookie from 'react-cookie';
import { ToastContainer, toast, style } from 'react-toastify';
import { css } from 'glamor';

/* IMPORT COMPONENTS */
import { ContentDisplays } from './views/viewDisplays/contentDisplays.jsx';
import { ContentImages } from './views/viewImages/contentImages.jsx';
import { ContentGroups } from './views/viewGroups/contentGroups.jsx';
import { ContentAccount } from './views/viewAccount/contentAccount.jsx';
import { ContentSettings } from './views/viewSettings/contentSettings.jsx';
import { ContentDocs } from './views/viewDocs/contentDocs.jsx';
import { ContentGateways } from './views/viewGateways/contentGateways.jsx';
import { ContentDevices } from './views/viewDevices/contentDevices.jsx';
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
      resolutions: null,
      locations: null,
      gateways: null,
      devices: null,
      userGroups: null,
      user: null,
      userID: cookie.load('userID'),
      isLoaded: false,
      error: null
    };
  }

  notify = () => {
    toast.info("Cargando datos", {
      position: toast.POSITION.BOTTOM_LEFT,
      className: css({
        borderRadius: ".25em",
        paddingLeft: "10px",
        background: "transparent",
        border: "1px solid #28a745",
        color: "#28a745",
      })
    });
  } // TODO: Edit alerts

  // fetch all data from API
  update = () => {
    this.notify();
    Promise.all([
      fetch('http://localhost:4000/displays').then(res => res.json()),
      fetch('http://localhost:4000/images').then(res => res.json()),
      fetch('http://localhost:4000/groups').then(res => res.json()),
      fetch('http://localhost:4000/resolutions').then(res => res.json()),
      fetch('http://localhost:4000/locations').then(res => res.json()),
      fetch('http://localhost:4000/devices').then(res => res.json()),
      fetch('http://localhost:4000/gateways').then(res => res.json()),
      fetch('http://localhost:4000/userGroups').then(res => res.json())
    ])
    .then((docs) => {
      this.setState({displays: docs[0]});
      this.setState({images: docs[1]});
      this.setState({groups: docs[2]});
      this.setState({resolutions: docs[3]});
      this.setState({locations: docs[4]});
      this.setState({devices: docs[5]});
      this.setState({gateways: docs[6]});
      this.setState({userGroups: docs[7]});
      this.notify();
    })
    .catch((err) => console.log(err)); // TODO: error handling
  }

  updateOne = (type, doc) => {
    switch (type) {
      case 'group':
        console.log(doc);
        const { groups } = this.state;
        var index = groups.data.findIndex((g) => g._id == doc._id);
        if (index !== -1) { // as it should be
          groups.data[index] = doc;
          this.setState({ groups });
        }
        break;
      case 'image':
        console.log(doc);
        const { images } = this.state;
        var index = images.data.findIndex((i) => i._id == doc._id);
        if (index !== -1) { // as it should be
          images.data[index] = doc;
          this.setState({ images });
        }
        break;
      case 'display':
        console.log(doc);
        const { displays } = this.state;
        var index = displays.data.findIndex((d) => d._id == doc._id);
        if (index !== -1) { // as it should be
          displays.data[index] = doc;
          this.setState({ displays });
        }
        break;
      case 'gateway':
        console.log(doc);
        const { gatewayss } = this.state;
        var index = gateways.data.findIndex((g) => g._id == doc._id);
        if (index !== -1) { // as it should be
          gateways.data[index] = doc;
          this.setState({ gateways });
        }
        break;
    }
  }

  addOne = (type, doc) => {
    switch (type) {
      case 'group':
        console.log(doc);
        const { groups } = this.state;
        groups.data.push(doc);
        groups.count++;
        this.setState({ groups });
        break;
      case 'image':
        console.log(doc);
        const { images } = this.state;
        images.data.push(doc);
        images.count++;
        this.setState({ images });
        break;
      case 'gateway':
        console.log(doc);
        const { gateways } = this.state;
        gateways.data.push(doc);
        gateways.count++;
        this.setState({ gateways });
        break;
    }
  }

  removeOne = (type, id) => {
    switch (type) {
      case 'group':
        const { groups } = this.state;
        var index = groups.data.findIndex((g) => g._id == id);
        if (index!=-1) {
          groups.data.splice(index, 1);
          groups.count--;
        }
        this.setState({ groups });
        break;
      case 'image':
        const { images } = this.state;
        var index = images.data.findIndex((i) => i._id == id);
        if (index!=-1) {
          images.data.splice(index, 1);
          images.count--;
        }
        this.setState({ images });
        break;
      case 'display':
        const { displays } = this.state;
        var index = displays.data.findIndex((d) => d._id == id);
        if (index!=-1) {
          displays.data.splice(index, 1);
          displays.count--;
        }
        this.setState({ displays });
        break;
    }
  }

  componentDidMount(){
    fetch('http://localhost:4000/users/' + this.state.userID)
      .then(res => res.json())
      .then((user) =>  this.setState({ user }))
      .then(() => this.update());
  }

  render(){
    return(
      <div className="row main">
        <ToastContainer closeButton={false} hideProgressBar={true}/>
        <Navigation update={this.update} { ...this.state }/>
        <Content updateOne={this.updateOne} addOne={this.addOne} removeOne={this.removeOne} update={this.update} { ...this.state }/>
      </div>
    );
  }
};

class Navigation extends Component{
  render(){

    const { displays, images, groups, user, devices, gateways } = this.props;

    const navigationUser = [
      {exact: true, linkTo: "", text:"Vista general", icon:"eye", count:false, number:''},
      {exact: false, linkTo: "displays", text:"Displays", icon:"television", count:true, number: displays ? displays.count : '...'},
      {exact: false, linkTo: "images", text:"Imagenes", icon:"picture-o", count:true, number: images ? images.count : '...'},
      {exact: false, linkTo: "groups", text:"Grupos", icon:"list", count:true, number: groups ? groups.count : '...'}
    ];

    const navigationAdmin = [
      {exact: true, linkTo: "", text:"Vista general", icon:"eye", count: false, number:''},
      {exact: false, linkTo: "devices", text:"Dispositivos", icon:"tablet", count:true, number: devices ? devices.count : '...'},
      {exact: false, linkTo: "gateways", text:"Puertas de enlace", icon:"sitemap", count:true, number: gateways ? gateways.count : '...'}
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
          <span>v0.0.14</span>
          <span>{ user ? user.name : 'Cargando...'}</span>
        </p>
      </div>
    );
  }
};

class Content extends Component{

  render(){
    const { displays, images, groups, devices, user, gateways } = this.props;
    if ( displays && images && groups && devices && gateways ){
       var content =
        <div className="col">
          <Route exact={true} path="/" render={() => (<Overview { ...this.props }/>)}/>
          <Route path="/displays" render={() => (<ContentDisplays { ...this.props }/>)}/>
          <Route path="/images" render={() => (<ContentImages { ...this.props }/>)}/>
          <Route path="/groups" render={() => (<ContentGroups { ...this.props }/>)}/>
          <Route path="/account" render={() => (<ContentAccount { ...this.props }/>)}/>
          <Route path="/settings" render={() => (<ContentSettings { ...this.props }/>)}/>
          <Route path="/docs" render={() => (<ContentDocs { ...this.props }/>)}/>
          <Route path="/gateways" render={() => (<ContentGateways { ...this.props }/>)}/>
          <Route path="/devices" render={() => (<ContentDevices { ...this.props }/>)}/>
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
