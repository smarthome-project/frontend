import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { Link } from 'react-router-dom'
import { Icon } from '../../shared/Icon'
import { PageHeader, Panel, Button, Image, Grid, Row, Col } from 'react-bootstrap'


class MonitoringVideo extends React.Component {

	constructor(props) {
		super(props)

	}

	render() {

		const camId = this.props.match.params.id

		const cameraIndex = _.findIndex(this.props.cameras, c => c.id == camId)
		const camera = (cameraIndex > -1) ? this.props.cameras[cameraIndex] : null

		if (!camera)
			return <span> Not valid ID </span>

		let room = _.find(this.props.rooms, r => r.id == camera.room_id) || null
		room = (room) ? room[0] : null

		let header = (
			<PageHeader>
				{camera.name} 
				<small> {room && room.name}</small>
			</PageHeader>
		)

		const addr = `http://${camera.ip}/video.mp4?line=1&inst=2&rec=0&rnd=34078&vrf=${(new Date()).getTime()}`

		return (
				<div id="camerasGrid">
					
					{header}
					
					<video autoPlay controls src={addr}>
						Your browser does not support the video.
					</video>
				</div>
			)

	}
}

MonitoringVideo.propTypes = {
	rooms: PropTypes.array,
	cameras: PropTypes.array,
	camerasCallbacks: PropTypes.object
}

export default MonitoringVideo