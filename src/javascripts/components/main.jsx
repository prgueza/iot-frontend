// Importacion de librerias
import React from 'react';
const moment = require('moment'); moment.locale('es');
const ahora = moment();
const cx = require('classnames');

// Importacion de datos
const datosJSON = require('../datos.js');
const DISPLAYS = datosJSON.DISPLAYS;
const IMAGENES = datosJSON.IMAGENES;
const GRUPOS = datosJSON.GRUPOS;

// Importacion de componentes
const DisplayComponentes = require('./display.jsx');
const ImagenComponentes = require('./imagen.jsx');
const GrupoComponentes = require('./grupo.jsx');
const DetallesComponentes = require('./detalles.jsx');
const FormulariosComponentes = require('./formularios.jsx');
const Display = DisplayComponentes.vistaGeneral;
const Imagen = ImagenComponentes.vistaGeneral;
const Grupo = GrupoComponentes.vistaGeneral;
const Detalles = DetallesComponentes.comp;
const FormularioDisplay = FormulariosComponentes.crearDisplay;
const FormularioImagen = FormulariosComponentes.crearImagen;

// Declaracion de componentes
module.exports.comp = class Main extends React.Component{
  render(){
    return(
      <div>
        <div className="row">
          <Navegacion/>
          <Contenido/>
        </div>
      </div>
    );
  }
};

class Navegacion extends React.Component{
  render(){
    return(
      <div className="col-3 navegacion">
        <div className="titulo mb-4 text-center">
          <h1><i className="fa fa-television" aria-hidden="true"></i> DISPLAYS</h1>
        </div>
        <hr></hr>
        <div className="busqueda mb-3">
          <p className="titulo">BÚSQUEDA</p>
          <input type="text" className="form-control buscar" id="busqueda" aria-describedby="campoBusqueda" placeholder="Buscar..."></input>
        </div>
        <div className="navegacion mb-3">
          <p className="titulo">NAVEGACIÓN</p>
          <ul className="nav-list">
            <li><button type="button" className="btn btn-nav btn-block btn-active mb-1"><i className="fa fa-eye mr-2" aria-hidden="true"></i> Vista general</button></li>
            <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-television mr-2" aria-hidden="true"></i> Displays</button></li>
            <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-picture-o mr-2" aria-hidden="true"></i> Imágenes</button></li>
            <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-list mr-2" aria-hidden="true"></i> Grupos</button></li>
          </ul>
        </div>
        <div className="navegacion mb-3">
          <p className="titulo">AJUSTES</p>
          <ul className="nav-list">
            <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-user-o mr-2" aria-hidden="true"></i> Cuenta</button></li>
            <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-cogs mr-2" aria-hidden="true"></i> Configuración</button></li>
            <li><button type="button" className="btn btn-nav btn-block mb-1"><i className="fa fa-book mr-2" aria-hidden="true"></i> Documentación</button></li>
          </ul>
        </div>
        <hr></hr>
      </div>
    );
  }
};

class Contenido extends React.Component{
  render(){
    return(
      <div className="col">
        <div className="row mb-3">
          <Panel contenido={DISPLAYS} categoria="display"/>
          <Panel contenido={IMAGENES} categoria="imagen"/>
          <Panel contenido={GRUPOS} categoria="grupo"/>
        </div>
        <div className="row mt-3">
          <FormularioImagen />
        </div>
      </div>
    );
  }
};

class Panel extends React.Component{
  render(){
    var total = this.props.contenido.length; // prop para "Resumen"
    return(
      <div className="col">
        <Resumen total={total} categoria={this.props.categoria}/>
        <Lista categoria={this.props.categoria} contenido={this.props.contenido}/>
      </div>
    );
  }
};

class Resumen extends React.Component{
  render(){
    var icono = cx('fa',
    {'fa-television': this.props.categoria === "display"},
    {'fa-picture-o': this.props.categoria === "imagen"},
    {'fa-list': this.props.categoria === "grupo"}); // Depende de a que pertenezca el resumen
    var estilo = cx('card', 'mb-3', 'bg-transparent',
    {'border-success text-success' : this.props.categoria === "display"},
    {'border-info text-info' : this.props.categoria === "imagen"},
    {'border-warning text-warning' : this.props.categoria === "grupo"});
    return(
      <div className="resumen">
        <div className={estilo}>
          <div className="card-body text-right">
            <div className="card-text d-flex w-100 justify-content-between">
              <h1 className="mb-0 display-3"><i className={icono} aria-hidden="true"></i></h1>
              <h1 className="mb-0 display-3">{this.props.total}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
};


class Lista extends React.Component{
  render(){ // dependiendo de la categoria formateamos el contenido de un modo u otro
    var contenido = []; // Array donde almacenaremos cada display
    var key = 0; // clave necesaria para React
    if (this.props.categoria === "display"){
      var claseBoton = cx("btn btn-block btn-small btn-outline-success");
      this.props.contenido.forEach(function(elemento){ // Recorremos el array de displays
        contenido.push(<Display display={elemento} key={key}/>); // Introducimos el elemento
        key ++; // Aumentamos la clave en una unidad
      });
    } else if (this.props.categoria === "imagen"){
      var claseBoton = cx("btn btn-block btn-small btn-outline-info");
      this.props.contenido.forEach(function(elemento){ // Recorremos el array de displays
        contenido.push(<Imagen imagen={elemento} key={key}/>); // Introducimos el elemento
        key ++; // Aumentamos la clave en una unidad
      });
    } else if (this.props.categoria === "grupo"){
      var claseBoton = cx("btn btn-block btn-small btn-outline-warning");
      this.props.contenido.forEach(function(elemento){ // Recorremos el array de displays
        contenido.push(<Grupo grupo={elemento} key={key}/>); // Introducimos el elemento
        key ++; // Aumentamos la clave en una unidad
      });
    }
    return(
      <div>
        <div className="list-group mb-3">
          {contenido}
        </div>
        <div>
          <button type="button" className={claseBoton}><i className="fa fa-plus-circle mr-1" aria-hidden="true"></i>Añadir</button>
        </div>
      </div>
    );
  }
};
