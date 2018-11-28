/* IMPORT MODULES */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

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
      createdBy: image ? (image.createdBy || { name: 'Usuario eliminado' }) : user,
      updatedBy: user.name,
      category: image ? image.category : '',
      tags: image ? image.tags : [],
      createdAt: image ? moment(image.createdAt) : moment(),
      updatedAt: moment(),
      displays: image ? image.displays.map(display => display._id) : [],
      groups: image ? image.groups.map(group => group._id) : [],
      color: image ? image.color : 'Color',
      redirect: false,
      redirectLocation: '/images',
    };
  }

  /* INITIAL VALUES FOR FORM INPUTS */
  componentDidMount() {
    const { image } = this.props;
    // set state with initial values
    this.setState({
      redirectLocation: image ? `/images/${image._id}` : '/images', // Redirect url
    });
  }

	/* HANDLE INPUT CHANGE (CONTROLLED FORM) */
	handleInputChange = (event) => {
	  const { target, target: { name } } = event;
	  let value;
	  if (name === 'tags') {
	    value = target.value.split(','); // TODO: better string to array conversion
	  } else {
	    const { value: aux } = target;
	    value = aux;
	  }
	  this.setState({
	    [name]: value,
	  });
	}

	/* HANDLE SUMBIT (PUT OR POST) */
	handleSubmit = () => {
	  // get image if any
	  const {
	    image, user, token, update, notify,
	  } = this.props;
	  const {
	    name, description, updatedBy, category, tags, color, displays, groups,
	  } = this.state;
	  // define form values to send
	  const form = {
	    name,
	    description,
	    category,
	    tags,
	    color,
	    updatedBy: updatedBy._id, // send user_id
	  };
	  // possible empty fields
	  if (!image) form.createdBy = user._id;
	  if (displays.length > 0) {
	    form.displays = displays;
	  } else {
	    form.displays = [];
	  }
	  if (groups.length > 0) {
	    form.groups = groups;
	  } else {
	    form.groups = [];
	  }
	  // HTTP request
	  axios({
	    method: image ? 'put' : 'post',
	    url: image ? image.url : 'http://localhost:4000/images',
	    data: form,
	    headers: {
	      Accept: 'application/json',
	      'Content-Type': 'application/json',
	      Authorization: `Bearer ${token}`,
	    },
	  })
	    .then((res) => {
	      if (res.status === 201) {
	        notify('Imagen configurada con éxito', 'notify-success', 'upload', res.data.notify);
	        const action = image ? 'edit' : 'add';
	        return update('images', res.data.resourceId, action, res.data.resource); // update dataset
	      }
	      return false;
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
                  ? <h2 className="detalles-titulo"><i className="fa fa-pencil mr-3" aria-hidden="true" />Editar una imagen</h2>
                  : <h2 className="detalles-titulo"><i className="fa fa-plus-circle mr-3" aria-hidden="true" />Añadir una nueva imagen</h2>
              }
            </li>
            <li className="nav-item ml-2">
              {
                image
                  ? <button onClick={this.handleSubmit} type="button" className="btn btn-info"><i className="fa fa-save mr-2" aria-hidden="true" />Guardar cambios</button>
                  : <button onClick={this.handleSubmit} type="button" className="btn btn-info"><i className="fa fa-plus-circle mr-2" aria-hidden="true" />Añadir</button>
              }
            </li>
          </ul>
        </div>
        <div className="card-body">
          <form id="form">
            <div className="form-group">
              <label htmlFor="nombre">
                <i className="fa fa-picture-o mr-2" />Nombre</label>
              <input type="text" className="form-control" id="nombre" placeholder="Nombre de la imagen" name="name" value={name} onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">
                <i className="fa fa-info-circle mr-2" />Descripcion</label>
              <input type="text" className="form-control" id="descripcion" placeholder="Descripcion de la imagen" name="description" value={description} onChange={this.handleInputChange} />
            </div>
            <div className="form-row">
              <div className="form-group col-6">
                <label htmlFor="category">
                  <i className="fa fa-th-large mr-2" />Categoría</label>
                <input type="text" className="form-control" id="category" name="category" value={category} onChange={this.handleInputChange} />
              </div>
              <div className="form-group col">
                <label htmlFor="color">
                  <i className="fa fa-tint mr-2" />Color</label>
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
                  <i className="fa fa-tags mr-2" />Etiquetas</label>
                <input type="text" className="form-control" name="tags" id="etiquetas" value={tags} onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                {
                  tags.map(
                    tag => (tag.length > 1
                      ? <Tag key={tag} tag={tag} category="images" />
                      : ''),
                  )
                }
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="creador">
                <i className="fa fa-user-o mr-2" />Creador</label>
              <input type="text" className="form-control" id="creador" name="user" value={createdBy.name} readOnly="readOnly" />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="fechaCreacion">
                  <i className="fa fa-calendar-o mr-2" />Fecha de creación</label>
                <input type="text" className="form-control" id="fechaCreacion" name="createdAt " value={moment(createdAt).format('dddd, D [de] MMMM [de] YYYY')} readOnly="readOnly" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="fechaModificacion">
                  <i className="fa fa-calendar-o mr-2" />Fecha de modificación</label>
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
