/* IMPORT MODULES */
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* IMPORT COMPONENTS */
import Tag from '../../../tags/tag';

const moment = require('moment');

moment.locale('es');

/* COMPONENTS */
class DisplayForm extends Component {
  constructor(props) {
    super(props);
    const { display, device, user } = this.props;
    this.state = {
      device: display ? display.device : device,
      images: display ? display.images.map(image => image._id) : [],
      name: display ? display.name : '',
      description: display ? display.description : '',
      tags: display ? display.tags : [],
      category: display ? display.category : '',
      createdBy: display ? display.createdBy || null : user,
      updatedBy: user,
      createdAt: display ? moment(display.createdAt) : moment(),
      updatedAt: moment(),
      previewImage: '',
      redirect: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { device: newDevice } = nextProps;
    const { device: oldDevice } = this.state;
    if (newDevice && newDevice._id !== oldDevice._id) {
      this.setState({ device: newDevice });
    }
  }

	handleOnMouseEnter = (imageId) => {
	  const { data: { images } } = this.props;
	  const previewImage = images.find(image => image._id === imageId);
	  this.setState({ previewImage });
	}

	handleOnMouseLeave = () => {
	  this.setState({ previewImage: '' });
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

	/* HANDLE MULTIPLE CHECKBOX */
	handleCheckImages = (event) => {
	  const { images } = this.state;
	  // get value from the checkbox
	  const { target: { value } } = event;
	  // check if the checkbox has been selected
	  if (!images.find(c => c === value)) { // check if value is stored in state
	    // if it is NOT stored, save the state, push the new value and save back the new state
	    const prevState = images;
	    prevState.push(value);
	    this.setState({ images: prevState });
	  } else {
	    // if it IS stored, save the state, splice the old value and save back the new state
	    const prevState = images;
	    prevState.splice(prevState.indexOf(value), 1);
	    this.setState({ images: prevState });
	  }
	}

	/* HANDLE SUMBIT (PUT OR POST) */
	handleSubmit = () => { // FIXME: handleSubmit (method) specify method beforehand from the buttom
	  // get display if any
	  const {
	    display, token, notify, update,
	  } = this.props;
	  const {
	    name, description, category, tags, device, updatedBy, createdBy, images,
	  } = this.state;
	  // define form values to send
	  const form = {
	    name,
	    description,
	    category,
	    images,
	    tags: tags.map(tag => tag.trim()),
	    device: device._id,
	    createdBy: createdBy._id,
	    updatedBy: updatedBy._id,
	  };
	  // HTTP request
	  axios({
	    method: display ? 'put' : 'post',
	    url: display ? display.url : `${process.env.API_URL}displays`,
	    data: form,
	    headers: {
	      Accept: 'application/json',
	      'Content-Type': 'application/json',
	      Authorization: `Bearer ${token}`,
	    },
	  })
	    .then((res) => {
	      if (res.status >= 200) {
	        this.setState({ location: `/displays/${res.data.resourceId}` });
	        notify('Display configurado con éxito', 'notify-success', 'upload');
	        update('displays', res.data.resourceId, display ? 'edit' : 'add', res.data.resource, res.data.devices); // update dataset
	      }
	    })
	    .then(() => this.setState({ redirect: true }))
	    .catch(() => notify('Error al configurar el display', 'notify-error', 'times', 'error'));
	}

	/* RENDER COMPONENT */
	render() {
	  const {
	    redirect, images, location, device, name, description, category, tags, createdAt, updatedAt, createdBy, previewImage,
	  } = this.state;
	  const {
	    display, data,
	  } = this.props;

	  const linkBack = display ? `/displays/${display._id}` : '/displays';

	  // Options
	  const optionsImages = data.images.sort((a, b) => a.updatedAt - b.updatedAt)
	    .map(image => (
        <div key={image._id} onMouseEnter={() => this.handleOnMouseEnter(image._id)} onMouseLeave={this.handleOnMouseLeave} className="custom-control custom-checkbox">
				  <input onChange={this.handleCheckImages} id={image._id} type="checkbox" defaultChecked={images.find(c => c === image._id)} name={image._id} defaultValue={image._id} className="custom-control-input" />
				  <label className="custom-control-label" htmlFor={image._id}>{image.name}</label>
				</div>
	    ));

	  let showImage;
	  if (previewImage && previewImage.src) {
	    showImage = (
        <div className="preview-image d-flex w-100 align-items-center shadow">
           <img alt="" className="imagen" src={previewImage.src} />
        </div>
	    );
	  } else if (previewImage) {
	    showImage = (
        <div className="preview-image-empty d-flex w-100 align-items-center justify-content-center shadow">
          <p>La imagen aun no ha sido determinada</p>
        </div>
	    );
	  } else {
	    showImage = (
       <div className="preview-image-empty d-flex w-100 align-items-center">
         <p>Pase el raton por encima de los nombres de las imágenes para previsualizarlas</p>
       </div>
	    );
	  }

	  // Render return
	  if (redirect) {
	    return (<Redirect to={location} />);
	  } if (!device) {
	    return (
      <div className="card card-detalles">
        <div className="card-header">
          <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
            <li className="nav-item mr-auto">
              <h2 className="detalles-titulo text-center">
                <FontAwesomeIcon icon="tv" className="mr-3" fixedWidth />Configurar dispositivo</h2>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <div className="text-center">
            <h1>No hay dispositivos sin configurar</h1>
            <hr className="card-division" />
            <small>Pida al administrador del sistema que de de alta un nuevo dispositivo para configurarlo.</small>
          </div>
        </div>
      </div>
	    );
	  }
	  return (
      <div className="card detalles">
        <div className="card-header">
          <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
            <li className="nav-item mr-auto">
              {
                display
                  ? <h2 className="detalles-titulo"><FontAwesomeIcon icon={['far', 'edit']} className="mr-3" fixedWidth />Editar un display</h2>
                  : <h2 className="detalles-titulo"><FontAwesomeIcon icon="wrench" className="mr-3" fixedWidth />Configurar un nuevo display</h2>
              }
            </li>
						<li className="nav-item mr-2">
							<Link to={linkBack}>
								<button type="button" className="btn btn-warning">
									<FontAwesomeIcon icon="times" className="mr-2" fixedWidth />Cancelar</button>
							</Link>
						</li>
            <li className="nav-item ml-2">
              {
                display
                  ? <button onClick={this.handleSubmit} type="button" className="btn btn-success"><FontAwesomeIcon icon="save" className="mr-2" fixedWidth />Guardar cambios</button>
                  : <button onClick={this.handleSubmit} type="button" className="btn btn-success"><FontAwesomeIcon icon="save" className="mr-2" fixedWidth />Guardar configuración</button>
              }
            </li>
          </ul>
        </div>
        <div className="card-body">
          <form id="form">
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="device">
                  <FontAwesomeIcon icon="tablet-alt" className="mr-2" fixedWidth />Dispositivo físico asociado</label>
                <div>
                  <input className="form-control" name="device" value={device.name} readOnly="readOnly" />
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="bt">
                  <FontAwesomeIcon icon="info-circle" className="mr-2" fixedWidth />Descripción</label>
                <input type="text" className="form-control text-truncate" id="bt" name="bt" value={device.description} readOnly="readOnly" />
              </div>
            </div>
            <hr className="card-division" />
            <div className="form-group">
              <label htmlFor="nombre">
                <FontAwesomeIcon icon="tv" className="mr-2" fixedWidth />Nombre</label>
              <input type="text" className="form-control" id="nombre" placeholder="Nombre del display" name="name" value={name} onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">
                <FontAwesomeIcon icon="info-circle" className="mr-2" fixedWidth />Descripcion</label>
              <input type="text" className="form-control" id="descripcion" placeholder="Descripcion del display" name="description" value={description} onChange={this.handleInputChange} />
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="category"><FontAwesomeIcon icon="folder-open" className="mr-2" fixedWidth />Categoría</label>
                <input type="text" className="form-control" id="category" placeholder="Categoría" name="category" value={category} onChange={this.handleInputChange} />
              </div>
            </div>
						<div className="form-row">
	            <div className="form-group col">
	              <label htmlFor="images"><FontAwesomeIcon icon={['far', 'images']} className="mr-2" fixedWidth />Asociar una o varias imagenes</label>
								{optionsImages.length > 0
								  ? <div className="custom-controls-stacked">{optionsImages}</div>
								  : (
                      <div className="no-image-available d-flex w-100 align-items-center justify-content-center">
												<p>No hay imágenes disponibles</p>
											</div>
								  )
								}
	            </div>
							<div className="form-group col">
								<label htmlFor="images"><FontAwesomeIcon icon="eye" className="mr-2" fixedWidth />Previsualización de la imagen <small>(Puede aparecer recortada)</small></label>
									{ showImage	}
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
                      ? <Tag key={tag} tag={tag} category="displays" />
                      : ''),
                  )
                }
              </div>
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
            <div className="form-group">
              <label htmlFor="creador">
                <FontAwesomeIcon icon="user" className="mr-2" fixedWidth />Creador</label>
              <input type="text" className="form-control" id="creador" name="user" value={createdBy.name} readOnly="readOnly" />
            </div>
          </form>
        </div>
      </div>
	  );
	}
}

DisplayForm.propTypes = {
  device: PropTypes.shape({}),
  display: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
  token: PropTypes.string.isRequired,
  data: PropTypes.shape({}).isRequired,
  notify: PropTypes.func,
  update: PropTypes.func,
};

DisplayForm.defaultProps = {
  device: null,
  display: null,
  notify: () => false,
  update: () => false,
};

export default DisplayForm;
