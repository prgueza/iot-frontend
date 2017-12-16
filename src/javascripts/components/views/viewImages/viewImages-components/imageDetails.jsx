/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { BrowserRouter as Router, Link } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { Associated } from '../../associated.jsx';
import { Tag } from '../../../tags/tag.jsx';

/* COMPONENTS */
export class ImageDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      image: null,
    };
  }

  componentDidMount(){
    fetch(this.props.image.url)
      .then(res => res.json())
      .then(image => {
        this.setState({ image })
      });
  }

  componentWillReceiveProps(nextProps){
    fetch(nextProps.image.url)
      .then(res => res.json())
      .then(image => {
        this.setState({ image })
      });
  }

  render(){
    if(this.state.image){
      const { id, name, description, src_url, created_at, updated_at, user, dimensions, file, size, category, groups, displays, tags_total, tags } = this.state.image;
      const created = moment(created_at).format("dddd, D [de] MMMM [de] YYYY");
      const updated = moment(updated_at).format("dddd, D [de] MMMM [de] YYYY");
      const tag_list = tags.map(( tag, i ) => <Tag key={i} categoria='imagenes' etiqueta={tag}/>);
      const linktoEdit = '/images/edit/' + id;
      const linktoDelete = '/images/delete/' + id;

      return(
      <div className="col">
        <div className="card detalles bg-transparent border-gray">
          <div className="card-header border-gray">
            <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
              <li className="nav-item mr-auto">
                <h2 className="detalles-titulo"><i className='fa fa-picture-o mr-3' aria-hidden="true"></i>{name}</h2>
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
                  <p className="card-text"><i className="fa fa-info-circle mr-1" aria-hidden="true"></i> {description}</p>
                  <p className="card-text"><i className="fa fa-arrows-alt mr-1" aria-hidden="true"></i> {dimensions.width} x {dimensions.height}</p>
                  <p className="card-text"><i className="fa fa-file-image-o mr-1" aria-hidden="true"></i> {file}</p>
                  <p className="card-text"><i className="fa fa-database mr-1" aria-hidden="true"></i> {size}</p>
                  <p className="card-text"><i className="fa fa-calendar-o mr-1" aria-hidden="true"></i> {created}</p>
                  <p className="card-text"><i className="fa fa-user-o mr-1" aria-hidden="true"></i> {user}</p>
                  <p className="titulo">ETIQUETAS</p>
                  {tag_list}
                </div>
              </div>
              <div className="col">
                <div className="vista-previa">
                  <p className="titulo text-right">VISTA PREVIA</p>
                  <div className="vista-imagen">
                    <img className="imagen" src={src_url}/>
                  </div>
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col">
                <div className="asociados">
                  <p className="titulo">DISPLAYS ASOCIADOS ({displays.length})</p>
                  <Associated contenido={displays} categoria='imagenes'/>
                </div>
              </div>
              <div className="col">
                <div className="asociados">
                  <p className="titulo text-right">GRUPOS ({groups.length}/5)</p>
                  <Associated contenido={groups} categoria='grupos'/>
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
