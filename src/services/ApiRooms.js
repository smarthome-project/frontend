import config from '../utils/config'
import consts from '../utils/constants'
import { roomsFakeData } from '../assets/fakeData/data'

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
		resolve(roomsFakeData)
	})
}