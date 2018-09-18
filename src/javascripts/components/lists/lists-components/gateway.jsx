/* IMPORT MODULES */
import React from 'react'
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom'
const moment = require( 'moment' )
moment.locale( 'es' )
const cx = require( 'classnames' )

/* COMPONENT */
export const Gateway = ( { gateway: { _id, url, name, description, ip, mac, createdAt } } ) => {
	const created = moment( createdAt )
		.from( moment() )
	const elementClass = cx( "list-group-item-action list-group-item flex-column align-items-start" )
	const location = {
		pathname: '/gateways/' + _id
	}
	return (
		<div className={elementClass}>
      <NavLink to={location}>
        <div className="elemento elemento-gateway">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="w-60"><strong>{name}</strong></h5>
            <small><i className="fa fa-wifi mr-2" aria-hidden="true"></i>{ip}</small>
          </div>
          <hr className="element-division"></hr>
          <p className="mb-3 mt-2">{description}</p>
          <div className="d-flex w-100 justify-content-between mt-3">
            <small><i className="fa fa-server mr-2" aria-hidden="true"></i>{mac}</small>
            <small>{created}<i className="fa fa-calendar-o ml-1" aria-hidden="true"></i></small>
          </div>
        </div>
      </NavLink>
    </div>
	)
}
