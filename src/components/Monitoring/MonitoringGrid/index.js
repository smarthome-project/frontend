import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import MonitoringAdd from '../MonitoringAdd'
import MonitoringEdit from '../MonitoringEdit'

import MonitoringStyle from './style.scss'
import { Link } from 'react-router-dom'
import { Icon } from '../../shared/Icon'
import { PageHeader, Panel, Button, Image, Grid, Row, Col } from 'react-bootstrap'


class SingleCam extends React.Component {

	handleOpen(evt) {
		this.props.openEdit(this.props.camera.id)
	}

	render() {

		let room = _.filter(this.props.rooms, r => r.id == this.props.camera.room_id) || null
		room = (room) ? room[0] : null

		const title = <h2> 
				<span className="header-name">
					<Link to={"/camera/" + this.props.camera.id} >
						<Icon name="video-camera" size={1} fw /> Kamera
					</Link>
				</span>
				<span className="header-icons">
					<a className="pull-right cameraActionHeader" onClick={this.handleOpen.bind(this)}>
						<Icon name="pencil" size={1} fw />
					</a>
				</span>
			</h2>

		return (
				<Col xs={12} sm={6} md={4} lg={4}>
					<Panel header={title}>
						<Row>
							<Col xs={9}>
								<Link to={"/camera/" + this.props.camera.id} >
									<span className="cameraName">{this.props.camera.name}</span>
								</Link>
								<br/>
								<span className="roomName">{room && room.name || "Nie przypisana."}</span>
							</Col>
							<Col xs={3}>
								<Link to={"/camera/" + this.props.camera.id} >
									<span className="viewIcon"> <Icon name="eye" size={4} fw /> </span>
								</Link>
							</Col>
						</Row>
						<Row>
							<Col xs={12}>
								<Link to={"/camera/" + this.props.camera.id} >
									<span className="cameraAddress">Adres: {this.props.camera.ip}</span>
								</Link>
							</Col>
						</Row>
					</Panel>
				</Col>
			)
	}
}

SingleCam.propTypes = {
	rooms: PropTypes.array,
	camera: PropTypes.object,
	openEdit: PropTypes.func
}

class MonitoringGrid extends React.Component {

	constructor(props) {
		super(props)

		this.openModal = this.openModal.bind(this)
		this.openEdit = this.openEdit.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.closeEdit = this.closeEdit.bind(this)
		this.renderGridCameras = this.renderGridCameras.bind(this)

		this.state = {
			editFormId: null,
			modalShow: false
		}
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

	renderGridCameras(camerasArray) {
		return _.map(camerasArray, camera => <SingleCam key={camera.id} rooms={this.props.rooms} camera={camera} openEdit={this.openEdit} />)
	}

	render() {

		let header = (
			<PageHeader>
				Monitoring 
				<small> zarządzanie kamerami.</small>
				<Button className="pull-right addButton" onClick={this.openModal} >
					<Icon name="plus" size={1} />
				</Button>
			</PageHeader>
		)

		return (
				<div id="camerasGrid">
					
					{header}
					
					<Grid>
						<Row>
							{this.renderGridCameras(this.props.cameras)}
						</Row>
					</Grid>

					<MonitoringAdd
						rooms={this.props.rooms}
						showModal={this.state.modalShow} 
						callbackClose={this.closeModal} 
						camerasCallbacks={this.props.camerasCallbacks} />

					<MonitoringEdit
						camId={this.state.editFormId}
						cameras={this.props.cameras}
						rooms={this.props.rooms}
						callbackClose={this.closeEdit} 
						showModal={(this.state.editFormId && this.state.editFormId > 0) ? true : false}
						camerasCallbacks={this.props.camerasCallbacks} />
				</div>
			)

	}
}

MonitoringGrid.propTypes = {
	rooms: PropTypes.array,
	cameras: PropTypes.array,
	camerasCallbacks: PropTypes.object
}

export default MonitoringGrid