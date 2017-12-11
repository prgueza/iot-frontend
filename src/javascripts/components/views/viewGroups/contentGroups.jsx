/* IMPORT MODULES */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { GroupDetails } from './viewGroups-components/groupDetails.jsx';
import { GroupForm } from './viewGroups-components/groupForm.jsx';
import { GroupGeneric } from './viewGroups-components/groupGeneric.jsx';
import { List } from '../../lists/list.jsx';
import { Title } from '../../tags/title.jsx';

/* COMPONENTS */
export const ContentGroups = ({ groups, ...other }) => {
  return(
    <div className="col contenido">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>GRUPOS</h1>
          </div>
          <hr></hr>
        </div>
      </div>
      <div className="ventana">
        <div className="row">
          <div className="col">
            <Title total={groups.length} categoria='groups'/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4">
            <List categoria='groups' contenido={groups}/>
          </div>
          <div className="col-8">
            <div className="row mb-3">
              <Switch>
                <Route path="/groups/add" render={() => <GroupForm {...other} groups={groups}/>}/>
                <Route path="/groups/:groupId" render={({ match }) => (<GroupDetails {...other} group={groups.find(g => g.id == match.params.groupId)}/>)}/>
              </Switch>
              <Route exact path="/groups" render={() => (<GroupGeneric/>)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
