/* IMPORT MODULES */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import List from '../../lists/list';
import Title from '../../tags/title';
import GatewayGeneric from './viewGateways-components/gatewayGeneric';
import GatewayRouter from './viewGateways-components/gatewayRouter';
import GatewayForm from './viewGateways-components/gatewayForm';

/* COMPONENTS */
const ContentGateways = ({ filterValue, ...props }) => {
  const { data: { gateways } } = props;

  return (
		<div className="overview">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>PUERTAS DE ENLACE</h1>
          </div>
          <hr />
        </div>
      </div>
      <div className="row-panel">
        <div className="panel">
          <Title total={gateways.length} appearance="card title-gateways" icon="sitemap" />
          <div className="row controls">
            <div className="col-4">
              <List filterValue={filterValue} category="gateways" content={gateways} />
            </div>
            <div className="col-8">
              <Switch>
                {/* For route /add we pass all props incluldying displays, groups, images and functions */}
                <Route path="/gateways/add" render={() => <GatewayForm {...props} gateways={gateways} />} />
                {/* For route /gatewayId we select the gateway based on the id and pass it separately */}
                <Route path="/gateways/:gatewayId" render={({ match }) => <GatewayRouter {...props} gateway={gateways.find(gateway => gateway._id === match.params.gatewayId)} />} />
              </Switch>
              <Route exact path="/gateways" render={() => <GatewayGeneric />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentGateways;
