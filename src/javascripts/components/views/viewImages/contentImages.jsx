/* IMPORT MODULES */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import ImageForm from './viewImages-components/imageForm';
import ImageRouter from './viewImages-components/imageRouter';
import ImageGeneric from './viewImages-components/imageGeneric';
import List from '../../lists/list';
import Title from '../../tags/title';

/* COMPONENTS */
const ContentImages = ({ filterValue, ...props }) => {
  const { data: { images } } = props;

  return (
		<div className="overview">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>IMAGENES</h1>
          </div>
          <hr />
        </div>
      </div>
      <div className="row-panel">
        <div className="panel">
          <Title total={images.length} appearance="card title-images" icon={['far', 'images']} />
          <div className="row controls">
            <div className="col-4">
              <List filterValue={filterValue} category="images" content={images} />
            </div>
            <div className="col-8">
              <Switch>
                {/* For route /add we pass all props incluldying displays, groups, images and functions */}
                <Route path="/images/add" render={() => <ImageForm {...props} images={images} />} />
                {/* For route /imageId we select the image based on the id and pass it separately */}
                <Route path="/images/:imageId" render={({ match }) => <ImageRouter {...props} image={images.find(i => i._id === match.params.imageId)} />} />
              </Switch>
              <Route exact path="/images" render={() => <ImageGeneric />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentImages;
