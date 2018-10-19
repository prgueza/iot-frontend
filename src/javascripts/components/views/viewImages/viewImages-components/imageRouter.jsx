/* IMPORT MODULES */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

/* IMPORT COMPONENTS */
import ImageDetails from './imageDetails';
import ImageForm from './imageForm';
import ImageDelete from './imageDelete';

/* COMPONENTS */
class ImageRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      isLoaded: false,
      error: null,
    };
  }

  /* FETCH FULL DATA ABOUT THE IMAGE */
  componentDidMount() {
    const { image, token } = this.props;
    if (image) {
      axios.get(image.url, { headers: { Authorization: `Bearer ${token}` } })
        .then(
          res => this.setState({ image: res.data, isLoaded: true }),
          error => this.setState({ error, isLoaded: true }),
        );
    }
  }

  /* FORCE UPDATE IF WE CHANGE TO ANOTHER IMAGE */
  componentWillReceiveProps(nextProps) {
    const { image, token } = this.props;
    if (nextProps.image && (nextProps.image._id !== image._id || nextProps.image.updatedAt !== image.updatedAt)) { // if props actually changed
      axios.get(nextProps.image.url, { headers: { Authorization: `Bearer ${token}` } })
        .then(
          res => this.setState({ image: res.data, isLoaded: true }),
          error => this.setState({ error, isLoaded: true }),
        );
    }
  }

  render() {
    const { error, isLoaded, image } = this.state;
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
          <Route path="/images/:imageId/edit" render={() => <ImageForm {...this.props} image={image} />} />
          <Route path="/images/:imageId/delete" render={() => <ImageDelete {...this.props} image={image} />} />
          <Route path="/images/:imageId" render={() => <ImageDetails {...this.props} image={image} />} />
        </Switch>
    );
  }
}

export default ImageRouter;
