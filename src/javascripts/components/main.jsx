/* IMPORT MODULES */
import React, { Component } from 'react'
import { BrowserRouter as Router, Redirect, NavLink, Route, Switch } from 'react-router-dom'
import cookie from 'react-cookie'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import { css } from 'glamor'
import axios from 'axios'

/* CONFIGURE AXIOS */
axios.defaults.baseURL = process.env.API_URL

/* IMPORT COMPONENTS */
import { Navigation } from './views/navigation.jsx'
import { Content } from './views/content.jsx'
import { Notification } from './tags/notification.jsx'

/* COMPONENT */
export class Main extends Component {

	constructor( props ) {
		super( props )
		this.state = {
			// active user
			user: null,
			token: null,

			// data
			data: [],

			// sync
			syncedDevices: [],

			// 0: unsynced 1: sync_ready 2: synced 3: syncing
			syncStatus: 0,
			lastSynced: null,

			// search value
			filterValue: '',
			filterFoundValue: true,

			// others
			userID: '',
			isLoaded: false,
			isLoggedIn: false,
			error: null,
			redirect: false
		}
	}

	/* COMPONENT MOUNT */
	componentDidMount() {
		// get user id and token
		const { user, token, data } = this.props

		// set user id and token
		this.setState( { user, token, data, isLoggedIn: true, isLoaded: true } )

		// sync
		this.syncApi( token )

		// check syncronization
		this.checkSyncId = setInterval( () => {
			if ( this.state.lastSynced && moment()
				.diff( this.state.lastSynced, 'seconds' ) > 5 && this.state.syncStatus != 1 ) {
				//unsynced
				this.setState( { syncStatus: 0 } )
			}
		}, 1000 )
	}

	componentWillUnmount() {
		clearInterval( this.checkSyncId )
	}

	/* UPDATE DATA */
	update = ( resourceType, _id, action, data, devices ) => {
		const stateData = this.state.data
		switch ( action ) {
		case 'remove':
			{
				let index = stateData[ resourceType ].findIndex( resource => resource._id == _id )
				stateData[ resourceType ].splice( index, 1 )
				devices && ( stateData[ 'devices' ] = devices )
				break
			}
		case 'add':
			{
				stateData[ resourceType ].push( data )
				devices && ( stateData[ 'devices' ] = devices )
				break
			}
		case 'edit':
			{
				let index = stateData[ resourceType ].findIndex( resource => resource._id == _id )
				stateData[ resourceType ].splice( index, 1, data )
				devices && ( stateData[ 'devices' ] = devices )
				break
			}
		}
		this.setState( { data: stateData } )
	}

	/* SYNC DATA */
	syncApi = ( token ) => {
		// set state to syncing
		this.setState( { syncStatus: 3, lastSynced: moment() } )
		this.notifySync( 'Buscando dispositivos...', 'notify-success', 'refresh', 'Esto puede llevar varios minutos' )

		// request the update
		axios.get( '/update', {
				timeout: process.env.TIMEOUT,
				headers: {
					Authorization: 'Bearer ' + token
				}
			} )
			.then(
				( res ) => {
					if ( res.status == 200 ) {
						this.updateSync( 'Pulse para sincronizar', 'notify-success', 'link', false, 'Sincronice la aplicación con los dispositivos encontrados' )
						this.setState( { syncedDevices: res.data, syncStatus: 1, lastSynced: moment() } )
					} else {
						this.updateSync( 'Error en la búsqueda', 'notify-error', 'times', false, res.data.error )
						this.setState( { syncing: false, syncStatus: 0 } )
					}
				},
				( err ) => {
					this.updateSync( 'Error en la búsqueda', 'notify-error', 'times', false, err.data.error )
				} )
			.catch( ( err ) => {
				this.updateSync( 'Error', 'notify-error', 'times', true, 'Ha ocurrido un error. ' + err )
				this.setState( { syncing: false, syncStatus: 0 } )
			} )
	}

	sync = () => {
		const devices = this.state.syncedDevices
		const data = this.state.data
		data.devices = devices
		this.updateSync( 'Dispositivos sincronizados', 'notify-success', 'check', true, 'Dispositivos sincronizados con éxito' )
		this.setState( { data, syncStatus: 2 } ) //synced
	}

	/* HANDLE SEARCH */
	filterData = ( value ) => {
		this.setState( { filterValue: value } )
	}

	filterFound = () => {
		// get value from the checkbox
		const { filterFoundValue } = this.state
		this.setState( {
			filterFoundValue: !filterFoundValue
		} )
	}

	/* ALERTS */
	notify = ( text, style, icon, position = toast.POSITION.TOP_RIGHT, info ) => {
		toast( <Notification text={text} icon={icon} info={info}/>, {
			position,
			className: style
		} )
	}

	notifySync = ( text, style, icon, info ) => {
		this.toastSyncId = toast( <Notification text={text} icon={icon} spin={true} info={info}/>, {
			position: toast.POSITION.TOP_RIGHT,
			autoClose: false,
			className: style
		} )
	}

	updateSync = ( text, style, icon, autoClose, info = false ) => {
		toast.update( this.toastSyncId, {
			render: <Notification text={text} icon={icon} info={info}/>,
			position: toast.POSITION.TOP_RIGHT,
			autoClose: autoClose,
			className: style,
			onClose: () => {
				this.state.syncStatus == 1 && this.sync()
			}
		} )
	}

	dismiss = () => {
		this.toastSyncId && toast.dismiss( this.toastSyncId )
	}

	/* RENDER COMPONENT */
	render() {
		return (
			<div className="row main">
	      <ToastContainer closeButton={false} hideProgressBar={true}/>
	      <Navigation filterData={this.filterData} update={this.update} sync={this.sync} syncApi={this.syncApi} { ...this.state }/>
	      <Content filterData={this.filterData} filterFound={this.filterFound} update={this.update} notify={this.notify} { ...this.state }/>
	    </div> )
	}
}
