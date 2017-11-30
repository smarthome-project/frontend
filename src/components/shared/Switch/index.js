import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import SwitchBS from 'react-bootstrap-switch'
import SwitchStyle from './styles.scss'
import _ from 'lodash'

class Switch extends React.Component {

	handleSwitch(elem, state) {
		if (this.props.callback)
			this.props.callback(state)
	}

	render() {
		return (
			<SwitchBS 
				labelText={this.props.labelText}
				name={this.props.name}
				bsSize={this.props.bsSize}
				disabled={this.props.disabled}
				readonly={this.props.readonly}
				bsSize={this.props.bsSize}
				onColor={this.props.onColor}
				offColor={this.props.offColor}
				onText={this.props.onText}
				offText={this.props.offText}
				handleWidth={this.props.handleWidth}
				labelWidth={this.props.labelWidth}
				labelText={this.props.labelText}
				callback={this.props.callback}
				onChange={(el, state) => this.handleSwitch(el, state)} />
				
		)
	}
}

Switch.defaultProps = {
	disabled: false,
	readonly: false,
	bsSize: 'small',
	onColor: 'primary',
	offColor: 'default',
	onText: 'ON',
	offText: 'OFF',
	handleWidth: 'auto',
	labelWidth: 'auto',
	labelText: '',
	callback: undefined
}

Switch.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.bool.isRequired,
	labelText: PropTypes.string,
	disabled: PropTypes.bool,
	readonly: PropTypes.bool,
	bsSize: PropTypes.oneOf([null, 'mini', 'small', 'normal', 'large']),
	onColor: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger', 'default']),
	offColor: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger', 'default']),
	onText: PropTypes.string,
	offText: PropTypes.string,
	handleWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
	labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
	callback: PropTypes.func
}

export default Switch