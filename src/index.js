import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { GuardRoute } from './components/shared/GuardRoute'

import MainContainer from './components/MainContainer'
import UserLogin from './components/Login'

let rootRouter = (
		<Router>
			<div>
				<Switch>
					<Route path="/login" component={UserLogin} />
					<GuardRoute path="/" component={MainContainer} />
				</Switch>
			</div>
		</Router>
	)

ReactDom.render(rootRouter, document.getElementById('root'))