/* IMPORT MODULES */
import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

/* IMPORT COMPONENTS */
import Screen from '../../../lists/lists-components/screen';

/* COMPONENTS */
class ManageScreens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      error: null,
      edit: false,
      elementId: '',
      // form
      name: '',
      height: 0,
      width: 0,
      screenCode: '',
      colorProfile: 'grayscale',
      description: '',
    };
  }


  componentDidMount() {
    const { data: { screens } } = this.props;
	  this.setState({ isLoaded: true, screens });
  }

  componentWillReceiveProps(nextProps) {
	  this.setState({ isLoaded: true, screens: nextProps.data.screens });
  }

	edit = (elementId) => {
	  const { screens } = this.state;
	  const {
	    name, width, height, description, screenCode, colorProfile,
	  } = screens.find(s => s._id === elementId);
	  this.setState({
	    name,
	    width,
	    height,
	    description,
	    screenCode,
	    colorProfile,
	    elementId,
	    edit: true,
	  });
	}

	cancel = () => {
	  this.setState({
	    name: '',
	    width: '',
	    height: '',
	    description: '',
	    screenCode: '',
	    colorProfile: 'grayscale',
	    elementId: '',
	    edit: false,
	  });
	}

	handleInputChange = (event) => {
	  const { target: { name, value } } = event;
	  this.setState({
	    [name]: value,
	  });
	}

	/* HANDLE SUBMIT */
	handleSubmit = (method) => {
	  const {
	    name, size, screenCode, colorProfile, description, edit, elementId,
	  } = this.state;
	  const { token, update, notify } = this.props;
	  // FORM DATA
	  const form = {
	    name,
	    size,
	    screenCode,
	    colorProfile,
	  };
	  if (description !== '') { form.description = description; }
	  axios({
	    method,
	    url: edit ? `http://localhost:4000/screens/${elementId}` : 'http://localhost:4000/screens',
	    data: form,
	    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
	  })
	    .then((res) => {
	      if (res.status === 201 || res.status === 200) {
	        switch (method) {
	          case 'put':
	            notify('Pantalla modificada con éxito', 'notify-success', 'floppy-o', toast.POSITION.TOP_RIGHT, res.data.notify);
	            update('screens', res.data.resourceId, 'edit', res.data.resource); // update dataset
	            break;
	          case 'post':
	            notify('Pantalla creada con éxito', 'notify-success', 'upload', toast.POSITION.TOP_RIGHT, res.data.notify);
	            update('screens', res.data.resourceId, 'add', res.data.resource); // update dataset
	            this.edit(res.data.resourceId);
	            break;
	          case 'delete':
	            notify('Pantalla eliminada con éxito', 'notify-success', 'trash', toast.POSITION.TOP_RIGHT, res.data.notify);
	            this.cancel();
	            update('screens', res.data.resourceId, 'remove', res.data.resource); // update dataset
	            break;
	          default:
	            console.log('Something went wrong');
	        }
	      } else {
	        this.setState({
	          isLoaded: true,
	          error: res.data,
	        });
	      }
	    })
	    .catch(() => notify('Error al añadir/modificar una pantalla', 'notify-error', 'exclamation-triangle', toast.POSITION.TOP_RIGHT));
	}

	render() {
	  const {
	    screens, error, isLoaded, edit, elementId, name, height, width, description, colorProfile, screenCode,
	  } = this.state;

	  if (error) {
	    return null; // TODO: handle error
	  } if (!isLoaded) {
	    return null; // TODO: handle loading
	  }
	  const list = screens.map((screen) => {
	    if (screen._id === elementId) {
	      return <Screen screen={screen} key={screen._id} edit={this.edit} active />;
	    }
	      return <Screen screen={screen} key={screen._id} edit={this.edit} active={false} />;
	  });
	  list.push(
				<div key="0" className="list-group-item-action list-group-item flex-column align-items-start">
          <div className="text-center elemento">
            <h4 className="mb-1">No se han encontrado {screens.length > 0 && 'más'} pantallas</h4>
            <hr className="card-division" />
            <small>Número de pantallas: {screens.length}</small>
          </div>
        </div>,
	  );
	  return (
				<div className="card settings">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
              <li className="nav-item mr-auto">
                <h2 className="detalles-titulo"><i className="fa fa-window-maximize mr-3" aria-hidden="true" />Pantallas</h2>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <h3>{edit ? 'Editar pantalla' : 'Añadir pantalla'}</h3>
                <hr className="card-division" />
                <form>
                  <div className="form-row">
                    <div className="form-group col-6">
                      <label htmlFor="name"><i className="fa fa-fw fa-window-maximize mr-2" />Nombre</label>
                      <input type="text" className="form-control" id="name" placeholder="Nombre de la resolución" name="name" value={name} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group col-3">
                      <label htmlFor="heigth"><i className="fa fa-fw fa-arrows-v mr-2" />Alto</label>
                      <input type="text" className="form-control" id="heigth" placeholder="Alto" name="height" value={height} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group col-3">
                      <label htmlFor="width"><i className="fa fa-fw fa-arrows-h mr-2" />Ancho</label>
                      <input type="text" className="form-control" id="width" placeholder="Ancho" name="width" value={width} onChange={this.handleInputChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description"><i className="fa fa-fw fa-info-circle mr-2" />Descripción</label>
                    <input type="text" className="form-control" id="description" placeholder="Descripción de la resolución" name="description" value={description} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <label htmlFor="colorProfile"><i className="fa fa-adjust mr-2" />Color</label>
                      <div>
                        <select className="custom-select" name="colorProfile" value={colorProfile} onChange={this.handleInputChange}>
                          <option value="color">Color</option>
                          <option value="grayscale">Escala de grises</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group col">
                      <label htmlFor="screenCode"><i className="fa fa-fw fa-code mr-2" />Código de pantalla</label>
                      <input type="text" className="form-control" id="screenCode" placeholder="Código" name="screenCode" value={screenCode} onChange={this.handleInputChange} />
                    </div>
                  </div>
                  { !edit
                    ? <button onClick={() => this.handleSubmit('post')} type="button" className="btn btn-block btn-small btn-success"><i className="fa fa-plus-circle mr-1" aria-hidden="true" />Añadir</button>
                    : (
<div className="d-flex w-100 justify-content-between">
                      <button onClick={() => this.handleSubmit('put')} type="button" className="btn btn-block btn-small btn-success mr-2"><i className="fa fa-floppy-o mr-1" aria-hidden="true" />Actualizar</button>
                      <button onClick={() => this.handleSubmit('delete')} type="button" className="btn btn-block btn-small btn-danger ml-1 mr-1"><i className="fa fa-trash-o mr-1" aria-hidden="true" />Eliminar</button>
                      <button onClick={() => this.cancel()} type="button" className="btn btn-block btn-small btn-warning ml-2"><i className="fa fa-times mr-1" aria-hidden="true" />Cancelar</button>
                    </div>
                    )
                  }
                </form>
              </div>
              <div className="col-6">
                <h3 className="d-flex w-100 justify-content-between">Pantallas<span>{screens.length}</span></h3>
                <hr className="card-division" />
                <div className="list settings-list">
                  <div className="list-group mb-3">
                    {list}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
	  );
	}
}

ManageScreens.propTypes = {
  data: PropTypes.shape.isRequired,
  token: PropTypes.string.isRequired,
  update: PropTypes.shape.isRequired,
  notify: PropTypes.shape.isRequired,
};

export default ManageScreens;
