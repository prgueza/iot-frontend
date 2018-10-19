/* IMPORT MODULES */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ReactModal from 'react-modal';

/* IMPORT COMPONENTS */
import Associated from '../../associated';
import Tag from '../../../tags/tag';
import Icon from '../../../icons/icon';
import EditImageForm from './editImageForm';

const moment = require('moment');

moment.locale('es');

/* COMPONENT */
class DisplayDetails extends Component {
  constructor(props) {
    super(props);
    const { display } = this.props;
    this.state = {
      display,
      modal: false,
    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        display: nextProps.display,
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

	/* HANDLE SEND IMAGE TO DISPLAY */
	handleSendImage = () => {
	  const { display } = this.state;
	  const { token, update, notify } = this.props;
	  axios({
	    method: 'post',
	    url: `update/${display._id}`,
	    headers: {
	      Accept: 'application/json',
	      'Content-Type': 'application/json',
	      Authorization: `Bearer ${token}`,
	    },
	  }).then((res) => {
	    if (res.status === 201) { // with success
	      update('displays', res.data.resourceId, 'edit', res.data.resource); // update the device info with new activeImage
	      notify('Cambios realizados', 'notify-success', 'check', toast.POSITION.TOP_RIGHT, res.data.notify); // notify success
	    } else {
	      notify('Error al realizar los cambios', 'notify-error', 'times', toast.POSITION.TOP_RIGHT, res.data.notify); // notify error
	    }
	  })
	    .catch((err) => {
	      notify('Error al realizar los cambios', 'notify-error', 'times', toast.POSITION.TOP_RIGHT, err.message); // notify error
	    });
	}


	/* HANDLE SHOW GROUP IMAGE */
	handleShowGroupImage = () => {
	  const {
	    display, token, update, notify,
	  } = this.props;
	  const form = {
	    imageFromGroup: !display.imageFromGroup,
	  };
	  axios.put(display.url, form, { // send request
	    timeout: process.env.TIMEOUT,
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  })
	    .then((res) => {
	      if (res.status === 201) { // with success
	        update('displays', res.data.resourceId, 'edit', res.data.resource); // update the device info with new activeImage
	        notify('Cambios realizados', 'notify-success', 'check', toast.POSITION.TOP_RIGHT, res.data.notify); // notify success
	      } else {
	        notify('Error al realizar los cambios', 'notify-error', 'times', toast.POSITION.TOP_RIGHT, res.data.notify); // notify error
	      }
	    })
	    .catch((err) => {
	      notify('Error al realizar los cambios', 'notify-error', 'times', toast.POSITION.TOP_RIGHT, err.message); // notify error
	    });
	}

	render() {
	  // define constants from state for better readability
	  const {
	    display,
	    modal,
	    data: { screens },
	    display: {
	      _id, name, description, group, images, activeImage, imageFromGroup, device, tags, updatedAt, updatedBy,
	    },
	  } = this.state;
	  const { filterData } = this.props;
	  // refactor date constants with format
	  const updated = moment(updatedAt)
	    .format('dddd, D [de] MMMM [de] YYYY');
	  // generate tag list
	  const tagList = tags.map(tag => <Tag filterData={filterData} key={tag} category="displays" tag={tag} />);
	  // define routes for edit and delete based on the id
	  const linktoEdit = `/displays/${_id}/edit`;
	  const linktoDelete = `/displays/${_id}/delete`;
	  // check if activeImage is set and if not set the undefined img
	  const src = imageFromGroup && group ? (group.activeImage && group.activeImage.src) : (activeImage && activeImage.src);
	  const overlayImage = imageFromGroup && group ? group.overlayImage : display.overlayImage;
	  const srcOverlay = overlayImage && overlayImage.image && overlayImage.image.src;
	  const overlayImageStyle = {
	    left: overlayImage && `${overlayImage.xCoordinate}%`,
	    top: overlayImage && `${overlayImage.yCoordinate}%`,
	  };
	  const groupImageIcon = imageFromGroup ? 'toggle-on' : 'toggle-off';
	  // get screen info
	  const screen = device && screens.find(s => s.screenCode === device.screen);
	  let screenName;
	  if (screen !== -1) {
	    screenName = screen.name;
	  } else if (device) {
	    screenName = device.screen;
	  } else {
	    screenName = 'Dispositivo no asignado';
	  }
	  let locationName;
	  if (device && device.gateway) {
	    locationName = device.gateway.location;
	  } else {
	    locationName = 'Localización no especificada';
	  }

	  return (
			<div className="card detalles">
		      <div className="card-header">
		        <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
		          <li className="nav-item mr-auto">
		            <h2 className="detalles-titulo">
		              <i className="fa fa-television mr-3" aria-hidden="true" />{name}</h2>
		          </li>
		          <li className="nav-item mr-2">
		            <Link to={linktoEdit}>
		              <button type="button" className="btn btn-warning">
		                <i className="fa fa-pencil-square-o mr-2" aria-hidden="true" />Editar</button>
		            </Link>
		          </li>
		          <li className="nav-item ml-2">
		            <Link to={linktoDelete}>
		              <button type="button" className="btn btn-danger">
		                <i className="fa fa-trash-o mr-2" aria-hidden="true" />Eliminar</button>
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
            <p className="card-text">
              <i className="fa fa-fw fa-info-circle mr-2" aria-hidden="true" />{description}</p>
            <p className="card-text">
              <i className="fa fa-fw fa-map-marker mr-2" aria-hidden="true" />{locationName}</p>
            <p className="card-text">
              <i className="fa fa-fw fa-arrows-alt mr-2" aria-hidden="true" />{screenName}</p>
            <p className="card-text">
              <i className="fa fa-fw fa-calendar-o mr-2" aria-hidden="true" />{updated}</p>
            <p className="card-text">
              <i className="fa fa-fw fa-user-o mr-2" aria-hidden="true" />{
                updatedBy
                  ? updatedBy.name
                  : 'Usuario eliminado'
              }</p>
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
							{ srcOverlay && <img alt="" className="overlay-image" height={`${overlayImage.size}%`} width="auto" style={overlayImageStyle} src={srcOverlay} /> }
							<div className="overlay d-flex w-100 justify-content-center" role="button" tabIndex={0} onKeyDown={this.handleOpenModal} onClick={this.handleOpenModal}>
						    <p className="d-flex overlay-text">Haga click para editar la imagen</p>
						  </div>
            </div>
						<button type="button" onClick={this.handleSendImage} className="btn btn-primary btn-block">Enviar imagen al dispositivo</button>
				</div>
			</div>
			<hr className="card-division" />
			<div className="row">
          { images.length > 0
						&& (
<div className="col">
	            <div className="asociados">
	              <p className="titulo">IMAGENES ASOCIADAS ({images.length})</p>
	              <Associated content={images} category="images" appearance="elemento-imagen" icon="picture-o" active={activeImage} />
	            </div>
	          </div>
						)
					}
          <div className="col">
						{ group
	            && (
								<div className="asociados">
		             	<div tabIndex={0} role="button" onKeyDown={this.handleShowGroupImage} onClick={this.handleShowGroupImage} className="titulo text-right toggle"><p>MOSTRAR IMAGEN DE GRUPO</p><Icon icon={groupImageIcon} fw ml="1" /></div>
									<Associated content={[group]} category="groups" appearance="elemento-grupo" icon="list" active={display.group._id} />
		            </div>
	            )
						}
          </div>
        </div>
			</div>
		</div>);
	}
}

export default DisplayDetails;
