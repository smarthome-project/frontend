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

		this.state = {
			deviceName: "",
			inputNum: 0,
			deviceType: "",
			roomId: 0
		}
	}

	handleChange(field, val) {
		this.setState({[field]: val})
	}

	handleSave() {
		console.log(this.state)
		this.props.callbackClose()
	}

	handleClose() {
		this.props.callbackClose()
	}

	render() {
		return (
			<Modal show={this.props.showModal} onHide={this.props.callbackClose}>
				<Modal.Header closeButton>
					<Modal.Title>Dodawanie urządzenia</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<DeviceForm 
						formData={this.state} 
						handleChange={this.handleChange} />
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.handleSave}>Save</Button>
					<Button onClick={this.handleSave}>Close</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

AddDeviceModal.propTypes = {
	showModal: PropTypes.bool.isRequired,
	callbackClose: PropTypes.func.isRequired
}

export default AddDeviceModal