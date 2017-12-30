/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { ImageInfo } from './ImageInfo.jsx';
import { ImageForm } from './ImageForm.jsx';
import { ImageDelete } from './ImageDelete.jsx';

/* COMPONENTS */
export class ImageDetails extends Component {

  constructor(props){
    super(props);
    this.state = {
      image: null,
    };
  }

  /* FETCH FULL DATA ABOUT THE IMAGE */
  componentDidMount(){
    fetch(this.props.image.url)
      .then(res => res.json())
      .then(image => {
        this.setState({ image })
      });
  }

  /* FORCE UPDATE IF WE CHANGE TO ANOTHER IMAGE*/
  componentWillReceiveProps(nextProps){
    if(nextProps.image){ // if we path to delete or edit there is no need
      fetch(nextProps.image.url)
        .then(res => res.json())
        .then(image => {
          this.setState({ image })
        });
    }
  }

  render(){
    // if image has been fetched
    if(this.state.image){
      return(
        <Switch>
          <Route path="/images/:imageId/edit" render={({ match }) => <ImageForm {...this.props} image={this.state.image}/>}/>
          <Route path="/images/:imageId/delete" render={({ match }) => <ImageDelete {...this.props} image={this.state.image}/>}/>
          <Route path="/images/:imageId" render={({ match }) => (<ImageInfo {...this.props} image={this.state.image}/>)}/>
        </Switch>
      );
    // while waiting for server response
    } else {
      return null; // TODO: Loading...
    }
  }
};
