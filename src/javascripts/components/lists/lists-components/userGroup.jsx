/* IMPORT MODULES */
import React from 'react'
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom'
const moment = require( 'moment' )
moment.locale( 'es' )
const cx = require( 'classnames' )

/* COMPONENT */
export const UserGroup = ( { userGroup: { url, _id, name, description, createdAt, devices, displays, groups, images, users }, edit, active } ) => {
	const elementClass = cx( 'list-group-item-action list-group-item flex-column align-items-start', { 'active': active } )
	return (
		<div className={elementClass} onClick={() => edit(_id)}>
      <div className='elemento elemento-configuracion'>
        <div className='d-flex w-100 justify-content-between'>
          <h5 className='mb-1'><strong><i className='fa fa-users mr-2' aria-hidden='true'></i>{name}</strong></h5>
          <small>
            <i className='fa fa-user-o mr-2' aria-hidden='true'></i>{users ? users.length : '0'}
          </small>
        </div>
        <p className='mb-1'>{description}</p>
        <div className='d-flex w-100 justify-content-between'>
          <small>
            <i className='fa fa-tablet mr-2' aria-hidden='true'></i>{devices ? devices.length : '0'}
            <i className='fa fa-television mr-2 ml-2' aria-hidden='true'></i>{displays ? displays.length : '0'}
            <i className='fa fa-picture-o mr-2 ml-2' aria-hidden='true'></i>{images ? images.length : '0'}
            <i className='fa fa-list mr-2 ml-2' aria-hidden='true'></i>{groups ? groups.length : '0'}
          </small>
          <small><i className='fa fa-calendar-o mr-2' aria-hidden='true'></i>{moment(createdAt).format('dddd, D [de] MMMM [de] YYYY')}</small>
        </div>
      </div>
    </div>
	)
}
