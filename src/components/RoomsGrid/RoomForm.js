import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import RoomFormStyle from './roomform_styles.scss'

import { FormGroup, ControlLabel, FormControl, DropdownButton, ButtonGroup, MenuItem, Row, Col } from 'react-bootstrap'



class ImageSelecter extends React.Component {

	render () {
		let nameSelected = (this.props.selectedId !== undefined) ? (this.props.imagesSet[this.props.selectedId]).name || "Wybierz obrazek" : "Wybierz obrazek"
		let menuItems = _.map(this.props.imagesSet, (img, i) => {
				const img_url = require(`../../assets/images/usable/${img.path}`)
				return (
					<MenuItem 
						key={i} 
						eventKey={i}
						onClick={this.props.handleImage.bind(this, img.path, i)}>
						<img src={img_url} />
					</MenuItem>
				)
			})

		return (
			<DropdownButton title={nameSelected} id="ImageSelecter">
				{menuItems}
			</DropdownButton>
		)
	}
}

ImageSelecter.propTypes = {
	imagesSet: PropTypes.array,
	selectedId: PropTypes.number,
	handleImage: PropTypes.func.isRequired
}


class RoomForm extends React.Component {

	handleChange(field, evt) {
		this.props.handleChange(field, evt.target.value)
	}

	handleImage(image_path, idx) {
		console.log(image_path, idx)
		this.props.handleChange('imagePath', image_path)
		this.props.handleChange('imageId', idx)
	}

	render() {
		return (
			<form onSubmit={e => { e.preventDefault() }}>
					<FormGroup controlId="roomForm_roomName">
						<ControlLabel>Nazwa pomieszczenia</ControlLabel>
						<FormControl 
							type="text" 
							placeholder="Nazwa pomieszczenia"
							onChange={this.handleChange.bind(this, 'roomName')}
							value={this.props.formData.roomName} />
					</FormGroup>

					<ImageSelecter 
						handleImage={this.handleImage.bind(this)}
						imagesSet={this.props.imagesSet}
						selectedId={this.props.formData.imageId} />
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

