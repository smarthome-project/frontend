import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import RoomFormStyle from './roomform_styles.scss'

import { FormGroup, ControlLabel, FormControl, DropdownButton, ButtonGroup, MenuItem, Row, Col } from 'react-bootstrap'



class ImageSelecter extends React.Component {

	render () {

		let nameSelected = (this.props.selectedId) ? (this.props.imagesSet[this.props.selectedId]).name || "Wybierz obrazek" : "Wybierz obrazek"
		let menuItems = _.map(this.props.imagesSet, (img, i) => 
			<MenuItem eventKey={i}><img src={img.src} /></MenuItem> )

		return (
			<DropdownButton title={nameSelected} id="ImageSelecter">
				{menuItems}
			</DropdownButton>
		)
	}
}

ImageSelecter.propTypes = {
	imagesSet: PropTypes.array,
	selectedId: PropTypes.number
}


class RoomForm extends React.Component {

	handleChange(field, evt) {
		this.props.handleChange(field, evt.target.value)
	}

	render() {
		return (
			<form>
				<FormGroup controlId="roomForm_roomName">
					<ControlLabel>Nazwa pomieszczenia</ControlLabel>
					<FormControl 
						type="text" 
						placeholder="Nazwa pomieszczenia"
						onChange={this.handleChange.bind(this, 'roomName')}
						value={this.props.formData.roomName} />
				</FormGroup>

				<ImageSelecter imagesSet={this.props.imagesSet} selectedId={this.props.formData.imageId} />
			</form>
		)
	}
}

RoomForm.propTypes = {
	formData: PropTypes.shape({
		roomName: PropTypes.string,
		imagePath: PropTypes.string,
		imageId: PropTypes.number
	}).isRequired,
	handleChange: PropTypes.func.isRequired,
	imagesSet: PropTypes.array
}

export default RoomForm

