/* IMPORT MODULES */
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

/* IMPORT COMPONENTS */
import Tag from '../../../tags/tag';

const moment = require('moment');

moment.locale('es');

/* COMPONENTS */
class DisplayForm extends Component {
  constructor(props) {
    super(props);
    const { display, user } = this.props;
    let activeImage;
    if (display && display.activeImage) {
      activeImage = display.activeImage._id;
    } else {
      activeImage = '';
    }
    let images;
    if (display && display.images) {
      images = display.images.map(image => image._id);
    } else {
      images = [];
    }
    this.state = {
      activeImage,
      images,
      name: display ? display.name : '',
      description: display ? display.description : '',
      createdBy: display ? (display.createdBy || { name: 'Usuario eliminado' }) : user,
      tags: display ? display.tags : [],
      category: display ? display.category : '',
      createdAt: display ? moment(display.createdAt) : moment(),
      updatedAt: moment(),
      group: display ? display.group : '',
      device: '',
      // form options stored in state
      optionsActiveImage: [],
      previewImage: '',
      // redirect variables
      redirect: false,
      location: '/displays',
    };
  }

  /* INITIAL VALUES FOR FORM INPUTS */
  componentDidMount() {
    const { display, data, device } = this.props;
    const { images } = this.state;
    // get options for active image
    const optionsActiveImage = data.images.filter(image => images.find(c => c === image._id)).map(image => <option value={image._id} key={image._id}>{image.name}</option>);
    // set state with initial values
    if (display && display.device) {
      this.setState({
        device: display.device._id,
        optionsActiveImage,
        location: `/displays/${display._id}`, // Redirect url
      });
    } else {
      this.setState({
        device,
        optionsActiveImage,
        location: '/displays', // Redirect url
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { device: newDevice } = nextProps;
    const { device: oldDevice } = this.state;
    if (newDevice._id !== oldDevice._id) { // if props actually changed
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
	  const { target } = event;
	  const { name } = target;
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

	/* HANDLE MULTIPLE CHECKBOX */
	handleCheckImages = (event) => {
	  const { images } = this.state;
	  const { data } = this.props;
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
	  if (images.length === 1) {
	    // set when first image is selected
	    this.setState({ activeImage: images[0] });
	  } else if (images.length === 0) {
	    // if there are no images deselect
	    this.setState({ activeImage: '' });
	  }
	  this.setState({
	    optionsActiveImage: data.images.filter(image => images.find(c => c === image._id))
	      .map(image => <option value={image._id} key={image._id}>{image.name}</option>),
	  });
	}

	/* HANDLE SUMBIT (PUT OR POST) */
	handleSubmit = () => { // FIXME: handleSubmit (method) specify method beforehand from the buttom
	  // get display if any
	  const {
	    display, user, token, notify, update,
	  } = this.props;
	  const {
	    name, description, category, tags, device, activeImage, images, group,
	  } = this.state;
	  // define form values to send
	  const form = {
	    name,
	    description,
	    category,
	    tags,
	    device: device._id,
	    activeImage: null,
	    images: null,
	    group: null,
	    updatedBy: user._id, // send user_id
	  };
	  // possible empty fields
	  if (!display) form.createdBy = user._id;
	  if (activeImage !== '') form.activeImage = activeImage;
	  if (images.length > 0) form.images = images;
	  if (group && group._id) form.group = group._id;
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
	      if (res.status === 201) {
	        notify('Display configurado con éxito', 'notify-success', 'upload');
	        const action = display ? 'edit' : 'add';
	        return update('displays', res.data.resourceId, action, res.data.resource, res.data.devices); // update dataset
	      }
	      return false;
	    })
	    .then(() => this.setState({ redirect: true }))
	    .catch(() => notify('Error al configurar el display', 'notify-error', 'exclamation-triangle'));
	}

	/* RENDER COMPONENT */
	render() {
	  const {
	    redirect, images, location, device, name, description, category, group, activeImage, optionsActiveImage, tags, createdAt, updatedAt, createdBy, previewImage,
	  } = this.state;
	  const {
	    display, data, data: { groups },
	  } = this.props;

	  const linkBack = display ? `/displays/${display._id}` : '/displays';

	  // Options
	  const optionsGroup = groups.map(g => (<option value={g._id} key={g._id}>{g.name}</option>));
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
                <i className="fa fa-television mr-3" aria-hidden="true" />Configurar dispositivo</h2>
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
                  ? (
										<h2 className="detalles-titulo">
                      <i className="fa fa-pencil mr-3" aria-hidden="true" />Editar un display
										</h2>
                  )
                  : (
										<h2 className="detalles-titulo">
                      <i className="fa fa-plus-circle mr-3" aria-hidden="true" />Configurar un nuevo display
										</h2>
                  )
              }
            </li>
						<li className="nav-item mr-2">
							<Link to={linkBack}>
								<button type="button" className="btn btn-warning">
									<i className="fa fa-times mr-2" aria-hidden="true" />Cancelar</button>
							</Link>
						</li>
            <li className="nav-item ml-2">
              {
                display
                  ? (
										<button onClick={this.handleSubmit} type="button" className="btn btn-success">
                      <i className="fa fa-save mr-2" aria-hidden="true" />Guardar cambios
										</button>
                  )
                  : (
										<button onClick={this.handleSubmit} type="button" className="btn btn-success">
                      <i className="fa fa-plus-circle mr-2" aria-hidden="true" />Guardar configuración
										</button>
                  )
              }
            </li>
          </ul>
        </div>
        <div className="card-body">
          <form id="form">
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="device">
                  <i className="fa fa-tablet mr-2" />Dispositivo físico asociado</label>
                <div>
                  <input className="form-control" name="device" value={device.name} readOnly="readOnly" />
                </div>
              </div>
              <div className="form-group col">
                <label htmlFor="bt">
                  <i className="fa fa-info-circle mr-2" />Descripción</label>
                <input type="text" className="form-control text-truncate" id="bt" name="bt" value={device.description} readOnly="readOnly" />
              </div>
            </div>
            <hr className="card-division" />
            <div className="form-group">
              <label htmlFor="nombre">
                <i className="fa fa-television mr-2" />Nombre</label>
              <input type="text" className="form-control" id="nombre" placeholder="Nombre del display" name="name" value={name} onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">
                <i className="fa fa-info-circle mr-2" />Descripcion</label>
              <input type="text" className="form-control" id="descripcion" placeholder="Descripcion del display" name="description" value={description} onChange={this.handleInputChange} />
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="category"><i className="fa fa-arrows-alt mr-2" />Categoría</label>
                <input type="text" className="form-control" id="category" placeholder="Categoría" name="category" value={category} onChange={this.handleInputChange} />
              </div>
              <div className="form-group col">
								<label htmlFor="group"><i className="fa fa-list mr-2" />Incluir en un grupo</label>
									<select className="custom-select" id="group" name="group" value={group} onChange={this.handleInputChange}>
										<option value="" key={0}>Sin grupo asignado</option>
										{optionsGroup}
									</select>
              </div>
            </div>
            <div className="form-group">
							<label htmlFor="activeImage"><i className="fa fa-picture-o mr-2" />Seleccionar la imagen activa</label>
							<select className="custom-select" id="activeImage" name="activeImage" value={activeImage} onChange={this.handleInputChange}>
								<option value="" key={0}>Sin imagen activa</option>
								{optionsActiveImage}
							</select>
						</div>
						<div className="form-row">
	            <div className="form-group col">
	              <label htmlFor="images"><i className="fa fa-television mr-2" />Asociar una o varias imagenes</label>
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
								<label htmlFor="images"><i className="fa fa-eye mr-2" />Previsualización de la imagen <small>(Puede aparecer recortada)</small></label>
									{ showImage	}
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
                      ? <Tag key={tag} tag={tag} category="displays" />
                      : ''),
                  )
                }
              </div>
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
            <div className="form-group">
              <label htmlFor="creador">
                <i className="fa fa-user-o mr-2" />Creador</label>
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
