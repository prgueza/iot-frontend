/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { GroupInfo } from './groupInfo.jsx';
import { GroupForm } from './groupForm.jsx';
import { GroupDelete } from './groupDelete.jsx';

/* COMPONENTS */
export class GroupDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      group: null,
    };
  }

  /* FETCH FULL DATA ABOUT THE IMAGE */
  componentDidMount(){
    fetch(this.props.group.url)
      .then(res => res.json())
      .then(group => {
        this.setState({ group })
      });
  }

  /* FORCE UPDATE IF WE CHANGE TO ANOTHER IMAGE*/
  componentWillReceiveProps(nextProps){
    if(nextProps.group){// if we path to delete or edit there is no need
    fetch(nextProps.group.url)
      .then(res => res.json())
      .then(group => {
        this.setState({ group })
      });
    }
  }

  render() {
    // if group has been fetched
    if(this.state.group){
      return(
        <Switch>
          <Route path="/groups/:groupId/edit" render={({ match }) => <GroupForm {...this.props} group={this.state.group}/>}/>
          <Route path="/groups/:groupId/delete" render={({ match }) => <GroupDelete {...this.props} group={this.state.group}/>}/>
          <Route path="/groups/:groupId" render={({ match }) => (<GroupInfo {...this.props} group={this.state.group}/>)}/>
        </Switch>
      );
    // while waiting for server response
    } else {
      return null; // TODO: Loading...
    }
  }
};
