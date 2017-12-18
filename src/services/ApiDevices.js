import config from '../utils/config'
import consts from '../utils/constants'
import { devicesFakeData, deviceTypesFakeData } from '../assets/fakeData/data'

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

export const getDevices = () => {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}/api/devices`, {
			headers: API_HEADER(),
			method: 'GET'
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
				localStorage.removeItem(consts.LOCALSTORAGE_TOKEN)

				if (e.message == 'NetworkError when attempting to fetch resource.')
					reject('server-down')
				else
					reject(e) 
			})
	})
}

export const getDeviceTypes = () => {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}/api/devicesTypes`, {
			headers: API_HEADER(),
			method: 'GET'
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
				localStorage.removeItem(consts.LOCALSTORAGE_TOKEN)

				if (e.message == 'NetworkError when attempting to fetch resource.')
					reject('server-down')
				else
					reject(e) 
			})
	})
}

export const createDevice = (device) => {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}/api/devices`, {
			headers: API_HEADER(),
			method: 'POST',
			body: JSON.stringify(device)
		})
			.then(resp => {
				if (resp.status === 201) {
					const body = resp.json() || []
					resolve(body)
				} else {
					reject(resp)
				}
			})
			.catch(e => { 
				localStorage.removeItem(consts.LOCALSTORAGE_TOKEN)

				if (e.message == 'NetworkError when attempting to fetch resource.')
					reject('server-down')
				else
					reject(e) 
			})
	})
}