import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import MonitoringForm from '../MonitoringForm'

import { Icon } from '../../shared/Icon'
import { Button, Modal } from 'react-bootstrap'

class MonitoringAdd extends React.Component {

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
				cameraAddres: "",
				cameraName: "",
				room_id: 0,
				login: "",
				pass: ""
			})
	}

	handleChange(field, val) {
		this.setState({[field]: val})
	}

	handleSave() {
		//console.log(this.state)
		
		this.props.camerasCallbacks.handleAddCamera({
			name: this.state.cameraName,
			ip: this.state.cameraAddres,
			room_id: this.state.room_id,
			login: this.state.login,
			pass: this.state.pass
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
					<Modal.Title>Dodawanie kamery</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<MonitoringForm 
						formData={this.state} 
						rooms={this.props.rooms}
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

MonitoringAdd.propTypes = {
	showModal: PropTypes.bool.isRequired,
	callbackClose: PropTypes.func.isRequired,
	rooms: PropTypes.array,
	camerasCallbacks: PropTypes.object.isRequired
}

export default MonitoringAdd