import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { GuardRoute } from '../shared/GuardRoute'
import update from 'immutability-helper'

import Main from '../Main'
import LockScreen from '../LockScreen'
import consts from '../../utils/constants'
import _config from '../../utils/config'

import { 
	addEventUserActive, 
	delEventUserActive } from '../../utils/utils'

import { checkAlarmState, updateAlarmState } from '../../services/ApiAlarms'
import { checkToken } from '../../services/ApiAuth'
import { getRooms, createRooms } from '../../services/ApiRooms'
import { getDevices, createDevice, changeStateDevice } from '../../services/ApiDevices'
import { getSchedules, setSchedule } from '../../services/ApiScheduls'


class MainContainer extends React.Component {

	constructor(props) {
		super(props)

		this.handleActiveAlarm = this.handleActiveAlarm.bind(this)
		this.handleCheckNewAlarmState = this.handleCheckNewAlarmState.bind(this)

		this.resetInactiveTimer = this.resetInactiveTimer.bind(this)
		this.timeToInactive = 1000 * _config.timeToScreensaverInSec
		this.inActiveTimer = null

		this.handleAddRoom = this.handleAddRoom.bind(this)
		this.handleAddDevice = this.handleAddDevice.bind(this)
		this.handleAddSchedule = this.handleAddSchedule.bind(this)
		this.handleChangeStateDevice = this.handleChangeStateDevice.bind(this)

		this.state = {
			user: {},
			rooms: [],
			devices: [],
			scheduls: [],
			alarmActive: false,
			appState: consts.STATE_ACTIVE
		}
	}

	_handleActivity = (event) => {
		this.resetInactiveTimer()
	}

	/*=========================================
	=            Component methods            =
	=========================================*/

	componentDidMount() {
		checkToken()
			.then(usr => { this.setState({user: usr}) })
			.catch(e => { this.props.history.push('/login', null) })

		checkAlarmState()
			.then(alarmStatus => { this.setState({alarmActive: alarmStatus}) })
			.catch(e => { console.log(e); /* this.props.history.push('/login', null) */ })

		getRooms()
			.then(rooms => { this.setState({rooms: rooms}) })
			.catch(e => console.log(e))

		getDevices()
			.then(devices => { this.setState({devices: devices}) })
			.catch(e => console.log(e))

		getSchedules()
			.then(scheduls => { this.setState({scheduls: scheduls}) })
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


	/*============================================
	=            Handlers / callbacks            =
	============================================*/

	//Alarms

	handleCheckNewAlarmState() {
		checkAlarmState()
			.then(alarmStatus => { this.setState({alarmActive: alarmStatus}) })
			.catch(e => { console.log(e); /* this.props.history.push('/login', null) */ })
	}

	handleActiveAlarm() {
		this.setState({alarmActive: true})
	}

	//Users


	//Rooms
	handleAddRoom(room) {
		createRooms(room)
			.then(newRoom => {
				this.setState(
					update(this.state, {rooms: {$push: [newRoom]}})
				) 
			})
			.catch(e => { console.log(e); /* this.props.history.push('/login', null) */ })
	}

	//Devices
	handleAddDevice(device) {
		createDevice(device)
			.then(newDevice => { 
				this.setState(
					update(this.state, {devices: {$push: [newDevice]}})
				)
			})
			.catch(e => { console.log(e); /* this.props.history.push('/login', null) */ })
	}

	handleChangeStateDevice(device, newState) {
		changeStateDevice(device, newState)
			.then(updatedDevice => { 
				const deviceIndex = this.state.devices.findIndex((device) => device.id == updatedDevice.id)
				this.setState(
					update(this.state, {
						devices: {
							[deviceIndex]: {
								state: {$set: updatedDevice.state}
							}
						}
					})
				)
			})
			.catch(e => { console.log(e); /* this.props.history.push('/login', null) */ })
	}

	//Schedules
	handleAddSchedule(schedule) {
		setSchedule(schedule)
			.then(newSchedule => {
				this.setState(
					update(this.state, {scheduls: {$push: [newSchedule]}})
				)
				
				//reload scheduls:
				getSchedules()
					.then(scheduls => { this.setState({scheduls: scheduls}) })
					.catch(e => console.log(e))
			})
			.catch(e => { console.log(e); /* this.props.history.push('/login', null) */ })
	}

	/*==============================
	=            Render            =
	==============================*/
	
	render() {
		return (this.state.alarmActive) ? (
			<LockScreen handleCheckNewAlarmState={this.handleCheckNewAlarmState} />
		) : (
			<Main appState={this.state.appState}
				user={this.state.user}
				rooms={this.state.rooms}
				devices={this.state.devices}
				scheduls={this.state.scheduls}
				roomCallbacks={{
					handleAddRoom: this.handleAddRoom
				}}
				deviceCallbacks={{
					handleAddDevice: this.handleAddDevice,
					handleChangeStateDevice: this.handleChangeStateDevice
				}}
				alarmCallbacks={{
					handleActiveAlarm: this.handleActiveAlarm
				}}
				scheduleCallbacks={{
					handleAddSchedule: this.handleAddSchedule
				}} />
		)
	}
}

export default MainContainer