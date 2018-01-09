import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import _ from 'lodash'

import RoomStyles from './style.scss'
import RoomStatus from './RoomStatus'
import Devices from '../Devices'


class Room extends React.Component {

	render() {

		let roomId = this.props.match.params.id
		let room = _.find(this.props.rooms, room => room.id == roomId)

		return (room) ? (
			<div className="roomDetails__wrapper">

				<div className="roomDetails__devices">
					<Devices 
						className="roomDetails__devices"
						room_id={room.id} 
						override_title={{
							mainTitle: room.name
						}}
						devices={this.props.devices} 
						rooms={this.props.rooms}
						inputs={this.props.inputs}
						deviceCallbacks={this.props.deviceCallbacks} />
				</div>
			</div>
		) : null
	}

}

Room.propTypes = {
	rooms: PropTypes.array,
	devices: PropTypes.array,
	inputs: PropTypes.array,
	deviceCallbacks: PropTypes.object
}

export default Room