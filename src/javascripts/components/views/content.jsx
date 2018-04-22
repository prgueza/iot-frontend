/* IMPORT MODULES */
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

/* IMPORT COMPONENTS */
import { ContentDisplays } from './viewDisplays/contentDisplays.jsx'
import { ContentImages } from './viewImages/contentImages.jsx'
import { ContentGroups } from './viewGroups/contentGroups.jsx'
import { ContentAccount } from './viewAccount/contentAccount.jsx'
import { ContentSettings } from './viewSettings/contentSettings.jsx'
import { ContentDocs } from './viewDocs/contentDocs.jsx'
import { ContentGateways } from './viewGateways/contentGateways.jsx'
import { ContentDevices } from './viewDevices/contentDevices.jsx'
import { Overview } from './overview.jsx'
import { ProtectedRoute } from './protectedRoute.jsx'

/* COMPONENT */
export const Content = ({ isLoaded, ...rest }) => {
  if (isLoaded) {
    return (
      <div className="col content">
        <Route exact={true} path="/" render={() => (<Overview { ...rest }/>)}/>
        <Route path="/displays" render={() => (<ContentDisplays { ...rest }/>)}/>
        <Route path="/images" render={() => (<ContentImages { ...rest }/>)}/>
        <Route path="/groups" render={() => (<ContentGroups { ...rest }/>)}/>
        <Route path="/docs" render={() => (<ContentDocs { ...rest }/>)}/>
        <ProtectedRoute {...rest} path="/settings" component={ContentSettings}/>
        <ProtectedRoute {...rest} path="/devices" component={ContentDevices}/>
        <ProtectedRoute {...rest} path="/gateways" component={ContentGateways}/>
      </div>)
  } else {
     return (
      <div className="col text-center d-flex align-items-center justify-content-center">
        <h1><i className="fa fa-circle-o-notch fa-spin fa-fw mr-4"></i>Cargando</h1>
      </div>)
  }
}
