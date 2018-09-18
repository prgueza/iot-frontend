/* IMPORT MODULES */
import React from 'react'
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom'
const moment = require( 'moment' )
moment.locale( 'es' )
const cx = require( 'classnames' )

/* COMPONENT */
export const Group = ( { group: { _id, url, name, description, tags, updatedAt }, index } ) => {
	const updated = moment( updatedAt )
		.from( moment() )
	const tagsClass = cx( { 'fa fa-tags fa-flip-horizontal mr-1': tags.length > 1 }, { 'fa fa-tag fa-flip-horizontal mr-1': tags.length < 2 } )
	const elementClass = cx( 'list-group-item-action list-group-item flex-column align-items-start' )
	const location = {
		pathname: '/groups/' + _id
	}
	return (
		<div className={elementClass}>
      <NavLink to={location}>
        <div className='elemento elemento-grupo'>
          <div className='d-flex w-100 justify-content-between'>
            <h5 className='w-75'><strong>{name}</strong></h5>
            <small><i className='fa fa-hashtag mr-2' aria-hidden='true'></i>{index + 1}</small>
          </div>
          <hr className='element-division'></hr>
          <p className='mb-3 mt-2'>{description}</p>
          <div className='d-flex w-100 justify-content-between mt-3'>
            <small><i className={tagsClass} aria-hidden='true'></i>{tags.length}</small>
            <small>{updated}<i className='fa fa-calendar-o ml-2' aria-hidden='true'></i></small>
          </div>
        </div>
      </NavLink>
    </div>
	)
}
