/* IMPORT MODULES */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      bytes: 0,
    };
  }

  componentDidMount() {
    const { image: { src, extension, bytes } } = this.props;
    this.setState({ src, extension, bytes });
  }

  componentWillReceiveProps(nextProps) {
    const { src, extension, bytes } = nextProps.image;
    this.setState({ src, extension, bytes });
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
	        notify('Imagen cargada con éxito', 'notify-success', 'upload', res.data.notify);
	      }
	    })
	    .catch(() => { notify('Error al eliminar la imagen', 'notify-error', 'exclamation-triangle', 'error'); });
	}

	render() {
	  // define constants from props for better readability
	  const {
	   image: {
	      _id, name, description, createdAt, createdBy, color, groups, displays, tags,
	    }, filterData,
	  } = this.props;
	  const {
	    src, accepted, extension, bytes,
	  } = this.state;
	  // refactor date constants with format
	  const created = moment(createdAt).format('dddd, D [de] MMMM [de] YYYY');
	  // generate tag list
	  const tagList = tags.map(tag => <Tag key={tag} category="images" filterData={filterData} tag={tag} />);
	  // define routes for edit and delete based on the id
	  const linktoEdit = `/images/${_id}/edit`;
	  const linktoDelete = `/images/${_id}/delete`;

	  return (
    <div className="card card-detalles">
      <div className="card-header">
        <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
          <li className="nav-item mr-auto">
            <h2 className="detalles-titulo">
              <FontAwesomeIcon icon={['far', 'image']} className="mr-3" fixedWidth />{name}</h2>
          </li>
          <li className="nav-item mr-2">
            <Link to={linktoEdit}>
              <button type="button" className="btn btn-warning">
                <FontAwesomeIcon icon={['far', 'edit']} className="mr-2" fixedWidth />Editar</button>
            </Link>
          </li>
          <li className="nav-item ml-2">
            <Link to={linktoDelete}>
              <button type="button" className="btn btn-danger">
                <FontAwesomeIcon icon="trash" className="mr-2" fixedWidth />Eliminar</button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <p className="titulo">DETALLES</p>
            <p className="card-text">
              <FontAwesomeIcon icon="info-circle" className="mr-2" fixedWidth />{description}</p>
            <p className="card-text">
              <FontAwesomeIcon icon="database" className="mr-2" fixedWidth />{extension}</p>
            <p className="card-text">
              <FontAwesomeIcon icon="file-image" className="mr-2" fixedWidth />{bytes}</p>
            <p className="card-text">
              <FontAwesomeIcon icon="adjust" className="mr-2" fixedWidth />{color}</p>
            <p className="card-text">
              <FontAwesomeIcon icon={['far', 'calendar']} className="mr-2" fixedWidth />{created}</p>
            <p className="card-text">
              <FontAwesomeIcon icon="user" className="mr-2" fixedWidth />{
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
              <Associated content={displays} category="displays" appearance="elemento-display" icon="tv" />
            </div>
          </div>
          <div className="col">
            <div className="asociados">
              <p className="titulo">GRUPOS ASOCIADOS ({groups.length})</p>
              <Associated content={groups} category="groups" appearance="elemento-grupo" icon="group-layer" />
            </div>
          </div>
        </div>
      </div>
    </div>
	  );
	}
}

ImageDetails.propTypes = {
  image: PropTypes.shape({}).isRequired,
  update: PropTypes.func,
  notify: PropTypes.func,
  filterData: PropTypes.func,
};

ImageDetails.defaultProps = {
  update: () => false,
  notify: () => false,
  filterData: () => false,
};

export default ImageDetails;
