import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

import SchedulerForm from './../SchedulerForm'

import { Link } from 'react-router-dom'
import _ from 'lodash'
import consts from './../../../utils/constants'


class SchedulerAdd extends React.Component {

	constructor(props) {
		super(props)

		this.handleSave = this.handleSave.bind(this)
		this.handleChange = this.handleChange.bind(this)

		this.state = {
			days: ['*'],
			hours: ['*'], 
			min: ['0'],
			day_type: consts.CRON_DAYS_EVERY,
			tim_type: consts.CRON_TIME_SPECIFIC_ONE,
			choosedDeviceId:  null,
			actionCronState: {}
		}
	}

	handleSave() {
		console.log('TODO: save')
	}

	handleChange(field, value) {
		this.setState({[field]: value})
	}

	render () {
		return <SchedulerForm
					title_mainSection="Dodaj akcje" 
					title_subSection="harmonogram."
					formsData={this.state}
					callbacks={{
						save: this.handleSave,
						change: this.handleChange
					}} />
	}
}

SchedulerAdd.propTypes = {}

export default SchedulerAdd