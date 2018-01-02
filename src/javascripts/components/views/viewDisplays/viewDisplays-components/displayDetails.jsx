/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { BrowserRouter as Router, Link } from 'react-router-dom';

/* IMPORT COMPONENTS*/
import { Associated } from '../../associated.jsx';
import { Tag } from '../../../tags/tag.jsx';

/* COMPONENTS */
export class DisplayDetails extends Component {

	render() {
		// define constants from props for better readability
		const { id, name, description, location, created_at, updated_at, user, resolution, groups, images, active_image, tags_total, tags } = this.state.display;
		// refactor date constants with format
		const created = moment(created_at).format("dddd, D [de] MMMM [de] YYYY");
		const updated = moment(updated_at).format("dddd, D [de] MMMM [de] YYYY");
		// generate tag list
		const tag_list = tags.map(( tag, i ) => <Tag key={i} categoria='displays' etiqueta={tag}/>);
		// define routes for edit and delete based on the id
		const linkto = '/displays/edit/' + id;
		const src = active_image || 'http://localhost:3000/img/undefined.png';

		return(
		<div className="col">
			<div className="card detalles bg-transparent border-gray">
				<div className="card-header border-gray">
					<ul className="nav nav-pills card-header-pills justify-content-end mx-1">
						<li className="nav-item mr-auto">
							<h2 className="detalles-titulo"><i className='fa fa-television mr-3' aria-hidden="true"></i>{name}</h2>
						</li>
						<li className="nav-item mr-2">
							<Link to={linkto}>
								<button type="button" className="btn btn-outline-warning"><i className="fa fa-pencil-square-o mr-1" aria-hidden="true"></i>Editar</button>
							</Link>
						</li>
					</ul>
				</div>
				<div>
					<div className="row">
						<div className="col">
							<div className="card-body">
								<p className="titulo">DETALLES</p>
								<p className="card-text"><i className="fa fa-hashtag mr-1" aria-hidden="true"></i>{id}</p>
								<p className="card-text"><i className="fa fa-info-circle mr-1" aria-hidden="true"></i> {description}</p>
								<p className="card-text"><i className="fa fa-arrows-alt mr-1" aria-hidden="true"></i> {resolution.size.width} x {resolution.size.height}</p>
								<p className="card-text"><i className="fa fa-calendar-o mr-1" aria-hidden="true"></i> {created}</p>
								<p className="card-text"><i className="fa fa-calendar-o mr-1" aria-hidden="true"></i> {updated}</p>
								<p className="card-text"><i className="fa fa-user-o mr-1" aria-hidden="true"></i> {user.name}</p>
								<p className="titulo">ETIQUETAS</p>
								{tag_list}
							</div>
						</div>
						<div className="col">
							<div className="vista-previa">
								<p className="titulo text-right">IMAGEN ACTIVA</p>
								<div className="vista-imagen">
									<img className="imagen" src={src}/>
								</div>
							</div>
						</div>
					</div>
					<hr></hr>
					<div className="row">
						<div className="col">
							<div className="asociados">
								<p className="titulo">IMAGENES ASOCIADAS ({images.length}/5)</p>
								<Associated contenido={images} categoria='imagenes'/>
							</div>
						</div>
						<div className="col">
							<div className="asociados">
								<p className="titulo text-right">GRUPOS ({groups.length}/5)</p>
								<Associated contenido={groups} categoria='grupos'/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		);
	}
};
