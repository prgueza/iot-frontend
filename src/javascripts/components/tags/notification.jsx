/* IMPORT MODULES */
import React, { Component } from 'react'

/* IMPORT COMPONENTS */
import { Icon } from '../icons/icon.jsx'

/* COMPONENTS */
export const Notification = ( { text, icon, spin } ) => {
	return (
		<div className='text-center'>
      <Icon icon={icon} mr='1' spin={spin}/> {text}
    </div>
	)
}
