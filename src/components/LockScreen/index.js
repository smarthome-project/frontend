import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import update from 'react-addons-update'
import { CSSTransitionGroup } from 'react-transition-group'
import LockScreenStyle from './style.scss'
import { updateAlarmState } from '../../services/ApiAlarms'

class KeyboardButton extends React.Component {

	render() {
		const { buttonValue } = {...this.props}

		return (
			<button 
				className="keyboard__button"
				onClick={this.props.clickHandler.bind(null, buttonValue)} >
				{buttonValue}
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
		if (pin == "7436") {
			updateAlarmState(false)
				.then(alarmStatus => { this.props.handleCheckNewAlarmState() })
				.catch(e => { console.log(e) })
		} else {
			//TODO ALARM
		}
	}

	handleButtonPin(val) {
		let nextPinCode = this.state.pinCode + val
		if (_.size(nextPinCode) <= 8)
			this.setState({pinCode: nextPinCode})
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
						<KeyboardButton buttonValue="0" clickHandler={this.handleButtonPin} />
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