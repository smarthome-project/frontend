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
		fetch(`${API_URL}/api/alarms`, {
			headers: API_HEADER(),
			method: 'GET'
		})
			.then(resp => resp.json())
			.then(body => {
				const alarmStatus = (body[0].secured) ? true : false
				resolve(alarmStatus)
			})
			.catch(e => { 
				reject("Server error.", e) 
			})
	})
}

export const updateAlarmState = (secured, pin) => {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}/api/alarms/1`, {
			headers: API_HEADER(),
			mode: 'cors',
			method: 'PUT',
			body: JSON.stringify({
				secured: secured,
				pin: pin
			})
		})
			.then(resp => {
				if (resp.status === 200) {
					const body = resp.json() || []
					resolve(body)
				} else {
					reject(resp)
				}
			})
			.catch(e => { 
				console.log(e)

				if (e.message == 'NetworkError when attempting to fetch resource.')
					reject('server-down')
				else
					reject(e) 
			})
	})
}