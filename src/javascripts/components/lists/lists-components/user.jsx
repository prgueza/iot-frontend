/* IMPORT MODULES */
import React from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
const moment = require('moment'); moment.locale('es');
const cx = require('classnames');

/* COMPONENT */
export const User = ({ user, edit, active }) => {
  const { url, _id, id, name, login, email, created_at, admin } = user;
  const elementClass = cx("list-group-item-action elemento-configuracion list-group-item flex-column align-items-start", { "active": active }); 
  return(
    <div className={elementClass} onClick={() => edit(_id)}>
      <div className="elemento elemento-configuracion">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1"><i className="fa fa-user-o mr-2" aria-hidden="true"></i>{name}</h5>
          {admin ? <small>administrador</small> : ''}
        </div>
        <p className="mb-1">{email}</p>
        <div className="d-flex w-100 justify-content-between">
          <small>{login}</small>
          <small><i className="fa fa-calendar-o mr-2" aria-hidden="true"></i>{moment(created_at).format("dddd, D [de] MMMM [de] YYYY")}</small>
        </div>
      </div>
    </div>
  );
}
