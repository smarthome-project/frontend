import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

import styles from './wizzard_style.scss'
import WizzardFormDate from './partials/WizzardFormDate'
import WizzardFormTime from './partials/WizzardFormTime'
import WizzardFormAction from './partials/WizzardFormAction'

import { Link } from 'react-router-dom'
import { PageHeader, Table, Button, Grid, Row, Col, Alert } from 'react-bootstrap'
import { Icon } from '../../shared/Icon'
import _ from 'lodash'

class SchedulerForm extends React.Component {

	constructor(props) {
		super(props)
		this.saveForm = this.saveForm.bind(this)
		this.validateForm = this.validateForm.bind(this)
		this.showErrorModal = this.showErrorModal.bind(this)
	}

	showErrorModal(form, errText) {
		console.log(form, errText)

		const alertInstance = (
			<Alert bsStyle="warning">
				<strong>Błąd zapisu!</strong> {errText}
			</Alert>
		)

		ReactDom.render(alertInstance, document.getElementById('alertsMountPlace'))
		setTimeout(function() {
			ReactDom.render(null, document.getElementById('alertsMountPlace'))
		}, 3000)
	}

	validateForm() {

		let days, hours, min, choosedDeviceId, actionCronState
		({days, hours, min, choosedDeviceId, actionCronState} = this.props.formsData)
		
		if (!days || !_.isArray(days) || days == []) {
			this.showErrorModal('days', "Wypełnij prawidłowo pola związane z datą.")
			return false
		} else if (!hours || !_.isArray(hours) || hours == []) {
			this.showErrorModal('hours', "Wypełnij prawidłowo pola związane z czasem.")
			return false
		} else if (!min || !_.isArray(min) || min == []) {
			this.showErrorModal('min', "Wypełnij prawidłowo pola związane z czasem.")
			return false
		} else if (!choosedDeviceId || choosedDeviceId <= 0) {
			this.showErrorModal('choosedDeviceId', "Wybierz urządzenie.")
			return false
		} else if (!actionCronState || !_.isObject(actionCronState) || _.isEmpty(actionCronState)) {
			this.showErrorModal('actionCronState', "Wybierz akcje.")
			return false
		} else {
			return true
		}

	}

	saveForm() {
		console.log(this.props.formsData)
		if (this.validateForm())
			this.props.callbacks.save()
	}

	render() {
		
		return (
			<div id="scheduler_wizzard">
				<PageHeader>
					{this.props.title_mainSection} 
					<small> {this.props.title_subSection} </small> 
					<Button 
						className="pull-right saveButton" 
						onClick={this.saveForm} >
						<Icon name="cloud-upload" size={1} /> Zapisz
					</Button>
				</PageHeader>
				
				<div className="part">
					<div className="title"> Ustal czas: </div>
					
					<WizzardFormDate
						formsData={this.props.formsData}
						callbacks={this.props.callbacks} />

					<WizzardFormTime
						formsData={this.props.formsData}
						callbacks={this.props.callbacks} />
				</div>

				<div className="part">
					<div className="title"> Wybierz akcje: </div>

					<WizzardFormAction
						devices={this.props.devices}
						formsData={this.props.formsData}
						callbacks={this.props.callbacks} />
				</div>
			</div>
		)
	}
}


SchedulerForm.propTypes = {
	title_mainSection: PropTypes.string,
	title_subSection: PropTypes.string,
	devices: PropTypes.array,
	formsData: PropTypes.object,
	callbacks: PropTypes.shape({
		save: PropTypes.func,
		change: PropTypes.func
	})
}

export default SchedulerForm