import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import AddDeviceModal from './AddDeviceModal'
import SingleDevice from './SingleDevice'

import {Icon} from '../shared/Icon'
import Switch from '../shared/Switch'
import { PageHeader, Button } from 'react-bootstrap'


class Devices extends React.Component {

	constructor(props) {
		super(props)
		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.state = {
			modalShow: false
		}
	}

	openModal() {
		this.setState({modalShow: true})
	}

	closeModal() {
		this.setState({modalShow: false})
	}

	render() {

		const roomId = this.props.roomId || null
		let filteredDevices = (roomId) ? _.filter(this.props.devices, d => d.roomId == roomId) : this.props.devices
		let devices = _.map(filteredDevices, device => (
				<SingleDevice key={device.id} device={device}/>
			))

		const header = (
			<PageHeader>
				Urządzenia 
				<small> zarządzanie urządzeniami</small>
				<Button className="pull-right addButton" onClick={this.openModal} >
					<Icon name="plus" size={1} />
				</Button>
			</PageHeader>
		)

		return (
				<div>
					{header}
					{devices}
					<AddDeviceModal 
						showModal={this.state.modalShow}
						callbackClose={this.closeModal} />
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