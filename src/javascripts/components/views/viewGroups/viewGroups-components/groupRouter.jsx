/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { GroupDetails } from './groupDetails.jsx';
import { GroupForm } from './groupForm.jsx';
import { GroupDelete } from './groupDelete.jsx';

/* COMPONENTS */
export class GroupRouter extends Component {

  constructor(props){
    super(props);
    this.state = {
      group: null,
      isLoaded: false,
      error: null,
    };
  }

  /* FETCH FULL DATA ABOUT THE IMAGE */
  componentDidMount(){
    fetch(this.props.group.url)
      .then(res => res.json())
      .then(
        (group) => { // resolve callback
          this.setState({ group, isLoaded: true })
        },
        (error) => { // reject callback
          this.setState({ error, isLoaded: true })
        }
      );
  }

  /* FORCE UPDATE IF WE CHANGE TO ANOTHER IMAGE*/
  componentWillReceiveProps(nextProps){
    if(JSON.stringify(nextProps.group) != JSON.stringify(this.props.group)){ // if props actually changed
    fetch(nextProps.group.url)
      .then(res => res.json())
      .then(
        (group) => { // resolve callback
          this.setState({ group, isLoaded: true })
        },
        (error) => { // reject callback
          this.setState({ error, isLoaded: true })
        }
      );
    }
  }

  render() {
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
          <Route path="/groups/:groupId/edit" render={({ match }) => <GroupForm {...this.props} group={this.state.group}/>}/>
          <Route path="/groups/:groupId/delete" render={({ match }) => <GroupDelete {...this.props} group={this.state.group}/>}/>
          <Route path="/groups/:groupId" render={({ match }) => (<GroupDetails {...this.props} group={this.state.group}/>)}/>
        </Switch>
      );
    }
  }
};
