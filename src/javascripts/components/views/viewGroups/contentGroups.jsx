/* IMPORT MODULES */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { GroupRouter } from './viewGroups-components/groupRouter.jsx';
import { GroupForm } from './viewGroups-components/groupForm.jsx';
import { GroupGeneric } from './viewGroups-components/groupGeneric.jsx';
import { List } from '../../lists/list.jsx';
import { Title } from '../../tags/title.jsx';

/* COMPONENTS */
export const ContentGroups = ({ groups, filterValue, ...other }) => {
  return(
    <div className="overview">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>GRUPOS</h1>
          </div>
          <hr></hr>
        </div>
      </div>
      <div className="row-panel">
        <div className="panel">
          <Title total={groups.length} appearance="card title-groups" icon="list"/>
          <div className="row controls">
            <div className="col-4">
              <List filterValue={filterValue} category='groups' content={groups}/>
            </div>
            <div className="col-8">
              <Switch>
                {/* For route /add we pass all props incluldying displays, groups, images and functions */}
                <Route path="/groups/add" render={() => <GroupForm {...other} groups={groups}/>}/>
                {/* For route /groupId we select the image based on the id and pass it separately */}
                <Route path="/groups/:groupId" render={({ match }) => (<GroupRouter {...other} group={groups.find(g => g.id == match.params.groupId)}/>)}/>
              </Switch>
              <Route exact path="/groups" render={() => (<GroupGeneric/>)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
