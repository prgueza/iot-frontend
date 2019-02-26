/* IMPORT MODULES */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const moment = require('moment');

moment.locale('es');

/* COMPONENTS */
class GatewayDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

	/* HANDLE DELETE EVENT */
	handleDelete = (event) => {
	  event.preventDefault();
	  const {
	    gateway, token, notify, update,
	  } = this.props;
	  axios.delete(gateway.url, {
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  })
	    .then((res) => {
	      if (res.status === 200) {
	        notify('Puerta de enlace eliminado con éxito', 'notify-success', 'trash', res.data.notify);
	        update('gateways', res.data.resourceId, 'remove');
	      }
	    })
	    .then(() => this.setState({ redirect: true }))
	    .catch(() => notify('Error al eliminar la puerta de enlace', 'notify-error', 'exclamation-triangle', false, 'error'));
	}

	render() {
	  const { redirect } = this.state;
	  if (redirect) {
	    return (<Redirect to="/gateways" />);
	  }
	  return (
				<div className="card card-detalles">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
              <li className="nav-item mr-auto">
                <h2 className="detalles-titulo"><FontAwesomeIcon icon="trash" className="mr-3" fixedWidth />Eliminar Puerta de enlace</h2>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div className="text-center">
              <h1>¿Eliminar puerta de enlace?</h1>
              <hr className="card-division" />
              <p>Esta acción no se puede deshacer</p>
              <button onClick={this.handleDelete} type="button" className="btn btn-block btn-danger"><FontAwesomeIcon icon="trash" className="mr-2" fixedWidth />Eliminar</button>
            </div>
          </div>
        </div>
	  );
	}
}

GatewayDelete.propTypes = {
  gateway: PropTypes.shape.isRequired,
  token: PropTypes.string.isRequired,
  notify: PropTypes.shape.isRequired,
  update: PropTypes.shape.isRequired,
};

export default GatewayDelete;
