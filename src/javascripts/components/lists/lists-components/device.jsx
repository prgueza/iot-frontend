/* IMPORT MODULES */
import React from 'react'
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom'
const moment = require( 'moment' )
moment.locale( 'es' )
const cx = require( 'classnames' )

/* IMPORT COMPONENTS */
import { Icon } from '../../icons/icon.jsx'

/* COMPONENT */
export const Device = ( { device: { _id, url, name, description, batt, rssi, initcode, found, mac, updatedAt, createdAt } } ) => {
	const updated = moment( updatedAt )
		.from( moment() )
	const elementClass = cx( 'list-group-item-action list-group-item flex-column align-items-start' )
	const location = {
		pathname: '/devices/' + _id
	}
	return (
		<div className={elementClass}>
      <NavLink to={location}>
        <div className='elemento elemento-dispositivo'>
          <div className='d-flex w-100 justify-content-between'>
            <h5 className='w-60'><strong>{name}</strong></h5>
            <small>
              { found
                ? <Icon icon='battery' fw='true' mr='1' batt={batt}></Icon>
                : <Icon icon='chain-broken' fw='true' mr='1'></Icon>
              }
              { found ? batt : '' }
            </small>
          </div>
          <hr className='element-division'></hr>
          <p className='mb-3 mt-2'>{description}</p>
          <div className='d-flex w-100 justify-content-between mt-3'>
            <small><i className='fa fa-code mr-2' aria-hidden='true'></i>{initcode}</small>
            <small>{updated}<i className='fa fa-calendar-o ml-2' aria-hidden='true'></i></small>
          </div>
        </div>
      </NavLink>
    </div>
	)
}
