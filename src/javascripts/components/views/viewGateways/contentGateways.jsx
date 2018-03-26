/* IMPORT MODULES */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { List } from '../../lists/list.jsx';
import { Title } from '../../tags/title.jsx';
import { GatewayGeneric } from './viewGateways-components/gatewayGeneric.jsx';
import { GatewayRouter } from './viewGateways-components/gatewayRouter.jsx';
import { GatewayForm } from './viewGateways-components/gatewayForm.jsx';

/* COMPONENTS */
export const ContentGateways = ({ gateways, filterValue, ...other }) => {
  return(
    <div className="col contenido">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>PUERTAS DE ENLACE</h1>
          </div>
          <hr></hr>
        </div>
      </div>
      <div className="ventana">
        <div className="row">
          <div className="col">
            <Title total={gateways.length} category='gateways'/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4">
            <List filterValue={filterValue} category='gateways' content={gateways}/>
          </div>
          <div className="col-8">
            <div className="row mb-3">
              <Switch>
                {/* For route /add we pass all props incluldying displays, groups, images and functions */}
                <Route path="/gateways/add" render={() => <GatewayForm {...other} gateways={gateways}/>}/>
                {/* For route /gatewayId we select the gateway based on the id and pass it separately */}
                <Route path="/gateways/:gatewayId" render={({ match }) => (<GatewayRouter {...other} gateway={gateways.find(g => g.id == match.params.gatewayId)}/>)}/>
              </Switch>
              <Route exact path="/gateways" render={() => (<GatewayGeneric/>)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
