/* IMPORT MODULES */
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'

/* IMPORT COMPONENTS */
import { DeviceDetails } from './deviceDetails.jsx'
import { DeviceForm } from './deviceForm.jsx'
import { DeviceDelete } from './deviceDelete.jsx'

/* COMPONENTS */
export class DeviceRouter extends Component {

	constructor( props ) {
		super( props )
		this.state = {
			device: null,
			isLoaded: false,
			error: null
		}
	}

	/* FETCH FULL DATA ABOUT THE IMAGE */
	componentDidMount() {
		if ( this.props.device ) {
			axios.get( this.props.device.url, { headers: { Authorization: 'Bearer ' + this.props.token } } )
				.then(
					( device ) => { // resolve callback
						this.setState( { device: device.data, isLoaded: true } )
					},
					( error ) => { // reject callback
						this.setState( { error, isLoaded: true } )
					}
				)
		}
	}

	/* FORCE UPDATE IF WE CHANGE TO ANOTHER DEVICE */
	componentWillReceiveProps( nextProps ) {
		if ( nextProps.device && ( nextProps.device._id != this.props.device._id || nextProps.device.updated_at != this.props.device.updated_at ) ) { // if props actually changed
			axios.get( nextProps.device.url, { headers: { Authorization: 'Bearer ' + this.props.token } } )
				.then(
					( device ) => { // resolve callback
						this.setState( { device: device.data, isLoaded: true } )
					},
					( error ) => { // reject callback
						this.setState( { error, isLoaded: true } )
					}
				)
		}
	}

	render() {
		const { error, isLoaded, device } = this.state
		// wait for resource to be loaded or handle errors if any
		if ( error ) {
			// TODO: error handling
			return null
		} else if ( !isLoaded ) {
			// TODO: loading
			return null
		} else {
			return (
				<Switch>
          <Route path='/devices/:deviceId/edit' render={({ match }) => <DeviceForm {...this.props} device={device}/>}/>
          <Route path='/devices/:deviceId/delete' render={({ match }) => <DeviceDelete {...this.props} device={device}/>}/>
          <Route path='/devices/:deviceId' render={({ match }) => <DeviceDetails {...this.props} device={device}/>}/>
        </Switch>
			)
		}
	}
}
