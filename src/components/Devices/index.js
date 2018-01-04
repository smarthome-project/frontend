import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { getDeviceTypes } from '../../services/ApiDevices'

import AddDeviceModal from './AddDeviceModal'
import EditDeviceModal from './EditDeviceModal'
import SingleDevice from './SingleDevice'

import {Icon} from '../shared/Icon'
import Switch from '../shared/Switch'
import { PageHeader, Button } from 'react-bootstrap'


class Devices extends React.Component {

	constructor(props) {
		super(props)

		this.openModal = this.openModal.bind(this)
		this.openEdit = this.openEdit.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.closeEdit = this.closeEdit.bind(this)

		this.state = {
			editFormId: null,
			modalShow: false,
			deviceTypeEnums: []
		}
	}

	componentDidMount() {
		getDeviceTypes()
			.then(deviceTypes => { this.setState({deviceTypeEnums: deviceTypes}) })
			.catch(e => { this.props.history.push('/login', null) })
	}

	openModal() {
		this.setState({modalShow: true})
	}

	closeModal() {
		this.setState({modalShow: false})
	}

	openEdit(id) {
		this.setState({editFormId: id})
	}

	closeEdit() {
		this.setState({editFormId: null})
	}

	render() {

		const room_id = this.props.room_id || null
		let filteredDevices = (room_id) ? _.filter(this.props.devices, d => d.room_id == room_id) : this.props.devices
		let devices = _.map(filteredDevices, device => (
				<SingleDevice 
					key={device.id} 
					device={device}
					openEdit={this.openEdit}
					deviceCallbacks={this.props.deviceCallbacks} />
			))

		const header = (
			<PageHeader>
				{(this.props.override_title) ? this.props.override_title.mainTitle : null || "Urządzenia " }
				<small> {(this.props.override_title) ? this.props.override_title.subTitle : null || " zarządzanie urządzeniami" }</small>
				<Button className="pull-right addButton" onClick={this.openModal} >
					<Icon name="plus" size={1} />
				</Button>
			</PageHeader>
		)

		return (
				<div>
					{header}
					<div id="devicesGrid">
						{devices}
					</div>
					<AddDeviceModal 
						showModal={this.state.modalShow}
						rooms={this.props.rooms}
						inputs={this.props.inputs}
						currentRoomId={this.props.room_id}
						deviceTypeEnums={this.state.deviceTypeEnums}
						deviceCallbacks={this.props.deviceCallbacks}
						callbackClose={this.closeModal} />

					<EditDeviceModal
						rooms={this.props.rooms}
						inputs={this.props.inputs}
						devices={this.props.devices}
						currentRoomId={this.props.room_id}
						deviceId={this.state.editFormId}
						showModal={(this.state.editFormId && this.state.editFormId > 0) ? true : false}
						callbackClose={this.closeEdit}
						deviceTypeEnums={this.state.deviceTypeEnums}
						deviceCallbacks={this.props.deviceCallbacks} />
				</div>
			)

	}
}

Devices.propTypes = {
	override_title: PropTypes.shape({
		mainTitle: PropTypes.string,
		subTitle: PropTypes.string
	}),
	room_id: PropTypes.number,
	devices: PropTypes.array,
	inputs: PropTypes.array,
	rooms: PropTypes.array,
	deviceCallbacks: PropTypes.object
}

export default Devices