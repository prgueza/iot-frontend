/* IMPORT MODULES */
import React from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
const moment = require('moment'); moment.locale('es');
const cx = require('classnames');

/* COMPONENT */
export const Image = ({ image }) => {
  const { url, id, name, description, tags_total, created_at } = image;
  const created = moment(created_at).from(moment());
  const tagsClass = cx(
    {"fa fa-tags fa-flip-horizontal mr-1": tags_total > 1},
    {"fa fa-tag fa-flip-horizontal mr-1": tags_total < 2}
  );
  const elementClass = cx("list-group-item-action elemento-imagen list-group-item flex-column align-items-start");
  const location = {
    pathname: '/images/' + id
  }
  return(
    <div className={elementClass}>
      <NavLink to={location}>
        <div className="elemento elemento-imagen">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{name}</h5>
            <small><i className="fa fa-hashtag mr-1" aria-hidden="true"></i>{id}</small>
          </div>
          <p className="mb-1">{description}</p>
          <div className="d-flex w-100 justify-content-between">
            <small><i className={tagsClass} aria-hidden="true"></i>{tags_total}</small>
            <small>{created}<i className="fa fa-calendar-o ml-1" aria-hidden="true"></i></small>
          </div>
        </div>
    </NavLink>
  </div>
  );
};
