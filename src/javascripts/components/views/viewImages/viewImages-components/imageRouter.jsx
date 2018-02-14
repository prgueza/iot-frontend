/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { ImageDetails } from './ImageDetails.jsx';
import { ImageForm } from './ImageForm.jsx';
import { ImageDelete } from './ImageDelete.jsx';

/* COMPONENTS */
export class ImageRouter extends Component {

  constructor(props){
    super(props);
    this.state = {
      image: null,
      isLoaded: false,
      error: null,
    };
  }

  /* FETCH FULL DATA ABOUT THE IMAGE */
  componentDidMount(){
    fetch(this.props.image.url)
      .then(res => res.json())
      .then(
        (image) => { // resolve callback
          this.setState({ image, isLoaded: true })
        },
        (error) => { // reject callback
          this.setState({ error, isLoaded: true })
        }
    );
  }

  /* FORCE UPDATE IF WE CHANGE TO ANOTHER IMAGE*/
  componentWillReceiveProps(nextProps){
    if(nextProps.image._id != this.props.image._id || nextProps.image.updated_at != this.props.image.updated_at){ // if props actually changed
      fetch(nextProps.image.url)
        .then(res => res.json())
        .then(
          (image) => { // resolve callback
            this.setState({ image, isLoaded: true })
          },
          (error) => { // reject callback
            this.setState({ error, isLoaded: true })
          }
        );
    }
  }

  render(){
    const { error, isLoaded, image } = this.state;
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
          <Route path="/images/:imageId/edit" render={({ match }) => <ImageForm {...this.props} image={this.state.image}/>}/>
          <Route path="/images/:imageId/delete" render={({ match }) => <ImageDelete {...this.props} image={this.state.image}/>}/>
          <Route path="/images/:imageId" render={({ match }) => (<ImageDetails {...this.props} image={this.state.image}/>)}/>
        </Switch>
      );
    }
  }
};
