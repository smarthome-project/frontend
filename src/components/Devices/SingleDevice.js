import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import deviceStyle from './device-style.scss'
import Switch from '../shared/Switch'
import { Icon } from '../shared/Icon'
import { SketchPicker } from 'react-color'
import { Panel, Col, Button } from 'react-bootstrap'
import ReactBootstrapSlider from 'react-bootstrap-slider';

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
	
	constructor(props) {
		super(props)
		this.handleTogglePicker = this.handleTogglePicker.bind(this)
		this.state = {open: false}
	}

	handleChangeState(color, event) {
		this.props.handleChangeState('rgb', color.hex)
	}

	handleTogglePicker() {
		this.setState({open: !this.state.open})
	}

	render() {

		let picker = <div className="deviceColor_picker">
						<SketchPicker
							disableAlpha={true}
							presetColors={[]}
							color={this.props.state.rgb}
							onChangeComplete={this.handleChangeState.bind(this)}/>
						<br />
						<Button className="pull-right" onClick={this.handleTogglePicker}>OK</Button>
					</div>

		let preview = <div className="deviceColor_preview">
						<div className="deviceColor_preview_color"
							style={{backgroundColor: this.props.state.rgb}}
							onClick={this.handleTogglePicker}></div>
						</div>

		return <div>
			{(this.state.open) ? picker : preview}
		</div>
	}
}

DeviceLedRgb.propTypes = {
	state: PropTypes.object,
	handleChangeState: PropTypes.func,
	name: PropTypes.string
}


class DeviceLedCw extends React.Component {
	
	constructor(props) {
		super(props)

		let firstVal = this.hexToValue(this.props.state.cw) || 0

		this.handleThrotledSave = _.debounce(this.handleThrotledSave.bind(this), 200)

		this.state = {
			value: firstVal
		}
	}

	handleThrotledSave(val) {
		let numVal, hexVal, cVal, wVal, cValHex, wValHex

		numVal = val

		if (numVal < 0 && numVal > -20) {
			hexVal = "#ff0000"
		} else if (numVal <= -20) {
			hexVal = "#000000"
		} else {
			wVal = 255 - numVal
			cVal = 255 - wVal

			wValHex = wVal.toString(16)
			cValHex = cVal.toString(16)

			hexVal = `#${(wValHex.length == 1) ? "0" + wValHex : wValHex}${(cValHex.length == 1) ? "0" + cValHex : cValHex}00`
		}

		this.props.handleChangeState('cw', hexVal)
	}

	handleChangeState(evt) {
		let numVal = evt.target.value
		numVal = (numVal <= -20) ? -40 : (numVal > -20 && numVal < 0) ? 0 : numVal
		this.handleThrotledSave(numVal)
		this.setState({value: numVal})
	}

	hexToValue(hex) {
		
		if (hex == "#000000")
			return -40

		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
		return result ? parseInt(result[2], 16) : -40
	}

	render() {

		const numVal = this.hexToValue(this.props.state.cw)

		return <div className="rangeWrapper">

			<p className="rangeLabel rangeLabel_warm">Ciepłe</p>
			<p className="rangeLabel rangeLabel_cold">Zimne</p>

			<p className="clearfix">{" "}</p>
			<p className="clearfix">{" "}</p>

			<input 
				type="range"
				min="-40"
				max="255"
				step="1"
				value={this.state.value}
				onChange={this.handleChangeState.bind(this)} />

			<p className="rangeLabel rangeLabel_off">Wył</p>
			
			<p className="clearfix">{" "}</p>

		</div>
	}
}

DeviceLedCw.propTypes = {
	state: PropTypes.object,
	handleChangeState: PropTypes.func,
}

class SingleDevice extends React.Component {

	constructor(props) {
		super(props)
		this.handleChangeState = this.handleChangeState.bind(this)
	}

	handleChangeState(stateName, stateVal) {

		let newState = this.props.device.state
		newState[stateName] = stateVal

		this.props.deviceCallbacks.handleChangeStateDevice(this.props.device, newState)
	}

	handleOpenEdit(evt) {
		this.props.openEdit(this.props.device.id)
	}

	render() {

		let device = this.props.device

		const deviceType_dict = {
			'POWER': 'Zasilanie',
			'LEDRGB': 'Światła RGB',
			'LEDCW' : 'Światła C/Z'
		}

		const title = <h2> 
				<span className="header-name">
					{deviceType_dict[device.type]}
				</span>
				<span className="header-icons">
					<a className="pull-right deviceActionHeader" onClick={this.handleOpenEdit.bind(this)}>
						<Icon name="pencil" size={1} fw />
					</a>
					<Link className="pull-right deviceActionHeader" to={`/scheduler/add/${device.id}`} >
						<Icon name="calendar" size={1} fw />
					</Link>
				</span>
			</h2>

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
					<span className="deviceName">{device.name}</span>
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