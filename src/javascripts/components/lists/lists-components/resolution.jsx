/* IMPORT MODULES */
import React from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
const moment = require('moment'); moment.locale('es');
const cx = require('classnames');

/* COMPONENT */
export const Resolution = ({ resolution, edit, active }) => {
  const { url, _id, id, name, size, created_at, description } = resolution;
  const elementClass = cx("list-group-item-action list-group-item flex-column align-items-start", {"active": active}); // TODO: Change elemento-display class
  return(
    <div className={elementClass} onClick={() => edit(_id)}>
      <div className="elemento elemento-configuracion">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1"><strong><i className="fa fa-arrows-alt mr-2" aria-hidden="true"></i>{name}</strong></h5>
          <small>{size.width}x{size.height}</small>
        </div>
        <div className="d-flex w-100 align-content-right">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
