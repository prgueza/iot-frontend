/* IMPORT MODULES */
import React, { Component } from 'react'
const cx = require( 'classnames' )

/* COMPONENT */
export const Tag = ( { category, tag, filterData } ) => {
	const tagClass = cx( 'btn mr-1', { 'btn-success': category === 'displays' }, { 'btn-info': category === 'images' }, { 'btn-warning': category === 'groups' },
		'btn-tiny'
	)
	return <button onClick={() => filterData && filterData(tag)} type='button' className={tagClass}>{tag}</button>
}
