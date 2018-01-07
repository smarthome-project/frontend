import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import RoomForm from './RoomForm'

import { Icon } from '../shared/Icon'
import { Button, Modal } from 'react-bootstrap'

class EditRoomModal extends React.Component {

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

			const roomIndex = _.findIndex(nextProps.rooms, r => r.id == nextProps.roomId)
			const room = (roomIndex > -1) ? nextProps.rooms[roomIndex] : null

			if (room) {
				
				const imageIndex = _.findIndex(nextProps.imagesSet, im => im.path == room.image_path)
				const img = (imageIndex > -1) ? nextProps.imagesSet[imageIndex] : null

				this.setState({
					id: room.id,
					roomName: room.name,
					imagePath: room.image_path,
					imageId: img.id
				})
				
			} else {
				this.setState({
					id: (new Date()).getTime(),
					roomName: "",
					imagePath: "",
					imageId: undefined
				})
			}
		}
	}

	handleChange(field, val) {
		this.setState({[field]: val})
	}

	handleSave() {
		//console.log(this.state)
		
		this.props.roomCallbacks.handleUpdateRoom({
			id: this.props.roomId,
			name: this.state.roomName,
			image_path: this.state.imagePath
		})

		this.props.callbackClose()
	}

	handleRemove() {
		this.props.roomCallbacks.handleRemoveRoom(this.props.roomId)
		this.props.callbackClose()
	}

	handleClose() {
		this.props.callbackClose()
	}

	render() {
		return (
			<Modal show={this.props.showModal} onHide={this.handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edytuj pomieszczenia</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<RoomForm 
						formData={this.state} 
						imagesSet={this.props.imagesSet}
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

EditRoomModal.propTypes = {
	roomId: PropTypes.number,
	rooms: PropTypes.array,
	showModal: PropTypes.bool.isRequired,
	callbackClose: PropTypes.func.isRequired,
	roomCallbacks: PropTypes.object.isRequired,
	imagesSet: PropTypes.array
}

export default EditRoomModal