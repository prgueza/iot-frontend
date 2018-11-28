/* IMPORT MODULES */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

/* IMPORT COMPONENTS */
import Icon from '../../../icons/icon';

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
    const { display: { images, activeImage, overlayImage } } = this.props;
    const options = images && images.map(image => <option value={image._id} key={image._id}>{image.name}</option>);
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
	  const { value, name } = event.target;
	  this.setState({
	    [name]: value,
	  });
	}

	handleImageChange = (event) => {
	  const { value, name } = event.target;
	  const { images } = this.state;
	  const image = images.find(i => i._id === value);
	  this.setState({
	    [name]: image,
	  });
	}

	handleSizeChange = (event) => {
	  const { value } = event.target;
	  this.setState({
	    size: value,
	  });
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
	    display, token, notify, handleCloseModal,
	  } = this.props;
	  const form = {
	    activeImage: activeImage ? activeImage._id : null,
	    lastUpdateResult: false,
	    overlayImage: overlayImage ? {
	      size,
	      xCoordinate,
	      yCoordinate,
	      image: overlayImage,
	    } : null,
	  };
	  axios({
	    timeout: 50000,
	    method: 'post',
	    url: `update/${display._id}`,
	    data: form,
	    headers: {
	      Accept: 'application/json',
	      'Content-Type': 'application/json',
	      Authorization: `Bearer ${token}`,
	    },
	  }).then((res) => {
	      if (res.status === 200 || res.status === 201) { // with success
	        notify('Cambios realizados', 'notify-success', 'cloud-upload', res.data.notify); // notify success
	        handleCloseModal();
	      } else {
	        notify('Error al realizar los cambios', 'notify-error', 'times', res.data.notify, true); // notify error
	        handleCloseModal();
	      }
	    }).catch((err) => {
	      console.log(err);
	      // notify('Error al realizar los cambios', 'notify-error', 'times', err.response.data.notify, true); // notify error
	      handleCloseModal();
	    });
	}

	render() {
	  const {
	    activeImage, overlayImage, options, xCoordinate, yCoordinate, size,
	  } = this.state;
	  const { handleCloseModal, display } = this.props;
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
								<i className="fa fa-picture-o mr-2" />Imagen principal</label>
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
								<i className="fa fa-th-large mr-2" />Imagen superpuesta</label>
							<div>
								<select className="custom-select" name="overlayImage" value={overlayImage ? overlayImage._id : ''} onChange={this.handleImageChange} disabled>
									<option value="" key="0">Ninguna imagen seleccionada</option>
									{options}
								</select>
							</div>
						</div>
						<div className="form-row">
						 <div className="form-group col-6">
							 <label><Icon icon="arrows-alt" mr={2} fw />Tamaño</label>
							 <input onChange={this.handleSizeChange} value={size} type="number" className="form-control" placeholder="100" disabled />
						 </div>
						 <div className="form-group col">
							 <label><Icon icon="long-arrow-right" mr={2} fw />Posición</label>
							 <input onChange={this.handleInputChange} value={xCoordinate} name="xCoordinate" type="number" className="form-control" placeholder="0" disabled />
						 </div>
						 <div className="form-group col">
							 <label><Icon icon="long-arrow-up" mr={2} fw />Posición</label>
							 <input onChange={this.handleInputChange} value={yCoordinate} name="yCoordinate" type="number" className="form-control" placeholder="0" disabled />
						 </div>
					 </div>
					 <div className="d-flex w-100 justify-content-between">
	 						<button onClick={() => this.handleSubmit()} type="button" className="btn btn-block btn-small btn-success mr-1"><i className="fa fa-floppy-o mr-1" aria-hidden="true" /><strong>Confirmar</strong></button>
	 						<button onClick={() => handleCloseModal()} type="button" className="btn btn-block btn-small btn-warning ml-1"><i className="fa fa-times mr-1" aria-hidden="true" /><strong>Cancelar</strong></button>
	 					</div>
				 </form>
				</div>
			<div className="col-6">
				<div className="edit-image-view d-flex w-100 justify-content-center mb-3 shadow">
						<div role="button" tabIndex={0} onClick={this.getCoordinates} onKeyDown={this.getCoordinates} className="coordinates-map" ref={this.setCoordinatesMap} /> {
							src
							  ?	<img alt="" className="main-image image-fluid" src={src} />
							  : (
								<div className="image-preview-placeholder d-flex align-items-center">
									<h4>Seleccione una imagen como imagen principal</h4>
								</div>
							  )
						}
						{ srcOverlay && <img alt="" className="overlay-image shadow" height={`${size}%`} width="auto" style={overlayImageStyle} src={srcOverlay} /> }
						{	display.imageFromGroup
							&& (
								<div className="image-warning d-flex w-100 justify-content-center">
									<p className="d-flex image-warning-text">Se está utilizando la imagen del grupo</p>
								</div>
							)
						}
				</div>
			</div>
		</div>
	</div>
	  );
	}
}

EditImageForm.propTypes = {
  display: PropTypes.shape({}),
  token: PropTypes.string.isRequired,
  notify: PropTypes.func,
  handleCloseModal: PropTypes.func,
};

EditImageForm.defaultProps = {
  display: null,
  notify: () => false,
  handleCloseModal: () => false,
};

export default EditImageForm;
