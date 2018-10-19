/* IMPORT MODULES */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

/* IMPORT COMPONENTS */
import GatewayDetails from './gatewayDetails';
import GatewayForm from './gatewayForm';
import GatewayDelete from './gatewayDelete';

/* COMPONENTS */
class GatewayRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gateway: null,
      isLoaded: false,
      error: null,
    };
  }

  /* FETCH FULL DATA ABOUT THE IMAGE */
  componentDidMount() {
    const { gateway, token } = this.props;
    if (gateway) {
      axios.get(gateway.url, { headers: { Authorization: `Bearer ${token}` } })
        .then(
          res => this.setState({ gateway: res.data, isLoaded: true }),
          error => this.setState({ error, isLoaded: true }),
        );
    }
  }

  /* FORCE UPDATE IF WE CHANGE TO ANOTHER DISPLAY */
  componentWillReceiveProps(nextProps) {
    const { gateway, token } = this.props;
    if (nextProps.gateway && (nextProps.gateway._id !== gateway._id || nextProps.gateway.updatedAt !== gateway.updatedAt)) {
      axios.get(nextProps.gateway.url, { headers: { Authorization: `Bearer ${token}` } })
        .then(
          res => this.setState({ gateway: res.data, isLoaded: true }),
          error => this.setState({ error, isLoaded: true }),
        );
    }
  }

  render() {
    const { error, isLoaded, gateway } = this.state;
    // wait for resource to be loaded or handle errors if any
    if (error) {
      // TODO: Error handling
      return false;
    } if (!isLoaded) {
      // TODO: loading
      return null;
    }
    return (
				<Switch>
          <Route path="/gateways/:gatewayId/edit" render={() => <GatewayForm {...this.props} gateway={gateway} />} />
          <Route path="/gateways/:gatewayId/delete" render={() => <GatewayDelete {...this.props} gateway={gateway} />} />
          <Route path="/gateways/:gatewayId" render={() => <GatewayDetails {...this.props} gateway={gateway} />} />
        </Switch>
    );
  }
}

export default GatewayRouter;
