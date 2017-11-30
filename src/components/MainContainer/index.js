import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { GuardRoute } from '../shared/GuardRoute'

import Main from '../Main'
import LockScreen from '../LockScreen'
import consts from '../../utils/constants'

import { 
	addEventUserActive, 
	delEventUserActive } from '../../utils/utils'

import { checkAlarmState, updateAlarmState } from '../../services/ApiAlarms'
import { checkToken } from '../../services/ApiAuth'
import { getRooms } from '../../services/ApiRooms'
import { getDevices } from '../../services/ApiDevices'


class MainContainer extends React.Component {

	constructor(props) {
		super(props)

		this.handleActiveAlarm = this.handleActiveAlarm.bind(this)
		this.handleCheckNewAlarmState = this.handleCheckNewAlarmState.bind(this)

		this.resetInactiveTimer = this.resetInactiveTimer.bind(this)
		this.timeToInactive = 1000 * 30
		this.inActiveTimer = null

		this.state = {
			user: {},
			rooms: [],
			devices: [],
			alarmActive: false,
			appState: consts.STATE_ACTIVE
		}
	}

	_handleActivity = (event) => {
		this.resetInactiveTimer()
	}

	componentDidMount() {
		checkToken()
			.then(usr => { this.setState({user: usr}) })
			.catch(e => { this.props.history.push('/login', null) })

		checkAlarmState()
			.then(alarmStatus => { this.setState({alarmActive: alarmStatus}) })
			.catch(e => { console.log(e); this.props.history.push('/login', null) })

		getRooms()
			.then(rooms => { this.setState({rooms: rooms}) })
			.catch(e => console.log(e))

		getDevices()
			.then(devices => { this.setState({devices: devices}) })
			.catch(e => console.log(e))

		addEventUserActive(this._handleActivity)
		this.resetInactiveTimer()
	}

	componentWillUnmount() {
		delEventUserActive(this._handleActivity)
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.alarmActive !== this.state.alarmActive)
			updateAlarmState(this.state.alarmActive)
				.then(alarmStatus => { this.setState({alarmActive: alarmStatus}) })
				.catch(e => { console.log(e); this.props.history.push('/login', null) })
	}

	resetInactiveTimer() {
		window.clearTimeout(this.inActiveTimer)
		this.inActiveTimer = window.setTimeout(this.setState.bind(this, {appState: consts.STATE_INACTIVE}), this.timeToInactive)
		if (this.state.appState === consts.STATE_INACTIVE)
			this.setState({appState: consts.STATE_ACTIVE})
	}

	handleCheckNewAlarmState() {
		checkAlarmState()
			.then(alarmStatus => { this.setState({alarmActive: alarmStatus}) })
			.catch(e => { console.log(e); this.props.history.push('/login', null) })
	}

	handleActiveAlarm() {
		this.setState({alarmActive: true})
	}

	render() {
		return (this.state.alarmActive) ? (
			<LockScreen handleCheckNewAlarmState={this.handleCheckNewAlarmState} />
		) : (
			<Main appState={this.state.appState}
				user={this.state.user}
				rooms={this.state.rooms}
				devices={this.state.devices}
				roomCallbacks={{}}
				deviceCallbacks={{}}
				alarmCallbacks={{
					handleActiveAlarm: this.handleActiveAlarm
				}} />
		)
	}
}

export default MainContainer