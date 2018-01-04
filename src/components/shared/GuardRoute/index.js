import React from 'react'
import ReactDom from 'react-dom'
import { Route, Redirect } from 'react-router-dom'
import { blindCheckToken } from '../../../services/ApiAuth'

export const GuardRoute = ({ component: Component, ...rest }) => {

	return (
		<Route {...rest} render={props => (
			blindCheckToken() ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: '/login' }} />
			)
		)}/>
	)
}