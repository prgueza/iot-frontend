/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { DisplayDetails } from './displayDetails.jsx';
import { DisplayForm } from './displayForm.jsx';
import { DisplayDelete } from './displayDelete.jsx';

/* COMPONENTS */
export class DisplayRouter extends Component {

  constructor(props){
    super(props);
    this.state = {
      display: null,
      isLoaded: false,
      error: null
    };
  }

  /* FETCH FULL DATA ABOUT THE IMAGE */
  componentDidMount(){
    fetch(this.props.display.url)
      .then(res => res.json())
      .then(
        (display) => { // resolve callback
          this.setState({ display, isLoaded: true })
        },
        (error) => { // reject callback
          this.setState({ error, isLoaded: true})
        }
      );
  }

  /* FORCE UPDATE IF WE CHANGE TO ANOTHER IMAGE*/
  componentWillReceiveProps(nextProps){
    if(nextProps.display._id != this.props.display._id || nextProps.display.updated_at != this.props.display.updated_at){ // if props actually changed
      fetch(nextProps.display.url)
        .then(res => res.json())
        .then(
          (display) => { // resolve callback
            this.setState({ display, isLoaded: true })
          },
          (error) => { // reject callback
            this.setState({ display, isLoaded: true })
          }
        );
    }
  }

  render(){
    const { error, isLoaded, display } = this.state;
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
          <Route path="/displays/:displayId/edit" render={({ match }) => <DisplayForm {...this.props} display={this.state.display}/>}/>
          <Route path="/displays/:displayId/delete" render={({ match }) => <DisplayDelete {...this.props} display={this.state.display}/>}/>
          <Route path="/displays/:displayId" render={({ match }) => (<DisplayDetails {...this.props} display={this.state.display}/>)}/>
        </Switch>
      );
    }
  }
};
