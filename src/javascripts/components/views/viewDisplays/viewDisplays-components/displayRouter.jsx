/* IMPORT MODULES */
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'

/* IMPORT COMPONENTS */
import { DisplayDetails } from './displayDetails.jsx'
import { DisplayForm } from './displayForm.jsx'
import { DisplayDelete } from './displayDelete.jsx'

/* COMPONENT */
export class DisplayRouter extends Component {
	constructor( props ) {
		super( props )
		this.state = {
			display: null,
			isLoaded: false,
			error: null
		};
	}
	/* FETCH FULL DATA ABOUT THE DISPLAY */
	componentDidMount() {
		if ( this.props.display ) {
			axios.get( this.props.display.url, { headers: { Authorization: 'Bearer ' + this.props.token } } )
				.then(
					( display ) => { // resolve callback
						this.setState( { display: display.data, isLoaded: true } )
					}, ( error ) => { // reject callback
						this.setState( { error, isLoaded: true } )
					} )
		}
	}
	/* FORCE UPDATE IF WE CHANGE TO ANOTHER DISPLAY */
	componentWillReceiveProps( nextProps ) {
		if ( nextProps.display && ( nextProps.display._id != this.props.display._id || nextProps.display.updatedAt != this.props.display.updatedAt ) ) { // if props actually changed
			axios.get( nextProps.display.url, { headers: { Authorization: 'Bearer ' + this.props.token } } )
				.then(
					( display ) => { // resolve callback
						this.setState( { display: display.data, isLoaded: true } )
					}, ( error ) => { // reject callback
						this.setState( { error, isLoaded: true } )
					} )
		}
	}
	render() {
		const { error, isLoaded, display } = this.state;
		// wait for resource to be loaded or handle errors if any
		if ( error ) {
			// TODO: error handling
			return null
		} else if ( !isLoaded ) {
			return null
		} else {
			return ( <Switch>
          <Route path='/displays/:displayId/edit' render={({ match }) => <DisplayForm {...this.props} display={display}/>}/>
          <Route path='/displays/:displayId/delete' render={({ match }) => <DisplayDelete {...this.props} display={display}/>}/>
          <Route path='/displays/:displayId' render={({ match }) => <DisplayDetails {...this.props} display={display}/>}/>
        </Switch> )
		}
	}
}
