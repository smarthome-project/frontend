import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import InfoScreenStyle from './style.scss'

import { Panel, Grid, Row, Col } from 'react-bootstrap'

import Weather from './Weather'

const staticData = `{"latitude":52.4166,"longitude":16.9666,"timezone":"Europe/Warsaw","currently":{"time":1511137833,"summary":"Duże zachmurzenie","icon":"cloudy","precipIntensity":0,"precipProbability":0,"temperature":3.89,"apparentTemperature":-0.79,"dewPoint":1.59,"humidity":0.85,"pressure":1005.81,"windSpeed":24.01,"windGust":36.79,"windBearing":292,"cloudCover":0.98,"uvIndex":0,"visibility":10.01,"ozone":382.59},"daily":{"summary":"W środę niewielki deszcz, w piątek ocieplenie do 11°C.","icon":"rain","data":[{"time":1511132400,"summary":"Rano słaby wiatr, średnie zachmurzenie w ciągu dnia.","icon":"wind","sunriseTime":1511159024,"sunsetTime":1511189684,"moonPhase":0.06,"precipIntensity":0.0381,"precipIntensityMax":0.127,"precipIntensityMaxTime":1511211600,"precipProbability":0.49,"precipType":"rain","temperatureHigh":4.99,"temperatureHighTime":1511179200,"temperatureLow":2.4,"temperatureLowTime":1511244000,"apparentTemperatureHigh":1.26,"apparentTemperatureHighTime":1511179200,"apparentTemperatureLow":-0.82,"apparentTemperatureLowTime":1511200800,"dewPoint":0.55,"humidity":0.81,"pressure":1010.56,"windSpeed":17.49,"windGust":47.64,"windGustTime":1511146800,"windBearing":288,"cloudCover":0.85,"uvIndex":1,"uvIndexTime":1511172000,"ozone":361.34,"temperatureMin":2.55,"temperatureMinTime":1511200800,"temperatureMax":4.99,"temperatureMaxTime":1511179200,"apparentTemperatureMin":-2.28,"apparentTemperatureMinTime":1511157600,"apparentTemperatureMax":1.45,"apparentTemperatureMaxTime":1511215200},{"time":1511218800,"summary":"Średnie zachmurzenie w ciągu dnia.","icon":"partly-cloudy-day","sunriseTime":1511245526,"sunsetTime":1511276012,"moonPhase":0.09,"precipIntensity":0.0203,"precipIntensityMax":0.0864,"precipIntensityMaxTime":1511218800,"precipProbability":0.41,"precipType":"rain","temperatureHigh":4.81,"temperatureHighTime":1511265600,"temperatureLow":2.07,"temperatureLowTime":1511305200,"apparentTemperatureHigh":2.89,"apparentTemperatureHighTime":1511265600,"apparentTemperatureLow":-1.16,"apparentTemperatureLowTime":1511312400,"dewPoint":0.98,"humidity":0.86,"pressure":1011.2,"windSpeed":5.71,"windGust":17.85,"windGustTime":1511287200,"windBearing":126,"cloudCover":0.82,"uvIndex":1,"uvIndexTime":1511258400,"ozone":303.95,"temperatureMin":2.21,"temperatureMinTime":1511301600,"temperatureMax":4.81,"temperatureMaxTime":1511265600,"apparentTemperatureMin":-0.48,"apparentTemperatureMinTime":1511301600,"apparentTemperatureMax":2.89,"apparentTemperatureMaxTime":1511265600},{"time":1511305200,"summary":"Średnie zachmurzenie, ustanie wieczorem.","icon":"partly-cloudy-day","sunriseTime":1511332027,"sunsetTime":1511362343,"moonPhase":0.12,"precipIntensity":0.1473,"precipIntensityMax":0.4572,"precipIntensityMaxTime":1511330400,"precipProbability":0.62,"precipType":"rain","temperatureHigh":8.02,"temperatureHighTime":1511373600,"temperatureLow":2.7,"temperatureLowTime":1511413200,"apparentTemperatureHigh":5.48,"apparentTemperatureHighTime":1511373600,"apparentTemperatureLow":-0.77,"apparentTemperatureLowTime":1511413200,"dewPoint":3.44,"humidity":0.86,"pressure":1011.12,"windSpeed":11.14,"windGust":34.44,"windGustTime":1511341200,"windBearing":197,"cloudCover":0.78,"uvIndex":1,"uvIndexTime":1511344800,"ozone":275.32,"temperatureMin":2.07,"temperatureMinTime":1511305200,"temperatureMax":8.59,"temperatureMaxTime":1511380800,"apparentTemperatureMin":-1.16,"apparentTemperatureMinTime":1511312400,"apparentTemperatureMax":6.29,"apparentTemperatureMaxTime":1511380800},{"time":1511391600,"summary":"Średnie zachmurzenie w ciągu dnia.","icon":"partly-cloudy-day","sunriseTime":1511418527,"sunsetTime":1511448676,"moonPhase":0.15,"precipIntensity":0.0025,"precipIntensityMax":0.0051,"precipIntensityMaxTime":1511416800,"precipProbability":0.06,"precipType":"rain","temperatureHigh":9.72,"temperatureHighTime":1511438400,"temperatureLow":6.16,"temperatureLowTime":1511499600,"apparentTemperatureHigh":7.14,"apparentTemperatureHighTime":1511438400,"apparentTemperatureLow":3.29,"apparentTemperatureLowTime":1511499600,"dewPoint":3.52,"humidity":0.81,"pressure":1013.24,"windSpeed":15.45,"windGust":50.84,"windGustTime":1511427600,"windBearing":212,"cloudCover":0.53,"uvIndex":1,"uvIndexTime":1511434800,"ozone":285.42,"temperatureMin":2.7,"temperatureMinTime":1511413200,"temperatureMax":9.72,"temperatureMaxTime":1511438400,"apparentTemperatureMin":-0.77,"apparentTemperatureMinTime":1511413200,"apparentTemperatureMax":7.14,"apparentTemperatureMaxTime":1511438400},{"time":1511478000,"summary":"Średnie zachmurzenie w ciągu dnia.","icon":"partly-cloudy-day","sunriseTime":1511505026,"sunsetTime":1511535013,"moonPhase":0.18,"precipIntensity":0,"precipIntensityMax":0.0025,"precipIntensityMaxTime":1511499600,"precipProbability":0,"temperatureHigh":10.77,"temperatureHighTime":1511524800,"temperatureLow":4.46,"temperatureLowTime":1511582400,"apparentTemperatureHigh":10.77,"apparentTemperatureHighTime":1511524800,"apparentTemperatureLow":2.18,"apparentTemperatureLowTime":1511582400,"dewPoint":4.8,"humidity":0.8,"pressure":1018.66,"windSpeed":13.15,"windGust":33.15,"windGustTime":1511514000,"windBearing":214,"cloudCover":0.67,"uvIndex":1,"uvIndexTime":1511514000,"ozone":267.59,"temperatureMin":6.16,"temperatureMinTime":1511499600,"temperatureMax":10.77,"temperatureMaxTime":1511524800,"apparentTemperatureMin":3.29,"apparentTemperatureMinTime":1511499600,"apparentTemperatureMax":10.77,"apparentTemperatureMaxTime":1511524800},{"time":1511564400,"summary":"Średnie zachmurzenie w ciągu dnia.","icon":"partly-cloudy-day","sunriseTime":1511591524,"sunsetTime":1511621352,"moonPhase":0.21,"precipIntensity":0.0025,"precipIntensityMax":0.0254,"precipIntensityMaxTime":1511589600,"precipProbability":0.04,"precipType":"rain","temperatureHigh":8.77,"temperatureHighTime":1511611200,"temperatureLow":4.07,"temperatureLowTime":1511654400,"apparentTemperatureHigh":6.19,"apparentTemperatureHighTime":1511611200,"apparentTemperatureLow":0.59,"apparentTemperatureLowTime":1511654400,"dewPoint":4,"humidity":0.82,"pressure":1019.92,"windSpeed":13.73,"windGust":42.33,"windGustTime":1511632800,"windBearing":180,"cloudCover":0.56,"uvIndex":1,"uvIndexTime":1511604000,"ozone":257.52,"temperatureMin":4.46,"temperatureMinTime":1511582400,"temperatureMax":8.77,"temperatureMaxTime":1511611200,"apparentTemperatureMin":2.18,"apparentTemperatureMinTime":1511582400,"apparentTemperatureMax":6.19,"apparentTemperatureMaxTime":1511611200},{"time":1511650800,"summary":"Średnie zachmurzenie w ciągu dnia.","icon":"partly-cloudy-day","sunriseTime":1511678020,"sunsetTime":1511707694,"moonPhase":0.25,"precipIntensity":0.0229,"precipIntensityMax":0.1194,"precipIntensityMaxTime":1511730000,"precipProbability":0.12,"precipType":"rain","temperatureHigh":8.13,"temperatureHighTime":1511697600,"temperatureLow":4.83,"temperatureLowTime":1511762400,"apparentTemperatureHigh":5.86,"apparentTemperatureHighTime":1511697600,"apparentTemperatureLow":1.21,"apparentTemperatureLowTime":1511762400,"dewPoint":4.66,"humidity":0.86,"pressure":1019.97,"windSpeed":13.79,"windGust":46.37,"windGustTime":1511733600,"windBearing":199,"cloudCover":0.98,"uvIndex":1,"uvIndexTime":1511690400,"ozone":269.52,"temperatureMin":4.07,"temperatureMinTime":1511654400,"temperatureMax":8.52,"temperatureMaxTime":1511730000,"apparentTemperatureMin":0.59,"apparentTemperatureMinTime":1511654400,"apparentTemperatureMax":5.86,"apparentTemperatureMaxTime":1511697600},{"time":1511737200,"summary":"Średnie zachmurzenie w ciągu dnia.","icon":"partly-cloudy-night","sunriseTime":1511764514,"sunsetTime":1511794038,"moonPhase":0.28,"precipIntensity":0.0025,"precipIntensityMax":0.0178,"precipIntensityMaxTime":1511737200,"precipProbability":0.16,"precipType":"rain","temperatureHigh":7.95,"temperatureHighTime":1511784000,"temperatureLow":4.32,"temperatureLowTime":1511848800,"apparentTemperatureHigh":5.21,"apparentTemperatureHighTime":1511784000,"apparentTemperatureLow":1.39,"apparentTemperatureLowTime":1511848800,"dewPoint":3.11,"humidity":0.81,"pressure":1027.76,"windSpeed":11.64,"windGust":47.81,"windGustTime":1511740800,"windBearing":231,"cloudCover":0.69,"uvIndex":1,"uvIndexTime":1511776800,"ozone":254.56,"temperatureMin":4.83,"temperatureMinTime":1511762400,"temperatureMax":7.99,"temperatureMaxTime":1511737200,"apparentTemperatureMin":1.21,"apparentTemperatureMinTime":1511762400,"apparentTemperatureMax":5.21,"apparentTemperatureMaxTime":1511784000}]},"flags":{"sources":["isd","cmc","gfs","madis"],"isd-stations":["121052-99999","122250-99999","122300-99999","122380-99999","122400-99999","123000-99999","123120-99999","123260-99999","123300-99999","123360-99999","123420-99999","123450-99999","123767-99999","124000-99999","124180-99999","124350-99999"],"units":"ca"},"offset":1}`

class InfoScreen extends React.Component {

	constructor(props) {
		super(props)
		this.weatherInterval = 1000 * 60
		this.state = {
			forecast: {}
		}
	}

	loadWeatherData() {
		const API_KEY = '9276df890a5874a2b695af967571d7ed'
		const API_CORDS = '52.4166,16.9666'
		const API_PROXY = 'https://cors-anywhere.herokuapp.com/'
		const API_URL = `https://api.darksky.net/forecast/${API_KEY}/${API_CORDS}/?lang=pl&units=ca&exclude=hourly,minutely`

		//console.log(API_PROXY + API_URL)

		// fetch(API_PROXY + API_URL)
		// 	.then(resp => resp.json())
		// 	.then(forecast => {
		// 		try {
		// 			let forecastObject = (typeof forecast === 'string') ? JSON.parse(forecast) : forecast
		// 			let nextState = {
		// 				currently: forecastObject.currently,
		// 				daily: forecastObject.daily,
		// 				alerts: (forecastObject.alerts || [])
		// 			}
		// 			//console.log(nextState)
		// 			this.setState({forecast: nextState})
		// 		} catch (e) {
		// 			//console.log('Error while parsing JSON data.')
		// 		}
		// 	})

		try {
			let forecastJson = JSON.parse(staticData)
			let nextState = {
				currently: forecastJson.currently,
				daily: forecastJson.daily,
				alerts: (forecastJson.alerts || [])
			}
			//console.log(nextState)
			this.setState({forecast: nextState})
		} catch (e) { 
			console.log(e) 
		}
	}

	componentDidMount() {
		this.refreshData()
	}

	componentWillUnmount() {
		clearInterval(this.refresher)
	}

	refreshData() {
		this.loadWeatherData()
		this.refresher = setTimeout(this.refreshData.bind(this), this.weatherInterval)
	}

	render() {

		const temp = (this.props.sensors && this.props.sensors.temp)? this.props.sensors.temp : null
		const humi = (this.props.sensors && this.props.sensors.humi)? this.props.sensors.humi : null

		const tempDesign = (val) => (<span> {Number(val).toFixed(1)}&#186;C</span>)
		const humiDesign = (val) => (<span> {Number(val).toFixed(1)}%</span>)

		const sensors = (temp || humi) ? 
			<div className="sensorsData">
				<h1 className="sensorsData__header">Dane z czujników</h1>
				<div className="sensorsData__container">
					{ temp ? <h2 className="sensorsData__current__temp">
						Temperatura:&nbsp;{tempDesign(temp)}
					</h2> : null }
					{ humi ? <h2 className="sensorsData__current__humi">
						Wilgotność:&nbsp;&nbsp;{humiDesign(humi)}
					</h2> : null }
				</div>
			</div> : null

		return (
				<div className="screenInfoContainer">
					<Grid><Row>
						<Col sm={12} md={6} lg={5}>
							<Weather forecast={this.state.forecast} />
						</Col>
						<Col sm={12} md={6} lg={5} lgOffset={2}>
							{sensors}
						</Col>
					</Row></Grid>
				</div>
			)

	}
}

InfoScreen.propTypes = {
	sensors: PropTypes.object
}

export default InfoScreen