/* IMPORT MODULES */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { DisplayForm } from './viewDisplays-components/displayForm.jsx';
import { DisplayRouter } from './viewDisplays-components/displayRouter.jsx';
import { DisplayGeneric } from './viewDisplays-components/displayGeneric.jsx';
import { List } from '../../lists/list.jsx';
import { Title } from '../../tags/title.jsx';

/* COMPONENTS */
export const ContentDisplays = ({ displays, ...other }) => {
  return(
    <div className="col contenido">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>DISPLAYS</h1>
          </div>
          <hr></hr>
        </div>
      </div>
      <div className="ventana">
        <div className="row">
          <div className="col">
            <Title total={displays.count} category='displays'/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4">
            <List category='displays' content={displays.data}/>
          </div>
          <div className="col-8">
            <div className="row mb-3">
              <Switch>
                {/* For route /add we pass all props incluldying displays, groups, images and functions */}
                <Route path="/displays/add" render={() => <DisplayForm {...other} displays={displays}/>}/>
                {/* For route /displayId we select the display based on the id and pass it separately */}
                <Route path="/displays/:displayId" render={({ match }) => (<DisplayRouter {...other} display={displays.data.find(d => d.id == match.params.displayId)}/>)}/>
              </Switch>
              <Route exact path="/displays" render={() => (<DisplayGeneric/>)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
