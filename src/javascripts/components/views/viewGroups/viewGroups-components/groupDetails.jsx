/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { BrowserRouter as Router, Link } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { Associated } from '../../associated.jsx';
import { Tag } from '../../../tags/tag.jsx';

/* COMPONENTS */
export class GroupDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      group: null,
    };
  }

  componentDidMount(){
    fetch(this.props.group.url)
      .then(res => res.json())
      .then(group => {
        this.setState({ group })
      });
  }

  componentWillReceiveProps(nextProps){
    fetch(nextProps.group.url)
      .then(res => res.json())
      .then(group => {
        this.setState({ group })
      });
  }

  render() {
    if (this.state.group){
      const { id, name, description, created_at, updated_at, user, displays, images, active_image, tags_total, tags } = this.state.group;
      const created = moment(created_at).format("dddd, D [de] MMMM [de] YYYY");
      const updated = moment(updated_at).format("dddd, D [de] MMMM [de] YYYY");
      const tag_list = tags.map(( tag, i ) => <Tag key={i} categoria='grupos' etiqueta={tag}/>);
      const src = active_image ? active_image.src_url : 'http://localhost:3000/img/undefined.png';
      const linktoEdit = '/groups/edit/' + id;
      const linktoDelete = '/groups/delete/' + id;

      return(
      <div className="col">
        <div className="card detalles bg-transparent border-gray">
          <div className="card-header border-gray">
            <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
              <li className="nav-item mr-auto">
                <h2 className="detalles-titulo"><i className='fa fa-list mr-3' aria-hidden="true"></i>{name}</h2>
              </li>
              <li className="nav-item mr-2">
                <Link to={linktoEdit}>
                  <button type="button" className="btn btn-outline-warning"><i className="fa fa-pencil-square-o mr-1" aria-hidden="true"></i>Editar</button>
                </Link>
              </li>
              <li className="nav-item ml-2">
                <Link to={linktoDelete}>
                  <button type="button" className="btn btn-outline-danger"><i className="fa fa-trash-o" aria-hidden="true"></i>Eliminar</button>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="row">
              <div className="col">
                <div className="card-body">
                <p className="titulo">DETALLES</p>
                <p className="card-text"><i className="fa fa-hashtag mr-1" aria-hidden="true"></i>{id}</p>
                <p className="card-text" data-toggle="tooltip" data-placement="left" title="descripción"><i className="fa fa-info-circle mr-1" aria-hidden="true"></i> {description}</p>
                <p className="card-text"><i className="fa fa-calendar-o mr-1" aria-hidden="true"></i>{created}</p>
                <p className="card-text"><i className="fa fa-user-o mr-1" aria-hidden="true"></i> {user.name}</p>
                <p className="titulo">ETIQUETAS</p>
                {tag_list}
                </div>
              </div>
              <div className="col">
                <div className="vista-previa">
                  <p className="titulo text-right">IMAGEN ACTIVA</p>
                  <div className="vista-imagen">
                    <img className="imagen" src={src}/>
                  </div>
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col">
                <div className="asociados">
                  <p className="titulo">DISPLAYS ({displays.length})</p>
                  <Associated contenido={displays} categoria='imagenes'/>
                </div>
              </div>
              <div className="col">
                <div className="asociados">
                  <p className="titulo text-right">IMAGENES ASOCIADAS({images.length}/5)</p>
                  <Associated contenido={images} categoria='grupos'/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
    } else {
      return null;
    }
  }
};
