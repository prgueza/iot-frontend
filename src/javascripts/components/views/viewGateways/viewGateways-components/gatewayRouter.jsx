/* IMPORT MODULES */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios'

/* IMPORT COMPONENTS */
import { GatewayDetails } from './gatewayDetails.jsx';
import { GatewayForm } from './gatewayForm.jsx';
import { GatewayDelete } from './gatewayDelete.jsx';
import { Error } from '../../../tags/error.jsx';

/* COMPONENTS */
export class GatewayRouter extends Component {

  constructor(props){
    super(props);
    this.state = {
      gateway: null,
      isLoaded: false,
      error: null
    };
  }

  /* FETCH FULL DATA ABOUT THE IMAGE */
  componentDidMount(){
    if(this.props.gateway){
      axios.get(this.props.gateway.url)
        .then(
          (gateway) => { // resolve callback
            this.setState({ gateway: gateway.data, isLoaded: true })
          },
          (error) => { // reject callback
            this.setState({ error, isLoaded: true})
          }
        );
    }
  }

  /* FORCE UPDATE IF WE CHANGE TO ANOTHER DISPLAY */
  componentWillReceiveProps(nextProps){
    if(nextProps.gateway && (nextProps.gateway._id != this.props.gateway._id || nextProps.gateway.updated_at != this.props.gateway.updated_at)){ // if props actually changed
      axios.get(nextProps.gateway.url)
        .then(
          (gateway) => { // resolve callback
            this.setState({ gateway: gateway.data, isLoaded: true })
          },
          (error) => { // reject callback
            this.setState({ error, isLoaded: true })
          }
        );
    }
  }

  render(){
    const { error, isLoaded, gateway } = this.state;
    // wait for resource to be loaded or handle errors if any
    if (error) {
      // TODO: Error handling
    } else if (!isLoaded) {
      // TODO: loading
      return null;
    } else {
      return(
        <Switch>
          <Route path="/gateways/:gatewayId/edit" render={({ match }) => <GatewayForm {...this.props} gateway={this.state.gateway}/>}/>
          <Route path="/gateways/:gatewayId/delete" render={({ match }) => <GatewayDelete {...this.props} gateway={this.state.gateway}/>}/>
          <Route path="/gateways/:gatewayId" render={({ match }) => (<GatewayDetails {...this.props} gateway={this.state.gateway}/>)}/>
        </Switch>
      );
    }
  }
};
