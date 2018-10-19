/* IMPORT MODULES */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

/* IMPORT COMPONENTS */
import Associated from '../../associated';
import Tag from '../../../tags/tag';

const moment = require('moment');

moment.locale('es');

/* COMPONENTS */
class ImageDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accepted: false,
      src: null,
      extension: '',
      size: '',
    };
  }

  componentDidMount() {
    const { image: { src, extension, size } } = this.props;
    this.setState({ src, extension, size });
  }

  componentWillReceiveProps(nextProps) {
    const { src, extension, size } = nextProps.image;
    this.setState({ src, extension, size });
  }

	onDropAccepted = (acceptedFile) => {
	  const {
	    image, update, notify,
	  } = this.props;
	  this.setState({ accepted: true });
	  // Form
	  const data = new FormData();
	  data.append('image', acceptedFile[0]);

	  // upload file
	  axios.post(image.url, data)
	    .then((res) => {
	      if (res.status === 200) {
	        update('images', res.data.resourceId, 'edit', res.data.resource);
	        notify('Imagen cargada con éxito', 'notify-success', 'upload', toast.POSITION.TOP_RIGHT, res.data.notify);
	      }
	    })
	    .catch(() => { notify('Error al eliminar la imagen', 'notify-error', 'exclamation-triangle', toast.POSITION.TOP_RIGHT); });
	}

	render() {
	  // define constants from props for better readability
	  const {
	   image: {
	      _id, name, description, createdAt, createdBy, colorProfile, resolution, groups, displays, tags,
	    }, filterData,
	  } = this.props;
	  const {
	    src, accepted, extension, size,
	  } = this.state;
	  // refactor date constants with format
	  const created = moment(createdAt)
	    .format('dddd, D [de] MMMM [de] YYYY');
	  // generate tag list
	  const tagList = tags.map(tag => <Tag key={tag} category="images" filterData={filterData} tag={tag} />);
	  // define routes for edit and delete based on the id
	  const linktoEdit = `/images/${_id}/edit`;
	  const linktoDelete = `/images/${_id}/delete`;

	  return (
<div className="card detalles">
      <div className="card-header">
        <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
          <li className="nav-item mr-auto">
            <h2 className="detalles-titulo">
              <i className="fa fa-picture-o mr-3" aria-hidden="true" />{name}</h2>
          </li>
          <li className="nav-item mr-2">
            <Link to={linktoEdit}>
              <button type="button" className="btn btn-warning">
                <i className="fa fa-pencil-square-o mr-2" aria-hidden="true" />Editar</button>
            </Link>
          </li>
          <li className="nav-item ml-2">
            <Link to={linktoDelete}>
              <button type="button" className="btn btn-danger">
                <i className="fa fa-trash-o mr-2" aria-hidden="true" />Eliminar</button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <p className="titulo">DETALLES</p>
            <p className="card-text">
              <i className="fa fa-fw fa-info-circle mr-2" aria-hidden="true" />{description}</p>
            <p className="card-text">
              <i className="fa fa-fw fa-arrows-alt mr-2" aria-hidden="true" />{
                resolution
                  ? resolution.name
                  : 'Resolución no especificada'
              }</p>
            <p className="card-text">
              <i className="fa fa-fw fa-file-image-o mr-2" aria-hidden="true" />{extension}</p>
            <p className="card-text">
              <i className="fa fa-fw fa-database mr-2" aria-hidden="true" />{size}</p>
            <p className="card-text">
              <i className="fa fa-fw fa-tint mr-2" aria-hidden="true" />{colorProfile}</p>
            <p className="card-text">
              <i className="fa fa-fw fa-calendar-o mr-2" aria-hidden="true" />{created}</p>
            <p className="card-text">
              <i className="fa fa-fw fa-user-o mr-2" aria-hidden="true" />{
                createdBy
                  ? createdBy.name
                  : 'Usuario eliminado'
              }</p>
            <p className="titulo">ETIQUETAS</p>
            {tagList}
          </div>
          <div className="col">
            <div className="vista-previa">
              <p className="titulo text-right">VISTA PREVIA</p>
              <Dropzone
                onDropAccepted={this.onDropAccepted}
                activeClassName="dropzone-accepted"
                className={accepted
                  ? 'dropzone dropzone-accepted'
                  : 'dropzone'}
              >
                <div className="vista-imagen d-flex w-100 justify-content-center">
                  {
                    src
                      ? <img alt="" className="imagen" src={src} />
                      : (
												<div className="align-self-center">
                          <h4>Arrastre una imagen</h4>
                          <small>formato: bmp</small>
                        </div>
                      )
                  }
                </div>
              </Dropzone>
            </div>
          </div>
        </div>
        <hr className="card-division" />
        <div className="row">
          <div className="col">
            <div className="asociados">
              <p className="titulo">DISPLAYS ASOCIADOS ({displays.length})</p>
              <Associated content={displays} category="displays" appearance="elemento-display" icon="television" />
            </div>
          </div>
          <div className="col">
            <div className="asociados">
              <p className="titulo">GRUPOS ASOCIADOS ({groups.length})</p>
              <Associated content={groups} category="groups" appearance="elemento-grupo" icon="list" />
            </div>
          </div>
        </div>
      </div>
    </div>
	  );
	}
}

ImageDetails.propTypes = {
  image: PropTypes.shape.isRequired,
  update: PropTypes.shape.isRequired,
  notify: PropTypes.shape.isRequired,
  filterData: PropTypes.shape.isRequired,
};

export default ImageDetails;
