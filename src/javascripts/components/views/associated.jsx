/* IMPORT MODULES */
import React from 'react';
import cx from 'classnames';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { Icon } from '../icons/icon.jsx';

/* COMPONENTS */
export const Associated = ({ contenido, category, active, appearance, icon }) => {

  if (contenido.length > 0) {
    return(
    <div className="list-group list-group-small mb-3">
      {contenido.map((e, i) => {
        const className = "d-flex elemento" + ' ' + appearance;
        const location = {
          pathname: '/' + category + '/' + e.id
        }
        return (
          <div key={i} className="list-group-item flex-column align-items-start">
            <div className={active && active == e._id ? 'active' : ''}>
              <Link to={location}>
                <div className={className}>
                  <p className="mb-0"><Icon icon={icon} mr={3}/>{e.name}</p>
                </div>
              </Link>
            </div>
        </div> )
      })}
    </div>)
  } else {
    return null
  }
}
