/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

/* IMPORT COMPONENTS */
import { Associated } from '../../associated.jsx';
import { Tag } from '../../../tags/tag.jsx';

/* COMPONENTS */
export class GroupDetails extends Component {

  constructor(props){
    super(props);
    const { group, user } = this.props;
    this.state = {
      // form data stored in state
      group: '',
      active_image: '',
      images: '',
      error: null
    };
  }

  componentDidMount(){
    // get data
    const { active_image } = this.props.group;
    // state
    this.setState({
      group: this.props.group,
      active_image: active_image ? active_image._id : '',
      src_url: active_image ? active_image.src_url : null
    })
  }

  componentWillReceiveProps(nextProps){
    // get data
    const { active_image } = nextProps.group;
    // state
    this.setState({
      group: nextProps.group,
      active_image: active_image ? active_image._id : '',
      src_url: active_image ? active_image.src_url : null
    })
  }

  /* HANDLE INPUT CHANGE */
  handleInputChange = (event) => {
    const value = event.target.value;
    const image = this.props.images.find((i) => value == i._id);
    const form = { active_image: image ? image._id : null, userGroup: this.props.userGroup._id };
    axios({
        method: 'put',
        url: this.state.group.url,
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        data: form
      })
      .then((res) => {
        if (res.status == 201){
          const new_image = this.state.group.images.find((i) => value == i._id);
          const src_url = new_image ? new_image.src_url : null;
          this.props.notify('Imagen cambiada con éxito', 'notify-success', 'upload', toast.POSITION.BOTTOM_LEFT);
          // this.setState({ active_image: value, src_url: src_url });
          return this.props.update(this.props.user); // update dataset
        } else {
          return this.setState({ error: res.data }); // set error
        }
      });
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
    const src = this.state.src_url;
    // define routes for edit and delete based on the id
    const linktoEdit = '/groups/' + id + '/edit';
    const linktoDelete = '/groups/' + id + '/delete';
    const imagesOptions = images.map((i) => <option value={i._id} key={i.id}>{i.name}</option>);


    return(
    <div className="card detalles">
      <div className="card-header">
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
      <div className="card-body">
        <div className="row">
          <div className="col">
            <p className="titulo">DETALLES</p>
            <p className="card-text"><i className="fa fa-fw fa-hashtag mr-2" aria-hidden="true"></i>{id}</p>
            <p className="card-text"><i className="fa fa-fw fa-info-circle mr-2" aria-hidden="true"></i>{description}</p>
            <p className="card-text"><i className="fa fa-fw fa-calendar-o mr-2" aria-hidden="true"></i>{created}</p>
            <p className="card-text"><i className="fa fa-fw fa-user-o mr-2" aria-hidden="true"></i> {created_by ? created_by.name : 'Usuario eliminado'}</p>
            <p className="titulo">ETIQUETAS</p>
            {tag_list}
          </div>
          <div className="col">
            <div className="vista-previa">
              <p className="titulo text-right">IMAGEN ACTIVA</p>
              <div className="vista-imagen-grupo d-flex w-100 justify-content-center mb-3">
                { src ?
                  <img className="imagen" src={src}/> :
                  <div className="align-self-center">
                    <h4>La imagen activa aun no ha sido determinada</h4>
                    <small>Suba una imagen al servidor</small>
                  </div>
                }
              </div>
              <select className="custom-select" id="active_image" name='active_image' value={this.state.active_image} onChange={this.handleInputChange}>
                <option value={''} key={0}>Sin imagen activa</option>
                {imagesOptions}
              </select>
            </div>
          </div>
        </div>
        <hr className="card-division"></hr>
        <div className="row">
          <div className="col">
            <div className="asociados">
              <p className="titulo">DISPLAYS ({displays.length})</p>
              <Associated contenido={displays} category="displays" appearance="elemento-display" icon="television"/>
            </div>
          </div>
          <div className="col">
            <div className="asociados">
              <p className="titulo text-right">IMAGENES ASOCIADAS ({images.length})</p>
              <Associated contenido={images} category="images" appearance="elemento-imagen" icon="picture-o" active={this.state.active_image}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
};
