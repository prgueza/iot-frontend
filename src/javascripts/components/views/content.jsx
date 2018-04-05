/* IMPORT MODULES */
import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { ContentDisplays } from './viewDisplays/contentDisplays.jsx';
import { ContentImages } from './viewImages/contentImages.jsx';
import { ContentGroups } from './viewGroups/contentGroups.jsx';
import { ContentAccount } from './viewAccount/contentAccount.jsx';
import { ContentSettings } from './viewSettings/contentSettings.jsx';
import { ContentDocs } from './viewDocs/contentDocs.jsx';
import { ContentGateways } from './viewGateways/contentGateways.jsx';
import { ContentDevices } from './viewDevices/contentDevices.jsx';
import { Overview } from './overview.jsx';

/* COMPONENTS */
export class Content extends Component{
  render(){
    if ( this.props.isLoaded ){
       var content =
        <div className="col content">
          <Route exact={true} path="/" render={() => (<Overview { ...this.props }/>)}/>
          <Route path="/displays" render={() => (<ContentDisplays { ...this.props }/>)}/>
          <Route path="/images" render={() => (<ContentImages { ...this.props }/>)}/>
          <Route path="/groups" render={() => (<ContentGroups { ...this.props }/>)}/>
          <Route path="/account" render={() => (<ContentAccount { ...this.props }/>)}/>
          <Route path="/settings" render={() => (<ContentSettings { ...this.props }/>)}/>
          <Route path="/docs" render={() => (<ContentDocs { ...this.props }/>)}/>
          <Route path="/gateways" render={() => (<ContentGateways { ...this.props }/>)}/>
          <Route path="/devices" render={() => (<ContentDevices { ...this.props }/>)}/>
        </div>;
    } else {
       var content =
        <div className="col text-center d-flex align-items-center justify-content-center">
          <h1 className="text-secondary"><i className="fa fa-circle-o-notch fa-spin fa-fw mr-4"></i>Cargando</h1>
        </div>;
    }
    return( content );
  }
};
