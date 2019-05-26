/* IMPORT MODULES */
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faLink, faUpload, faExclamationTriangle, faToggleOn, faToggleOff, faWrench, faExchangeAlt, faObjectGroup, faArrowsAlt, faCheck, faTimes, faDatabase, faFileImage, faFolderOpen, faArrowsAltH, faArrowsAltV, faTrash, faSave, faInfoCircle, faKey, faEnvelope, faIdCardAlt, faCaretRight, faCaretDown, faArrowRight, faArrowLeft, faEllipsisH, faUser, faUsers, faUserTie, faFingerprint, faAdjust, faBarcode, faPlusCircle, faEye, faTabletAlt, faSitemap, faSyncAlt, faCogs, faSignOutAlt, faTv, faLayerGroup, faCloudUploadAlt, faBatteryEmpty, faBatteryQuarter, faBatteryHalf, faBatteryThreeQuarters, faBatteryFull, faUnlink, faTag, faTags, faWifi, faServer, faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  faEdit, faTimesCircle, faCheckCircle, faImages, faImage, faHdd, faCalendar, faWindowMaximize,
} from '@fortawesome/free-regular-svg-icons';


/* IMPORT COMPONENTS */
import Main from './components/main';
import Login from './components/login/login';

library.add(faEdit, faTimesCircle, faCheckCircle, faImages, faImage, faWindowMaximize, faLink, faUpload, faExclamationTriangle, faToggleOn, faToggleOff, faWrench, faExchangeAlt, faObjectGroup, faArrowsAlt, faCheck, faTimes, faDatabase, faFileImage, faFolderOpen, faArrowsAltH, faArrowsAltV, faTrash, faSave, faInfoCircle, faKey, faEnvelope, faIdCardAlt, faCaretRight, faCaretDown, faArrowRight, faArrowLeft, faEllipsisH, faUser, faUsers, faUserTie, faFingerprint, faAdjust, faBarcode, faPlusCircle, faEye, faTabletAlt, faSitemap, faSyncAlt, faCogs, faSignOutAlt, faTv, faLayerGroup, faCloudUploadAlt, faHdd, faBatteryEmpty, faBatteryQuarter, faBatteryHalf, faBatteryThreeQuarters, faBatteryFull, faUnlink, faTag, faTags, faCalendar, faWifi, faServer, faMapMarkerAlt);

/* COMPONENTS */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      token: null,
      data: null,
      isLoggedIn: false,
      error: null,
    };
  }

	login = (user, token, data) => {
	  this.setState({
	    isLoggedIn: true, user, token, data,
	  });
	}

	logout = () => {
	  this.setState({
	    isLoggedIn: false, user: null, token: null, data: null,
	  });
	}

	render() {
	  // get state
	  const { isLoggedIn, error } = this.state;
	  // return for rendering
	  if (error) {
	    // TODO: error handling
	    return null;
	  } if (!isLoggedIn) {
	    return <Login loginAction={this.login} />;
	  }
	  return (
    <Router basename="/">
      <Main logout={this.logout} {...this.state} />
    </Router>
	  );
	}
}

export default App;
