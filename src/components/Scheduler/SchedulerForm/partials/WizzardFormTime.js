import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import consts from './../../../../utils/constants'
import { Button, Col, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import _ from 'lodash'

class WizzardFormTime extends React.Component {

	handleChange(field, evt) {

		if (evt.target.value == consts.CRON_TIME_EVERY_HH) {
			this.props.callbacks.change('hours', ['*'])
			this.props.callbacks.change('min', ['*'])
		}

		if (evt.target.value == consts.CRON_TIME_EVERY_MM) {
			this.props.callbacks.change('hours', ['*'])
			this.props.callbacks.change('min', ['*'])
		}

		if (evt.target.value == consts.CRON_TIME_SPECIFIC_ONE) {
			this.props.callbacks.change('hours', ['*'])
			this.props.callbacks.change('min', ['*'])
		}

		if (evt.target.value == consts.CRON_TIME_SPECIFIC) {
			this.props.callbacks.change('hours', ['*'])
			this.props.callbacks.change('min', ['*'])
		}

		this.props.callbacks.change(field, evt.target.value)
	}

	render() {

		return (
			<div className="wizzard_date">
			
				<Form horizontal>
					<FormGroup controlId="formControlsSelect">
						<Col sm={2}>
							<ControlLabel>O której?</ControlLabel>
						</Col>
						<Col sm={8}>
							<FormControl 
								value={this.props.formsData.time_type} 
								onChange={this.handleChange.bind(this, 'time_type')}
								componentClass="select" 
								placeholder="O której">

								<option value={consts.CRON_TIME_SPECIFIC_ONE}>dokładnie o</option>
								<option value={consts.CRON_TIME_EVERY_HH}>co wybraną ilość godzin</option>
								<option value={consts.CRON_TIME_EVERY_MM}>co wybraną ilość minut</option>
								<option value={consts.CRON_TIME_SPECIFIC}>o wybranych godzinach</option>
							</FormControl>
						</Col>
					</FormGroup>
				</Form>
			</div>
		)
	}
}

WizzardFormTime.propTypes = {
	formsData: PropTypes.object,
	callbacks: PropTypes.object
}

export default WizzardFormTime