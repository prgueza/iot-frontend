/* IMPORT MODULES */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
const moment = require('moment'); moment.locale('es');
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';

/* IMPORT COMPONENTS */
import { Associated } from '../../associated.jsx';
import { Tag } from '../../../tags/tag.jsx';

/* COMPONENTS */
export class ImageDetails extends Component { // TODO: transform to component

  constructor(props){
    super(props);
    this.state = {
      file: [],
      accepted: false,
      // image details
      src_url: null,
      file: '',
      size: '',
    }
  }

  componentDidMount() {
    const { src_url, extension, size } = this.props.image;
    this.setState({
      src_url: src_url,
      extension: extension,
      size: size
    });
  }

  onDropAccepted = (acceptedFile) => {
    this.setState({
      file: acceptedFile,
      accepted: true
    });

    // Form
    const data = new FormData();
    data.append('image', acceptedFile[0]);

     // upload file
     axios.post('http://localhost:4000/images/' + this.props.image._id, data)
       .then((res) => this.setState({
         src_url: res.data.result.src_url,
         extension: res.data.result.extension,
         size: res.data.result.size
       }))
       .catch((err) => { });
  }


  render(){
    // define constants from props for better readability
    const { id, name, description, src_url, created_at, updated_at, created_by, color_profile, resolution, category, groups, displays, tags_total, tags } = this.props.image;
    // refactor date constants with format
    const created = moment(created_at).format("dddd, D [de] MMMM [de] YYYY");
    const updated = moment(updated_at).format("dddd, D [de] MMMM [de] YYYY");
    // generate tag list
    const tag_list = tags.map(( tag, i ) => <Tag key={i} categoria='imagenes' etiqueta={tag}/>);
    // define routes for edit and delete based on the id
    const linktoEdit = '/images/' + id + '/edit';
    const linktoDelete = '/images/' + id + '/delete';

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
                <p className="card-text"><i className="fa fa-fw fa-hashtag mr-2" aria-hidden="true"></i>{id}</p>
                <p className="card-text"><i className="fa fa-fw fa-info-circle mr-2" aria-hidden="true"></i>{description}</p>
                <p className="card-text"><i className="fa fa-fw fa-arrows-alt mr-2" aria-hidden="true"></i>{resolution ? resolution.name : 'Resolución no especificada'}</p>
                <p className="card-text"><i className="fa fa-fw fa-file-image-o mr-2" aria-hidden="true"></i>{this.state.extension}</p>
                <p className="card-text"><i className="fa fa-fw fa-database mr-2" aria-hidden="true"></i>{this.state.size}</p>
                <p className="card-text"><i className="fa fa-fw fa-tint mr-2" aria-hidden="true"></i>{color_profile}</p>
                <p className="card-text"><i className="fa fa-fw fa-calendar-o mr-2" aria-hidden="true"></i>{created}</p>
                <p className="card-text"><i className="fa fa-fw fa-user-o mr-2" aria-hidden="true"></i>{created_by ? created_by.name : 'Usuario eliminado'}</p>
                <p className="titulo">ETIQUETAS</p>
                {tag_list}
              </div>
            </div>
            <div className="col">
              <div className="vista-previa">
                <p className="titulo text-right">VISTA PREVIA</p>
                <Dropzone onDropAccepted={this.onDropAccepted} activeClassName="dropzone-accepted" className={this.state.accepted ? "dropzone dropzone-accepted" : "dropzone"}>
                  <div className="vista-imagen d-flex w-100 justify-content-center">
                    { this.state.src_url ?
                      <img className="imagen" src={this.state.src_url}/> :
                      <div className="align-self-center">
                        <h4>Arrastre una imagen</h4>
                        <small>formatos permitidos: png/jpeg</small>
                      </div>
                    }
                  </div>
                </Dropzone>
              </div>
            </div>
          </div>
          <hr></hr> {/* TODO: more info */}
          <div className="row">
            <div className="col">
              <div className="asociados">
                <p className="titulo">DISPLAYS ASOCIADOS ({displays.length})</p>
                <Associated contenido={displays} categoria='imagenes'/>
              </div>
            </div>
            <div className="col">
              <div className="asociados">
                <p className="titulo">GRUPOS ASOCIADOS ({groups.length})</p>
                <Associated contenido={groups} categoria='imagenes'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
};
