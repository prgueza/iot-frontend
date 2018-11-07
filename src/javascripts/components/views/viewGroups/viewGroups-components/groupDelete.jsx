/* IMPORT MODULES */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

/* COMPONENTS */
class GroupDelete extends Component {
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
	    group, token, update, notify,
	  } = this.props;
	  axios.delete(group.url, { headers: { Authorization: `Bearer ${token}` } })
	    .then((res) => {
	      if (res.status === 200) {
	        notify('Grupo eliminado con éxito', 'notify-success', 'trash-o', toast.POSITION.TOP_RIGHT, res.notify);
	        update('groups', res.resourceId, 'remove');
	      }
	    })
	    .then(() => this.setState({ redirect: true }))
	    .catch(() => notify('Error al eliminar el grupo', 'notify-error', 'exclamation-triangle', toast.POSITION.TOP_RIGHT));
	}

	render() {
	  const { redirect } = this.state;
	  if (redirect) {
	    return (<Redirect to="/groups" />);
	  }
	  return (
				<div className="card card-detalles">
        <div className="card-header">
          <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
            <li className="nav-item mr-auto">
              <h2 className="detalles-titulo"><i className="fa fa-trash mr-3" aria-hidden="true" />Eliminar Grupo</h2>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <div className="text-center">
            <h1>¿Eliminar grupo?</h1>
            <hr className="card-division" />
            <p>Esta acción no se puede deshacer</p>
            <button onClick={this.handleDelete} type="button" className="btn btn-block btn-danger"><i className="fa fa-trash mr-1" aria-hidden="true" />Eliminar</button>
          </div>
        </div>
      </div>
	  );
	}
}

GroupDelete.propTypes = {
  group: PropTypes.shape({}).isRequired,
  token: PropTypes.string.isRequired,
  update: PropTypes.func,
  notify: PropTypes.func,
};

GroupDelete.defaultProps = {
  update: () => false,
  notify: () => false,
};

export default GroupDelete;
