import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

import styles from './wizzard_style.scss'
import WizzardFormDate from './partials/WizzardFormDate'
import WizzardFormTime from './partials/WizzardFormTime'

import { Link } from 'react-router-dom'
import { PageHeader, Table, Button, Grid, Row, Col } from 'react-bootstrap'
import { Icon } from '../../shared/Icon'
import _ from 'lodash'

class SchedulerForm extends React.Component {

	render() {
		
		return (
			<div id="scheduler_wizzard">
				<PageHeader>
					{this.props.title_mainSection} 
					<small> {this.props.title_subSection} </small> 
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
				</div>
			</div>
		)
	}
}


SchedulerForm.propTypes = {
	title_mainSection: PropTypes.string,
	title_subSection: PropTypes.string,
	formsData: PropTypes.object,
	callbacks: PropTypes.object
}

export default SchedulerForm