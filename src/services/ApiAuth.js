import config from '../utils/config'
import consts from '../utils/constants'
import CryptoJS from 'crypto-js'

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



export const blindCheckToken = () => { return (LOCAL_TOKEN()) ? true : false }

export const checkToken = () => {
	return new Promise((resolve, reject) => {
		if (!LOCAL_TOKEN()) {
			reject('no-auth')
			return
		}

		fetch(`${API_URL}/api/tokens/checkToken`, {
			headers: API_HEADER(),
			method: 'GET'
		})
			.then(resp => {
				if (resp.status == 401) {
					localStorage.removeItem(consts.LOCALSTORAGE_TOKEN)
					reject('no-auth')
				} else
					resolve(resp.json())
			})
			.catch(e => { 
				localStorage.removeItem(consts.LOCALSTORAGE_TOKEN) 
				reject('no-auth') 
			})
	})
}

export const getToken = (login, pass) => {

	const hashPass = CryptoJS.SHA512(pass).toString(CryptoJS.enc.Base64)

	//console.log(hashPass)

	return new Promise((resolve, reject) => {
		fetch(`${API_URL}/api/tokens`, {
			headers: API_HEADER(),
			method: 'POST',
			body: JSON.stringify({
				'login': login,
				'pass': hashPass
			})
		})
			.then(resp => {
				if (resp.status === 201) {
					const body = resp.json()
					const token = body.token || null
					localStorage.setItem(consts.LOCALSTORAGE_TOKEN, token)
					resolve(body)
				} else {
					localStorage.removeItem(consts.LOCALSTORAGE_TOKEN)
					reject('no-auth')
				}
			})
			.catch(e => { 
				localStorage.removeItem(consts.LOCALSTORAGE_TOKEN)

				if (e.message == 'NetworkError when attempting to fetch resource.')
					reject('server-down')
				else
					reject('no-auth') 
			})
	})
}