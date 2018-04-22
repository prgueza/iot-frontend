/* IMPORT MODULES */
import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, NavLink, Route, Switch } from 'react-router-dom';
import cookie from 'react-cookie';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import axios from 'axios';
import { env } from '../enviroment.jsx';

/* CONFIGURE AXIOS */
axios.defaults.baseURL = env.API_URL;

/* IMPORT COMPONENTS */
import { Navigation } from './views/navigation.jsx';
import { Content } from './views/content.jsx';
import { Notification } from './tags/notification.jsx';

/* COMPONENT */
export class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      // active user
      user: null,
      token: null,
      // userGroup data
      userGroup: null,
      // data
      data: [],
      // admin data
      screens: null,
      locations: null,
      gateways: [],
      devices: [],
      userGroups: null,
      // user data
      displays: [],
      images: null,
      groups: null,
      // sync
      synced_devices: [],
      sync_status: 0, // 0: unsynced; 1: sync_ready; 2: synced; 3: syncing
      last_synced: null,
      // search value
      filterValue: '',
      filterFoundValue: true,
      // others
      userID: cookie.load('userID'),
      isLoaded: false,
      isLoggedIn: false,
      error: null,
      redirect: false,
    }
  }

  /* COMPONENT MOUNT */
  componentDidMount(){
    // get user id and token
    const { user, token, data } = this.props
    // set user id and token
    this.setState({ user, token, data, isLoggedIn: true, isLoaded: true })
    // sync
    this.sync_api(token);
    // check syncronization
    this.check_sync_id = setInterval(() => {
      if(this.state.last_synced && moment().diff(this.state.last_synced, 'seconds') > 20){
        this.setState({ sync_status: 0 }) //unsynced
      }
    }, 1000)
  }

  componentWillUnmount(){
    clearInterval(this.check_sync_id)
  }

  /* UPDATE DATA */
  update = (user, notify, sync) => {
    // if admin get all the resources needed from the database
    if (user.admin) {
      return axios.all([axios('/users'), axios('/devices'), axios('/gateways'), axios('userGroups'), axios('/locations'), axios('/resolutions')])
        .then(axios.spread((users, devices, gateways, userGroups, locations, screens) => {
          this.setState({
            users: users.data,
            devices: devices.data,
            gateways: gateways.data,
            userGroups: userGroups.data,
            locations: locations.data,
            screens: screens.data,
            isLoaded: true
          });
        }))
        .then(() => notify && this.notify('Datos cargados', 'notify-success', 'download', toast.POSITION.BOTTOM_LEFT))
        .then(() => sync && this.sync_api(token))
        .catch(() => this.notify('Error al cargar datos', 'notify-error', 'exclamation-triangle', toast.POSITION.BOTTOM_LEFT));
    // else get resources within the userGroup
    } else {
      return axios.all([axios(user.userGroup.url), axios('/resolutions'), axios('/gateways')])
        .then(axios.spread((res, screens, gateways) => {
          this.setState({
            userGroup: res.data,
            gateways: gateways.data,
            displays: res.data.displays, // set displays that the user can manage
            images: res.data.images, // set images that the user can manage
            groups: res.data.groups, // set groups that the user can manage
            devices: res.data.devices, // set devices that the user can manage
            screens: screens.data,
            isLoaded: true,
          });
        }))
        .then(() => notify && this.notify('Datos cargados', 'notify-success', 'download', toast.POSITION.BOTTOM_LEFT))
        .then(() => sync && this.sync_api(token))
        .catch(() => this.notify('Error al cargar datos', 'notify-error', 'exclamation-triangle', toast.POSITION.BOTTOM_LEFT));
    }
  }

  /* SYNC DATA */
  sync_api = (token) => {
    this.setState({ sync_status: 3, last_synced: moment() }); //syncing
    this.notify_sync('Buscando dispositivos...', 'notify-success', 'refresh');
    axios.get('/update', {timeout: env.TIMEOUT, headers: { Authorization: 'Bearer ' + token } } )
    .then((res) => {
      this.update_sync('Pulse para sincronizar', 'notify-success', 'link', false);
      this.setState({ synced_devices: res.data, sync_status: 1, last_synced: moment() }); //synced_ready
    })
    .catch((err) => {
      this.update_sync('Error en la búsqueda', 'notify-error', 'times', true);
      this.setState({ syncing: false, sync_status: 0 }) //unsynced
    })
  }

  sync = () => {
    const devices = this.state.synced_devices;
    const data = this.state.data;
    data.devices = devices;
    this.update_sync('Datos sincronizados', 'notify-success', 'check', true);
    this.setState({ data, sync_status: 2 }); //synced
  }

  /* HANDLE SEARCH */
  filterData = (value) => {
    this.setState({ filterValue: value });
  }

  filterFound = () => {
    // get value from the checkbox
    console.log('called');
    const { filterFoundValue } = this.state;
    this.setState({ filterFoundValue: !filterFoundValue });
  }

  /* ALERTS */
  notify = (text, style, icon, position) => {
    toast(<Notification text={text} icon={icon} />, {
      position: position,
      className: style
    });
  }

  notify_sync = (text, style, icon) => {
    this.toast_sync_id = toast(<Notification text={text} icon={icon} spin={true} />, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
      className: style
    });
  }

  update_sync = (text, style, icon, autoClose) => {
    toast.update(this.toast_sync_id, {
      render: <Notification text={text} icon={icon} />,
      position: toast.POSITION.TOP_CENTER,
      autoClose: autoClose,
      className: style,
      onClose: () => { this.state.sync_status == 1 && this.sync() }
    })
  }

  dismiss = () => {
    this.toast_sync_id && toast.dismiss(this.toast_sync_id)
  }

  /* RENDER COMPONENT */
  render(){
    return(
      <div className="row main">
        <ToastContainer closeButton={false} hideProgressBar={true}/>
        <Navigation filterData={this.filterData} update={this.update} sync={this.sync} sync_api={this.sync_api} { ...this.state }/>
        <Content filterFound={this.filterFound} update={this.update} notify={this.notify} { ...this.state }/>
      </div>
    );
  }
};
