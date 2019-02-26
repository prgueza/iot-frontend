/* IMPORT MODULES */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* COMPONENT */
class EditImageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null,
      activeImage: null,
      overlayImage: null,
      size: 50,
      xCoordinate: 0,
      yCoordinate: 0,
      options: null,
    };
    this.coordinatesMap = null;
  }

  componentDidMount() {
    const { group: { images, activeImage, overlayImage } } = this.props;
    const options = images.map(image => <option value={image._id} key={image._id}>{image.name}</option>);
    this.setState({
      images,
      options,
      activeImage,
      overlayImage: overlayImage ? overlayImage.image : null,
      size: overlayImage ? overlayImage.size : 50,
      xCoordinate: overlayImage ? overlayImage.xCoordinate : 0,
      yCoordinate: overlayImage ? overlayImage.yCoordinate : 0,
    });
  }

	setCoordinatesMap = (element) => {
	  this.coordinatesMap = element;
	}

	handleInputChange = (event) => {
	  const { target: { value, name } } = event;
	  this.setState({ [name]: value });
	}

	handleImageChange = (event) => {
	  const { target: { value, name } } = event;
	  const { images } = this.state;
	  const image = images.find(i => i._id === value);
	  this.setState({ [name]: image });
	}

	handleSizeChange = (event) => {
	  const { target: { value } } = event;
	  this.setState({ size: value });
	}

	getCoordinates = (event) => {
	  const width = this.coordinatesMap.offsetWidth;
	  const height = this.coordinatesMap.offsetHeight;
	  this.setState({
	    xCoordinate: Math.round(event.nativeEvent.offsetX / width * 100),
	    yCoordinate: Math.round(event.nativeEvent.offsetY / height * 100),
	  });
	}

	handleSubmit = () => {
	  const {
	    activeImage, overlayImage, size, xCoordinate, yCoordinate,
	  } = this.state;
	  const {
	    group, token, update, notify, handleCloseModal,
	  } = this.props;
	  const form = {
	    activeImage: activeImage ? activeImage._id : null,
	    overlayImage: overlayImage ? {
	      size,
	      xCoordinate,
	      yCoordinate,
	      image: overlayImage,
	    } : null,
	  };
	  axios.put(group.url, form, { // send request
	    timeout: process.env.TIMEOUT,
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  })
	    .then((res) => {
	      if (res.status >= 200) { // with success
	        update('groups', res.data.resourceId, 'edit', res.data.resource); // update the device info with new activeImage
	        notify('Imagen actualizada con éxito', 'notify-success', 'check', res.data.notify); // notify success
	        handleCloseModal();
	      } else {
	        notify('Error al actualizar la imagen', 'notify-error', 'times', res.data.notify); // notify error
	      }
	    })
	    .catch((err) => {
	      notify('Error al actualizar la imagen', 'notify-error', 'times', err.message); // notify error
	    });
	}

	render() {
	  const {
	    activeImage, overlayImage, options, xCoordinate, yCoordinate, size,
	  } = this.state;
	  const { handleCloseModal } = this.props;
	  const src = activeImage && activeImage.src;
	  const srcOverlay = overlayImage && overlayImage.src;
	  const overlayImageStyle = {
	    left: `${xCoordinate}%`,
	    top: `${yCoordinate}%`,
	  };
	  return (
			<div>
			<div className="row">
				<div className="col-6">
					<h3>Componer imagen</h3>
					<hr className="card-division" />
				</div>
				<div className="col-6">
						<h3 className="text-right">Previsualización</h3>
						<hr className="card-division" />
				</div>
			</div>
			<div className="row">
				<div className="col-6">
	        <form>
						<div className="form-group">
							<label htmlFor="device">
								<FontAwesomeIcon icon={['far', 'image']} className="mr-2" fixedWidth />Imagen principal</label>
							<div>
								<select className="custom-select" name="activeImage" value={activeImage ? activeImage._id : ''} onChange={this.handleImageChange}>
									<option value="" key="0">Ninguna imagen seleccionada</option>
									{options}
								</select>
							</div>
						</div>
						<hr className="card-division" />
						<div className="form-group">
							<label htmlFor="device">
								<FontAwesomeIcon icon="object-group" className="mr-2" fixedWidth />Imagen superpuesta</label>
							<div>
								<select className="custom-select" name="overlayImage" value={overlayImage ? overlayImage._id : ''} onChange={this.handleImageChange} disabled>
									<option value="" key="0">Ninguna imagen seleccionada</option>
									{options}
								</select>
							</div>
						</div>
						<div className="form-row">
						 <div className="form-group col-6">
							 <label><FontAwesomeIcon icon="arrows-alt" className="mr-2" fixedWidth />Tamaño</label>
							 <input onChange={this.handleSizeChange} value={size} type="number" className="form-control" placeholder="100" disabled />
						 </div>
						 <div className="form-group col">
							 <label><FontAwesomeIcon icon="arrows-alt-h" className="mr-2" fixedWidth />Posición</label>
							 <input onChange={this.handleInputChange} value={xCoordinate} name="xCoordinate" type="number" className="form-control" placeholder="0" disabled />
						 </div>
						 <div className="form-group col">
							 <label><FontAwesomeIcon icon="arrows-alt-v" className="mr-2" fixedWidth />Posición</label>
							 <input onChange={this.handleInputChange} value={yCoordinate} name="yCoordinate" type="number" className="form-control" placeholder="0" disabled />
						 </div>
					 </div>
					 <div className="d-flex w-100 justify-content-between">
	 						<button onClick={() => this.handleSubmit()} type="button" className="btn btn-block btn-small btn-success mr-1"><FontAwesomeIcon icon="save" className="mr-2" fixedWidth /><strong>Confirmar</strong></button>
	 						<button onClick={() => handleCloseModal()} type="button" className="btn btn-block btn-small btn-warning ml-1"><FontAwesomeIcon icon="times" className="mr-2" fixedWidth /><strong>Cancelar</strong></button>
	 					</div>
				 </form>
				</div>
				<div className="col-6">
					<div className="edit-image-view d-flex w-100 justify-content-center mb-3 shadow">
							<div tabIndex={0} role="button" onKeyDown={this.getCoordinates} onClick={this.getCoordinates} className="coordinates-map" ref={this.setCoordinatesMap} /> {
								src
								  ?	<img alt="" className="main-image image-fluid" src={src} />
								  : (
										<div className="image-preview-placeholder d-flex align-items-center">
										<h4>Seleccione una imagen como imagen principal</h4>
									</div>
								  )
							}
							{ srcOverlay && <img alt="" className="overlay-image shadow" height={`${size}%`} width="auto" style={overlayImageStyle} src={srcOverlay} /> }
					</div>
				</div>
			</div>
		</div>
	  );
	}
}

EditImageForm.propTypes = {
  group: PropTypes.shape({}).isRequired,
  token: PropTypes.string.isRequired,
  update: PropTypes.func,
  notify: PropTypes.func,
  handleCloseModal: PropTypes.func,
};

EditImageForm.defaultProps = {
  update: () => false,
  notify: () => false,
  handleCloseModal: () => false,
};

export default EditImageForm;
