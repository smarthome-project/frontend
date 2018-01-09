import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import update from 'react-addons-update'
import _ from 'lodash'
import { CSSTransitionGroup } from 'react-transition-group'
import LockScreenStyle from './style.scss'
import { updateAlarmState } from '../../services/ApiAlarms'

class KeyboardButton extends React.Component {

	render() {
		const { buttonValue } = {...this.props}

		const buttonText = (buttonValue == "back")? 
			"\u232b " : (buttonValue == "disabled") ? 
			`.` : buttonValue

		return (
			<button 
				className="keyboard__button"
				disabled={buttonValue == "disabled"}
				onClick={this.props.clickHandler.bind(null, buttonValue)} >
				{buttonText}
			</button>
		)
	}
}

KeyboardButton.propTypes = {
	buttonValue: PropTypes.string.isRequired,
	clickHandler: PropTypes.func.isRequired
}

class LockScreen extends React.Component {

	constructor(props) {
		super(props)

		this.handleButtonPin = this.handleButtonPin.bind(this)
		this.handleShowPin = this.handleShowPin.bind(this)
		this.handleTryUnlock = this.handleTryUnlock.bind(this)

		this.state = {
			pinCode: "",
			showingKeys: false
		}
	}

	handleTryUnlock() {
		const pin = this.state.pinCode
		updateAlarmState(false, pin)
			.then(alarmStatus => { this.props.handleCheckNewAlarmState() })
			.catch(e => { console.log(e) })
	}

	handleButtonPin(val) {
		if (val == 'back') {
			let nextPinCode = (_.size(this.state.pinCode) > 0)? (this.state.pinCode).substr(0, _.size(this.state.pinCode) - 1) : ""
			if (_.size(nextPinCode) <= 8)
				this.setState({pinCode: nextPinCode})
		} else {
			let nextPinCode = this.state.pinCode + val
			if (_.size(nextPinCode) <= 8)
				this.setState({pinCode: nextPinCode})
		}
	}

	handleShowPin(show) {
		let nextState = (show) ? true : false
		this.setState({pinCode: "", showingKeys: nextState})
	}

	render() {
		let showingKeyboard = (
				<div key="keyboard" className="keyboardDiv">
					<input 
						type="password" 
						className="pinHolder" 
						value={this.state.pinCode} />

					<br />
					<div className="keyboard">
						<KeyboardButton buttonValue="1" clickHandler={this.handleButtonPin} />
						<KeyboardButton buttonValue="2" clickHandler={this.handleButtonPin} />
						<KeyboardButton buttonValue="3" clickHandler={this.handleButtonPin} />
						<br />
						<KeyboardButton buttonValue="4" clickHandler={this.handleButtonPin} />
						<KeyboardButton buttonValue="5" clickHandler={this.handleButtonPin} />
						<KeyboardButton buttonValue="6" clickHandler={this.handleButtonPin} />
						<br />
						<KeyboardButton buttonValue="7" clickHandler={this.handleButtonPin} />
						<KeyboardButton buttonValue="8" clickHandler={this.handleButtonPin} />
						<KeyboardButton buttonValue="9" clickHandler={this.handleButtonPin} />
						<br />
						<KeyboardButton buttonValue="back" clickHandler={this.handleButtonPin} />
						<KeyboardButton buttonValue="0" clickHandler={this.handleButtonPin} />
						<KeyboardButton buttonValue="disabled" clickHandler={this.handleButtonPin} />
					</div>
					<br />
					<div className="keyboard__footer">
						<button className="keyboard__footer--cancel" onClick={this.handleShowPin.bind(null,false)}>Anuluj</button>
						<button className="keyboard__footer--confirm" onClick={this.handleTryUnlock}>Potwierdź</button>
					</div>
				</div>
			)

			let showingPadlock = (
				<div key="padlock" className="padlockDiv">
					<h1 onClick={this.handleShowPin.bind(null, true)}>
						<i className="fa fa-4x fa-lock" aria-hidden="true"></i>
					</h1>
				</div>
			)

		return (
				<div className="lockScreen__wrapper">

					<CSSTransitionGroup
						transitionName="padlockTransition"
						transitionAppear={false}
						transitionEnter={true}
						transitionLeave={true}
						transitionAppearTimeout={350}
						transitionEnterTimeout={350}
						transitionLeaveTimeout={350} >

						{(this.state.showingKeys) ? showingKeyboard : showingPadlock}

					</CSSTransitionGroup>
				</div>
			)

	}
}

LockScreen.propTypes = {
	handleCheckNewAlarmState: PropTypes.func
}

export default LockScreen