/* IMPORT MODULES */
import React from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
const moment = require('moment'); moment.locale('es');
const cx = require('classnames');

/* COMPONENT */
export const Location = ({ location, edit, active }) => {
  const { url, _id, id, name, description } = location;
  const elementClass = cx("list-group-item-action elemento-configuracion list-group-item flex-column align-items-start", {"active": active}); // TODO: Change elemento-display class
  return(
    <div className={elementClass} onClick={() => edit(_id)}>
      <div className="elemento elemento-configuracion">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1"><i className="fa fa-map-marker mr-2" aria-hidden="true"></i>{name}</h5>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
}
