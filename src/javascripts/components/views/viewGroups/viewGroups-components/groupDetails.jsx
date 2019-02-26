/* IMPORT MODULES */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* IMPORT COMPONENTS */
import Associated from '../../associated';
import Tag from '../../../tags/tag';
import EditImageForm from './editImageForm';

const moment = require('moment');

moment.locale('es');

/* COMPONENTS */
class GroupDetails extends Component {
  constructor(props) {
    super(props);
    const { group } = this.props;
    this.state = {
      group,
      modal: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        group: nextProps.group,
      });
    }
  }

	/* MODAL */
	handleOpenModal = () => {
	  this.setState({ modal: true });
	}

	handleCloseModal = () => {
	  this.setState({ modal: false });
	}

	render() {
	  // define constants from props for better readability
	  const {
	    modal,
	    group: {
	      _id, name, description, createdAt, createdBy, displays, images, activeImage, overlayImage, tags,
	    },
	  } = this.state;
	  const { filterData } = this.props;
	  // refactor date constants with format
	  const created = moment(createdAt)
	    .format('dddd, D [de] MMMM [de] YYYY');
	  // generate tag list
	  const tagList = tags.map(tag => <Tag filterData={filterData} key={tag} category="groups" tag={tag} />);
	  // check if activeImage is set and if not set the undefined img
	  const src = activeImage && activeImage.src;
	  const srcOverlay = overlayImage && overlayImage.image && overlayImage.image.src;
	  const overlayImageStyle = {
	    left: overlayImage && `${overlayImage.xCoordinate}%`,
	    top: overlayImage && `${overlayImage.yCoordinate}%`,
	  };
	  // define routes for edit and delete based on the id
	  const linktoEdit = `/groups/${_id}/edit`;
	  const linktoDelete = `/groups/${_id}/delete`;

	  return (
			<div className="card card-detalles">
      <div className="card-header">
        <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
          <li className="nav-item mr-auto">
            <h2 className="detalles-titulo"><FontAwesomeIcon icon="layer-group" className="mr-3" fixedWidth />{name}</h2>
          </li>
          <li className="nav-item mr-2">
            <Link to={linktoEdit}>
              <button type="button" className="btn btn-warning"><FontAwesomeIcon icon={['far', 'edit']} className="mr-2" fixedWidth />Editar</button>
            </Link>
          </li>
          <li className="nav-item ml-2">
            <Link to={linktoDelete}>
              <button type="button" className="btn btn-danger"><FontAwesomeIcon icon="trash" className="mr-2" fixedWidth />Eliminar</button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="card-body">
				<ReactModal isOpen={modal} ariaHideApp={false} className="modal-content">
					<EditImageForm handleCloseModal={this.handleCloseModal} {...this.props} />
				</ReactModal>
        <div className="row">
          <div className="col-lg-6">
            <p className="titulo">DETALLES</p>
            <p className="card-text"><FontAwesomeIcon icon="info-circle" className="mr-2" fixedWidth />{description}</p>
            <p className="card-text"><FontAwesomeIcon icon={['far', 'calendar']} className="mr-2" fixedWidth />{created}</p>
            <p className="card-text"><FontAwesomeIcon icon="user" className="mr-2" fixedWidth />{createdBy ? createdBy.name : 'Usuario eliminado'}</p>
            <p className="titulo">ETIQUETAS</p>
            {tagList}
          </div>
					<div className="col-lg-6">
            <div className="vista-imagen-display d-flex w-100 align-items-center mb-3 shadow">
              {
                src
                  ? <img alt="" className="main-image" src={src} />
                  : (
                    <div className="image-placeholder d-flex align-items-center">
                      <div>
												<h4>La imagen activa aun no ha sido determinada</h4>
                        <small>Haga click para determinarla</small>
											</div>
                    </div>
                  )
              }
							{ srcOverlay && <img alt="" className="overlay-image shadow" height={`${overlayImage.size}%`} width="auto" style={overlayImageStyle} src={srcOverlay} /> }
							<div className="overlay d-flex w-100 justify-content-center" role="button" tabIndex={0} onKeyDown={this.handleOpenModal} onClick={this.handleOpenModal}>
						    <p className="d-flex overlay-text">Haga click para editar la imagen</p>
						  </div>
            </div>
				</div>
        </div>
        <hr className="card-division" />
        <div className="row">
          <div className="col">
            <div className="asociados">
              <p className="titulo">DISPLAYS ({displays.length})</p>
              <Associated content={displays} category="displays" appearance="elemento-display" icon="tv" />
            </div>
          </div>
          <div className="col">
            <div className="asociados">
              <p className="titulo text-right">IMAGENES ASOCIADAS ({images.length})</p>
              <Associated content={images} category="images" appearance="elemento-imagen" icon={['far', 'image']} active={activeImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
	  );
	}
}

GroupDetails.propTypes = {
  group: PropTypes.shape({}).isRequired,
  update: PropTypes.func,
  notify: PropTypes.func,
  filterData: PropTypes.func,
};

GroupDetails.defaultProps = {
  update: () => false,
  notify: () => false,
  filterData: () => false,
};

export default GroupDetails;
