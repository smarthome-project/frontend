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

export const getCameras = () => {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}/api/cameras`, {
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

export const createCamera = (camera) => {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}/api/cameras`, {
			headers: API_HEADER(),
			method: 'POST',
			body: JSON.stringify(camera)
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

export const updateCamera = (camera) => {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}/api/cameras/${camera.id}`, {
			headers: API_HEADER(),
			mode: 'cors',
			method: 'PUT',
			body: JSON.stringify(camera)
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

export const removeCamera = (camId) => {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}/api/cameras/${camId}`, {
			headers: API_HEADER(),
			mode: 'cors',
			method: 'DELETE'
		})
			.then(resp => {
				if (resp.status === 204) {
					resolve(camId)
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