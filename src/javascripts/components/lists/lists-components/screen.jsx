/* IMPORT MODULES */
import React from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
const moment = require('moment'); moment.locale('es');
const cx = require('classnames');

/* COMPONENT */
export const Screen = ({ screen, edit, active }) => {
  const { url, _id, name, size, description, screen_code, color_profile, created_at } = screen;
  const elementClass = cx("list-group-item-action list-group-item flex-column align-items-start", {"active": active});
  return(
    <div className={elementClass} onClick={() => edit(_id)}>
      <div className="elemento elemento-configuracion">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1"><strong><i className="fa fa-window-maximize mr-2" aria-hidden="true"></i>{ name }</strong></h5>
          <small>{ size.width }x{ size.height }</small>
        </div>
        <div className="d-flex w-100 align-content-right">
          <p className="mb-0">{ description }</p>
        </div>
        <div className="d-flex w-100 justify-content-between">
          <small>
            <i className="fa fa-code mr-1" aria-hidden="true"></i>{ screen_code }
            <i className="fa fa-adjust ml-3 mr-1" aria-hidden="true"></i>{ color_profile }
          </small>
          <small><i className="fa fa-calendar-o mr-2" aria-hidden="true"></i>{ moment(created_at).format("dddd, D [de] MMMM [de] YYYY") }</small>
        </div>
      </div>
    </div>
  );
}
