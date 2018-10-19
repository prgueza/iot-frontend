/* IMPORT MODULES */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

/* IMPORT COMPONENTS */
import DisplayDetails from './displayDetails';
import DisplayForm from './displayForm';
import DisplayDelete from './displayDelete';

/* COMPONENT */
class DisplayRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: null,
      isLoaded: false,
      error: null,
    };
  }

  /* FETCH FULL DATA ABOUT THE DISPLAY */
  componentDidMount() {
    const { display, token } = this.props;
    if (display) {
      axios.get(display.url, { headers: { Authorization: `Bearer ${token}` } })
        .then(
          (res) => { // resolve callback
            this.setState({ display: res.data, isLoaded: true });
          }, (error) => { // reject callback
            this.setState({ error, isLoaded: true });
          },
        );
    }
  }

  /* FORCE UPDATE IF WE CHANGE TO ANOTHER DISPLAY */
  componentWillReceiveProps(nextProps) {
    const { display, token } = this.props;
    if (nextProps.display && (nextProps.display._id !== display._id || nextProps.display.updatedAt !== display.updatedAt)) { // if props actually changed
      axios.get(nextProps.display.url, { headers: { Authorization: `Bearer ${token}` } })
        .then(
          (res) => { // resolve callback
            this.setState({ display: res.data, isLoaded: true });
          }, (error) => { // reject callback
            this.setState({ error, isLoaded: true });
          },
        );
    }
  }

  render() {
    const { error, isLoaded, display } = this.state;
    // wait for resource to be loaded or handle errors if any
    if (error) {
      // TODO: error handling
      return null;
    } if (!isLoaded) {
      return null;
    }
    return (
			<Switch>
        <Route path="/displays/:displayId/edit" render={() => <DisplayForm {...this.props} display={display} />} />
        <Route path="/displays/:displayId/delete" render={() => <DisplayDelete {...this.props} display={display} />} />
        <Route path="/displays/:displayId" render={() => <DisplayDetails {...this.props} display={display} />} />
      </Switch>
    );
  }
}

export default DisplayRouter;
