import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import Switch from '../shared/Switch'
import { Panel, Col } from 'react-bootstrap'

class SingleDevice extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			buttonState: true
		}
	}

	render() {

		let device = this.props.device
		const title = <h2> {device.name} </h2>

		return (device) ? (
			<Col xs={6} sm={4} md={3}>
				<Panel header={title}>
					<Switch bsSize="normal" value={this.state.buttonState} name="test" />
				</Panel>
			</Col>
		) : (null)	
	}
}

SingleDevice.propTypes = {
	device: PropTypes.object
}

export default SingleDevice