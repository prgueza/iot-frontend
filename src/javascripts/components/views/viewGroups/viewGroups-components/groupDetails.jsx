/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { BrowserRouter as Router, Link } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { Associated } from '../../associated.jsx';
import { Tag } from '../../../tags/tag.jsx';

/* COMPONENTS */
export class GroupDetails extends Component { // TODO: transform to component

  constructor(props){
    super(props);
    const { group, user } = this.props;
    this.state = {
      // form data stored in state
      group: '',
      active_image: '',
      imagesOptions: '',
      images: '',
      error: null
    };
  }

  componentWillReceiveProps(nextProps){
    // get data
    const { active_image, images } = nextProps.group;
    // images options
    const imagesMap = images.map((i) => <option value={i._id} key={i.id}>{i.name}</option>);
    // state
    this.setState({
      group: nextProps.group,
      active_image: active_image ? active_image : '',
      imagesOptions: imagesMap,
      images: images,
    })
  }

  /* HANDLE INPUT CHANGE */
  handleInputChange = (event) => {
    const image = this.state.images.find((i) => event.target.value == i._id);
    const form = { active_image: image._id };
    fetch(this.state.group.url,
      {
      method: 'put', // post or put method
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(form)
      })
      .then(res => res.json())
      .then(
        (res) => { // resolve callback
          this.setState({ active_image: image })
        },
        (error) => { // reject callback
          this.setState({ error })
        }
    );
  }

  render(){
    // define constants from props for better readability
    const { id, name, description, created_at, updated_at, created_by, displays, images, active_image, tags_total, tags } = this.props.group;
    // refactor date constants with format
    const created = moment(created_at).format("dddd, D [de] MMMM [de] YYYY");
    const updated = moment(updated_at).format("dddd, D [de] MMMM [de] YYYY");
    // generate tag list
    const tag_list = tags.map(( tag, i ) => <Tag key={i} categoria='grupos' etiqueta={tag}/>);
    // check if active_image is set and if not set the undefined img
    const src = this.state.active_image ? this.state.active_image.src_url : 'http://localhost:3000/img/undefined.png';
    // define routes for edit and delete based on the id
    const linktoEdit = '/groups/' + id + '/edit';
    const linktoDelete = '/groups/' + id + '/delete';

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
              <p className="card-text"><i className="fa fa-fw fa-hashtag mr-2" aria-hidden="true"></i>{id}</p>
              <p className="card-text"><i className="fa fa-fw fa-info-circle mr-2" aria-hidden="true"></i>{description}</p>
              <p className="card-text"><i className="fa fa-fw fa-calendar-o mr-2" aria-hidden="true"></i>{created}</p>
              <p className="card-text"><i className="fa fa-fw fa-user-o mr-2" aria-hidden="true"></i> {created_by ? created_by.name : 'Usuario eliminado'}</p>
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
                <select className="custom-select" id="active_image" name='active_image' value={this.state.active_image._id} onChange={this.handleInputChange}>
                  <option value={''} key={0}>Sin imagen activa</option>
                  {this.state.imagesOptions}
                </select>
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
                <p className="titulo text-right">IMAGENES ASOCIADAS ({images.length})</p>
                <Associated contenido={images} categoria='grupos'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
};
