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

		let deviceType_options = (this.props.deviceTypeEnums) ? _.map( this.props.deviceTypeEnums, typEnum => 
			<option value={typEnum.type}>{typEnum.pl_name}</option> ) : null
		
		let roomId_options = (this.props.roomIdEnums) ? _.map( this.props.roomIdEnums, roomEnum => 
			<option value={roomEnum.id}>{roomEnum.name}</option> ) : null

		return (
			<form>
				<Row>
					<Col xs={9}>
						<FormGroup controlId="deviceForm_deviceName">
							<ControlLabel>Nazwa urządzenia</ControlLabel>
							<FormControl 
								type="text" 
								placeholder="Nazwa urządzenia"
								onChange={this.handleChange.bind(this, 'deviceName')}
								value={this.props.formData.deviceName} />
						</FormGroup>
					</Col>
					<Col xs={3}>
						<FormGroup controlId="deviceForm_inputNum">
							<ControlLabel>Numer wej.</ControlLabel>
							<FormControl 
								type="number" 
								placeholder="Num"
								onChange={this.handleChange.bind(this, 'inputNum')}
								value={this.props.formData.inputNum} />
						</FormGroup>
					</Col>
				</Row>

				<FormGroup controlId="deviceForm_deviceType">
					<ControlLabel>Typ urządzenia</ControlLabel>
					<FormControl 
						componentClass="select" 
						placeholder="Typ urządzenia" 
						onChange={this.handleChange.bind(this, 'deviceType')}
						value={this.props.formData.deviceType} >
						
						{deviceType_options}
					</FormControl>
				</FormGroup>

				<FormGroup controlId="deviceForm_roomId">
					<ControlLabel>Pomieszczenie</ControlLabel>
					<FormControl 
						componentClass="select" 
						placeholder="select"
						onChange={this.handleChange.bind(this, 'roomId')}
						value={this.props.formData.roomId} >
						
						{roomId_options}
					</FormControl>
				</FormGroup>
			</form>
		)
	}
}

DeviceForm.propTypes = {
	formData: PropTypes.shape({
		deviceName: PropTypes.string,
		inputNum: PropTypes.number,
		deviceType: PropTypes.string,
		roomId: PropTypes.number
	}).isRequired,
	handleChange: PropTypes.func.isRequired,
	deviceTypeEnums: PropTypes.array,
	roomsEnums: PropTypes.array
}

export default DeviceForm