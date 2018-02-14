/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { DeviceDetails } from './deviceDetails.jsx';
import { DeviceForm } from './deviceForm.jsx';
import { DeviceDelete } from './deviceDelete.jsx';

/* COMPONENTS */
export class DeviceRouter extends Component {

  constructor(props){
    super(props);
    this.state = {
      device: null,
      isLoaded: false,
      error: null
    };
  }

  /* FETCH FULL DATA ABOUT THE IMAGE */
  componentDidMount(){
    fetch(this.props.device.url)
      .then(res => res.json())
      .then(
        (device) => { // resolve callback
          this.setState({ device, isLoaded: true })
        },
        (error) => { // reject callback
          this.setState({ error, isLoaded: true})
        }
      );
  }

  /* FORCE UPDATE IF WE CHANGE TO ANOTHER IMAGE*/
  componentWillReceiveProps(nextProps){
    if(nextProps.device._id != this.props.device._id || nextProps.device.updated_at != this.props.device.updated_at){ // if props actually changed
      fetch(nextProps.device.url)
        .then(res => res.json())
        .then(
          (device) => { // resolve callback
            this.setState({ device, isLoaded: true })
          },
          (error) => { // reject callback
            this.setState({ device, isLoaded: true })
          }
        );
    }
  }

  render(){
    const { error, isLoaded, device } = this.state;
    // wait for resource to be loaded or handle errors if any
    if (error) {
      // TODO: error handling
      return null;
    } else if (!isLoaded) {
      // TODO: loading
      return null;
    } else {
      return(
        <Switch>
          <Route path="/devices/:deviceId/edit" render={({ match }) => <DeviceForm {...this.props} device={this.state.device}/>}/>
          <Route path="/devices/:deviceId/delete" render={({ match }) => <DeviceDelete {...this.props} device={this.state.device}/>}/>
          <Route path="/devices/:deviceId" render={({ match }) => (<DeviceDetails {...this.props} device={this.state.device}/>)}/>
        </Switch>
      );
    }
  }
};
