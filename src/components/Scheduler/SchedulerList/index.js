import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

import CronSchedule from '../../../utils/cronTranslate'
import SchedulerListStyle from './styles.scss'

import { Link } from 'react-router-dom'
import { PageHeader, Table, Button, Grid, Row, Col } from 'react-bootstrap'
import { Icon } from '../../shared/Icon'
import _ from 'lodash'

class SchedulerList extends React.Component {

	constructor(props) {
		super(props)

		this.convertCron = new CronSchedule()

		this.state = {scheduls: []}
	}

	componentDidMount() {
		if (_.size(this.props.scheduls) < 1)
			return

		let schedules = this.props.scheduls
		let processing = _.after(_.size(schedules), () => {
			this.setState({scheduls: schedules})
		})

		for(let i = 0; i < _.size(schedules); i++) {
			this.convertCron.cronToString(schedules[i].cron)
				.then(cronString => {
					schedules[i].cronString = cronString
					processing()
				})
				.catch(e => console.log(e))
		}
	}

	componentWillReceiveProps(nextProps) {
		if(!this.props.scheduls)
			return

		if(_.isEqual(nextProps, this.props))
			return

		let schedules = nextProps.scheduls
		let processing = _.after(_.size(schedules), () => {
			this.setState({scheduls: schedules})
		})

		for(let i = 0; i < _.size(schedules); i++) {
			this.convertCron.cronToString(schedules[i].cron)
				.then(cronString => {
					schedules[i].cronString = cronString
					processing()
				})
				.catch(e => console.log(e))
		}
	}

	getActions(scheduleId) {
		return <span className="schedulerActions">
			<a scheid={scheduleId}>
				<Icon name="pencil" size={1} fw /> <span>Edytuj</span>
			</a>
		</span>
	}

	getActived(act) {
		return (act) ? <span>
				<Icon name="check" size={1} fw /> <span>Tak</span>
			</span> : <span>
				<Icon name="times" size={1} fw /> <span>Nie</span>
			</span>
	} 

	cwHexToPercent(hex) {
		
		if (hex == "#000000")
			return `Zgaś światło.`

		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
		result = result ? parseInt(result[2], 16) : null

		let percent = parseInt((result / 255) * 100 * 10) / 10

		return `Ustaw ciepło na ${percent}%.`
	}

	rgbToColor(hex) {
		
		if (hex == "#000000")
			return `Zgaś światło.`

		return `Ustaw kolor na <div class="wizard_rgb_color" style="background-color: ${hex}"> </div> `
	}

	getActionByState(state) {
		
		const naming = (key, value) => {
			switch(key) {
				case 'active':
					return (value) ? 'Włącz. ' : 'Wyłącz. '
				case 'rgb':
					return this.rgbToColor(value)
				case 'cw':
					return this.cwHexToPercent(value)
			}
		}

		let actionString = ""

		_.forIn(state, (val, key) => {
			actionString += naming(key, val)
		})

		return actionString
	}

	render () {

		//console.log(this.state.scheduls)

		const tableBody = _.map(this.state.scheduls, (sche) => <tr key={sche.id}>
			<td>{sche.id}</td>
			<td>{sche.room_name}</td>
			<td>{sche.device_name}</td>
			<td>{sche.cronString}</td>
			<td dangerouslySetInnerHTML={{__html: this.getActionByState(sche.state)}}></td>
			<td>{this.getActived(sche.active)}</td>
			<td>{this.getActions(sche.id)}</td>
		</tr>)

		const table = (
			<Table responsive className="schedulerTable">
				<thead>
					<tr>
						<th>#</th>
						<th>Pokój</th>
						<th>Urządzenie</th>
						<th>Harmonogram</th>
						<th>Akcje</th>
						<th>Aktywny</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{tableBody}
				</tbody>
			</Table>
		)

		return (
			<div>
				<PageHeader>
					Harmonogramy 
					<small> automatyzacja zadań.</small> 
					<Button className="pull-right addButton" componentClass={Link} href="/scheduler/add" to="/scheduler/add">
						<Icon name="plus" size={1} />
					</Button>
				</PageHeader>
				{table}
			</div>
		)
	}
}

SchedulerList.propTypes = {
	scheduls: PropTypes.array
}

export default SchedulerList