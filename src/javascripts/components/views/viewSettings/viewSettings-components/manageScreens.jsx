/* IMPORT MODULES */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      color: 'Escala de grises',
      description: '',
    };
  }


  componentDidMount() {
    const { data: { screens } } = this.props;
	  this.setState({ isLoaded: true, screens });
  }

  componentWillReceiveProps(nextProps) {
    const { data: { screens } } = nextProps;
	  this.setState({ isLoaded: true, screens });
  }

	edit = (elementId) => {
	  const { screens } = this.state;
	  const {
	    name, width, height, description, screenCode, color,
	  } = screens.find(s => s._id === elementId);
	  this.setState({
	    name,
	    width,
	    height,
	    description,
	    screenCode,
	    color,
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
	    color: 'Escala de grises',
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
	    name, height, width, screenCode, color, description, edit, elementId,
	  } = this.state;
	  const { token, update, notify } = this.props;
	  // FORM DATA
	  const form = {
	    name,
	    height,
	    width,
	    screenCode,
	    color,
	  };
	  if (description !== '') { form.description = description; }
	  axios({
	    method,
	    url: edit ? `${process.env.API_URL}screens/${elementId}` : `${process.env.API_URL}screens`,
	    data: form,
	    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
	  })
	    .then((res) => {
	      if (res.status === 201 || res.status === 200) {
	        switch (method) {
	          case 'put':
	            notify('Pantalla modificada con éxito', 'notify-success', 'save', res.data.notify);
	            update('screens', res.data.resourceId, 'edit', res.data.resource); // update dataset
	            break;
	          case 'post':
	            notify('Pantalla creada con éxito', 'notify-success', 'upload', res.data.notify);
	            update('screens', res.data.resourceId, 'add', res.data.resource); // update dataset
	            this.edit(res.data.resourceId);
	            break;
	          case 'delete':
	            notify('Pantalla eliminada con éxito', 'notify-success', 'trash', res.data.notify);
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
	    .catch(error => notify('Error al añadir/modificar una pantalla', 'notify-error', 'exclamation-triangle', error.response.data.notify, 'error'));
	}

	render() {
	  const {
	    screens, error, isLoaded, edit, elementId, name, height, width, description, color, screenCode,
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
				<div className="card card-settings">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
              <li className="nav-item mr-auto">
                <h2 className="detalles-titulo"><FontAwesomeIcon icon={['far', 'window-maximize']} className="mr-2" fixedWidth />Pantallas</h2>
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
                      <label htmlFor="name"><FontAwesomeIcon icon={['far', 'window-maximize']} className="mr-2" fixedWidth />Nombre</label>
                      <input type="text" className="form-control" id="name" placeholder="Nombre de la resolución" name="name" value={name} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group col-3">
                      <label htmlFor="heigth"><FontAwesomeIcon icon="arrows-alt-v" className="mr-2" fixedWidth />Alto</label>
                      <input type="text" className="form-control" id="heigth" placeholder="Alto" name="height" value={height} onChange={this.handleInputChange} />
                    </div>
                    <div className="form-group col-3">
                      <label htmlFor="width"><FontAwesomeIcon icon="arrows-alt-h" className="mr-2" fixedWidth />Ancho</label>
                      <input type="text" className="form-control" id="width" placeholder="Ancho" name="width" value={width} onChange={this.handleInputChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description"><FontAwesomeIcon icon="info-circle" className="mr-2" fixedWidth />Descripción</label>
                    <input type="text" className="form-control" id="description" placeholder="Descripción de la resolución" name="description" value={description} onChange={this.handleInputChange} />
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <label htmlFor="colorProfile"><FontAwesomeIcon icon="adjust" className="mr-2" fixedWidth />Color</label>
                      <div>
                        <select className="custom-select" name="color" value={color} onChange={this.handleInputChange}>
                          <option value="Color">Color</option>
                          <option value="Escala de grises">Escala de grises</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group col">
                      <label htmlFor="screenCode"><FontAwesomeIcon icon="fingerprint" className="mr-2" fixedWidth />Código de pantalla</label>
                      <input type="text" className="form-control" id="screenCode" placeholder="Código" name="screenCode" value={screenCode} onChange={this.handleInputChange} />
                    </div>
                  </div>
                  { !edit
                    ? <button onClick={() => this.handleSubmit('post')} type="button" className="btn btn-block btn-small btn-success"><i className="fa fa-plus-circle mr-1" aria-hidden="true" />Añadir</button>
                    : (
                      <div className="d-flex w-100 justify-content-between">
                        <button onClick={() => this.handleSubmit('put')} type="button" className="btn btn-block btn-small btn-success mr-2"><FontAwesomeIcon icon="save" className="mr-2" fixedWidth />Actualizar</button>
                        <button onClick={() => this.handleSubmit('delete')} type="button" className="btn btn-block btn-small btn-danger ml-1 mr-1"><FontAwesomeIcon icon="trash" className="mr-2" fixedWidth />Eliminar</button>
                        <button onClick={() => this.cancel()} type="button" className="btn btn-block btn-small btn-warning ml-2"><FontAwesomeIcon icon={['far', 'times-circle']} className="mr-2" fixedWidth />Cancelar</button>
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
  data: PropTypes.shape({}).isRequired,
  token: PropTypes.string.isRequired,
  notify: PropTypes.func,
  update: PropTypes.func,
};

ManageScreens.defaultProps = {
  notify: () => false,
  update: () => false,
};

export default ManageScreens;
