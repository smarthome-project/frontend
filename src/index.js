import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'
import { GuardRoute } from './components/shared/GuardRoute'

import style from './style.scss'
import MainContainer from './components/MainContainer'
import UserLogin from './components/Login'

const alertsStyle = {
	position: 'fixed',
	top: 80,
	left: 0,
	right: 0
}

let rootRouter = (
		<Router>
			<div>
				<Switch>
					<Route path="/login" component={UserLogin} />
					<GuardRoute path="/" component={MainContainer} />
				</Switch>
				<div style={alertsStyle} >
					<div className="container" id="alertsMountPlace" />
				</div>
			</div>
		</Router>
	)

ReactDom.render(rootRouter, document.getElementById('root'))