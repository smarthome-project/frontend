import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'

import WeatherStyles from './weather.scss'

const iconsConsts = {
	'clear-day': Skycons.CLEAR_DAY,
	'clear-night': Skycons.CLEAR_NIGHT,
	'partly-cloudy-day': Skycons.PARTLY_CLOUDY_DAY,
	'partly-cloudy-night': Skycons.PARTLY_CLOUDY_NIGHT,
	'cloudy': Skycons.CLOUDY,
	'rain': Skycons.RAIN,
	'sleet': Skycons.SLEET,
	'snow': Skycons.SNOW,
	'wind': Skycons.WIND,
	'fog': Skycons.FOG
}

class Weather extends React.Component {

	componentWillMount() {
		this.icons = new Skycons({"color": "white"})
	}

	componentWillUnmount() {
		this.icons = null
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.forecast.currently) {
			this.icons.set("weather__current__imag__canvas", iconsConsts[this.props.forecast.currently.icon])
			this.icons.play()
		}
	}

	render() {

		let forecast = this.props.forecast
		const temp = (val) => (<span> {Number(val).toFixed(0)}&#186;C</span>)

		return (forecast.currently) ? (
				<div className="weather">
					<div className="weather__header">Aktualna pogoda</div>
					<div className="weather__current">
						<div className="weather__current__image">
							<canvas id="weather__current__imag__canvas" width="140" height="140"></canvas>
						</div>

						<h1 className="weather__current__temp">
							{temp(forecast.currently.temperature)}
						</h1>

						<h2 className="weather__current__summary">
							{forecast.currently.summary}
						</h2>
					</div>

					<div className="weather__next-days">

					</div>
				</div>
			) : null

	}
}

Weather.propTypes = {
	forecast: PropTypes.object
}

export default Weather