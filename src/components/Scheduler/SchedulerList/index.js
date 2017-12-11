import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

import SchedulerListStyle from './styles.scss'

import { Link } from 'react-router-dom'
import { PageHeader, Table, Button, Grid, Row, Col } from 'react-bootstrap'
import { Icon } from '../../shared/Icon'
import _ from 'lodash'


class SchedulerList extends React.Component {


	render () {
		const tableBody = _.map(this.props.scheduls, (sche) => <tr>
			<td>1</td>
			<td>2</td>
			<td>3</td>
		</tr>)

		const table = (
			<Table responsive className="schedulerTable">
				<thead>
					<tr>
						<th>#</th>
						<th>Table heading</th>
						<th>Table heading</th>
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