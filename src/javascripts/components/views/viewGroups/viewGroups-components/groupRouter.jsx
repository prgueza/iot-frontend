/* IMPORT MODULES */
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import axios from 'axios'

/* IMPORT COMPONENTS */
import { GroupDetails } from './groupDetails.jsx'
import { GroupForm } from './groupForm.jsx'
import { GroupDelete } from './groupDelete.jsx'

/* COMPONENTS */
export class GroupRouter extends Component {

  constructor(props){
    super(props)
    this.state = {
      group: null,
      isLoaded: false,
      error: null,
    }
  }

  /* FETCH FULL DATA ABOUT THE GROUP */
  componentDidMount(){
    if(this.props.group){
      axios.get(this.props.group.url, { headers: { Authorization: 'Bearer ' + this.props.token } })
        .then(
          (group) => { // resolve callback
            this.setState({ group: group.data, isLoaded: true })
          },
          (error) => { // reject callback
            this.setState({ error, isLoaded: true })
          }
        )
      }
  }

  /* FORCE UPDATE IF WE CHANGE TO ANOTHER GROUP*/
  componentWillReceiveProps(nextProps){
    if(nextProps.group && (nextProps.group._id != this.props.group._id || nextProps.group.updated_at != this.props.group.updated_at)){ // if props actually changed
      axios.get(nextProps.group.url, { headers: { Authorization: 'Bearer ' + this.props.token } })
        .then(
          (group) => { // resolve callback
            this.setState({ group: group.data, isLoaded: true })
          },
          (error) => { // reject callback
            this.setState({ error, isLoaded: true })
          }
        )
    }
  }

  render() {
    const { error, isLoaded, group } = this.state
    // wait for resource to be loaded or handle errors if any
    if (error) {
      // TODO: error handling
      return null
    } else if (!isLoaded) {
      // TODO: loading
      return null
    } else {
      return(
        <Switch>
          <Route path="/groups/:groupId/edit" render={({ match }) => <GroupForm {...this.props} group={group}/>}/>
          <Route path="/groups/:groupId/delete" render={({ match }) => <GroupDelete {...this.props} group={group}/>}/>
          <Route path="/groups/:groupId" render={({ match }) => (<GroupDetails {...this.props} group={group}/>)}/>
        </Switch>
      )
    }
  }
}
