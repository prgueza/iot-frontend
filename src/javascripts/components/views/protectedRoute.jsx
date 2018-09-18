/* IMPORT MODULES */
import React, { Component } from 'react'
import { BrowserRouter as Router, NavLink, Route, Switch, Redirect } from 'react-router-dom'

/* COMPONENT */
export const ProtectedRoute = ( { component: Component, user, ...rest } ) => {
	return <Route {...rest} render={ props => (
      user.admin == true
          ? <Component user={user} {...rest} />: <Redirect to='/' /> )
}
/> }
