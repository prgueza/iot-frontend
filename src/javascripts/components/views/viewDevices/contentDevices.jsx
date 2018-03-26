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
export const ContentDevices = ({ devices, filterValue, ...other }) => {
  return(
    <div className="col contenido">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>DISPOSITIVOS FÍSICOS</h1>
          </div>
          <hr></hr>
        </div>
      </div>
      <div className="ventana">
        <div className="row">
          <div className="col">
            <Title total={devices.length} category='devices'/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4">
            <List filterValue={filterValue} category='devices' content={devices}/>
          </div>
          <div className="col-8">
            <div className="row mb-3">
              <Switch>
                {/* For route /add we pass all props incluldying displays, groups, images and functions */}
                <Route path="/devices/add" render={() => <DeviceForm {...other} devices={devices}/>}/>
                {/* For route /deviceId we select the device based on the id and pass it separately */}
                <Route path="/devices/:deviceId" render={({ match }) => (<DeviceRouter {...other} device={devices.find(d => d.id == match.params.deviceId)}/>)}/>
              </Switch>
              <Route exact path="/devices" render={() => (<DeviceGeneric/>)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
