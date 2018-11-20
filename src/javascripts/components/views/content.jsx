/* IMPORT MODULES */
import React from 'react';
import { Route } from 'react-router-dom';

/* IMPORT COMPONENTS */
import ContentDisplays from './viewDisplays/contentDisplays';
import ContentImages from './viewImages/contentImages';
import ContentGroups from './viewGroups/contentGroups';
import ContentSettings from './viewSettings/contentSettings';
import ContentGateways from './viewGateways/contentGateways';
import ContentDevices from './viewDevices/contentDevices';
import ContentState from './viewState/contentState';
import Overview from './overview';
import ProtectedRoute from './protectedRoute';

/* COMPONENT */
const Content = ({ isLoaded, ...rest }) => {
  if (isLoaded) {
    return (
      <div className="col content">
        <Route exact path="/" render={() => <Overview {...rest} />} />
        <Route path="/displays" render={() => <ContentDisplays {...rest} />} />
        <Route path="/images" render={() => <ContentImages {...rest} />} />
        <Route path="/groups" render={() => <ContentGroups {...rest} />} />
        <Route path="/state" render={() => <ContentState {...rest} />} />
        <ProtectedRoute {...rest} path="/settings" component={ContentSettings} />
        <ProtectedRoute {...rest} path="/devices" component={ContentDevices} />
        <ProtectedRoute {...rest} path="/gateways" component={ContentGateways} />
      </div>);
  }
  return (
    <div className="col text-center d-flex align-items-center justify-content-center">
      <h1>
        <i className="fa fa-circle-o-notch fa-spin fa-fw mr-4" />
Cargando
      </h1>
    </div>);
};

export default Content;
