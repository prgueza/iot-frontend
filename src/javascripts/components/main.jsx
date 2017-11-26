// Importacion de librerias
import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
const moment = require('moment'); moment.locale('es');
const ahora = moment();
const cx = require('classnames');

// Importacion de componentes
import { Display, DetallesDisplay } from './display.jsx';
import { Imagen, DetallesImagen } from './imagen.jsx';
import { Grupo, DetallesGrupo } from './grupo.jsx';
import { FormularioDisplay, FormularioImagen, FormularioGrupo } from './formularios.jsx';
import { Info } from './info.jsx';
import { BotonAdd } from './botones.jsx';

// Declaracion de componentes
export const Main = () => {
  return(
    <div className="row main">
      <Navegacion/>
      <Contenido/>
    </div>
  );
};

const Navegacion = () => {
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
          <NavLink to={'/imagenes'}>
            <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-picture-o mr-2" aria-hidden="true"></i> Imágenes</button></li>
          </NavLink>
          <NavLink to={'/grupos'}>
              <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-list mr-2" aria-hidden="true"></i> Grupos</button></li>
          </NavLink>
        </ul>
      </div>
      <div className="navegacion mb-3">
        <p className="titulo-navegacion">AJUSTES</p>
        <ul className="nav-list">
          <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-user-o mr-2" aria-hidden="true"></i> Cuenta</button></li>
          <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-cogs mr-2" aria-hidden="true"></i> Configuración</button></li>
          <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-book mr-2" aria-hidden="true"></i> Documentación</button></li>
        </ul>
      </div>
      <hr></hr>
    </div>
  );
};

class Contenido extends Component{

  constructor(props){
    super(props);
    this.state = {
      displays: null,
      imagenes: null,
      grupos: null
    };
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/displays')
      .then(res => res.json())
      .then(displays => {
        this.setState({ displays })
      });
    fetch('http://localhost:3000/api/imagenes')
      .then(res => res.json())
      .then(imagenes => {
        this.setState({ imagenes })
      });
    fetch('http://localhost:3000/api/grupos')
      .then(res => res.json())
      .then(grupos => {
        this.setState({ grupos })
      });
    }

  render(){
    const { displays, imagenes, grupos } = this.state;

    if ( displays && imagenes && grupos){
       var contenido = <div className="col">
          <Route exact={true} path="/" render={() => (<ContenidoVistaGeneral displays={displays} imagenes={imagenes} grupos={grupos}/>)}/>
          <Route path="/displays" render={() => (<ContenidoDisplays contenido={displays}/>)}/>
          <Route path="/imagenes" component={() => (<ContenidoImagenes contenido={imagenes}/>)}/>
          <Route path="/grupos" component={() => (<ContenidoGrupos contenido={grupos}/>)}/>
        </div>;

    } else {
       var contenido =
        <div className="col text-center d-flex align-items-center justify-content-center">
          <h1><i className="fa fa-circle-o-notch fa-spin fa-fw mr-4"></i>Cargando</h1>
        </div>;
    }

    return( contenido );
  }
};

const ContenidoVistaGeneral = ({ displays, imagenes, grupos }) => {
  return(
    <div className="col contenido">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>VISTA GENERAL</h1>
          </div>
          <hr></hr>
        </div>
      </div>
      <div className="ventana">
        <div className="row mb-3">
          <Panel contenido={displays} categoria="displays"/>
          <Panel contenido={imagenes} categoria="imagenes"/>
          <Panel contenido={grupos} categoria="grupos"/>
        </div>
      </div>
    </div>
  );
};

const ContenidoDisplays = ({ contenido }) => {
  return(
    <div className="col contenido">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>DISPLAYS</h1>
          </div>
          <hr></hr>
        </div>
      </div>
      <div className="ventana">
        <div className="row">
          <div className="col">
            <Resumen total={contenido.length} categoria='displays'/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4">
            <Lista categoria='displays' contenido={contenido}/>
          </div>
          <div className="col-8">
            <div className="row mb-3">
              <Switch>
                <Route path="/displays/add" component={FormularioDisplay}/>
                <Route path="/displays/:displayId" render={({ match }) => (<DetallesDisplay elemento={contenido.find(d => d.identificacion == match.params.displayId)}/>)}/>
              </Switch>
              <Route exact path="/displays" render={() => (<Info categoria='displays'/>)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContenidoImagenes = ({ contenido }) => {
  return(
    <div className="col contenido">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>IMAGENES</h1>
          </div>
          <hr></hr>
        </div>
      </div>
      <div className="ventana">
        <div className="row">
          <div className="col">
            <Resumen total={contenido.length} categoria='imagenes'/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4">
            <Lista categoria='imagenes' contenido={contenido}/>
          </div>
          <div className="col-8">
            <div className="row mb-3">
              <Switch>
                <Route path="/imagenes/add" component={FormularioImagen}/>
                <Route path="/imagenes/:imagenId" render={({ match }) => (<DetallesImagen elemento={contenido.find(i => i.identificacion == match.params.imagenId)}/>)}/>
              </Switch>
              <Route exact path="/imagenes" render={() => (<Info categoria='imagenes'/>)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContenidoGrupos = ({ contenido }) => {
  return(
    <div className="col contenido">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>GRUPOS</h1>
          </div>
          <hr></hr>
        </div>
      </div>
      <div className="ventana">
        <div className="row">
          <div className="col">
            <Resumen total={contenido.length} categoria='grupos'/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4">
            <Lista categoria='grupos' contenido={contenido}/>
          </div>
          <div className="col-8">
            <div className="row mb-3">
              <Switch>
                <Route path="/grupos/add" component={FormularioGrupo}/>
                <Route path="/grupos/:grupoId" render={({ match }) => (<DetallesGrupo elemento={contenido.find(g => g.identificacion == match.params.grupoId)}/>)}/>
              </Switch>
              <Route exact path="/grupos" render={() => (<Info categoria='grupos'/>)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Panel = ({ categoria, contenido }) => {
  return(
    <div className="col-4">
      <Resumen total={contenido.length} categoria={categoria}/>
      <Lista categoria={categoria} contenido={contenido}/>
    </div>
  );
};

const Resumen = ({ categoria, total }) => {
  const icono = cx('fa',
  {'fa-television': categoria === "displays"},
  {'fa-picture-o': categoria === "imagenes"},
  {'fa-list': categoria === "grupos"}); // Depende de a que pertenezca el resumen
  const estilo = cx('card', 'mb-3', 'bg-transparent',
  {'border-success text-success': categoria === "displays"},
  {'border-info text-info': categoria === "imagenes"},
  {'border-warning text-warning': categoria === "grupos"});
  return(
    <div className="resumen">
      <div className={estilo}>
        <div className="card-body text-right">
          <div className="card-text d-flex w-100 justify-content-between">
            <h1 className="mb-0 display-3"><i className={icono} aria-hidden="true"></i></h1>
            <h1 className="mb-0 display-3">{total}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

const Lista = ({ categoria, contenido }) => {
  if (categoria === "displays"){
    var elementos = contenido.map(elemento => <Display display={elemento} key={elemento.identificacion}/>);
  } else if (categoria === "imagenes"){
    var elementos = contenido.map(elemento => <Imagen imagen={elemento} key={elemento.identificacion}/>);
  } else if (categoria === "grupos"){
    var elementos = contenido.map(elemento => <Grupo grupo={elemento} key={elemento.identificacion}/>);
  }
  return(
    <div className="lista">
      <div className="list-group mb-3">
        {elementos}
      </div>
      <div>
        <BotonAdd categoria={categoria}/>
      </div>
    </div>
  );
};
