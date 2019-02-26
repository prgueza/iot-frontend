/* IMPORT MODULES */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

/* IMPORT COMPONENTS */
import GroupDetails from './groupDetails';
import GroupForm from './groupForm';
import GroupDelete from './groupDelete';

/* COMPONENTS */
class GroupRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: null,
      isLoaded: false,
      error: null,
    };
  }

  /* FETCH FULL DATA ABOUT THE GROUP */
  componentDidMount() {
    const { group, token } = this.props;
    if (group) {
      axios.get(group.url, { headers: { Authorization: `Bearer ${token}` } })
        .then(
          res => this.setState({ group: res.data, isLoaded: true }),
          error => this.setState({ error, isLoaded: true }),
        );
    }
  }

  /* FORCE UPDATE IF WE CHANGE TO ANOTHER GROUP */
  componentWillReceiveProps(nextProps) {
    const { token, group } = this.props;
    if (nextProps.group && (nextProps.group._id !== group._id || nextProps.group.updatedAt !== group.updatedAt)) { // if props actually changed
      axios.get(nextProps.group.url, { headers: { Authorization: `Bearer ${token}` } })
        .then(
          (doc) => { // resolve callback
            this.setState({ group: doc.data, isLoaded: true });
          },
          (error) => { // reject callback
            this.setState({ error, isLoaded: true });
          },
        );
    }
  }

  render() {
    const { error, isLoaded, group } = this.state;
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
        <Route path="/groups/:groupId/edit" render={() => <GroupForm {...this.props} group={group} />} />
        <Route path="/groups/:groupId/delete" render={() => <GroupDelete {...this.props} group={group} />} />
        <Route path="/groups/:groupId" render={() => <GroupDetails {...this.props} group={group} />} />
      </Switch>
    );
  }
}

export default GroupRouter;
