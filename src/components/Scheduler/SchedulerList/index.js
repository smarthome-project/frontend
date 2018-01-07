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

		this.filterSchedules = this.filterSchedules.bind(this)
		this.handleChangeFilte = this.handleChangeFilte.bind(this)
		this.handleRemoveSchedule = this.handleRemoveSchedule.bind(this)

		const filterDev = (this.props.match.params.devId && _.isNumber(this.props.match.params.devId)) ? 
			Number(this.props.match.params.devId) : 0
		
		const filterRoom = (this.props.match.params.roomId && _.isNumber(this.props.match.params.roomId)) ? 
			Number(this.props.match.params.roomId) : 0

		this.state = {
			changed: false,
			scheduls: [],
			device_filter: filterDev,
			room_filter: filterRoom
		}
	}

	filterSchedules(arraySched, device_filter, room_filter) {
		if (device_filter && _.isNumber(device_filter) && device_filter > 0) {
			return _.filter(arraySched, as => as.device_id == device_filter) || []
		} else if (room_filter && _.isNumber(room_filter) && room_filter > 0) {
			return _.filter(arraySched, as => as.room_id == room_filter) || []
		} else {
			return arraySched || []
		}
	}

	handleChangeFilte(field, evt) {
		const val = (evt && evt.target && evt.target.value)? Number(evt.target.value) : 0

		if (field == "clear") {

			let schedules = this.filterSchedules(this.props.scheduls, null, null)
			
			if (_.size(schedules) == 0) {
				this.setState({
					scheduls: [],
					device_filter: 0,
					room_filter: 0
				})
				return
			}

			let processing = _.after(_.size(schedules), () => {
				this.setState({
					scheduls: schedules,
					device_filter: 0,
					room_filter: 0
				})
			})

			for(let i = 0; i < _.size(schedules); i++) {
				this.convertCron.cronToString(schedules[i].cron)
					.then(cronString => {
						schedules[i].cronString = cronString
						processing()
					})
					.catch(e => console.log(e))
			}

		} else if (field == "room_filter") {

			let schedules = this.filterSchedules(this.props.scheduls, null, val)
			
			if (_.size(schedules) == 0) {
				this.setState({
					scheduls: [],
					device_filter: 0,
					room_filter: Number(val)
				})
				return
			}

			let processing = _.after(_.size(schedules), () => {
				this.setState({
					scheduls: schedules,
					device_filter: 0,
					room_filter: Number(val)
				})
			})

			for(let i = 0; i < _.size(schedules); i++) {
				this.convertCron.cronToString(schedules[i].cron)
					.then(cronString => {
						schedules[i].cronString = cronString
						processing()
					})
					.catch(e => console.log(e))
			}

		} else if (field == "device_filter") {

			let schedules = this.filterSchedules(this.props.scheduls, val, null)
			
			if (_.size(schedules) == 0) {
				this.setState({
					scheduls: [],
					device_filter: Number(val),
					room_filter: 0
				})
				return
			}

			let processing = _.after(_.size(schedules), () => {
				console.log(schedules)
				this.setState({
					scheduls: schedules,
					device_filter: Number(val),
					room_filter: 0
				})
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
	}

	componentDidMount() {

		let filterDev = (this.props.match.params.devId && Number(this.props.match.params.devId) > 0 ) ? 
				Number(this.props.match.params.devId) : 0
		
		let filterRoom = (this.props.match.params.roomId && Number(this.props.match.params.roomId) > 0 ) ? 
			Number(this.props.match.params.roomId) : 0

		if (_.size(this.props.scheduls) < 1) {
			this.setState({
				changed: true,
				device_filter: filterDev,
				room_filter: filterRoom
			})

			return
		}

		let schedules = this.filterSchedules(this.props.scheduls, filterDev, filterRoom)
		
		if (_.size(schedules) == 0) {
			this.setState({
				changed: true,
				scheduls: [],
				device_filter: filterDev,
				room_filter: filterRoom
			})

			return
		}

		let processing = _.after(_.size(schedules), () => {
			this.setState({
				changed: true,
				scheduls: schedules,
				device_filter: filterDev,
				room_filter: filterRoom
			})
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
		if(_.isEqual(nextProps, this.props))
			return

		let filterDev, filterRoom

		if (!this.state.changed) {
			filterDev = (nextProps.match.params.devId && Number(nextProps.match.params.devId) > 0 ) ? 
				Number(nextProps.match.params.devId) : 0
		
			filterRoom = (nextProps.match.params.roomId && Number(nextProps.match.params.roomId) > 0 ) ? 
				Number(nextProps.match.params.roomId) : 0
		} else {
			filterDev = this.state.device_filter
			filterRoom = this.state.room_filter
		}

		let schedules = this.filterSchedules(nextProps.scheduls, filterDev, filterRoom)
		
		if (_.size(schedules) == 0) {
			this.setState({
				scheduls: [],
				device_filter: filterDev,
				room_filter: filterRoom
			})

			return
		}

		let processing = _.after(_.size(schedules), () => {
			this.setState({
				changed: true,
				scheduls: schedules,
				device_filter: filterDev,
				room_filter: filterRoom
			})
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
		const schedId = Number(scheduleId)
		return <span className="schedulerActions">
			<span className="removeScheduleButton" onClick={this.handleRemoveSchedule.bind(null, schedId)}>
				<Icon name="remove" size={1} fw /> <span>Usuń</span>
			</span>
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

	handleRemoveSchedule(schedId) {
		this.props.scheduleCallbacks.handleRemoveSchedule(schedId)
	}

	render () {

		const rooms_options = _.map(this.props.rooms, (room, idx) => 
			<option key={`slr_${idx}`} value={room.id}>{room.name}</option>)
		
		const devies_options = _.map(this.props.devices, (dev, idx) => 
			<option key={`sld_${idx}`} value={dev.id}>{dev.name}</option>)

		const filters = <div className="schedulerList--filters">
			<select className="schedulerList--filter-room"
				value={this.state.room_filter}
				onChange={this.handleChangeFilte.bind(null, "room_filter")}>

				<option value={0}>Wszystkie pokoje</option>
				{rooms_options}
			</select>
			{` `}
			<select className="schedulerList--filter-device"
				value={this.state.device_filter}
				onChange={this.handleChangeFilte.bind(null, "device_filter")}>

				<option value={0}>Wszystkie urządzenia</option>
				{devies_options}
			</select>
			{` `}
			<span 
				className="schedulerList--filter-clear" 
				onClick={this.handleChangeFilte.bind(null, "clear")}>
					<Icon name="eraser" size={1} />
				</span>
		</div>

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

		const brakMsg = (_.size(this.state.scheduls) > 0) ? 
			null : <span className="noSchedulesInfo">Brak harmonogramów.</span>

		const addButtonLink = (this.state.device_filter && this.state.device_filter > 0) ?
			`/scheduler/add/${this.state.device_filter}` : `/scheduler/add`

		return (
			<div id="schedulerList">
				<PageHeader>
					Harmonogramy 
					<small> automatyzacja zadań.</small> 
					{filters}
					<Button className="pull-right addButton" componentClass={Link} href={addButtonLink} to={addButtonLink}>
						<Icon name="plus" size={1} />
					</Button>
				</PageHeader>
				{table}
				{brakMsg}
			</div>
		)
	}
}

SchedulerList.propTypes = {
	rooms: PropTypes.array,
	devices: PropTypes.array,
	scheduls: PropTypes.array,
	scheduleCallbacks: PropTypes.object
}

export default SchedulerList