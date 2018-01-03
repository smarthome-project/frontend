import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import MonitoringForm from '../MonitoringForm'

import { Icon } from '../../shared/Icon'
import { Button, Modal } from 'react-bootstrap'

class MonitoringEdit extends React.Component {

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
			
			const camIndex = _.findIndex(nextProps.cameras, c => c.id == nextProps.camId)
			const camera = (camIndex > -1) ? nextProps.cameras[camIndex] : null

			if (camera) {
				this.setState({
					id: camera.id,
					cameraAddres: camera.ip,
					cameraName: camera.name,
					room_id: camera.room_id,
					login: camera.login,
					pass: camera.pass
				})
			} else {
				this.setState({
					id: (new Date()).getTime(),
					cameraAddres: "",
					cameraName: "",
					room_id: 0,
					login: "",
					pass: ""
				})
			}
		}
	}

	handleChange(field, val) {
		this.setState({[field]: val})
	}

	handleSave() {
		this.props.camerasCallbacks.handleUpdateCamera({
			id: this.state.id,
			name: this.state.cameraName,
			ip: this.state.cameraAddres,
			room_id: this.state.room_id,
			login: this.state.login,
			pass: this.state.pass
		})

		this.props.callbackClose()
	}

	handleRemove() {
		this.props.camerasCallbacks.handleRemoveCamera(this.props.camId)
		this.props.callbackClose()
	}

	handleClose() {
		this.props.callbackClose()
	}

	render() {
		return (
			<Modal show={this.props.showModal} onHide={this.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edycja kamery</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<MonitoringForm 
						formData={this.state} 
						rooms={this.props.rooms}
						handleChange={this.handleChange} />
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

MonitoringEdit.propTypes = {
	camId: PropTypes.number,
	rooms: PropTypes.array,
	cameras: PropTypes.array,
	callbackClose: PropTypes.func.isRequired,
	camerasCallbacks: PropTypes.object.isRequired
}

export default MonitoringEdit