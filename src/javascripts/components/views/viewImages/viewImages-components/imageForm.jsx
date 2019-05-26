/* IMPORT MODULES */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* IMPORT COMPONENTS */
import Tag from '../../../tags/tag';

const moment = require('moment');

moment.locale('es');

/* COMPONENTS */
class ImageForm extends Component {
  /* STATE */
  constructor(props) {
    super(props);
    const { image, user } = this.props;
    this.state = {
      name: image ? image.name : '',
      description: image ? image.description : '',
      category: image ? image.category : '',
      tags: image ? image.tags : [],
      color: image ? image.color : 'Color',
      createdAt: image ? moment(image.createdAt) : moment(),
      updatedAt: moment(),
      createdBy: image ? image.createdBy || null : user,
      updatedBy: user.name,
      redirect: false,
    };
  }

	/* HANDLE INPUT CHANGE (CONTROLLED FORM) */
	handleInputChange = (event) => {
	  const { target: { name, value } } = event;
	  this.setState({ [name]: value });
	}

  handleTagsChange = (event) => {
    const { target, target: { name } } = event;
    const value = target.value.split(',');
    this.setState({ [name]: value });
  }

	/* HANDLE SUMBIT (PUT OR POST) */
	handleSubmit = () => {
	  // get image if any
	  const {
	    image, token, update, notify,
	  } = this.props;
	  const {
	    name, description, updatedBy, createdBy, category, tags, color,
	  } = this.state;
	  // define form values to send
	  const form = {
	    name,
	    description,
	    category,
	    color,
	    tags: tags.map(tag => tag.trim()),
	    createdBy: createdBy._id,
	    updatedBy: updatedBy._id,
	  };
	  // HTTP request
	  axios({
	    method: image ? 'put' : 'post',
	    url: image ? image.url : `${process.env.API_URL}images`,
	    data: form,
	    headers: {
	      Accept: 'application/json',
	      'Content-Type': 'application/json',
	      Authorization: `Bearer ${token}`,
	    },
	  })
	    .then((res) => {
	      if (res.status >= 200) {
	        this.setState({ redirectLocation: `/images/${res.data.resourceId}` });
	        notify('Imagen configurada con éxito', 'notify-success', 'upload', res.data.notify);
	        update('images', res.data.resourceId, image ? 'edit' : 'add', res.data.resource); // update dataset
	      }
	    })
	    .then(() => this.setState({ redirect: true }))
	    .catch(() => notify('Error al configurar la imagen', 'notify-error', 'exclamation-triangle', 'error'));
	}

	/* RENDER COMPONENT */
	render() {
	  const {
	    image,
	  } = this.props;
	  const {
	    redirect, redirectLocation, name, description, category, color, tags, createdBy, createdAt, updatedAt,
	  } = this.state;


	  // Render return
	  if (redirect) {
	    return (<Redirect to={redirectLocation} />);
	  }
	  return (
<div className="card card-detalles">
        <div className="card-header">
          <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
            <li className="nav-item mr-auto">
              {
                image
                  ? <h2 className="detalles-titulo"><FontAwesomeIcon icon={['far', 'edit']} className="mr-3" fixedWidth />Editar una imagen</h2>
                  : <h2 className="detalles-titulo"><FontAwesomeIcon icon="plus-circle" className="mr-3" fixedWidth />Añadir una nueva imagen</h2>
              }
            </li>
            <li className="nav-item ml-2">
              {
                image
                  ? <button onClick={this.handleSubmit} type="button" className="btn btn-info"><FontAwesomeIcon icon="save" className="mr-2" fixedWidth />Guardar cambios</button>
                  : <button onClick={this.handleSubmit} type="button" className="btn btn-info"><FontAwesomeIcon icon="save" className="mr-2" fixedWidth />Añadir</button>
              }
            </li>
          </ul>
        </div>
        <div className="card-body">
          <form id="form">
            <div className="form-group">
              <label htmlFor="nombre">
                <FontAwesomeIcon icon={['far', 'image']} className="mr-2" fixedWidth />Nombre</label>
              <input type="text" className="form-control" id="nombre" placeholder="Nombre de la imagen" name="name" value={name} onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">
                <FontAwesomeIcon icon="info-circle" className="mr-2" fixedWidth />Descripcion</label>
              <input type="text" className="form-control" id="descripcion" placeholder="Descripcion de la imagen" name="description" value={description} onChange={this.handleInputChange} />
            </div>
            <div className="form-row">
              <div className="form-group col-6">
                <label htmlFor="category">
                  <FontAwesomeIcon icon="folder-open" className="mr-2" fixedWidth />Categoría</label>
                <input type="text" className="form-control" id="category" name="category" value={category} onChange={this.handleInputChange} />
              </div>
              <div className="form-group col">
                <label htmlFor="color">
                  <FontAwesomeIcon icon="adjust" className="mr-2" fixedWidth />Color</label>
                <div>
                  <select className="custom-select" name="color" value={color} onChange={this.handleInputChange}>
                    <option value="Color">Color</option>
                    <option value="Escala de grises">Escala de grises</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="etiquetas">
                  <FontAwesomeIcon icon="tags" className="mr-2" fixedWidth />Etiquetas</label>
                <input type="text" className="form-control" name="tags" id="etiquetas" value={tags} onChange={this.handleTagsChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                {
                  tags.map(
                    tag => (tag.trim().length
                      ? <Tag key={tag} tag={tag} category="images" />
                      : ''),
                  )
                }
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="creador">
                <FontAwesomeIcon icon="user" className="mr-2" fixedWidth />Creador</label>
              <input type="text" className="form-control" id="creador" name="user" value={createdBy.name} readOnly="readOnly" />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="fechaCreacion">
                  <FontAwesomeIcon icon={['far', 'calendar']} className="mr-2" fixedWidth />Fecha de creación</label>
                <input type="text" className="form-control" id="fechaCreacion" name="createdAt " value={moment(createdAt).format('dddd, D [de] MMMM [de] YYYY')} readOnly="readOnly" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="fechaModificacion">
                  <FontAwesomeIcon icon={['far', 'calendar']} className="mr-2" fixedWidth />Fecha de modificación</label>
                <input type="text" className="form-control" id="fechaModificacion" name="updatedAt" value={moment(updatedAt).format('dddd, D [de] MMMM [de] YYYY')} readOnly="readOnly" />
              </div>
            </div>
          </form>
        </div>
      </div>
	  );
	}
}

ImageForm.propTypes = {
  image: PropTypes.shape({}),
  data: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}).isRequired,
  token: PropTypes.string.isRequired,
  update: PropTypes.func,
  notify: PropTypes.func,
};

ImageForm.defaultProps = {
  image: null,
  update: () => false,
  notify: () => false,
};

export default ImageForm;
