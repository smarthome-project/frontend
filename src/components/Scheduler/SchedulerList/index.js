import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

import SchedulerListStyle from './styles.scss'

import { Link } from 'react-router-dom'
import { PageHeader, Table, Button, Grid, Row, Col } from 'react-bootstrap'
import { Icon } from '../../shared/Icon'
import _ from 'lodash'
import CronSchedule from '../../../utils/cronTranslate'

class SchedulerList extends React.Component {

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

	getActionByState(state) {
		
		const naming = (key, value) => {
			switch(key) {
				case 'active':
					return (value) ? 'Włącz. ' : 'Wyłącz. '
				case 'rgb':
					return `Ustaw kolor na ${value}. `
			}
		}

		let actionString = ""

		_.forIn(state, (val, key) => {
			actionString += naming(key, val)
		})

		return actionString
	}

	render () {
		let c = new CronSchedule([false,true,false,false,false,false,false],["12", "16", "19"], ["30"])
		c.parseCron("0 12 * * 1,3,5").then(resp => console.log(resp))

		console.log(this.props.scheduls)

		const tableBody = _.map(this.props.scheduls, (sche) => <tr key={sche.id}>
			<td>{sche.id}</td>
			<td>{sche.room_name}</td>
			<td>{sche.device_name}</td>
			<td>{this.getActionByState(sche.state)}</td>
			<td>{sche.cron}</td>
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
						<th>Akcja</th>
						<th>Harmonogram</th>
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