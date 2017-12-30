import _ from 'lodash'
import constants from './constants'


class CronSchedule {

	/*
	*
	* days:
	* Array of days with boolean values.
	* 
	* hours:
	* Is array of hours.
	*
	* min:
	* Is array with minutes. If hours is length = 1, then min is used.
	*
	* Default cron is setetd to 0 12 * * * // 12:00 everyday
	*
	*/

	constructor(days, hours, min, rdy) {
		
		this.min = "0"
		this.hour = "12"
		this.day = "*"
		this.month = "*"
		this.dow = "*"

		if (days && hours && min)
			this.loadDataFromState(days, hours, min)
				.then(resp => { rdy() })
				.catch(e => console.log(e))
	}

	makeCronDate(days) {
		return new Promise((resolve, reject) => {
			
			if (_.every(days) && _.size(days) == 7) { //If all is true.

				this.dow = "*"
				
				resolve(true)
				return

			} else {

				if (_.size(days) !== 7) {
					console.log("Error on CronSchedule->makeCronDate(): days array bad length.")
					console.log(days)
					
					reject(false)
					return
				}

				let days_string = ""
				for (let ind = 0; ind < _.size(days); ind++) {
					
					if (days[ind]) {
						let dayNum = (ind + 1) % 7
						
						if(days_string == "")
							days_string += dayNum
						else
							days_string += "," + dayNum
					}
				}

				this.dow = days_string

				resolve(true)
				return
			}
		})
	}

	makeCronTime(hours, minutes) {
		return new Promise((resolve, reject) => {
			
			if (_.size(hours) < 1) {
				console.log("Error on CronSchedule->makeCronTime(): hours array empty.")
				console.log(hours)

				reject(false)
				return
			}

			if (_.size(hours) == 1 && _.size(minutes) > 0) {

				if (hours[0] == "*/1")
					hours[0] = "*"

				if (minutes[0] == "*/1")
					minutes[0] = "*"

				this.hour = hours[0]
				this.min = minutes[0]
				
				resolve(true)
				return

			} else {

				if (_.size(hours) > 24) {
					console.log("Error on CronSchedule->makeCronTime(): hours array bad length.")
					console.log(hours)
					
					reject(false)
					return
				}

				let hours_string = ""
				for (let ind = 0; ind < _.size(hours); ind++) {
					
					if (ind != 0)
						hours_string += ","

					hours_string += hours[ind]
				}

				this.hour = hours_string
				this.min = "0"

				resolve(true)
				return
			}
		})
	}

	loadDataFromState(days, hours, min) {
		return Promise.all([
			this.makeCronDate(days),
			this.makeCronTime(hours, min)
		])
	}

	getCronString() {
		let cron_string = `${this.min} ${this.hour} ${this.day} ${this.month} ${this.dow}`
		return cron_string
	}

	cronToString(cronString) {
		return new Promise((resolve, reject) => {
			let cronData = cronString.split(" ")

			if (_.size(cronData) !== 5) {
				console.log("Error on CronSchedule->cronToString(): cronData bad length.")
				console.log(cronData)
				
				reject(false)
				return
			}

			let mins = cronData[0]
			let hours = cronData[1]
			let days = cronData[4]

			const regEx_cronInterval = new RegExp("^(\\*/\\d)$")
			const regEx_cronSpecific = new RegExp("^(\\d{1,2})$")

			let scheduleString = ""
			
			//DATE
			if (days == "*" || days == "*/1") { // * => codziennie

				scheduleString += "Codziennie"

			} else if (days.indexOf(',') !== -1) { // x,y,z => W wybrane dni

				const splitDays = days.split(',')

				scheduleString += "W dni "
				for (let idx = 0; idx < _.size(splitDays); idx++) {
					if (idx != 0)
						scheduleString += ", "
					scheduleString += constants.CRON_DICT_DAYS_SHORT[splitDays[idx]]
				}
				
			} else { // x => w wybrany dzień
				scheduleString += "Co " + constants.CRON_DICT_DAYS_FULL[days]
			}

			scheduleString += " "


			//TIME
			if ( (hours == "*" || hours == "*/1") && mins == "0" ) { // 0 * => Co godzinę

				scheduleString += "co godzinę."

			} else if ( regEx_cronInterval.test(hours) && mins == "0" ) { // * * => Co x godzin

				let x = (hours.split('/'))[1]
				scheduleString += `co ${x} godz.`

			} else if ( (hours == "*" || hours == "*/1") && (mins == "*" || mins == "*/1") ) { // * */x => Co minutę

				scheduleString += "co minutę."

			} else if ( (hours == "*" || hours == "*/1") && regEx_cronInterval.test(mins) ) { // */x * => Co x godzin

				let x = (hours.split('/'))[1]
				scheduleString += `co ${x} min.`

			} else if (hours.indexOf(',') !== -1) { // 0 x,y,z => W wybrane godziny

				const splitHours = hours.split(',')

				scheduleString += "o godz. "
				
				for (let idx = 0; idx < _.size(splitHours); idx++) {
					if (idx != 0)
						scheduleString += ","
					scheduleString += splitHours[idx]
				}
				
			} else if (regEx_cronSpecific.test(hours) && regEx_cronSpecific.test(mins)) { // x y => o wybranej godzinie
				
				let fMin = (Number(mins) < 10) ? "0" + Number(mins) : mins
				let fHour = (Number(hours) < 10) ? "0" + Number(hours) : hours

				scheduleString += `o godz. ${fHour}:${fMin}`

			} else { //Custom made cron

				scheduleString = `Cron(${cronString})`

			}


			resolve(scheduleString)
		})
	}

	stateToString() {
		let cron = this.getCronString()
		return this.cronToString(cron)
	}
}

export default CronSchedule