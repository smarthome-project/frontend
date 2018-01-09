import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import { GuardRoute } from '../shared/GuardRoute'
import update from 'immutability-helper'
import io from 'socket.io-client'
import _ from 'lodash'

import Main from '../Main'
import LockScreen from '../LockScreen'
import { Alert } from 'react-bootstrap'
import consts from '../../utils/constants'
import _config from '../../utils/config'

import { 
	addEventUserActive, 
	delEventUserActive } from '../../utils/utils'

import { getSensors } from '../../services/ApiUtils'
import { checkAlarmState, updateAlarmState } from '../../services/ApiAlarms'
import { checkToken } from '../../services/ApiAuth'
import { getInputs } from '../../services/ApiInputs'
import { getRooms, createRooms, updateRoom, removeRoom } from '../../services/ApiRooms'
import { getDevices, createDevice, changeStateDevice, updateDevice, removeDevice } from '../../services/ApiDevices'
import { getCameras, createCamera, updateCamera, removeCamera } from '../../services/ApiCameras'
import { getSchedules, setSchedule, removeSchedule } from '../../services/ApiScheduls'


class MainContainer extends React.Component {

	constructor(props) {
		super(props)

		//Sockets:
		this.socket = io(`http://${location.hostname}:${_config.serverPort}`)
		this.socket.on('connect', () => {})

		this.socket.on('room:post', refresh => this.rooms_refresh())
		this.socket.on('device:post', refresh => this.devices_refresh())
		this.socket.on('camera:post', refresh => this.cameras_refresh())
		this.socket.on('schedul:post', refresh => this.scheduls_refresh())
		this.socket.on('alarmActive:post', refresh => this.alarmActive_refresh())

		this.socket.on('room:put', refresh => this.rooms_refresh())
		this.socket.on('device:put', refresh => this.devices_refresh())
		this.socket.on('camera:put', refresh => this.cameras_refresh())
		this.socket.on('schedul:put', refresh => this.scheduls_refresh())
		this.socket.on('alarmActive:put', refresh => this.alarmActive_refresh())

		this.socket.on('room:delete', refresh => this.rooms_refresh())
		this.socket.on('device:delete', refresh => this.devices_refresh())
		this.socket.on('camera:delete', refresh => this.cameras_refresh())
		this.socket.on('schedul:delete', refresh => this.scheduls_refresh())
		this.socket.on('alarmActive:delete', refresh => this.alarmActive_refresh())

		this.socket.on('sensors', data => this.handleSensorsData(data))

		//Alarms
		this.handleActiveAlarm = this.handleActiveAlarm.bind(this)
		this.handleCheckNewAlarmState = this.handleCheckNewAlarmState.bind(this)

		//Info screensaver
		this.resetInactiveTimer = this.resetInactiveTimer.bind(this)
		this.timeToInactive = 1000 * _config.timeToScreensaverInSec
		this.inActiveTimer = null

		//Add
		this.handleAddRoom = this.handleAddRoom.bind(this)
		this.handleAddDevice = this.handleAddDevice.bind(this)
		this.handleAddCamera = this.handleAddCamera.bind(this)
		this.handleAddSchedule = this.handleAddSchedule.bind(this)

		//Update
		this.handleChangeStateDevice = this.handleChangeStateDevice.bind(this)
		this.handleUpdateCamera = this.handleUpdateCamera.bind(this)
		this.handleUpdateDevice = this.handleUpdateDevice.bind(this)
		this.handleUpdateRoom = this.handleUpdateRoom.bind(this)

		//ThrottledUploaders
		this.uploadNewDeviceState = _.debounce(this.uploadNewDeviceState.bind(this), 300)

		//Remove
		this.handleRemoveCamera = this.handleRemoveCamera.bind(this)
		this.handleRemoveDevice = this.handleRemoveDevice.bind(this)
		this.handleRemoveSchedule = this.handleRemoveSchedule.bind(this)
		this.handleRemoveRoom = this.handleRemoveRoom.bind(this)

		//Misc
		this.showErrorModal = this.showErrorModal.bind(this)
		this.handleErrorApi = this.handleErrorApi.bind(this)

		//Sockets refresh funcs
		this.rooms_refresh = this.rooms_refresh.bind(this)
		this.devices_refresh = this.devices_refresh.bind(this)
		this.cameras_refresh = this.cameras_refresh.bind(this)
		this.scheduls_refresh = this.scheduls_refresh.bind(this)
		this.alarmActive_refresh = this.alarmActive_refresh.bind(this)
		this.handleSensorsData = this.handleSensorsData.bind(this)

		//State
		this.state = {
			user: {},
			rooms: [],
			devices: [],
			cameras: [],
			scheduls: [],
			inputs: [],
			sensors: {},
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
			.catch(e => { this.handleErrorApi('setAlarm', e); /* this.props.history.push('/login', null) */ })

		getRooms()
			.then(rooms => { this.setState({rooms: rooms}) })
			.catch(e => this.handleErrorApi(e))

		getDevices()
			.then(devices => { this.setState({devices: devices}) })
			.catch(e => this.handleErrorApi(e))

		getCameras()
			.then(cameras => { this.setState({cameras: cameras}) })
			.catch(e => this.handleErrorApi(e))

		getSchedules()
			.then(scheduls => { this.setState({scheduls: scheduls}) })
			.catch(e => this.handleErrorApi(e))	

		getInputs()
			.then(inputs => { this.setState({inputs: inputs}) })
			.catch(e => this.handleErrorApi(e))	

		addEventUserActive(this._handleActivity)
		this.resetInactiveTimer()

		getSensors()
			.then(r => null)
			.catch(e => this.handleErrorApi(e))
	}

	componentWillUnmount() {
		delEventUserActive(this._handleActivity)
	}

	componentDidUpdate(prevProps, prevState) {
		// if (prevState.alarmActive !== this.state.alarmActive)
		// 	updateAlarmState(this.state.alarmActive)
		// 		.then(alarmStatus => { this.setState({alarmActive: alarmStatus.secured}) })
		// 		.catch(e => { this.handleErrorApi(e); this.props.history.push('/login', null) })
	}

	resetInactiveTimer() {
		window.clearTimeout(this.inActiveTimer)
		this.inActiveTimer = window.setTimeout(this.setState.bind(this, {appState: consts.STATE_INACTIVE}), this.timeToInactive)
		if (this.state.appState === consts.STATE_INACTIVE)
			this.setState({appState: consts.STATE_ACTIVE})
	}


	/*===================================
	=          Misc functions           =
	===================================*/
	
	showErrorModal(mainErr, subErr, type, time = 3000) {

		const alertInstance = (
			<Alert bsStyle={type}>
				<strong>{mainErr}</strong> {subErr}
			</Alert>
		)

		ReactDom.render(alertInstance, document.getElementById('alertsMountPlace'))
		setTimeout(function() {
			ReactDom.render(null, document.getElementById('alertsMountPlace'))
		}, time)
	}
	
	handleErrorApi(form, e) {
		console.log("Error: ", form, e)
		
		const response = e.json()
		response.then(err => {
			
			console.log(err[0])
			
			const errMsg = err[0].message
			const errName = err[0].path
			const errForm = form
			
			console.log(errForm, errName, errMsg)

			let error = (consts.ERRORS_DICT[errForm] && consts.ERRORS_DICT[errForm][errName][errMsg]) ? 
				consts.ERRORS_DICT[errForm][errName][errMsg] : null
			
			console.log(error)

			if (error)
				this.showErrorModal(error.mainErr, error.subErr, 'warning')
		})
	}

	/*========================================
	=            Sockets Handlers            =
	========================================*/
	
	rooms_refresh() {
		console.log("Refreshing rooms.")
		getRooms()
			.then(rooms => { this.setState({rooms: rooms}) })
			.catch(e => this.handleErrorApi(e))
	}


	devices_refresh() {
		console.log("Refreshing device.")
		getDevices()
			.then(devices => { this.setState({devices: devices}) })
			.catch(e => this.handleErrorApi(e))
	}


	cameras_refresh() {
		console.log("Refreshing camera.")
		getCameras()
			.then(cameras => { this.setState({cameras: cameras}) })
			.catch(e => this.handleErrorApi(e))
	}


	scheduls_refresh() {
		console.log("Refreshing schedule.")
		getSchedules()
			.then(scheduls => { this.setState({scheduls: scheduls}) })
			.catch(e => this.handleErrorApi(e))	
	}


	alarmActive_refresh() {
		console.log("Refreshing alarmActive.")
		checkAlarmState()
			.then(alarmStatus => { this.setState({alarmActive: alarmStatus}) })
			.catch(e => { this.handleErrorApi(e); /* this.props.history.push('/login', null) */ })
	}

	handleSensorsData(data) {
		console.log("New sensors data.", data)
		
		let temp = data.temp
		let humi = data.humi

		console.log(temp, humi)

		this.setState({sensors: {temp: temp, humi: humi}})
	}


	/*============================================
	=            Handlers / callbacks            =
	============================================*/

	//Alarms

	handleCheckNewAlarmState() {
		checkAlarmState()
			.then(alarmStatus => { this.setState({alarmActive: alarmStatus}) })
			.catch(e => { this.handleErrorApi('setAlarm', e); /* this.props.history.push('/login', null) */ })
	}

	handleActiveAlarm() {

		this.setState({alarmActive: true})

		updateAlarmState(true)
			.then(alarmStatus => { 
				this.handleCheckNewAlarmState() 
			})
			.catch(e => { 
				this.setState({alarmActive: false})
				console.log(e) 
			})
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
			.catch(e => { this.handleErrorApi('postRoom', e); /* this.props.history.push('/login', null) */ })
	}

	handleUpdateRoom(room) {
		updateRoom(room)
			.then(changedRoom => { 
				const roomIndex = _.findIndex(this.state.rooms, r => r.id == room.id)
				
				this.setState(
					update(this.state, {
						rooms: {
							[roomIndex]: {
								$set: changedRoom
							}
						}
					})
				)
			})
			.catch(e => { this.handleErrorApi('putRoom', e); /* this.props.history.push('/login', null) */ })
	}

	handleRemoveRoom(roomId) {
		removeRoom(roomId)
			.then(resp => { 
				const roomIndex = _.findIndex(this.state.rooms, d => d.id == roomId)
				this.setState(
					update(this.state, {
						rooms: {
							$splice: [[roomIndex, 1]]
						}
					})
				)
			})
			.catch(e => { this.handleErrorApi('deleteRoom', e); /* this.props.history.push('/login', null) */ })
	}

	//Devices
	handleAddDevice(device) {
		createDevice(device)
			.then(newDevice => { 
				this.setState(
					update(this.state, {devices: {$push: [newDevice]}})
				)
			})
			.catch(e => { this.handleErrorApi('postDevice', e); /* this.props.history.push('/login', null) */ })
	}

	uploadNewDeviceState(device, newState) {
		//console.log("Real save")
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
			.catch(e => { this.handleErrorApi('putDevice', e); /* this.props.history.push('/login', null) */ })
	}

	handleChangeStateDevice(device, newState) {
		const deviceIndex = this.state.devices.findIndex(d => d.id == device.id)
		this.setState(
			update(this.state, {
				devices: {
					[deviceIndex]: {
						state: {$set: newState}
					}
				}
			})
		)

		//console.log("Change state")

		this.uploadNewDeviceState(device, newState)
	}

	handleUpdateDevice(device) {
		updateDevice(device)
			.then(changedDevice => { 
				const deviceIndex = _.findIndex(this.state.devices, d => d.id == device.id)
				
				this.setState(
					update(this.state, {
						devices: {
							[deviceIndex]: {
								$set: changedDevice
							}
						}
					})
				)
			})
			.catch(e => { this.handleErrorApi('putDevice', e); /* this.props.history.push('/login', null) */ })
	}

	handleRemoveDevice(deviceId) {
		removeDevice(deviceId)
			.then(resp => { 
				const deviceIndex = _.findIndex(this.state.devices, d => d.id == deviceId)
				this.setState(
					update(this.state, {
						devices: {
							$splice: [[deviceIndex, 1]]
						}
					})
				)
			})
			.catch(e => { this.handleErrorApi('deleteDevice', e); /* this.props.history.push('/login', null) */ })
	}



	//Cameras
	handleAddCamera(camera) {
		createCamera(camera)
			.then(newCamera => { 
				this.setState(
					update(this.state, {cameras: {$push: [newCamera]}})
				)
			})
			.catch(e => { this.handleErrorApi('postCamera', e); /* this.props.history.push('/login', null) */ })
	}

	handleUpdateCamera(camera) {
		updateCamera(camera)
			.then(changedCamera => { 
				const cameraIndex = _.findIndex(this.state.cameras, c => c.id == camera.id)
				
				this.setState(
					update(this.state, {
						cameras: {
							[cameraIndex]: {
								$set: changedCamera
							}
						}
					})
				)
			})
			.catch(e => { this.handleErrorApi('putCamera', e); /* this.props.history.push('/login', null) */ })
	}

	handleRemoveCamera(camId) {
		removeCamera(camId)
			.then(resp => { 
				const cameraIndex = _.findIndex(this.state.cameras, c => c.id == camId)
				this.setState(
					update(this.state, {
						cameras: {
							$splice: [[cameraIndex, 1]]
						}
					})
				)
			})
			.catch(e => { this.handleErrorApi('deleteCamera', e); /* this.props.history.push('/login', null) */ })
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
					.catch(e => this.handleErrorApi(e))
			})
			.catch(e => { this.handleErrorApi('postSchedule', e); /* this.props.history.push('/login', null) */ })
	}

	handleRemoveSchedule(scheduleId) {
		removeSchedule(scheduleId)
			.then(resp => { 
				const scheduleIndex = _.findIndex(this.state.scheduls, s => s.id == scheduleId)
				this.setState(
					update(this.state, {
						scheduls: {
							$splice: [[scheduleIndex, 1]]
						}
					})
				)
			})
			.catch(e => { this.handleErrorApi('deleteDevice', e); /* this.props.history.push('/login', null) */ })
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
				inputs={this.state.inputs}
				devices={this.state.devices}
				cameras={this.state.cameras}
				scheduls={this.state.scheduls}
				sensors={this.state.sensors}
				roomCallbacks={{
					handleAddRoom: this.handleAddRoom,
					handleUpdateRoom: this.handleUpdateRoom,
					handleRemoveRoom: this.handleRemoveRoom
				}}
				deviceCallbacks={{
					handleAddDevice: this.handleAddDevice,
					handleChangeStateDevice: this.handleChangeStateDevice,
					handleUpdateDevice: this.handleUpdateDevice,
					handleRemoveDevice: this.handleRemoveDevice
				}}
				camerasCallbacks={{
					handleAddCamera: this.handleAddCamera,
					handleUpdateCamera: this.handleUpdateCamera,
					handleRemoveCamera: this.handleRemoveCamera
				}}
				alarmCallbacks={{
					handleActiveAlarm: this.handleActiveAlarm
				}}
				scheduleCallbacks={{
					handleAddSchedule: this.handleAddSchedule,
					handleRemoveSchedule: this.handleRemoveSchedule
				}} />
		)
	}
}

export default MainContainer