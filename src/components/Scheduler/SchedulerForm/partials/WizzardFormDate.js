import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import consts from './../../../../utils/constants'
import { Button, Col, Form, FormGroup, ControlLabel, FormControl, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import _ from 'lodash'

class WizzardFormDate extends React.Component {

	handleChange(field, evt) {

		let value

		if (field == 'days') {
			value = _.map(evt, (e) => "" + e)
		} else {
			value = evt.target.value
		}

		if (value == consts.CRON_DAYS_EVERY)
			this.props.callbacks.change('days', ['*'])

		if (value == consts.CRON_DAYS_ONE_IN_WEEK)
			this.props.callbacks.change('days', ['1'])

		if (value == consts.CRON_DAYS_CHOOSED)
			this.props.callbacks.change('days', [])
		
		if (field == 'one_day') {
			this.props.callbacks.change('days', [value])
		}

		this.props.callbacks.change(field, value)
	}

	render() {

		console.log(this.props.formsData)

		let intDays = _.map(this.props.days, (d) => Number(d))

		let form_oneDay = (
			<FormGroup controlId="selectDayType">
				<Col sm={2}>
					<ControlLabel></ControlLabel>
				</Col>
				<Col sm={8}>
					<FormControl 
						value={this.props.formsData.one_day} 
						onChange={this.handleChange.bind(this, 'one_day')}
						componentClass="select" 
						placeholder="dzień">
						
						<option value={1}>w poniedziałek</option>
						<option value={2}>w wtorek</option>
						<option value={3}>w środe</option>
						<option value={4}>w czwartek</option>
						<option value={5}>w piątek</option>
						<option value={6}>w sobote</option>
						<option value={7}>w niedziele</option>
					</FormControl>
				</Col>
			</FormGroup>
		)

		let form_chooseDays = (
			<FormGroup controlId="selectDayType">
				<Col sm={2}>
					<ControlLabel></ControlLabel>
				</Col>
				<Col sm={8}>
					<ToggleButtonGroup
						type="checkbox"
						value={intDays} 
						onChange={this.handleChange.bind(this, 'days')} >

							<ToggleButton value={1}>Pn</ToggleButton>
							<ToggleButton value={2}>Wt</ToggleButton>
							<ToggleButton value={3}>Śr</ToggleButton>
							<ToggleButton value={4}>Cz</ToggleButton>
							<ToggleButton value={5}>Pt</ToggleButton>
							<ToggleButton value={6}>Sb</ToggleButton>
							<ToggleButton value={7}>Nd</ToggleButton>

					</ToggleButtonGroup>
				</Col>
			</FormGroup>
		)

		let subForm = (this.props.formsData.day_type == consts.CRON_DAYS_ONE_IN_WEEK) ?
			<div>{form_oneDay}</div> : (this.props.formsData.day_type == consts.CRON_DAYS_CHOOSED) ?
			<div>{form_chooseDays}</div> : null

		return (
			<div className="wizzard_date">
			
				<Form horizontal>
					<FormGroup controlId="selectDayType">
						<Col sm={2}>
							<ControlLabel>Kiedy? </ControlLabel>
						</Col>
						<Col sm={8}>
							<FormControl 
								value={this.props.formsData.day_type} 
								onChange={this.handleChange.bind(this, 'day_type')}
								componentClass="select" 
								placeholder="Kiedy">
								
								<option value={consts.CRON_DAYS_EVERY}>Codziennie</option>
								<option value={consts.CRON_DAYS_ONE_IN_WEEK}>Raz w tygodniu</option>
								<option value={consts.CRON_DAYS_CHOOSED}>W wybrane dni</option>
							</FormControl>
						</Col>
					</FormGroup>
					{subForm}
				</Form>
			</div>
		)
	}
}

WizzardFormDate.propTypes = {
	formsData: PropTypes.object,
	callbacks: PropTypes.object
}

export default WizzardFormDate