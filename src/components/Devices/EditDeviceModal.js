import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import DeviceForm from './DeviceForm'

import { Icon } from '../shared/Icon'
import { Button, Modal } from 'react-bootstrap'

class EditDeviceModal extends React.Component {

	constructor(props) {
		super(props)

		this.handleChange = this.handleChange.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleRemove = this.handleRemove.bind(this)
		this.handleClose = this.handleClose.bind(this)
		
		this.state = {}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.showModal == false && nextProps.showModal == true) {

			const deviceIndex = _.findIndex(nextProps.devices, d => d.id == nextProps.deviceId)
			const device = (deviceIndex > -1) ? nextProps.devices[deviceIndex] : null

			if (device) {
				this.setState({
					id: device.id,
					name: device.name,
					input_id: device.input_id,
					type: device.type,
					room_id: device.room_id,
					state: device.state,
				})

			} else {

				const room_id = (nextProps.currentRoomId) ? nextProps.currentRoomId : 0
				const enums = this.props.deviceTypeEnums
				const enumIndex = enums.findIndex(enu => enu.type == this.state.type)
				const defaultState = enums[enumIndex].default

				this.setState({
					id: (new Date()).getTime(),
					name: "",
					input_id: 1,
					type: "POWER",
					room_id: room_id,
					state: defaultState,
				})
			}
		}
	}

	handleChange(field, val) {

		if (field == 'type') return

		val = (field == 'input_id') ? Number(val) : val
		val = (field == 'room_id') ? Number(val) : val

		this.setState({[field]: val})
	}

	handleSave() {

		this.props.deviceCallbacks.handleUpdateDevice({
			id: this.state.id,
			input_id: this.state.input_id,
			room_id: this.state.room_id,
			name: this.state.name,
			type: this.state.type,
			state: this.state.state,
			img: ""
		})

		this.props.callbackClose()
	}

	handleRemove() {
		this.props.deviceCallbacks.handleRemoveDevice(this.props.deviceId)
		this.props.callbackClose()
	}

	handleClose() {
		this.props.callbackClose()
	}

	render() {
		return (
			<Modal show={this.props.showModal} onHide={this.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Dodawanie urządzenia</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<DeviceForm 
						blockType={true}
						formData={this.state} 
						rooms={this.props.rooms}
						inputs={this.props.inputs} 
						handleChange={this.handleChange}
						deviceTypeEnums={this.props.deviceTypeEnums} />
				</Modal.Body>
				<Modal.Footer>
					<Button className="btn-danger pull-left" onClick={this.handleRemove}>Usuń</Button>
					<Button onClick={this.handleSave}>Zapisz</Button>
					<Button onClick={this.handleClose}>Anuluj</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

EditDeviceModal.propTypes = {
	rooms: PropTypes.array,
	inputs: PropTypes.array,
	deviceId: PropTypes.number,
	devices: PropTypes.array,
	currentRoomId: PropTypes.number,
	showModal: PropTypes.bool.isRequired,
	deviceTypeEnums: PropTypes.array.isRequired,
	deviceCallbacks: PropTypes.object.isRequired,
	callbackClose: PropTypes.func.isRequired
}

export default EditDeviceModal