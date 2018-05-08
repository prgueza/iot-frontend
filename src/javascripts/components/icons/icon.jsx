/* IMPORT MODULES */
import React from 'react'
const cx = require( 'classnames' )

/* COMPONENT */
export const Icon = ( { icon, mr, ml, fw, size, batt, spin } ) => {
	var iconName = 'fa-' + icon
	if ( batt >= 0 ) iconName = iconName + '-' + Math.ceil( batt / 25 )
	const iconSpin = spin ? 'fa-spin' : ''
	const iconSize = size ? 'fa-' + size + 'x' : ''
	const marginLeft = ml ? 'ml-' + ml : ''
	const marginRight = mr ? 'mr-' + mr : ''
	const fullWidth = fw ? 'fa-fw' : ''
	const className = cx( 'fa fa-fw', iconName, iconSize, marginLeft, marginRight, fullWidth, iconSpin )

	return (
		<i className={className} aria-hidden='true'></i>
	)
}
