import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Switch from '../shared/Switch'
import { PageHeader,
	Glyphicon,
	Button,
	Modal,
	Panel,
	Col } from 'react-bootstrap'

class SingleDevice extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			buttonState: true
		}
	}

	render() {

		let device = this.props.device
		const title = <h2> {device.name} </h2>

		return (device) ? (
			<Col xs={6} sm={4} md={3}>
				<Panel header={title}>
					<Switch bsSize="normal" value={this.state.buttonState} name="test" />
				</Panel>
			</Col>
		) : (null)	
	}
}

SingleDevice.propTypes = {
	device: PropTypes.object
}

class AddDeviceModal extends React.Component {

	render() {
		return (
			<Modal show={this.props.showModal} onHide={this.props.callbackClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h4>Text in a modal</h4>
					<p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

					<hr />

					<h4>Overflowing text to show scroll behavior</h4>
					<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
					<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
					<p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
					<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
					<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
					<p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
					<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
					<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
					<p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.callbackClose}>Close</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

AddDeviceModal.propTypes = {
	showModal: PropTypes.bool.isRequired,
	callbackClose: PropTypes.func.isRequired
}

class Devices extends React.Component {

	constructor(props) {
		super(props)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.state = {modalShow: false}
	}

	openModal() {
		this.setState({modalShow: true})
	}

	closeModal() {
		this.setState({modalShow: false})
	}

	render() {

		const floatButtonStyle = {
			position: 'absolute',
			bottom: 10,
			left: 10,
			color: 'red',
			fontSize: 26
		}

		const roomId = this.props.roomId || null
		let filteredDevices = (roomId) ? _.filter(this.props.devices, d => d.roomId == roomId) : this.props.devices
		let addDevice_button = <a style={floatButtonStyle} className="floatingButton--addDevice" onClick={this.openModal} > <Glyphicon glyph="plus" /> </a>
		let devices = _.map(filteredDevices, device => (
				<SingleDevice key={device.id} device={device}/>
			))

		return (
				<div>
					<PageHeader>Urządzenia <small>zarządzanie urządzeniami</small></PageHeader>
					{devices}
					{addDevice_button}
					<AddDeviceModal showModal={this.state.modalShow} callbackClose={this.closeModal} />
				</div>
			)

	}
}

Devices.propTypes = {
	roomId: PropTypes.number,
	devices: PropTypes.array,
	deviceCallbacks: PropTypes.object
}

export default Devices