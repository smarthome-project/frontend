import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import RoomsStyle from './style.scss'
import { Link } from 'react-router-dom'
import { PageHeader, Panel, Image, Grid, Row, Col } from 'react-bootstrap'
import _ from 'lodash'

class RoomPanel extends React.Component {

	render() {
		let roomObj = this.props.room
		let deviceCount = _(this.props.devices)
			.filter(dev => dev.roomId == roomObj.id)
			.size()

		return (
				<Col xs={12} sm={6} md={4} lg={4}>
					<Panel>
						<Link to={"/room/" + roomObj.id} >
							<div className="crop-img">
								<Image src={roomObj.img} />
								<div className="title">
									{roomObj.name}
								</div>
							</div>
							<div className="device__count">
								{deviceCount}
							</div>
						</Link>
						<div className="body">
							
						</div>
					</Panel>
				</Col>
			)
	}
}

RoomPanel.propTypes = {
	devices: PropTypes.array,
	room: PropTypes.object
}

class RoomsGrid extends React.Component {

	renderGridRooms(roomsArray) {
		return _.map(roomsArray, room => <RoomPanel key={room.id} room={room} devices={this.props.devices} />)
	}

	render() {

		return (
				<div id="roomsGrid">
					<PageHeader>Pokoje <small>zarządzanie pomieszczeniami
					</small></PageHeader>
					
					<Grid>
						<Row>
							{this.renderGridRooms(this.props.rooms)}
						</Row>
					</Grid>
				</div>
			)

	}
}

RoomsGrid.propTypes = {
	devices: PropTypes.array,
	rooms: PropTypes.array,
	roomCallbacks: PropTypes.object
}

export default RoomsGrid