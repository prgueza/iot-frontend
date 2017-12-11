/* IMPORT MODULES */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { DisplayDetails } from './viewDisplays-components/displayDetails.jsx';
import { DisplayForm } from './viewDisplays-components/displayForm.jsx';
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
            <Title total={displays.length} categoria='displays'/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4">
            <List categoria='displays' contenido={displays}/>
          </div>
          <div className="col-8">
            <div className="row mb-3">
              <Switch>
                <Route path="/displays/add" render={() => <DisplayForm {...other} displays={displays}/>}/>
                <Route path="/displays/edit/:displayId" render={({ match }) => <DisplayForm {...other} display={displays.find(d => d.id == match.params.displayId)}/>}/>
                <Route path="/displays/:displayId" render={({ match }) => (<DisplayDetails display={displays.find(d => d.id == match.params.displayId)}/>)}/>
              </Switch>
              <Route exact path="/displays" render={() => (<DisplayGeneric/>)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
