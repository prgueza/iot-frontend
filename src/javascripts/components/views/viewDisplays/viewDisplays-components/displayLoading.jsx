/* IMPORT MODULES */
import React, { Component } from 'react';

/* COMPONENTS */
export class DisplayLoading extends Component {
	render() {
		return(
		<div className="col">
			<div className="card detalles bg-transparent border-gray">
				<div className="card-header border-gray">
					<ul className="nav nav-pills card-header-pills justify-content-end mx-1">
						<li className="nav-item mr-auto">
							<h2 className="detalles-titulo"><i className='fa fa-television mr-3' aria-hidden="true"></i>Cargando...</h2>
						</li>
						<li className="nav-item mr-2">
                <button type="button" className="btn btn-outline-warning"><i className="fa fa-pencil-square-o mr-1" aria-hidden="true"></i>Editar</button>
            </li>
            <li className="nav-item ml-2">
                <button type="button" className="btn btn-outline-danger"><i className="fa fa-trash-o" aria-hidden="true"></i>Eliminar</button>
            </li>
					</ul>
				</div>
				<div>
					<div className="row">
						<div className="col">
							<div className="card-body">
								<p className="titulo">DETALLES</p>
								<p className="card-text"><i className="fa fa-fw fa-hashtag mr-1" aria-hidden="true"></i>Cargando...</p>
								<p className="card-text"><i className="fa fa-fw fa-info-circle mr-2" aria-hidden="true"></i>Cargando...</p>
								<p className="card-text"><i className="fa fa-fw fa-map-marker mr-2" aria-hidden="true"></i>Cargando...</p>
								<p className="card-text"><i className="fa fa-fw fa-arrows-alt mr-2" aria-hidden="true"></i>Cargando...</p>
								<p className="card-text"><i className="fa fa-fw fa-calendar-o mr-2" aria-hidden="true"></i>Cargando...</p>
								<p className="card-text"><i className="fa fa-fw fa-calendar-o mr-2" aria-hidden="true"></i>Cargando...</p>
								<p className="card-text"><i className="fa fa-fw fa-user-o mr-2" aria-hidden="true"></i>Cargando...</p>
								<p className="titulo">ETIQUETAS</p>
								Cargando...
							</div>
						</div>
						<div className="col">
							<div className="vista-previa">
								<p className="titulo text-right">IMAGEN ACTIVA</p>
								<div className="vista-imagen-display">
									<img className="imagen"/>
								</div>
							</div>
						</div>
					</div>
					<hr></hr>
					<div className="row">
						<div className="col">
							<div className="asociados">
								<p className="titulo">IMAGENES ASOCIADAS (...)</p>
							</div>
						</div>
						<div className="col">
							<div className="asociados">
								<p className="titulo text-right">GRUPOS (...)</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		);
	}
};
