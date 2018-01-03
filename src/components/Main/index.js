import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'

import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom'

import consts from '../../utils/constants'
import { checkToken } from '../../services/ApiAuth'

import MainStyle from './style.scss'
import Room from '../Room'
import Devices from '../Devices'
import Monitoring from '../Monitoring/MonitoringGrid'
import MonitoringVideo from '../Monitoring/MonitoringVideo'
import NavigationTop from '../shared/NavigationTop'
import InfoScreen from '../InfoScreen'
import RoomsGrid from '../RoomsGrid'
import SchedulerList from '../Scheduler/SchedulerList'
import SchedulerAdd from '../Scheduler/SchedulerAdd'
import Configuration from '../Configuration'

class Main extends React.Component {

	render() {

		let currentShow = (this.props.appState === consts.STATE_ACTIVE) ? (
				<div key="mainRouter">
					<NavigationTop user={this.props.user} alarmCallbacks={this.props.alarmCallbacks} />
					<div className="container mainContainer">
						<Switch>
							<Redirect exact path="/" to="/rooms" />
							<Route path="/rooms" render={ (props) => <RoomsGrid {...props} devices={this.props.devices} rooms={this.props.rooms} roomCallbacks={this.props.roomCallbacks} /> } />
							<Route path="/monitoring" render={ (props) => <Monitoring {...props} cameras={this.props.cameras} rooms={this.props.rooms} camerasCallbacks={this.props.camerasCallbacks} /> } />
							<Route path="/camera/:id" render={ (props) => <MonitoringVideo {...props} cameras={this.props.cameras} rooms={this.props.rooms} camerasCallbacks={this.props.camerasCallbacks} /> } />
							<Route path="/devices" render={ (props) => <Devices {...props} devices={this.props.devices} rooms={this.props.rooms} deviceCallbacks={this.props.deviceCallbacks} /> } />
							<Route path="/room/:id"  render={ (props) => <Room {...props} devices={this.props.devices} rooms={this.props.rooms} deviceCallbacks={this.props.deviceCallbacks} roomCallbacks={this.props.roomCallbacks} /> } />
							<Route path="/scheduler/add"  render={ (props) => <SchedulerAdd {...props} devices={this.props.devices} scheduls={this.props.scheduls} scheduleCallbacks={this.props.scheduleCallbacks}/> } />
							<Route path="/scheduler"  render={ (props) => <SchedulerList {...props} scheduls={this.props.scheduls} scheduleCallbacks={this.props.scheduleCallbacks} /> } />
							<Route path="/configuration"  render={ (props) => <Configuration {...props} /> } />
						</Switch>
					</div>
				</div>
			) : <InfoScreen key="infoScreen" />

		return (
			<div>
				<CSSTransitionGroup
					transitionName="mainTransition"
					transitionAppear={true}
					transitionEnter={true}
					transitionLeave={true}
					transitionAppearTimeout={750}
					transitionEnterTimeout={750}
					transitionLeaveTimeout={200} >

					{currentShow}

				</CSSTransitionGroup>
			</div>
		)
	}
}

Main.propTypes = {
	appState: PropTypes.string.isRequired,
	user: PropTypes.object,
	rooms: PropTypes.array,
	devices: PropTypes.array,
	cameras: PropTypes.array,
	scheduls: PropTypes.array,
	roomCallbacks: PropTypes.object,
	deviceCallbacks: PropTypes.object,
	camerasCallbacks: PropTypes.object,
	alarmCallbacks: PropTypes.object,
	scheduleCallbacks: PropTypes.object
}

export default Main