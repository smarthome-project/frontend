import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

//import RoomFormStyle from './roomform_styles.scss'

import { FormGroup, ControlLabel, FormControl, DropdownButton, ButtonGroup, MenuItem, Row, Col } from 'react-bootstrap'

class MonitoringForm extends React.Component {

	handleChange(field, evt) {
		let value

		if (field == "room_id")
			value = Number(evt.target.value)
		else
			value = evt.target.value
		
		this.props.handleChange(field, value)
	}

	render() {

		let noRoom = <option key={`cr_0`} value={0}>Nie przypisuj</option>
		let rooms = (this.props.rooms) ? _.map( this.props.rooms, (room, i) => 
				<option key={`cr_${i+1}`} value={room.id}>{room.name}</option> ) : null

		let roomId_options = _.concat(noRoom, rooms)

		return (
			<form onSubmit={e => { e.preventDefault() }}>

					<FormGroup controlId="cameraForm_cameraName">
						<ControlLabel>Nazwa kamery</ControlLabel>
						<FormControl 
							type="text" 
							placeholder="Nazwa kamery"
							onChange={this.handleChange.bind(this, 'cameraName')}
							value={this.props.formData.cameraName} />
					</FormGroup>

					<FormGroup controlId="cameraForm_cameraAddress">
						<ControlLabel>Adres IP</ControlLabel>
						<FormControl 
							type="text" 
							placeholder="0.0.0.0"
							onChange={this.handleChange.bind(this, 'cameraAddres')}
							value={this.props.formData.cameraAddres} />
					</FormGroup>

					<Row>
						<Col xs={6}>
							<FormGroup controlId="cameraForm_cameraUser">
								<ControlLabel>Użytkownik</ControlLabel>
								<FormControl 
									type="text" 
									placeholder="Użytkownik"
									onChange={this.handleChange.bind(this, 'login')}
									value={this.props.formData.login} />
							</FormGroup>
						</Col>

						<Col xs={6}>
							<FormGroup controlId="cameraForm_cameraPass">
								<ControlLabel>Hasło</ControlLabel>
								<FormControl 
									type="password" 
									placeholder="Hasło"
									onChange={this.handleChange.bind(this, 'pass')}
									value={this.props.formData.pass} />
							</FormGroup>
						</Col>
					</Row>

					<FormGroup controlId="cameraForm_cameraRoom">
						<ControlLabel>Pomieszczenie</ControlLabel>
						<FormControl 
							componentClass="select" 
							placeholder="select"
							onChange={this.handleChange.bind(this, 'room_id')}
							value={this.props.formData.room_id} >
							
							{roomId_options}
						</FormControl>
					</FormGroup>
			</form>
		)
	}
}

MonitoringForm.propTypes = {
	formData: PropTypes.shape({
		cameraAddres: PropTypes.string,
		cameraName: PropTypes.string,
		room_id: PropTypes.number,
		login: PropTypes.string,
		pass: PropTypes.string
	}).isRequired,
	handleChange: PropTypes.func.isRequired,
	rooms: PropTypes.array
}

export default MonitoringForm

