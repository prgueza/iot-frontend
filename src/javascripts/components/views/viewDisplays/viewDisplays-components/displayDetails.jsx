/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

/* IMPORT COMPONENTS*/
import { Associated } from '../../associated.jsx';
import { Tag } from '../../../tags/tag.jsx';

/* COMPONENTS */
export class DisplayDetails extends Component {

	constructor(props){
    super(props);
    const { group, user } = this.props;
    this.state = {
      // form data stored in state
      display: '',
      active_image: '',
      images: '',
      error: null
    };
  }

	componentDidMount(){
    // get data
    const { active_image } = this.props.display;
    // state
    this.setState({
      display: this.props.display,
      active_image: active_image ? active_image._id : '',
			src_url: active_image ? active_image.src_url : null
    })
  }

	componentWillReceiveProps(nextProps){
		const { active_image } = nextProps.display;
		// state
		this.setState({
			display: nextProps.display,
			active_image: active_image ? active_image._id : '',
			src_url: active_image ? active_image.src_url : null
		})
	}

	/* HANDLE INPUT CHANGE */
	handleInputChange = (event) => {
    const value = event.target.value;
    const image = this.props.images.find((i) => value == i._id);
    const form = { active_image: image ? image._id : null, userGroup: this.props.userGroup._id };
    axios({
        method: 'put',
        url: this.state.display.url,
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        data: form
      })
      .then((res) => {
        if (res.status >= 200 && res.status < 300){
          // const new_image = this.props.display.images.find((i) => value == i._id);
          // const src_url = new_image ? new_image.src_url : null;
          // this.setState({ active_image: value, src_url: src_url });
					this.props.notify('Imagen cambiada con éxito', 'notify-success', 'upload', toast.POSITION.BOTTOM_LEFT);
          return this.props.update(this.props.user); // update dataset
        } else {
          return this.setState({ error: res.data }); // set error
        }
      });
  }

	render() {
		// define constants from props for better readability
		const { id, name, description, updated_at, updated_by, groups, images, active_image, device, tags } = this.props.display;
		// refactor date constants with format
		const updated = moment(updated_at).format("dddd, D [de] MMMM [de] YYYY");
		// generate tag list
		const tag_list = tags.map(( tag, i ) => <Tag key={i} categoria='displays' etiqueta={tag}/>);
		// define routes for edit and delete based on the id
		const linktoEdit = '/displays/' + id + '/edit';
		const linktoDelete = '/displays/' + id + '/delete';
		// check if active_image is set and if not set the undefined img
    const src = this.state.src_url;
    const imagesOptions = images.map((i) => <option value={i._id} key={i.id}>{i.name}</option>);

		return(
		<div className="col">
			<div className="card detalles">
				<div className="card-header">
					<ul className="nav nav-pills card-header-pills justify-content-end mx-1">
						<li className="nav-item mr-auto">
							<h2 className="detalles-titulo"><i className='fa fa-television mr-3' aria-hidden="true"></i>{name}</h2>
						</li>
						<li className="nav-item mr-2">
              <Link to={linktoEdit}>
                <button type="button" className="btn btn-outline-warning"><i className="fa fa-pencil-square-o mr-2" aria-hidden="true"></i>Editar</button>
              </Link>
            </li>
            <li className="nav-item ml-2">
              <Link to={linktoDelete}>
                <button type="button" className="btn btn-outline-danger"><i className="fa fa-trash-o mr-2" aria-hidden="true"></i>Eliminar</button>
              </Link>
            </li>
					</ul>
				</div>
				<div>
					<div className="row">
						<div className="col">
							<div className="card-body">
								<p className="titulo">DETALLES</p>
								<p className="card-text"><i className="fa fa-fw fa-hashtag mr-1" aria-hidden="true"></i>{id}</p>
								<p className="card-text"><i className="fa fa-fw fa-info-circle mr-2" aria-hidden="true"></i>{description}</p>
								<p className="card-text"><i className="fa fa-fw fa-map-marker mr-2" aria-hidden="true"></i>{device.gateway ? (device.gateway.location ? device.gateway.location.name : 'Localización no especificada') : 'Localización no especificada'}</p>
								<p className="card-text"><i className="fa fa-fw fa-arrows-alt mr-2" aria-hidden="true"></i>{device.resolution ? (device.resolution.size.width + 'x' + device.resolution.size.height) : 'Resolución no especificada'}</p>
								<p className="card-text"><i className="fa fa-fw fa-calendar-o mr-2" aria-hidden="true"></i>{updated}</p>
								<p className="card-text"><i className="fa fa-fw fa-user-o mr-2" aria-hidden="true"></i>{updated_by ? updated_by.name : 'Usuario eliminado'}</p>
								<p className="titulo">ETIQUETAS</p>
								{tag_list}
							</div>
						</div>
						<div className="col">
							<div className="vista-previa">
                <p className="titulo text-right">IMAGEN ACTIVA</p>
                <div className="vista-imagen-display d-flex w-100 justify-content-center mb-3">
                  { src ?
                    <img className="imagen" src={src}/> :
                    <div className="align-self-center">
                      <h4>La imagen activa aun no ha sido determinada</h4>
                      <small>Suba una imagen al servidor</small>
                    </div>
                  }
                </div>
                <select className="custom-select" id="active_image" name='active_image' value={this.state.active_image} onChange={this.handleInputChange}>
                  <option value={''} key={0}>Sin imagen activa</option>
                  {imagesOptions}
                </select>
              </div>
						</div>
					</div>
					<hr className="card-division"></hr>
					<div className="row">
						<div className="col">
							<div className="asociados">
								<p className="titulo">IMAGENES ASOCIADAS ({images.length})</p>
								<Associated contenido={images} category="images" appearance="elemento-imagen" icon="picture-o" active={this.state.active_image}/>
							</div>
						</div>
						<div className="col">
							<div className="asociados">
								<p className="titulo text-right">GRUPOS ({groups.length})</p>
								<Associated contenido={groups} category="groups" appearance="elemento-grupo" icon="list"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		);
	}
};
