import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { PageHeader } from 'react-bootstrap'

class RoomStatus extends React.Component {

	render() {

		const room = this.props.room

		return (room) ? (
			<div>
				<PageHeader>{room.name}</PageHeader>				
			</div>
		) : null
	}

}

RoomStatus.propTypes = {
	room: PropTypes.object
}

export default RoomStatus