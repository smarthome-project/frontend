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

export const getRooms = () => {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}/api/rooms`, {
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

export const createRooms = (room) => {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}/api/rooms`, {
			headers: API_HEADER(),
			method: 'POST',
			body: JSON.stringify(room)
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

export const updateRoom = (room) => {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}/api/rooms/${room.id}`, {
			headers: API_HEADER(),
			mode: 'cors',
			method: 'PUT',
			body: JSON.stringify(room)
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
				//localStorage.removeItem(consts.LOCALSTORAGE_TOKEN)

				console.log(e)

				if (e.message == 'NetworkError when attempting to fetch resource.')
					reject('server-down')
				else
					reject(e) 
			})
	})
}

export const removeRoom = (roomId) => {
	return new Promise((resolve, reject) => {
		fetch(`${API_URL}/api/rooms/${roomId}`, {
			headers: API_HEADER(),
			mode: 'cors',
			method: 'DELETE'
		})
			.then(resp => {
				if (resp.status === 204) {
					resolve(roomId)
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