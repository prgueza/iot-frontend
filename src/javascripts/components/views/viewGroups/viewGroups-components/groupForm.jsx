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
class GroupForm extends Component {
  constructor(props) {
    super(props);
    const { group, user } = this.props;
    this.state = {
      name: group ? group.name : '',
      description: group ? group.description : '',
      tags: group ? group.tags : [],
      images: group ? group.images.map(image => image._id) : [],
      displays: group ? group.displays.map(display => display._id) : [],
      createdAt: group ? moment(group.createdAt) : moment(),
      updatedAt: moment(),
      createdBy: group ? group.createdBy || null : user,
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

	/* HANDLE MULTIPLE CHECKBOX */
	handleCheckDisplays = (event) => {
	  // get value from the checkbox
	  const { target, target: { value } } = event;
	  const { displays } = this.state;
	  // check if the checkbox has been selected
	  if (!displays.find(c => c === value)) { // check if value is stored in state
	    // if it is NOT stored, save the state, push the new value and save back the new state
	    const prevState = displays;
	    prevState.push(value);
	    this.setState({ displays: prevState });
	    target.checked = true;
	  } else {
	    // if it IS stored, save the state, splice the old value and save back the new state
	    const prevState = displays;
	    prevState.splice(prevState.indexOf(value), 1);
	    this.setState({ displays: prevState });
	    target.checked = false;
	  }
	}

	handleCheckImages = (event) => {
	  // get value from the checkbox
	  const { target, target: { value } } = event;
	  const { images } = this.state;
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
	}

	/* HANDLE SUBMIT */
	handleSubmit = () => {
	  // get image if any
	  const {
	    group, token, notify, update,
	  } = this.props;
	  const {
	    name, description, updatedBy, createdBy, tags, displays, images,
	  } = this.state;
	  // define form values to send
	  const form = {
	    name,
	    description,
	    displays,
	    images,
	    tags: tags.map(tag => tag.trim()),
	    createdBy: createdBy._id,
	    updatedBy: updatedBy._id,
	  };
	  // HTTP request
	  axios({
	    method: group ? 'put' : 'post',
	    url: group ? group.url : `${process.env.API_URL}groups`,
	    data: form,
	    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
	  })
	    .then((res) => {
	      if (res.status >= 200) {
	        this.setState({ redirectLocation: `/groups/${res.data.resourceId}` });
	        notify('Grupo configurado con éxito', 'notify-success', 'check', res.data.notify);
	        update('groups', res.data.resourceId, group ? 'edit' : 'add', res.data.resource); // update dataset
	      }
	    })
	    .then(() => this.setState({ redirect: true }))
	    .catch(() => notify('Error al configurar el grupo', 'notify-error', 'exclamation-triangle'));
	}

	render() {
	  const {
	    group,
	    data,
	  } = this.props;
	  const {
	    displays, images, redirect, redirectLocation, name, description, tags, createdAt, updatedAt, createdBy,
	  } = this.state;
	  // Options
	  const optionsDisplays = data.displays.sort((a, b) => a.updated_at - b.updated_at)
	    .map(display => (
        <div key={display._id} className="custom-control custom-checkbox">
				  <input onChange={this.handleCheckDisplays} id={display._id} type="checkbox" defaultChecked={displays.find(c => c === display._id)} name={display._id} defaultValue={display._id} className="custom-control-input" />
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
                ? <h2 className="detalles-titulo"><FontAwesomeIcon icon={['far', 'edit']} className="mr-3" fixedWidth />Editar un grupo</h2>
                : <h2 className="detalles-titulo"><FontAwesomeIcon icon="plus-circle" className="mr-3" fixedWidth />Añadir un nuevo Grupo</h2>
              }
              </li>
              <li className="nav-item ml-2">
              { group
                ? <button onClick={() => this.handleSubmit()} type="button" className="btn btn-warning"><FontAwesomeIcon icon="save" className="mr-2" fixedWidth />Guardar cambios</button>
                : <button onClick={() => this.handleSubmit()} type="button" className="btn btn-warning"><FontAwesomeIcon icon="save" className="mr-2" fixedWidth />Añadir</button>
              }
              </li>
            </ul>
          </div>
          <div className="card-body">
            <form id="form">
              <div className="form-group">
                <label htmlFor="name"><FontAwesomeIcon icon="layer-group" className="mr-2" fixedWidth />Nombre</label>
                <input type="text" className="form-control" id="name" name="name" value={name} onChange={this.handleInputChange} placeholder="Nombre del grupo" />
              </div>
              <div className="form-group">
                <label htmlFor="description"><FontAwesomeIcon icon="info-circle" className="mr-2" fixedWidth />Descripcion</label>
                <input type="text" className="form-control" id="description" name="description" value={description} onChange={this.handleInputChange} placeholder="Descripcion del Grupo" />
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="images"><FontAwesomeIcon icon={['far', 'images']} className="mr-2" fixedWidth />Asociar una o varias imágenes</label>
                  <div className="custom-controls-stacked">
                    {optionsImages}
                  </div>
                </div>
                <div className="form-group col">
                  <label htmlFor="displays"><FontAwesomeIcon icon="tv" className="mr-2" fixedWidth />Asociar uno o varios displays</label>
                  <div className="custom-controls-stacked">
                    {optionsDisplays}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="tags"><FontAwesomeIcon icon="tags" className="mr-2" fixedWidth />Etiquetas</label>
                  <input type="text" className="form-control" name="tags" id="tags" value={tags} onChange={this.handleTagsChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  {
                    tags.map(
                      tag => (tag.trim().length
                        ? <Tag key={tag} tag={tag} category="groups" />
                        : ''),
                    )
                  }
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="fechaCreacion"><FontAwesomeIcon icon={['far', 'calendar']} className="mr-2" fixedWidth />Fecha de creación</label>
                  <input type="text" className="form-control" id="fechaCreacion" name="created_at " value={moment(createdAt).format('dddd, D [de] MMMM [de] YYYY')} readOnly />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="fechaModificacion"><FontAwesomeIcon icon={['far', 'calendar']} className="mr-2" fixedWidth />Fecha de modificación</label>
                  <input type="text" className="form-control" id="fechaModificacion" name="updated_at" value={moment(updatedAt).format('dddd, D [de] MMMM [de] YYYY')} readOnly />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="creador"><FontAwesomeIcon icon="user" className="mr-2" fixedWidth />Creador</label>
                <input type="text" className="form-control" id="creador" name="user" value={createdBy ? createdBy.name : 'Usuario eliminado'} readOnly />
              </div>
            </form>
          </div>
        </div>
	  );
	}
}

GroupForm.propTypes = {
  group: PropTypes.shape({}),
  user: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({}).isRequired,
  token: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
};

GroupForm.defaultProps = {
  group: null,
};

export default GroupForm;
