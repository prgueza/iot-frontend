/* IMPORT MODULES */
import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, NavLink, Route, Switch } from 'react-router-dom';
import cookie from 'react-cookie';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import axios from 'axios';

/* CONFIGURE AXIOS */
axios.defaults.baseURL = process.env.API_URL;

/* IMPORT COMPONENTS */
import { Navigation } from './views/navigation.jsx';
import { Content } from './views/content.jsx';
import { Notification } from './tags/notification.jsx';

/* COMPONENT */
export class Main extends Component {

	constructor( props ) {
		super( props );
		this.state = {
			// active user
			user: null,
			token: null,

			// data
			data: [],

			// sync
			syncedDevices: [],

			// 0: unsynced; 1: sync_ready; 2: synced; 3: syncing
			syncStatus: 0,
			lastSynced: null,

			// search value
			filterValue: '',
			filterFoundValue: true,

			// others
			userID: cookie.load( 'userID' ),
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
		this.syncApi( token );

		// check syncronization
		this.checkSyncId = setInterval( () => {
			if ( this.state.lastSynced && moment()
				.diff( this.state.lastSynced, 'seconds' ) > 20 && this.state.syncStatus != 1 ) {
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
				break;
			}
		case 'add':
			{
				stateData[ resourceType ].push( data )
				devices && ( stateData[ 'devices' ] = devices )
				break;
			}
		case 'edit':
			{
				let index = stateData[ resourceType ].findIndex( resource => resource._id == _id )
				stateData[ resourceType ].splice( index, 1, data )
				devices && ( stateData[ 'devices' ] = devices )
				break;
			}
		}
		this.setState( { data: stateData } );
	}

	/* SYNC DATA */
	syncApi = ( token ) => {
		// set state to syncing
		this.setState( { syncStatus: 3, lastSynced: moment() } );
		this.notify_sync( 'Buscando dispositivos...', 'notify-success', 'refresh' );

		// request the update
		axios.get( '/update', {
				timeout: process.env.TIMEOUT,
				headers: {
					Authorization: 'Bearer ' + token
				}
			} )
			.then( ( res ) => {
				// set state to syncReady
				this.updateSync( 'Pulse para sincronizar', 'notify-success', 'link', false );
				this.setState( { syncedDevices: res.data, syncStatus: 1, lastSynced: moment() } );
			} )
			.catch( ( err ) => {
				// set state to UnSynced
				this.updateSync( 'Error en la búsqueda', 'notify-error', 'times', true );
				this.setState( { syncing: false, syncStatus: 0 } )
			} )
	}

	sync = () => {
		const devices = this.state.syncedDevices;
		const data = this.state.data;
		data.devices = devices;
		this.updateSync( 'Datos sincronizados', 'notify-success', 'check', true );
		this.setState( { data, syncStatus: 2 } ); //synced
	}

	/* HANDLE SEARCH */
	filterData = ( value ) => {
		this.setState( { filterValue: value } );
	}

	filterFound = () => {
		// get value from the checkbox
		const { filterFoundValue } = this.state;
		this.setState( {
			filterFoundValue: !filterFoundValue
		} );
	}

	/* ALERTS */
	notify = ( text, style, icon, position ) => {
		toast( <Notification text={text} icon={icon}/>, {
			position,
			className: style
		} );
	}

	notify_sync = ( text, style, icon ) => {
		this.toastSyncId = toast( <Notification text={text} icon={icon} spin={true}/>, {
			position: toast.POSITION.TOP_CENTER,
			autoClose: false,
			className: style
		} );
	}

	updateSync = ( text, style, icon, autoClose ) => {
		toast.update( this.toastSyncId, {
			render: <Notification text={text} icon={icon}/>,
			position: toast.POSITION.TOP_CENTER,
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
		return ( <div className="row main">
      <ToastContainer closeButton={false} hideProgressBar={true}/>
      <Navigation filterData={this.filterData} update={this.update} sync={this.sync} syncApi={this.syncApi} { ...this.state }/>
      <Content filterFound={this.filterFound} update={this.update} notify={this.notify} { ...this.state }/>
    </div> );
	}
};
