import config from '../utils/config'
import consts from '../utils/constants'

const API_URL = `http://${location.hostname}:${config.serverPort}`

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

export const getSchedules = () => {
	return new Promise((resolve, reject) => {

		fetch(`${API_URL}/api/schedules`, {
			headers: API_HEADER(),
			method: 'GET'
		})
			.then(resp => {
				if (resp.status == 401)
					reject('no-auth')
				else
					resolve(resp.json())
			})
			.catch(e => {
				reject(e) 
			})
	})
}

export const setSchedule = (schedule) => {
	return new Promise((resolve, reject) => {

		fetch(`${API_URL}/api/schedules`, {
			headers: API_HEADER(),
			method: 'POST',
			body: JSON.stringify(schedule)
		})
			.then(resp => {
				if (resp.status == 401)
					reject('no-auth')
				else
					resolve(resp.json())
			})
			.catch(e => {
				reject(e) 
			})
	})
}