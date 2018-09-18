/* IMPORT MODULES */
import React from 'react'
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom'
const moment = require( 'moment' )
moment.locale( 'es' )
const cx = require( 'classnames' )

/* COMPONENT */
export const User = ( { user: { url, _id, id, name, login, email, admin, userGroup }, edit, active } ) => {
	const elementClass = cx( 'list-group-item-action list-group-item flex-column align-items-start', { 'active': active } )
	return (
		<div className={elementClass} onClick={() => edit(_id)}>
      <div className='elemento elemento-configuracion'>
        <div className='d-flex w-100 justify-content-between'>
          <h5 className='mb-1'><strong><i className='fa fa-user-o mr-2' aria-hidden='true'></i>{name}</strong></h5>
          {admin ? <small>administrador</small> : ''}
        </div>
        <p className='mb-1'>{email}</p>
        <div className='d-flex w-100 justify-content-between'>
          <small>{login}</small>
          <small className={userGroup || 'text-danger'}><i className='fa fa-users mr-2' aria-hidden='true'></i>{userGroup ? userGroup.name : 'Sin asignar'}</small>
        </div>
      </div>
    </div>
	)
}
