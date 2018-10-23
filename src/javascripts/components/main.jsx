/* IMPORT MODULES */
import React, { Component } from 'react';
import moment from 'moment';
import { ToastContainer, toast, Slide } from 'react-toastify';
import axios from 'axios';

/* IMPORT COMPONENTS */
import Navigation from './views/navigation';
import Content from './views/content';
import Notification from './tags/notification';

/* CONFIGURE AXIOS */
axios.defaults.baseURL = process.env.API_URL;

/* COMPONENT */
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // active user
      user: null,
      token: null,
      // data
      data: [],
      // sync
      syncedDevices: [],
      // 0: unsynced 1: sync_ready 2: synced 3: syncing
      syncStatus: 0,
      lastSynced: null,
      // search value
      filterValue: '',
      filterFoundValue: true,
      // others
      userID: '',
      isLoaded: false,
      isLoggedIn: false,
      error: null,
      redirect: false,
    };
  }

  /* COMPONENT MOUNT */
  componentDidMount() {
    // get user id and token
    const { user, token, data } = this.props;

    // set user id and token
    this.setState({
      user, token, data, isLoggedIn: true, isLoaded: true,
    });
  }

  componentWillUnmount() {
    clearInterval(this.checkSyncId);
  }

	/* UPDATE DATA */
	update = (resourceType, _id, action, data, devices) => {
	  const { data: stateData } = this.state;
	  switch (action) {
	    case 'remove':
	    {
	      const index = stateData[resourceType].findIndex(resource => resource._id === _id);
	      stateData[resourceType].splice(index, 1);
	      if (devices) stateData.devices = devices;
	      break;
	    }
	    case 'add':
	    {
	      stateData[resourceType].push(data);
	      if (devices) stateData.devices = devices;
	      break;
	    }
	    case 'edit':
	    {
	      const index = stateData[resourceType].findIndex(resource => resource._id === _id);
	      stateData[resourceType].splice(index, 1, data);
	      if (devices) stateData.devices = devices;
	      break;
	    }
	    default: {
	      return;
	    }
	  }
	  this.setState({ data: stateData });
	}

	/* SYNC DATA */
	syncApi = (token) => {
	  // set state to syncing
	  this.setState({ syncStatus: 3, lastSynced: moment() });
	  this.notifySync('Buscando dispositivos...', 'notify-success', 'refresh', 'Esto puede llevar varios minutos');

	  // request the update
	  axios.get('/update', {
	    timeout: process.env.TIMEOUT,
	    headers: {
	      Authorization: `Bearer ${token}`,
	    },
	  })
	    .then(
	      (res) => {
	        if (res.status === 200) {
	          this.updateSync('Pulse para sincronizar', 'notify-success', 'link', false, 'Sincronice la aplicación con los dispositivos encontrados');
	          this.setState({ syncedDevices: res.data, syncStatus: 1, lastSynced: moment() });
	        } else {
	          this.updateSync('Error en la búsqueda', 'notify-error', 'times', false, res.data.error, true);
	          this.setState({ syncing: false, syncStatus: 0 });
	        }
	      },
	      (err) => {
	        this.updateSync('Error en la búsqueda', 'notify-error', 'times', false, err.data.error, true);
	      },
	    )
	    .catch(() => {
	      this.updateSync('Error', 'notify-error', 'times', true, 'Ha ocurrido un error', true);
	      this.setState({ syncing: false, syncStatus: 0 });
	    });
	}

	sync = () => {
	  const { syncedDevices } = this.state;
	  const { data } = this.state;
	  const devices = syncedDevices;
	  data.devices = devices;
	  this.updateSync('Dispositivos sincronizados', 'notify-success', 'check', true, 'Dispositivos sincronizados con éxito', false);
	  this.setState({ data, syncStatus: 2 }); // synced
	}

	/* HANDLE SEARCH */
	filterData = (value) => {
	  this.setState({ filterValue: value });
	}

	filterFound = () => {
	  // get value from the checkbox
	  const { filterFoundValue } = this.state;
	  this.setState({
	    filterFoundValue: !filterFoundValue,
	  });
	}

	/* ALERTS */
	notify = (text, style, icon, info = false, error = false) => {
	  toast(<Notification text={text} icon={icon} info={info} error={error} />, {
	    position: toast.POSITION.TOP_CENTER,
	    className: style,
	  });
	}

	notifySync = (text, style, icon, info = false, error = false) => {
	  this.toastSyncId = toast(<Notification text={text} icon={icon} spin info={info} error={error} />, {
	    position: toast.POSITION.TOP_CENTER,
	    autoClose: false,
	    className: style,
	  });
	}

	updateSync = (text, style, icon, autoClose, info = false, error = false) => {
	  toast.update(this.toastSyncId, {
	    render: <Notification text={text} icon={icon} info={info} error={error} />,
	    position: toast.POSITION.TOP_CENTER,
	    autoClose,
	    className: style,
	    onClose: () => {
	      const { syncStatus } = this.state;
	      if (syncStatus === 1) this.sync();
	    },
	  });
	}

	dismiss = () => {
	  if (this.toastSyncId) toast.dismiss(this.toastSyncId);
	}

	/* RENDER COMPONENT */
	render() {
	  return (
  <div className="row main">
    <ToastContainer closeButton={false} hideProgressBar transition={Slide} />
    <Navigation filterData={this.filterData} update={this.update} sync={this.sync} syncApi={this.syncApi} {...this.state} />
    <Content filterData={this.filterData} filterFound={this.filterFound} update={this.update} notify={this.notify} {...this.state} />
  </div>);
	}
}

export default Main;
