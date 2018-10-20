/* IMPORT MODULES */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import List from '../../lists/list';
import Title from '../../tags/title';
import DisplayForm from './viewDisplays-components/displayForm';
import DisplayRouter from './viewDisplays-components/displayRouter';
import DisplayGeneric from './viewDisplays-components/displayGeneric';

/* COMPONENTS */
const ContentDisplays = ({ filterValue, ...props }) => {
  const { data: { displays } } = props;

  return (
		<div className="overview">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>DISPLAYS</h1>
          </div>
          <hr />
        </div>
      </div>
      <div className="row-panel">
        <div className="panel">
          <Title total={displays.length} appearance="card title-displays" icon="television" />
          <div className="row controls">
            <div className="col-4">
              <List filterValue={filterValue} category="displays" content={displays} />
            </div>
            <div className="col-8">
              <Switch>
                {/* For route /add we pass all props incluldying displays, groups, images and functions */}
                <Route path="/displays/add" render={() => <DisplayForm {...props} displays={displays} />} />
                {/* For route /displayId we select the display based on the id and pass it separately */}
                <Route path="/displays/:displayId" render={({ match }) => <DisplayRouter {...props} display={displays.find(display => display._id === match.params.displayId)} />} />
              </Switch>
              <Route exact path="/displays" render={() => <DisplayGeneric />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDisplays;
