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
		
		this.state = {}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.showModal == false && nextProps.showModal == true)
			this.setState({
				roomName: "",
				imagePath: "",
				imageId: undefined
			})
	}

	handleChange(field, val) {
		this.setState({[field]: val})
	}

	handleSave() {
		//console.log(this.state)
		
		this.props.roomCallbacks.handleAddRoom({
			name: this.state.roomName,
			image_path: this.state.imagePath
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
					<Modal.Title>Dodawanie pomieszczenia</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<RoomForm 
						formData={this.state} 
						imagesSet={this.props.imagesSet}
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

AddRoomModal.propTypes = {
	showModal: PropTypes.bool.isRequired,
	callbackClose: PropTypes.func.isRequired,
	roomCallbacks: PropTypes.object.isRequired,
	imagesSet: PropTypes.array
}

export default AddRoomModal