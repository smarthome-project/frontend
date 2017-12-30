import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import update from 'react-addons-update'

import { Link } from 'react-router-dom'
import { SketchPicker } from 'react-color'
import consts from './../../../../utils/constants'
import Switch from '../../../shared/Switch'
import { Icon } from '../../../shared/Icon'
import { Button, Col, Form, FormGroup, ControlLabel, FormControl, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import _ from 'lodash'

class ActionPower extends React.Component {
	
	handleChangeState(newState) {
		this.props.handleChangeState('active', newState)
	}

	render() {
		return <div>
			<Switch 
				bsSize="normal" 
				value={this.props.state.active} 
				callback={this.handleChangeState.bind(this)} />
		</div>
	}
}

ActionPower.propTypes = {
	state: PropTypes.object,
	handleChangeState: PropTypes.func,
}


class ActionLedRgb extends React.Component {
	
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

ActionLedRgb.propTypes = {
	state: PropTypes.object,
	handleChangeState: PropTypes.func,
}


class ActionLedCw extends React.Component {
	render() {
		return <span> TODO </span>
	}
}

ActionLedCw.propTypes = {
	state: PropTypes.object,
	handleChangeState: PropTypes.func
}

class WizzardFormAction extends React.Component {

	handleChange(field, evt) {

		let value
		value = evt.target.value

		if (field == "choosedDeviceId") {
			let choosedDeviceIndex = _.findIndex(this.props.devices, d => d.id == value)
			let defaultActionCron = (this.props.devices[choosedDeviceIndex]).state
			this.props.callbacks.change("actionCronState", defaultActionCron)
		}

		this.props.callbacks.change(field, value)
	}

	handleStateCronChange(field, val) {
		let cronState = this.props.formsData.actionCronState || {}

		cronState = update(cronState, {
			[field]: { $set: val }
		})

		this.props.callbacks.change("actionCronState", cronState)
	}

	render() {

		let devices_options = <option disabled key={"sfd_0"} value={0}>Wybierz urządzenie</option>

		devices_options = _.concat(devices_options, _.map(this.props.devices, (d, idx) => 
			<option key={"sfd_" + (idx+1)} value={d.id}>[{d.id}] {d.name}</option>))

		let choosedDeviceIndex = _.findIndex(this.props.devices, d => d.id == this.props.formsData.choosedDeviceId)
		let choosedDevice = null

		if (choosedDeviceIndex > -1)
			choosedDevice = this.props.devices[choosedDeviceIndex]

		let actionFormOption = null

		if (choosedDevice)
			switch(choosedDevice.type) {
				case 'POWER':
					actionFormOption = <ActionPower state={this.props.formsData.actionCronState} handleChangeState={this.handleStateCronChange.bind(this)} />
					break
				case 'LEDRGB':
					actionFormOption = <ActionLedRgb state={this.props.formsData.actionCronState} handleChangeState={this.handleStateCronChange.bind(this)} />
					break
				case 'LEDCW':
					actionFormOption = <ActionLedCw state={this.props.formsData.actionCronState} handleChangeState={this.handleStateCronChange.bind(this)} />
					break
				default:
					actionFormOption = null
			}

		let actions_form = <FormGroup controlId="actions_form">
			<Col sm={2}>
				<ControlLabel>Stan: </ControlLabel>
			</Col>
			<Col sm={8}>
				{actionFormOption}
			</Col>
		</FormGroup>

		return (
			<div className="wizzard_actions">
			
				<Form horizontal>
					<FormGroup controlId="selectDevice">
						<Col sm={2}>
							<ControlLabel>Urządzenie: </ControlLabel>
						</Col>
						<Col sm={8}>
							<FormControl 
								value={this.props.formsData.choosedDeviceId} 
								onChange={this.handleChange.bind(this, 'choosedDeviceId')}
								componentClass="select" 
								placeholder="urządzenie" >
								{devices_options}
							</FormControl>
						</Col>
					</FormGroup>
					{choosedDevice && actions_form}
				</Form>
			</div>
		)
	}
}

WizzardFormAction.propTypes = {
	devices: PropTypes.array,
	formsData: PropTypes.object,
	callbacks: PropTypes.object
}

export default WizzardFormAction