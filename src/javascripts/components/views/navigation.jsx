/* IMPORT MODULES */
import React, { Component } from 'react'
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom'

/* IMPORT COMPONENTS */
import { NavButton } from '../buttons/navButton.jsx'
import { Icon } from '../icons/icon.jsx'

/* COMPONENT */
export class Navigation extends Component {

	/* HANDLE SEARCH */
	handleSearch = ( event ) => {
		this.props.filterData( event.target.value )
	}

	/* RENDER COMPONENT */
	render() {
		const { data: { displays, images, groups, devices, gateways }, user, syncStatus, token, filterValue } = this.props

		const navigationUser = [
			{ exact: true, linkTo: "", text: "Vista general", icon: "eye", count: false, number: '' },
			{ exact: false, linkTo: "displays", text: "Displays", icon: "television", count: true, number: displays ? displays.length + '/' + devices.length : '...' },
			{ exact: false, linkTo: "images", text: "Imagenes", icon: "picture-o", count: true, number: images ? images.length : '...' },
			{ exact: false, linkTo: "groups", text: "Grupos", icon: "list", count: true, number: groups ? groups.length : '...' }
    ]

		const navigationAdmin = [
			{ exact: true, linkTo: "", text: "Vista general", icon: "eye", count: false, number: '' },
			{ exact: false, linkTo: "devices", text: "Dispositivos", icon: "tablet", count: true, number: devices ? devices.length : '...' },
			{ exact: false, linkTo: "gateways", text: "Puertas de enlace", icon: "sitemap", count: true, number: gateways ? gateways.length : '...' }
    ]

		const nav = user && user.admin ?
			navigationAdmin.map( ( nav, index ) => <NavButton key={index} exact={nav.exact} linkTo={nav.linkTo} text={nav.text} icon={nav.icon} count={nav.count} number={nav.number}/> ) :
			navigationUser.map( ( nav, index ) => <NavButton key={index} exact={nav.exact} linkTo={nav.linkTo} text={nav.text} icon={nav.icon} count={nav.count} number={nav.number}/> )

		switch ( syncStatus ) {
			// unsynced
		case 0:
			{
				var syncButton = <li><button onClick={() => this.props.syncApi(token)} type="button" className="btn btn-nav btn-block mb-1"><Icon icon='refresh' mr='2' fw={true}></Icon> Buscar dispositivos</button></li>
				break
			}

			//syncReady
		case 1:
			{
				var syncButton = <li><button onClick={() => this.props.sync()} type="button" className="btn btn-nav btn-block mb-1"><Icon icon='link' mr='2' fw={true}></Icon> Sincronizar</button></li>
				break
			}

			//synced
		case 2:
			{
				var syncButton = <li><button type="button" className="btn btn-nav btn-block mb-1"><Icon icon='check' mr='2' fw={true}></Icon> Sincronizado</button></li>
				break
			}

			//syncing
		case 3:
			{
				var syncButton = <li><button onClick={() => this.props.syncApi(token)} type="button" className="btn btn-nav btn-block mb-1" disabled><Icon icon='refresh' mr='2' fw={true} spin={true}></Icon> Sincronizando</button></li>
				break
			}
		}

		return (
			<div className="col-2 navigation">
        <div className="titulo mb-4 text-center">
          <h1>MENU</h1>
        </div>
        <hr></hr>
        <div className="card menu">
          <div className="button-menu">
            <div className="busqueda mb-3">
              <p>BÚSQUEDA</p>
            	<input onChange={this.handleSearch} value={filterValue} type="text" className="form-control search" id="busqueda" aria-describedby="campoBusqueda" placeholder="Buscar..."></input>
					  </div>
            <div className="mb-3">
              <p>NAVEGACIÓN</p>
              <ul className="nav-list">
                {nav}
              </ul>
            </div>
            <div className="mb-3">
              <p>AJUSTES</p>
              <ul className="nav-list">
							{syncButton}
              { user && user.admin &&
                <NavButton key='settings' linkTo='settings' text='Configuración' icon='cogs'/>
              }
                <li><a href="/disconect"><button type="button" className="btn btn-nav btn-block mb-1"><Icon icon='sign-out' mr='2' fw={true}></Icon> Desconectar</button></a></li>
              </ul>
            </div>
          </div>
          <hr></hr>
          <p className="d-flex justify-content-between">
            <span>v0.1.5</span>
            <span>{user ? user.name : 'Cargando...'}</span>
          </p>
        </div>
      </div>
		)
	}
}
