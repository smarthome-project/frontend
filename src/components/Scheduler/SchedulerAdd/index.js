import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

import SchedulerForm from './../SchedulerForm'
import CronSchedule from '../../../utils/cronTranslate'

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
			hours: ['12'], 
			min: ['00'],
			one_time: '12:00',
			one_day: '1',
			day_type: consts.CRON_DAYS_EVERY,
			time_type: consts.CRON_TIME_SPECIFIC_ONE,
			choosedDeviceId:  0,
			actionCronState: {},
			redirectAfterSave: false
		}
	}

	handleSave() {

		let days = [false, false, false, false, false, false, false]

		if (this.state.days[0] == "*")
			days = [true, true, true, true, true, true, true]
		else 
			for (let ind = 0; ind < _.size(this.state.days); ind++)
				days[this.state.days[ind]-1] = true

		let newCron = new CronSchedule(days, this.state.hours, this.state.min, () => {
			const cronString = newCron.getCronString()
			let newSchedule = {
				device_id: this.state.choosedDeviceId,
				state: this.state.actionCronState,
				cron: cronString,
				active: 1
			}
			this.props.scheduleCallbacks.handleAddSchedule(newSchedule)
			this.setState({redirectAfterSave: true})
		})
	}

	handleChange(field, value) {
		this.setState({[field]: value})
	}

	render () {
		const { redirectAfterSave } = this.state
		return <div>
				<SchedulerForm
					title_mainSection="Dodaj akcje" 
					title_subSection="harmonogram."
					devices={this.props.devices}
					formsData={this.state}
					callbacks={{
						save: this.handleSave,
						change: this.handleChange
					}} />

					{redirectAfterSave && (
						<Redirect to={'/scheduler'} />
					)}
				</div>
	}
}

SchedulerAdd.propTypes = {
	devices: PropTypes.array,
	scheduls: PropTypes.array,
	scheduleCallbacks: PropTypes.object
}

export default SchedulerAdd