/* IMPORT MODULES */
import React, { Component } from 'react';
import moment from 'moment';
import { ToastContainer, toast, Slide } from 'react-toastify';
import axios from 'axios';
import io from 'socket.io-client';

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
      socket: null,
      queue: [],
      // active user
      user: null,
      token: null,
      // data
      data: {},
      // sync
      syncedDevices: [],
      // 0: unsynced 1: sync_ready 2: syncing
      syncStatus: 0,
      sendingImage: false,
      lastSynced: null,
      // search value
      filterValue: '',
      filterFoundValue: true,
      filterConfiguredValue: true,
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
    // set socket.io
    this.socketio(token);
    // set user id and token
    this.setState({
      user, token, data, isLoggedIn: true, isLoaded: true,
    });
  }

  componentWillUnmount() {
    clearInterval(this.checkSyncId);
  }

  /* SET SOCKET.IO */
  socketio = (token) => {
    // Manage socket interaction
    const socket = io(process.env.API_URL);
    socket.emit('login', token);
    socket.on('update queue', (queue) => {
      this.setState({ queue });
    });
    socket.on('processing', (display) => {
      this.update('displays', display._id, 'edit', display);
    });
    socket.on('done processing', (display) => {
      this.update('displays', display._id, 'edit', display);
      if (display.lastUpdateResult) {
        this.notify('Imagen subida al dispositivo con éxito', 'notify-success', 'check', `Dispositivo: ${display.name}`); // notify success
      } else {
        this.notify('Error al subir la imagen al dispositivo', 'notify-error', 'times', `Dispositivo: ${display.name}`, 'error'); // notify success
      }
    });
    // Save socket to state
    this.setState({ socket });
  }

  apiRequest = (url, method, body) => {
    const { token } = this.state;
    axios({
      url,
      method,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
	      Accept: 'application/json',
	      'Content-Type': 'application/json',
      },
    }).then(
      (result) => {
        const { data } = result;
        if (result.status === 200) {
          this.update(data.resourceType, data.resourceId, method, data.resource, data.devices);
          this.notify(data.resourceType, method);
        } else {
          this.notify(data.resourceType, method, 'error');
        }
      },
      (error) => {
        console.log(error);
      },
    ).catch((error) => {
      console.log(error);
    });
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
	      if (index !== -1) stateData[resourceType].splice(index, 1, data);
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
	  this.setState({ syncStatus: 2, lastSynced: moment() });
	  this.notifySync('Buscando dispositivos...', 'notify-success', 'sync-alt', 'Esto puede tardar hasta 40s');

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
	          this.updateSync('Pulse para sincronizar', 'notify-success', 'link', false, 'Sincronice los dispositivos encontrados');
	          this.setState({ syncedDevices: res.data, syncStatus: 1, lastSynced: moment() });
	        } else {
	          this.updateSync('Error en la búsqueda', 'notify-warning', 'exclamation-triangle', false, res.data.notify, 'warning');
	          this.setState({ syncing: false, syncStatus: 0 });
	        }
	      },
	      (err) => {
	        console.log(err.response);
	        this.updateSync('Error en la búsqueda', 'notify-warning', 'exclamation-triangle', false, err.response.data.error.notify, 'warning');
	        this.setState({ syncing: false, syncStatus: 0 });
	      },
	    )
	    .catch((err) => {
	      this.updateSync('Error', 'notify-error', 'times', true, err.message, 'error');
	      this.setState({ syncing: false, syncStatus: 0 });
	    });
	}

	sync = () => {
	  const { syncedDevices } = this.state;
	  const { data } = this.state;
	  const devices = syncedDevices;
	  data.devices = devices;
	  this.updateSync('Dispositivos sincronizados', 'notify-success', 'check', true, 'Dispositivos sincronizados con éxito');
	  this.setState({ data, syncStatus: 0 });
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

  filterConfigured = (value) => {
    this.setState({ filterConfiguredValue: value });
  }

  /* ALERTS */
  notify = (text, style, icon, info = false, status = 'success') => {
    toast(<Notification text={text} icon={icon} info={info} status={status} />, {
      position: toast.POSITION.TOP_CENTER,
      className: style,
    });
  }
  // notify = (dataType, name, method, status = 'success', info = '') => {
  //   const text = notifications[dataType][method];
  //   const icon = notifications[method].icon;
  //   const style = `notify-${status}`;
  //   toast(<Notification text={text} icon={icon} info={info} status={status} />, {
  //     position: toast.POSITION.TOP_CENTER,
  //     className: style,
  //   });
  // }

	notifySync = (text, style, icon, info = false, status = 'success') => {
	  this.toastSyncId = toast(<Notification text={text} icon={icon} spin info={info} status={status} />, {
	    position: toast.POSITION.TOP_CENTER,
	    autoClose: false,
	    className: style,
	  });
	}

	updateSync = (text, style, icon, autoClose, info = false, status = 'success') => {
	  toast.update(this.toastSyncId, {
	    render: <Notification text={text} icon={icon} info={info} status={status} />,
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
        <Navigation filterData={this.filterData} sync={this.sync} syncApi={this.syncApi} {...this.state} />
        <Content filterData={this.filterData} filterFound={this.filterFound} filterConfigured={this.filterConfigured} update={this.update} notify={this.notify} {...this.state} />
      </div>
	  );
	}
}

export default Main;
