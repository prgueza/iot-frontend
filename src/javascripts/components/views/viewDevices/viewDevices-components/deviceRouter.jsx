/* IMPORT MODULES */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

/* IMPORT COMPONENTS */
import DeviceDetails from './deviceDetails';
import DeviceForm from './deviceForm';
import DeviceDelete from './deviceDelete';

/* COMPONENTS */
class DeviceRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device: null,
      isLoaded: false,
      error: null,
    };
  }

  /* FETCH FULL DATA ABOUT THE IMAGE */
  componentDidMount() {
    const { token, device } = this.props;
    if (device) {
      axios.get(device.url, { headers: { Authorization: `Bearer ${token}` } })
        .then(
          (doc) => { // resolve callback
            this.setState({ device: doc.data, isLoaded: true });
          },
          (error) => { // reject callback
            this.setState({ error, isLoaded: true });
          },
        );
    }
  }

  /* FORCE UPDATE IF WE CHANGE TO ANOTHER DEVICE */
  componentWillReceiveProps(nextProps) {
    const { token, device } = this.props;
    if (nextProps.device && (nextProps.device._id !== device._id || nextProps.device.updatedAt !== device.updatedAt)) { // if props actually changed
      axios.get(nextProps.device.url, { headers: { Authorization: `Bearer ${token}` } })
        .then(
          (doc) => { // resolve callback
            this.setState({ device: doc.data, isLoaded: true });
          },
          (error) => { // reject callback
            this.setState({ error, isLoaded: true });
          },
        );
    }
  }

  render() {
    const { error, isLoaded, device } = this.state;
    // wait for resource to be loaded or handle errors if any
    if (error) {
      // TODO: error handling
      return null;
    } if (!isLoaded) {
      // TODO: loading
      return null;
    }
    return (
      <Switch>
        <Route path="/devices/:deviceId/edit" render={() => <DeviceForm {...this.props} device={device} />} />
        <Route path="/devices/:deviceId/delete" render={() => <DeviceDelete {...this.props} device={device} />} />
        <Route path="/devices/:deviceId" render={() => <DeviceDetails {...this.props} device={device} />} />
      </Switch>
    );
  }
}

export default DeviceRouter;
