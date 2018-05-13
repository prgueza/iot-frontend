/* IMPORT MODULES */
import React, { Component } from 'react'

/* IMPORT COMPONENTS */
import { Icon } from '../icons/icon.jsx'

/* COMPONENTS */
export const Notification = ( { text, icon, spin, info } ) => {
	return (
		<div className='notify-content'>
      <Icon icon={icon} mr='1' spin={spin}/><strong>{text}</strong>
			{ info &&
				<div>
					<hr className='notify-division'></hr>
					<small className='notify-info'>{info}</small>
				</div>
			}
		</div>
	)
}
