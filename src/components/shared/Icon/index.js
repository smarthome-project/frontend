import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class Icon extends Component {
	
	constructor(props) {
		super(props)
	}

	getClass = () => {
		const size = (this.props.size) ? ` fa-${this.props.size}x` : ''
		const anim = (this.props.animation) ? ` fa-${this.props.animation} fa-fw` : ''
		const fw = (this.props.fw && !this.props.animation) ? ` fa-fw` : ''
		return `fa fa-${this.props.name}${size}${anim}`
	}

	render() {
		return (
			<i className={this.getClass()}></i>
		)
	}
}

Icon.propTypes = {
	name: PropTypes.string.isRequired,
	size: PropTypes.number,
	animation: PropTypes.string,
	fw: PropTypes.bool,
}