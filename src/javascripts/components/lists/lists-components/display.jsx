/* IMPORT MODULES */
import React from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
const moment = require('moment'); moment.locale('es');
const cx = require('classnames');

/* COMPONENT */
export const Display = ({ display }) => {
  const { url, id, name, description, tags_total, updated_at } = display;
  const updated = moment(updated_at).from(moment());
  const tagsClass = cx(
    {"fa fa-tags fa-flip-horizontal mr-1": tags_total > 1},
    {"fa fa-tag fa-flip-horizontal mr-1": tags_total < 2}
  );
  const elementClass = cx("list-group-item-action list-group-item flex-column align-items-start");
  const location = {
    pathname: '/displays/' + id
  }
  return(
    <div className={elementClass}>
      <NavLink to={location}>
        <div className="elemento elemento-display">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="w-75"><strong>{name}</strong></h5>
            <small><i className="fa fa-hashtag mr-1" aria-hidden="true"></i>{id}</small>
          </div>
          <hr className="element-division"></hr>
          <p className="mb-3 mt-2">{description}</p>
          <div className="d-flex w-100 justify-content-between mt-3">
            <small><i className={tagsClass} aria-hidden="true"></i>{tags_total}</small>
            <small>{updated}<i className="fa fa-calendar-o ml-1" aria-hidden="true"></i></small>
          </div>
        </div>
      </NavLink>
    </div>
  );
};
