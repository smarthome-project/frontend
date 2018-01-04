import config from '../utils/config'
import consts from '../utils/constants'

const API_URL = `http://${location.hostname}:3376`

const LOCAL_TOKEN = () => localStorage.getItem(consts.LOCALSTORAGE_TOKEN) || ''
const API_HEADER = () => { return {
	'Content-Type': 'application/json',
	'x-access-token': LOCAL_TOKEN()
}}

function handleErrors(resp) {
	if (!resp.ok)
		throw Error(resp.statusText)
	return resp
}



export const checkAlarmState = () => {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}/api/alarm`, {
			headers: API_HEADER(),
			method: 'GET'
		})
			.then(resp => resp.json())
			.then(body => {
				const alarmStatus = (body.alarmStatus) ? true : false
				resolve(alarmStatus)
			})
			.catch(e => { 
				reject("Server error.", e) 
			})
	})
}

export const updateAlarmState = (newState) => {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}/api/alarm/${newState}`, {
			headers: API_HEADER(),
			method: 'GET'
		})
			.then(resp => resp.json())
			.then(body => {
				const alarmStatus = (body.alarmStatus) ? true : false
				resolve(alarmStatus)
			})
			.catch(e => { 
				reject("Server error.", e) 
			})
	})
}