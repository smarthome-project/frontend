import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { getImages } from '../../services/ApiUtils'
import AddRoomModal from './AddRoomModal'

import RoomsStyle from './style.scss'
import { Link } from 'react-router-dom'
import { Icon } from '../shared/Icon'
import { PageHeader, Panel, Button, Image, Grid, Row, Col } from 'react-bootstrap'


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

	constructor(props) {
		super(props)

		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)

		this.state = {
			modalShow: false,
			imagesSet: []
		}
	}

	componentDidMount() {
		getImages()
			.then(imagesDataset => this.setState({imagesSet: imagesDataset}))
			.catch(e => console.log('Błąd połączenia z API', e))
	}

	openModal() {
		this.setState({modalShow: true})
	}

	closeModal() {
		this.setState({modalShow: false})
	}

	renderGridRooms(roomsArray) {
		return _.map(roomsArray, room => <RoomPanel key={room.id} room={room} devices={this.props.devices} />)
	}

	render() {

		let header = (
			<PageHeader>
				Pokoje 
				<small> zarządzanie pomieszczeniami</small>
				<Button className="pull-right addButton" onClick={this.openModal} >
					<Icon name="plus" size={1} />
				</Button>
			</PageHeader>
		)

		return (
				<div id="roomsGrid">
					
					{header}
					
					<Grid>
						<Row>
							{this.renderGridRooms(this.props.rooms)}
						</Row>
					</Grid>

					<AddRoomModal 
						showModal={this.state.modalShow} 
						imagesSet={this.state.imagesSet}
						callbackSave={this.handleSave_addDev}
						callbackClose={this.closeModal} />
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