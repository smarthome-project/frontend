import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import consts from './../../../../utils/constants'
import { Button, Col, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import _ from 'lodash'

class WizzardFormTime extends React.Component {

	handleChange(field, evt) {

		//console.log(field, evt)

		let value

		value = evt.target.value

		if (field == 'one_time') {
			let tmp = value.split(':')
			this.props.callbacks.change('hours', [tmp[0]])
			this.props.callbacks.change('min', [tmp[1]])
		}

		if (value == consts.CRON_TIME_EVERY_HH) {
			this.props.callbacks.change('every_hh', 1)
			this.props.callbacks.change('every_mm', 1)
			this.props.callbacks.change('hours', ['*'])
			this.props.callbacks.change('min', ['0'])
		}

		if (value == consts.CRON_TIME_EVERY_MM) {
			this.props.callbacks.change('every_hh', 1)
			this.props.callbacks.change('every_mm', 1)
			this.props.callbacks.change('hours', ['*'])
			this.props.callbacks.change('min', ['*'])
		}

		if (value == consts.CRON_TIME_SPECIFIC_ONE) {
			this.props.callbacks.change('one_time', '12:00')
			this.props.callbacks.change('hours', ['12'])
			this.props.callbacks.change('min', ['00'])
		}

		if (field == 'every_hh') {

			value = Number(value)
			value = _.toSafeInteger(value * 1)
			value = (value < 1) ? 1 : value
			value = (value > 23) ? 23 : value

			if (!_.isSafeInteger(value)) {
				this.props.callbacks.change('min', ['0'])
				this.props.callbacks.change('hours', null)
				this.props.callbacks.change(field, '')
				return
			}

			let cronHH = [`*/${Number(value)}`]
			this.props.callbacks.change('min', ['0'])
			this.props.callbacks.change('hours', cronHH)
		}

		if (field == 'every_mm') {
			
			value = Number(value)
			value = _.toSafeInteger(value * 1)
			value = (value < 1) ? 1 : value
			value = (value > 59) ? 59 : value

			if (!_.isSafeInteger(value)) {
				this.props.callbacks.change('min', null)
				this.props.callbacks.change('hours', ['*'])
				this.props.callbacks.change(field, '')
				return
			}

			let cronMM = [`*/${Number(value)}`]
			this.props.callbacks.change('min', cronMM)
			this.props.callbacks.change('hours', ['*'])
		}

		this.props.callbacks.change(field, value)
	}

	render() {

		let form_specific_one = (
			<FormGroup controlId="form_specific_one">
				<Col sm={2}>
					<ControlLabel></ControlLabel>
				</Col>
				<Col sm={8}>
					<FormControl
						type="time"
						step={60*15}
						onChange={this.handleChange.bind(this, 'one_time')}
						value={this.props.formsData.one_time} />
				</Col>
			</FormGroup>
		)

		let form_every_hh = (
			<FormGroup controlId="form_every_hh">
				<Col sm={2}>
					<ControlLabel></ControlLabel>
				</Col>
				<Col sm={8}>
					<FormControl
						type="number"
						onChange={this.handleChange.bind(this, 'every_hh')}
						value={this.props.formsData.every_hh} />
				</Col>
			</FormGroup>
		)

		let form_every_mm = (
			<FormGroup controlId="form_every_mm">
				<Col sm={2}>
					<ControlLabel></ControlLabel>
				</Col>
				<Col sm={8}>
					<FormControl
						type="number"
						onChange={this.handleChange.bind(this, 'every_mm')}
						value={this.props.formsData.every_mm} />
				</Col>
			</FormGroup>
		)

		let subForm = 
			(this.props.formsData.time_type == consts.CRON_TIME_SPECIFIC_ONE) ? <div>{form_specific_one}</div> :
			(this.props.formsData.time_type == consts.CRON_TIME_EVERY_HH) ? <div>{form_every_hh}</div> :
			(this.props.formsData.time_type == consts.CRON_TIME_EVERY_MM) ? <div>{form_every_mm}</div> :
			(this.props.formsData.time_type == consts.CRON_TIME_SPECIFIC) ? <div>{form_time_specific}</div> :
			null

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
							</FormControl>
						</Col>
					</FormGroup>
					{subForm}
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