import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { FormGroup, ControlLabel, FormControl, Button, Row, Col } from 'react-bootstrap'

class DeviceForm extends React.Component {

	handleChange(field, evt) {
		this.props.handleChange(field, evt.target.value)
	}

	render() {

		let deviceType_options = (this.props.deviceTypeEnums) ? _.map( this.props.deviceTypeEnums, (typEnum, i) => 
			<option key={`d_${i}`} value={typEnum.type}>{typEnum.pl_name}</option> ) : null
		
		let noRoom = <option key={`r_0`} value={0}>Nie przypisuj</option>
		let rooms = (this.props.rooms) ? _.map( this.props.rooms, (room, i) => 
				<option key={`r_${i+1}`} value={room.id}>{room.name}</option> ) : null

		let roomId_options = _.concat(noRoom, rooms)

		return (
			<form>
				<Row>
					<Col xs={9}>
						<FormGroup controlId="deviceForm_name">
							<ControlLabel>Nazwa urządzenia</ControlLabel>
							<FormControl 
								type="text" 
								placeholder="Nazwa urządzenia"
								onChange={this.handleChange.bind(this, 'name')}
								value={this.props.formData.name} />
						</FormGroup>
					</Col>
					<Col xs={3}>
						<FormGroup controlId="deviceForm_input_id">
							<ControlLabel>Numer wej.</ControlLabel>
							<FormControl 
								type="number" 
								placeholder="Num"
								min={1}
								max={100}
								onChange={this.handleChange.bind(this, 'input_id')}
								value={this.props.formData.input_id} />
						</FormGroup>
					</Col>
				</Row>

				<FormGroup controlId="deviceForm_type">
					<ControlLabel>Typ urządzenia</ControlLabel>
					<FormControl 
						componentClass="select" 
						placeholder="Typ urządzenia" 
						onChange={this.handleChange.bind(this, 'type')}
						value={this.props.formData.type} >
						
						{deviceType_options}
					</FormControl>
				</FormGroup>

				<FormGroup controlId="deviceForm_room_id">
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

DeviceForm.propTypes = {
	formData: PropTypes.shape({
		name: PropTypes.string,
		input_id: PropTypes.number,
		type: PropTypes.string,
		room_id: PropTypes.number
	}).isRequired,
	handleChange: PropTypes.func.isRequired,
	deviceTypeEnums: PropTypes.array,
	rooms: PropTypes.array
}

export default DeviceForm