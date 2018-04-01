/* IMPORT MODULES */
import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, NavLink, Route, Switch } from 'react-router-dom';
import cookie from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import axios from 'axios';

/* CONFIGURE AXIOS */
axios.defaults.baseURL = 'http://localhost:4000';

/* IMPORT COMPONENTS */
import { Navigation } from './views/navigation.jsx';
import { Content } from './views/content.jsx';
import { Notification } from './tags/notification.jsx';

/* COMPONENTS */
export class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      // active user
      user: null,
      // userGroup data
      userGroup: null,
      // admin data
      resolutions: null,
      locations: null,
      gateways: null,
      devices: null,
      userGroups: null,
      // user data
      displays: null,
      images: null,
      groups: null,
      // search value
      filterValue: '',
      // others
      userID: cookie.load('userID'),
      isLoaded: false,
      isLoggedIn: false,
      error: null,
      redirect: false,
      location: ''
    };
  }

  /* COMPONENT MOUNT */
  componentDidMount(){
    // get user id and token
    const { user, token } = this.props;
    // set user id and token
    this.setState({ user, token, isLoggedIn: true });
    // get data
    this.update(user, true);
  }

  /* UPDATE DATA */
  update = (user, notify) => {
    // if admin get all the resources needed from the database
    if (user.admin) {
      return axios.all([axios('/users'), axios('/devices'), axios('/gateways'), axios('userGroups'), axios('/locations'), axios('/resolutions')])
        .then(axios.spread((users, devices, gateways, userGroups, locations, resolutions) => {
          this.setState({
            users: users.data,
            devices: devices.data,
            gateways: gateways.data,
            userGroups: userGroups.data,
            locations: locations.data,
            resolutions: resolutions.data,
            isLoaded: true
          });
        }))
        .then(() => notify && this.notify('Datos cargados', 'notify-success', 'download', toast.POSITION.BOTTOM_LEFT))
        .catch(() => this.notify('Error al cargar datos', 'notify-error', 'exclamation-triangle', toast.POSITION.BOTTOM_LEFT));
    // else get resources within the userGroup
    } else {
      return axios.all([axios(user.userGroup.url), axios('/resolutions')])
        .then(axios.spread((res, resolutions) => {
          this.setState({
            userGroup: res.data,
            displays: res.data.displays, // set displays that the user can manage
            images: res.data.images, // set images that the user can manage
            groups: res.data.groups, // set groups that the user can manage
            devices: res.data.devices, // set devices that the user can manage
            resolutions: resolutions.data,
            isLoaded: true,
          });
        }))
        .then(() => notify && this.notify('Datos cargados', 'notify-success', 'download', toast.POSITION.BOTTOM_LEFT))
        .catch(() => this.notify('Error al cargar datos', 'notify-error', 'exclamation-triangle', toast.POSITION.BOTTOM_LEFT));
    }
  }

  /* HANDLE SEARCH */
  filterData = (value) => {
    this.setState({filterValue: value});
  }

  /* ALERTS */
  notify = (text, style, icon, position) => {
    toast(<Notification text={text} icon={icon} />, {
      position: position,
      className: style
    });
  }

  /* RENDER COMPONENT */
  render(){
    return(
      <div className="row main">
        <ToastContainer closeButton={false} hideProgressBar={true}/>
        <Navigation filterData={this.filterData} update={this.update} { ...this.state }/>
        <Content update={this.update} notify={this.notify} { ...this.state }/>
      </div>
    );
  }
};
