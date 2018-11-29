/* IMPORT MODULES */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import List from '../../lists/list';
import Title from '../../tags/title';
import DeviceGeneric from './viewDevices-components/deviceGeneric';
import DeviceRouter from './viewDevices-components/deviceRouter';

/* COMPONENTS */
const ContentDevices = ({
  filterValue, filterFoundValue, filterFound, ...props
}) => {
  const { data: { devices } } = props;

  return (
    <div className="overview">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>DISPOSITIVOS FÍSICOS</h1>
          </div>
          <hr />
        </div>
      </div>
      <div className="row-panel">
        <div className="panel">
          <Title total={devices.length} appearance="card title-devices" icon="tablet-alt" />
          <div className="row controls">
            <div className="col-4">
              <List filterValue={filterValue} filterFoundValue={filterFoundValue} filterFound={filterFound} category="devices" content={devices} />
            </div>
            <div className="col-8">
              <Switch>
                {/* For route /deviceId we select the device based on the id and pass it separately */}
                <Route path="/devices/:deviceId" render={({ match }) => <DeviceRouter {...props} device={devices.find(device => device._id === match.params.deviceId)} />} />
              </Switch>
              <Route exact path="/devices" render={() => <DeviceGeneric />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDevices;
