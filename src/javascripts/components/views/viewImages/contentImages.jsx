/* IMPORT MODULES */
import React from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { ImageForm } from './viewImages-components/ImageForm.jsx';
import { ImageRouter } from './viewImages-components/ImageRouter.jsx';
import { ImageGeneric } from './viewImages-components/ImageGeneric.jsx';
import { List } from '../../lists/list.jsx';
import { Title } from '../../tags/title.jsx';

/* COMPONENTS */
export const ContentImages = ({ images, ...other }) => {
  return(
    <div className="col contenido">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>IMAGENES</h1>
          </div>
          <hr></hr>
        </div>
      </div>
      <div className="ventana">
        <div className="row">
          <div className="col">
            <Title total={images.count} categoria='images'/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4">
            <List categoria='images' contenido={images.data}/>
          </div>
          <div className="col-8">
            <div className="row mb-3">
              <Switch>
                {/* For route /add we pass all props incluldying displays, groups, images and functions */}
                <Route path="/images/add" render={() => <ImageForm {...other} images={images}/>}/>
                {/* For route /imageId we select the image based on the id and pass it separately */}
                <Route path="/images/:imageId" render={({ match }) => (<ImageRouter {...other} image={images.data.find(i => i.id == match.params.imageId)}/>)}/>
              </Switch>
              <Route exact path="/images" render={() => (<ImageGeneric/>)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
