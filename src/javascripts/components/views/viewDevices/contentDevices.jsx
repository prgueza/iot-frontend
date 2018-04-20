/* IMPORT MODULES */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { List } from '../../lists/list.jsx';
import { Title } from '../../tags/title.jsx';
import { DeviceGeneric } from './viewDevices-components/deviceGeneric.jsx';
import { DeviceRouter } from './viewDevices-components/deviceRouter.jsx';
import { DeviceForm } from './viewDevices-components/deviceForm.jsx';

/* COMPONENTS */
export const ContentDevices = ({ devices, filterValue, filterFound, filterFoundValue, ...other }) => {
  return(
    <div className="overview">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>DISPOSITIVOS FÍSICOS</h1>
          </div>
          <hr></hr>
        </div>
      </div>
      <div className="row-panel">
        <div className="panel">
          <Title total={devices.length} appearance="card title-devices" icon="tablet"/>
          <div className="row controls">
            <div className="col-4">
              <List filterValue={filterValue} filterFound={filterFound} filterFoundValue={filterFoundValue} category='devices' content={devices}/>
            </div>
            <div className="col-8">
              <Switch>
                {/* For route /deviceId we select the device based on the id and pass it separately */}
                <Route path="/devices/:deviceId" render={({ match }) => (<DeviceRouter {...other} device={devices.find(d => d._id == match.params.deviceId)}/>)}/>
              </Switch>
              <Route exact path="/devices" render={() => (<DeviceGeneric/>)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
