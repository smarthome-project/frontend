import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import deviceStyle from './device-style.scss'


import Switch from '../shared/Switch'
import { Icon } from '../shared/Icon'
import { SketchPicker } from 'react-color'
import { Panel, Col, Button } from 'react-bootstrap'


class DevicePower extends React.Component {
	
	handleChangeState(newState) {
		this.props.handleChangeState('active', newState)
	}

	render() {
		return <div>
			<Switch 
				bsSize="normal" 
				value={this.props.state.active} 
				name={this.props.name}
				callback={this.handleChangeState.bind(this)} />
		</div>
	}
}

DevicePower.propTypes = {
	state: PropTypes.object,
	handleChangeState: PropTypes.func,
	name: PropTypes.string
}


class DeviceLedRgb extends React.Component {
	
	handleChangeState(color, event) {
		this.props.handleChangeState('rgb', color.hex)
	}

	render() {
		return <div>
			<SketchPicker 
				disableAlpha={true}
				presetColors={[]}
				color={this.props.state.rgb}
				onChangeComplete={this.handleChangeState.bind(this)} />
		</div>
	}
}

DeviceLedRgb.propTypes = {
	state: PropTypes.object,
	handleChangeState: PropTypes.func,
	name: PropTypes.string
}


class DeviceLedCw extends React.Component {
	render() {
		return <input 
			type="color" 
			value={this.props.state.rgb} 
			name={this.props.name} 
			onChange={this.props.handleChangeState('rgb')} />
	}
}

DeviceLedRgb.propTypes = {
	state: PropTypes.object,
	handleChangeState: PropTypes.func,
	name: PropTypes.string
}

class SingleDevice extends React.Component {

	constructor(props) {
		super(props)

		this.handleChangeState = this.handleChangeState.bind(this)
	}

	handleChangeState(stateName, stateVal) {

		let newState = this.props.device.state
		newState[stateName] = stateVal

		console.log(stateName, stateVal)

		this.props.deviceCallbacks.handleChangeStateDevice(this.props.device, newState)
	}

	render() {

		let device = this.props.device
		const title = <h2> 
				<span className="header-name">
					{device.name}
				</span>
				<span className="header-icons">
					<a className="pull-right deviceActionHeader">
						<Icon name="pencil" size={1} fw />
					</a>
					<a className="pull-right deviceActionHeader">
						<Icon name="calendar" size={1} fw />
					</a>
					<a className="pull-right deviceActionHeader">
						<Icon name="font" size={1} fw />
					</a>
				</span>
			</h2>

		console.log(device)

		let controllBody
		
		switch (device.type) {
			case 'POWER':
				controllBody = <DevicePower state={device.state} name={device.name} handleChangeState={this.handleChangeState} />
				break
			case 'LEDRGB':
				controllBody = <DeviceLedRgb state={device.state} name={device.name} handleChangeState={this.handleChangeState} />
				break
			case 'LEDCW':
				controllBody = <DeviceLedCw state={device.state} name={device.name} handleChangeState={this.handleChangeState} />
				break
			default:
				controllBody = <span>Błąd!</span>
				break
		}

		return (device) ? (
			<Col xs={6} sm={4} md={4} lg={3}>
				<Panel header={title}>
					{controllBody}
				</Panel>
			</Col>
		) : (null)	
	}
}

SingleDevice.propTypes = {
	device: PropTypes.object,
	deviceCallbacks: PropTypes.object
}

export default SingleDevice