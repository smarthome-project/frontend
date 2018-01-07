import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { getImages } from '../../services/ApiUtils'
import AddRoomModal from './AddRoomModal'
import EditRoomModal from './EditRoomModal'

import RoomsStyle from './style.scss'
import { Link } from 'react-router-dom'
import { Icon } from '../shared/Icon'
import { PageHeader, Panel, Button, Image, Grid, Row, Col } from 'react-bootstrap'


class RoomPanel extends React.Component {

	handleEdit() {
		this.props.openEdit(this.props.room.id)
	}

	render() {
		let roomObj = this.props.room
		let deviceCount = _.size( _.filter(this.props.devices, dev => dev.room_id == roomObj.id) )

		let img_url = require(`../../assets/images/usable/${roomObj.image_path}`)

		return (
				<Col xs={12} sm={6} md={4} lg={4}>
					<Panel>
						<Link to={"/room/" + roomObj.id} >
							<div className="crop-img">
								<Image src={img_url} />
								<div className="title">
									{roomObj.name}
								</div>
							</div>
							<div className="device__count">
								{deviceCount}
							</div>
						</Link>

						<div className="edit__button">
							<span onClick={this.handleEdit.bind(this)} >
								<Icon name="edit" size={1} />
							</span>
						</div>
						
						<div className="body"></div>
					</Panel>
				</Col>
			)
	}
}

RoomPanel.propTypes = {
	openEdit: PropTypes.func,
	devices: PropTypes.array,
	room: PropTypes.object
}

class RoomsGrid extends React.Component {

	constructor(props) {
		super(props)

		this.openModal = this.openModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.openEdit = this.openEdit.bind(this)
		this.closeEdit = this.closeEdit.bind(this)

		this.state = {
			editFormId: null,
			modalShow: false,
			imagesSet: []
		}
	}

	componentDidMount() {
		getImages()
			.then(imagesDataset => {
				this.setState({imagesSet: imagesDataset})
			})
			.catch(e => console.log('Błąd połączenia z API', e))
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

	renderGridRooms(roomsArray) {
		return _.map(roomsArray, room => <RoomPanel key={room.id} room={room} devices={this.props.devices} openEdit={this.openEdit} />)
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
						roomCallbacks={this.props.roomCallbacks}
						callbackClose={this.closeModal} />

					<EditRoomModal 
						showModal={(this.state.editFormId && this.state.editFormId > 0) ? true : false}
						roomId={this.state.editFormId}
						rooms={this.props.rooms}
						imagesSet={this.state.imagesSet}
						roomCallbacks={this.props.roomCallbacks}
						callbackClose={this.closeEdit} />
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