/* IMPORT MODULES */
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const moment = require('moment');

moment.locale('es');

/* COMPONENTS */
class GroupForm extends Component {
  constructor(props) {
    super(props);
    const { group, user } = this.props;
    let createdBy = user;
    let activeImage = '';
    if (group && group.activeImage) {
      const aux = group.activeImage;
      activeImage = aux;
    }
    if (group && group.CreatedBy) {
      createdBy = group.CreatedBy;
    } else if (group) {
      createdBy = 'Usuario eliminado';
    }
    this.state = {
      // form data stored in state
      activeImage,
      createdBy,
      name: group ? group.name : '',
      description: group ? group.description : '',
      updatedBy: user.name,
      tags: group ? group.tags : [],
      images: group ? group.images.map(image => image._id) : [],
      displays: group ? group.displays.map(display => display._id) : [],
      optionsActiveImage: [],
      redirect: false,
      redirectLocation: '',
    };
  }

  /* INITIAL VALUES FOR FORM INPUTS */
  componentDidMount() {
    const { data, group } = this.props;
    const { images } = this.state;
    // options for select inputs
    const optionsActiveImage = data.images.filter(image => images.find(c => c === image._id))
      .map(image => <option value={image._id} key={image._id}>{image.name}</option>);
    // set state with initial values
    this.setState({
      optionsActiveImage,
      redirectLocation: group ? `/groups/${group._id}` : '/groups/',
    });
  }

	/* HANDLE INPUT CHANGE (CONTROLLED FORM) */
	handleInputChange = (event) => {
	  const { target: { name, value } } = event.target;
	  const storeValue = value;
	  if (name === 'tags') storeValue.split(',');
	  this.setState({
	    [name]: storeValue,
	  });
	}

	/* HANDLE MULTIPLE CHECKBOX */
	handleCheckDisplays = (event) => {
	  // get value from the checkbox
	  const { target: { value } } = event.target;
	  const { displays } = this.state;
	  // check if the checkbox has been selected
	  if (!displays.find(c => c === value)) { // check if value is stored in state
	    // if it is NOT stored, save the state, push the new value and save back the new state
	    const prevState = displays;
	    prevState.push(value);
	    this.setState({ displays: prevState });
	  } else {
	    // if it IS stored, save the state, splice the old value and save back the new state
	    const prevState = displays;
	    prevState.splice(prevState.indexOf(value), 1);
	    this.setState({ displays: prevState });
	  }
	}

	handleCheckImages = (event) => {
	  // get value from the checkbox
	  const { target, target: { value } } = event.target;
	  const { images } = this.state;
	  const { data } = this.props;
	  // check if the checkbox has been selected
	  if (!images.find(c => c === value)) { // check if value is stored in state
	    // if it is NOT stored, save the state, push the new value and save back the new state
	    const prevState = images;
	    prevState.push(value);
	    this.setState({ images: prevState });
	    target.checked = true;
	  } else {
	    // if it IS stored, save the state, splice the old value and save back the new state
	    const prevState = images;
	    prevState.splice(prevState.indexOf(value), 1);
	    this.setState({ images: prevState });
	    target.checked = false;
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
	} // TODO: filter options and hide unselected options for reviewing / Also limit images could be an option

	/* HANDLE SUBMIT */
	handleSubmit = () => {
	  // get image if any
	  const {
	    group, user, token, notify, update,
	  } = this.props;
	  const {
	    name, description, updatedBy, tags, activeImage, displays, images,
	  } = this.state;
	  // define form values to send
	  const form = {
	    name,
	    description,
	    tags,
	    activeImage: null,
	    displays: [],
	    images: [],
	    updatedBy: updatedBy._id, // send user_id
	  };
	  // possible empty fields
	  if (!group) form.createdBy = user._id;
	  if (activeImage !== '') form.activeImage = activeImage;
	  if (displays.length > 0) form.displays = displays;
	  if (images.length > 0) form.images = images;
	  // HTTP request
	  axios({
	    method: group ? 'put' : 'post',
	    url: group ? group.url : 'http://localhost:4000/groups',
	    data: form,
	    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
	  })
	    .then((res) => {
	      if (res.status === 201) {
	        notify('Grupo configurada con éxito', 'notify-success', 'check', toast.POSITION.TOP_RIGHT, res.data.notify);
	        const action = group ? 'edit' : 'add';
	        update('groups', res.resourceId, action, res.data.resource); // update dataset
	      }
	    })
	    .then(() => this.setState({ redirect: true }))
	    .catch(() => notify('Error al configurar el grupo', 'notify-error', 'exclamation-triangle', toast.POSITION.TOP_RIGHT));
	}

	render() {
	  const {
	    group,
	    data,
	  } = this.props;
	  const {
	    displays, images, redirect, redirectLocation, name, description, activeImage, optionsActiveImage, tags, createdAt, updatedAt, createdBy,
	  } = this.state;
	  // Options
	  const optionsDisplays = data.displays.sort((a, b) => a.updated_at - b.updated_at)
	    .map(display => (
        <div key={display._id} className="custom-control custom-checkbox">
				  <input onChange={this.handleCheckDisplays} id={display._id} type="checkbox" defaultChecked={displays.find(c => c === data.displays._id)} name={display._id} defaultValue={display._id} className="custom-control-input" />
				  <label className="custom-control-label" htmlFor={display._id}>{display.name}</label>
				</div>
	    ));
	  const optionsImages = data.images.sort((a, b) => a.updated_at - b.updated_at)
	    .map(image => (
        <div key={image._id} className="custom-control custom-checkbox">
				  <input onChange={this.handleCheckImages} id={image._id} type="checkbox" defaultChecked={images.find(c => c === image._id)} name={image._id} defaultValue={image._id} className="custom-control-input" />
				  <label className="custom-control-label" htmlFor={image._id}>{image.name}</label>
				</div>
	    ));

	  // Render return
	  if (redirect) {
	    return (<Redirect to={redirectLocation} />);
	  }
	  return (
				<div className="card card-detalles">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
              <li className="nav-item mr-auto">
              { group
                ? <h2 className="detalles-titulo"><i className="fa fa-pencil mr-3" aria-hidden="true" />Editar un grupo</h2>
                : <h2 className="detalles-titulo"><i className="fa fa-plus-circle mr-3" aria-hidden="true" />Añadir un nuevo Grupo</h2>
              }
              </li>
              <li className="nav-item ml-2">
              { group
                ? <button onClick={() => this.handleSubmit()} type="button" className="btn btn-success"><i className="fa fa-save mr-2" aria-hidden="true" />Guardar cambios</button>
                : <button onClick={() => this.handleSubmit()} type="button" className="btn btn-success"><i className="fa fa-plus-circle mr-2" aria-hidden="true" />Añadir</button>
              }
              </li>
            </ul>
          </div>
          <div className="card-body">
            <form id="form">
              <div className="form-group">
                <label htmlFor="name"><i className="fa fa-picture-o mr-2" />Nombre</label>
                <input type="text" className="form-control" id="name" name="name" value={name} onChange={this.handleInputChange} placeholder="Nombre del grupo" />
              </div>
              <div className="form-group">
                <label htmlFor="description"><i className="fa fa-info-circle mr-2" />Descripcion</label>
                <input type="text" className="form-control" id="description" name="description" value={description} onChange={this.handleInputChange} placeholder="Descripcion del Grupo" />
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
                  <label htmlFor="images"><i className="fa fa-picture-o mr-2" />Asociar una o varias imágenes</label>
                  <div className="custom-controls-stacked">
                    {optionsImages}
                  </div>
                </div>
                <div className="form-group col">
                  <label htmlFor="displays"><i className="fa fa-television mr-2" />Asociar uno o varios displays</label>
                  <div className="custom-controls-stacked">
                    {optionsDisplays}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="tags"><i className="fa fa-tags mr-2" />Etiquetas</label>
                  <input type="text" className="form-control" name="tags" id="tags" value={tags} onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  {tags.map(tag => (tag.length > 1 ? <button type="button" className="btn mr-1 btn-outline-group btn-tiny" key={tag}>{tag}</button> : ''))}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="fechaCreacion"><i className="fa fa-calendar-o mr-2" />Fecha de creación</label>
                  <input type="text" className="form-control" id="fechaCreacion" name="created_at " value={moment(createdAt).format('dddd, D [de] MMMM [de] YYYY')} readOnly />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="fechaModificacion"><i className="fa fa-calendar-o mr-2" />Fecha de modificación</label>
                  <input type="text" className="form-control" id="fechaModificacion" name="updated_at" value={moment(updatedAt).format('dddd, D [de] MMMM [de] YYYY')} readOnly />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="creador"><i className="fa fa-user-o mr-2" />Creador</label>
                <input type="text" className="form-control" id="creador" name="user" value={createdBy.name} readOnly />
              </div>
            </form>
          </div>
        </div>
	  );
	}
}

GroupForm.propTypes = {
  group: PropTypes.shape,
  user: PropTypes.shape.isRequired,
  data: PropTypes.shape.isRequired,
  token: PropTypes.string.isRequired,
  update: PropTypes.shape.isRequired,
  notify: PropTypes.shape.isRequired,
};

GroupForm.defaultProps = {
  group: null,
};

export default GroupForm;
