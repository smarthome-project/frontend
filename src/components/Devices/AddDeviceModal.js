import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import DeviceForm from './DeviceForm'

import { Icon } from '../shared/Icon'
import { Button, Modal } from 'react-bootstrap'

class AddDeviceModal extends React.Component {

	constructor(props) {
		super(props)

		this.handleChange = this.handleChange.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleClose = this.handleClose.bind(this)
		
		this.state = {}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.showModal == false && nextProps.showModal == true)
			this.setState({
				name: "",
				input_id: 1,
				type: "POWER",
				roomId: 0
			})
	}

	handleChange(field, val) {
		val = (field == 'input_id') ? Number(val) : val
		this.setState({[field]: val})
	}

	handleSave() {
		console.log(this.state)
		
		this.props.deviceCallbacks.handleAddDevice({
			input_id: this.state.input_id,
			room_id: this.state.room_id,
			name: this.state.name,
			type: this.state.type,
			img: ""
		})

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
						formData={this.state} 
						deviceTypeEnums={this.props.deviceTypeEnums}
						handleChange={this.handleChange} />
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.handleSave}>Zapisz</Button>
					<Button onClick={this.handleClose}>Anuluj</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

AddDeviceModal.propTypes = {
	showModal: PropTypes.bool.isRequired,
	deviceTypeEnums: PropTypes.array.isRequired,
	deviceCallbacks: PropTypes.object.isRequired,
	callbackClose: PropTypes.func.isRequired
}

export default AddDeviceModal