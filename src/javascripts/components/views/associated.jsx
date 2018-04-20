/* IMPORT MODULES */
import React from 'react';
import cx from 'classnames';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { Icon } from '../icons/icon.jsx';

/* COMPONENTS */
export const Associated = ({ content, category, active, appearance, icon }) => {

  if (category == 'devices') content.sort((a, b) => b.found - a.found);

  if (content.length > 0) {
    return(
    <div className="list-group list-group-small mb-3">
      {content.map((e, i) => {
        const className = "d-flex elemento" + ' ' + appearance;
        const location = {
          pathname: '/' + category + '/' + e._id
        }
        return (
          <div key={i} className="list-group-item flex-column align-items-start">
            <div className={active && active == e._id ? 'active' : ''}>
              <Link to={location}>
                { category == "devices" ?
                  <div className="d-flex elemento elemento-dispositivo w-100 justify-content-between align-items-center">
                    <div className="mb-0"><Icon icon={icon} mr={3}/>{e.name}</div>
                    { e.found ?
                      <span><small className="mb-0"><Icon icon="battery" mr="1"/>{e.batt}<Icon icon="signal" mr="1" ml="2"/>{e.rssi}</small></span> :
                      <span><small className="mb-0"><Icon icon="chain-broken" mr="1"/></small></span>
                    }
                  </div> :
                  <div className={className}>
                    <p className="mb-0"><Icon icon={icon} mr={3}/>{e.name}</p>
                  </div>
                }
              </Link>
            </div>
        </div> )
      })}
    </div>)
  } else {
    return null
  }
}
