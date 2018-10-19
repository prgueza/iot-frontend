/* IMPORT MODULES */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const moment = require('moment');

moment.locale('es');

/* COMPONENTS */
class DeviceDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for redirect after deletion
      redirect: false,
    };
  }

  /* HANDLE DELETE EVENT */
	handleDelete = (event) => {
	  event.preventDefault();
	  const {
	    device: { url }, token, notify, update,
	  } = this.props;
	  axios.delete(url, {
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  })
	    .then((res) => {
	      if (res.status >= 200) {
	        notify('Dispositivo eliminado con éxito', 'notify-success', 'trash-o');
	        update('devices', res.resourceId, 'remove'); // update dataset
	      }
	    })
	    .then(() => this.setState({ redirect: true }))
	    .catch(() => notify('Error al eliminar el dispositivo', 'notify-error', 'exclamation-triangle'));
	}

	render() {
	  const { redirect } = this.state;
	  if (redirect) return <Redirect to="/devices" />;
	  return (
  <div className="card detalles">
    <div className="card-header">
      <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
        <li className="nav-item mr-auto">
          <h2 className="detalles-titulo">
            <i className="fa fa-trash mr-3" aria-hidden="true" />
						Eliminar dispositivo físico
          </h2>
        </li>
      </ul>
    </div>
    <div className="card-body">
      <div className="text-center">
        <h1>¿Eliminar dispositivo físico</h1>
        <hr className="card-division" />
        <p>Esta acción no se puede deshacer</p>
        <button onClick={this.handleDelete} type="button" className="btn btn-block btn-danger">
          <i className="fa fa-trash mr-1" aria-hidden="true" />
					Eliminar
        </button>
      </div>
    </div>
  </div>
	  );
	}
}

DeviceDelete.propTypes = {
  device: PropTypes.shape.isRequired,
  notify: PropTypes.shape.isRequired,
  update: PropTypes.shape.isRequired,
  token: PropTypes.string.isRequired,
};

export default DeviceDelete;
