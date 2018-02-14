/* IMPORT MODULES */
import React from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
const moment = require('moment'); moment.locale('es');
const cx = require('classnames');

/* COMPONENT */
export const Device = ({ device }) => {
  const { url, id, name, description, bt_address, mac_address, created_at } = device;
  const created = moment(device.created_at).from(moment());
  const elementClass = cx("list-group-item-action elemento-display list-group-item flex-column align-items-start");
  const location = {
    pathname: '/devices/' + id
  }
  return(
    <div className={elementClass}>
      <NavLink to={location}>
        <div className="elemento elemento-grupo">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{name}</h5>
            <small><i className="fa fa-bluetooth-b mr-1" aria-hidden="true"></i>{bt_address}</small>
          </div>
          <hr></hr>
          <p className="mb-1">{description}</p>
          <div className="d-flex w-100 justify-content-between">
            <small><i className="fa fa-server mr-1" aria-hidden="true"></i>{mac_address}</small>
            <small>{created}<i className="fa fa-calendar-o ml-1" aria-hidden="true"></i></small>
          </div>
        </div>
      </NavLink>
    </div>
  );
}
