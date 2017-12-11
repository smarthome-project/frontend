import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import RoomForm from './RoomForm'

import { Icon } from '../shared/Icon'
import { Button, Modal } from 'react-bootstrap'

class AddRoomModal extends React.Component {

	constructor(props) {
		super(props)

		this.handleChange = this.handleChange.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleClose = this.handleClose.bind(this)

		this.state = {
			roomName: "",
			imagePath: ""
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
					<Modal.Title>Dodawanie pomieszczenia</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<RoomForm 
						formData={this.state} 
						imagesSet={this.props.imagesSet}
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

AddRoomModal.propTypes = {
	showModal: PropTypes.bool.isRequired,
	callbackClose: PropTypes.func.isRequired,
	imagesSet: PropTypes.array
}

export default AddRoomModal