import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'

import consts from '../../utils/constants'
import { checkToken, getToken } from '../../services/ApiAuth'
import UserLoginStyles from './style.scss'
import { Panel, Grid, Row, Col, FormGroup, 
	FormControl, ControlLabel, Button, Image } from 'react-bootstrap'


const loginPanelTitle = (
	<h2>Smart Home</h2>
)

class UserLogin extends React.Component {

	constructor(props) {
		super(props)

		this.handleInput 	= this.handleInput.bind(this)
		this.tryLogIn 		= this.tryLogIn.bind(this)
		this.validate 		= this.validate.bind(this)

		this.state = {
			redirectLogin: false,
			validationState: null,
			errorString: "",
			formValues: {
				login: "",
				pass: ""
			}
		}
	}

	componentDidMount() {
		localStorage.removeItem(consts.LOCALSTORAGE_TOKEN)
	}

	handleInput(e) {

		if (e.type === 'keypress') {
			if (e.key === 'Enter' && e.target.id == 'signup_pass')
				this.tryLogIn()
			else
				return
		}

		let values = {...this.state.formValues}

		switch (e.target.id) {

			case 'signup_login':
				values.login = e.target.value
				this.setState({formValues: values})
				break

			case 'signup_pass':
				values.pass = e.target.value
				this.setState({formValues: values})
				break
		}
	}

	validate(login, pass) {
		if(_.size(login) < 3 || _.size(pass) < 3) {
			this.setState({validationState: "error", formValues: {login: "", pass: ""}})
			return false
		} else {
			this.setState({validationState: null, formValues: {login: "", pass: ""}})
			return true
		}
	}

	tryLogIn() {
		const login = this.state.formValues.login
		const pass = this.state.formValues.pass

		if ( this.validate(login, pass) ) {
			getToken(login, pass)
				.then(resp => {
					if (resp.token) {
						localStorage.setItem(consts.LOCALSTORAGE_TOKEN, resp.token)
						this.setState({errorString: "", validationState: null, formValues: {login: "", pass: ""}})
						this.props.history.push('/', null)
					}
				})
				.catch(e => {
					this.setState({errorString: "Błąd logowania.", validationState: "error", formValues: {login: "", pass: ""}})
				})
		}
	}

	render() {

		return (
			<div className="loginContainer">
				<Grid>
					<Row>
						<Col 
							xs={8} xsOffset={2}
							sm={6} smOffset={3}
							md={4} mdOffset={4}
							lg={4} lgOffset={4} >

							<Panel header={loginPanelTitle}>

								<Image className="loginImage" src="http://via.placeholder.com/200x100" rounded />

									<FormGroup controlId="signup_login" validationState={this.state.validationState}>
										<FormControl 
											type="text" 
											placeholder="Login"
											value={this.state.formValues.login} 
											onChange={this.handleInput}
											onKeyPress={this.handleInput} />
									</FormGroup>
									
									<FormGroup controlId="signup_pass" validationState={this.state.validationState}>
										<FormControl 
											type="password" 
											placeholder="Password" 
											value={this.state.formValues.pass} 
											onChange={this.handleInput}
											onKeyPress={this.handleInput} />
									</FormGroup>

									<span className="errMsg"> {this.state.errorString} </span>
									
									<Button className="loginButton" onClick={this.tryLogIn}>Zaloguj</Button>
							</Panel>
						</Col>
					</Row>
				</Grid>
			</div>
		)
	}
}

export default UserLogin