/* IMPORT MODULES */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const moment = require('moment');

moment.locale('es');

/* COMPONENT */
class DisplayDelete extends Component {
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
	    display, update, notify, token,
	  } = this.props;
	  axios.delete(display.url, {
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  })
	    .then((res) => {
	      if (res.status >= 200) {
	        notify('Display eliminado con éxito', 'notify-success', 'trash');
	        update('displays', res.resourceId, 'remove', res.data, res.data.devices); // update dataset
	      }
	    })
	    .then(() => this.setState({ redirect: true }))
	    .catch(() => notify('Error al eliminar el display', 'notify-error', 'times', 'error'));
	}

	render() {
	  const { redirect } = this.state;
	  if (redirect) {
	    return (<Redirect to="/displays" />);
	  }
	  return (
			<div className="card card-detalles">
        <div className="card-header">
          <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
            <li className="nav-item mr-auto">
              <h2 className="detalles-titulo">
                <FontAwesomeIcon icon="trash" className="mr-3" fixedWidth />Eliminar configuración</h2>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <div className="text-center">
            <h1>¿Eliminar configuración?</h1>
            <hr className="card-division" />
            <p>Esta acción no se puede deshacer</p>
            <button onClick={this.handleDelete} type="button" className="btn btn-block btn-danger">
              <FontAwesomeIcon icon="trash" className="mr-2" fixedWidth />Eliminar</button>
          </div>
        </div>
      </div>
	  );
	}
}

DisplayDelete.propTypes = {
  display: PropTypes.shape({}).isRequired,
  update: PropTypes.func,
  notify: PropTypes.func,
  token: PropTypes.string.isRequired,
};

DisplayDelete.defaultProps = {
  update: () => false,
  notify: () => false,
};

export default DisplayDelete;
