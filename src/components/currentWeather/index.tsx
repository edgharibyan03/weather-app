import dayjs from "dayjs"
import { ICurrentWeather, IWeatherDataItem } from "../../utils/interfaces"
import { weatherUnits } from "../../utils/types"
import './style.scss'

interface IProps {
  currentWeather: ICurrentWeather,
  currentUnit: weatherUnits,
  weather: IWeatherDataItem[]
  city: string
}

export function CurrentWeather({ currentWeather, weather, city, currentUnit }: IProps) {
  return (
    <div className="current-weather">
      <div>
        <h2 className="current-weather-title">{city}</h2>
        <span className="current-weather-temp">{currentWeather.main.temp} {currentUnit === 'metric' ? "°C" : '°F'}</span>
        <img
          className="current-weather-img"
          src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
        />
        <span className="current-weather-desc">{currentWeather.weather[0].description}</span>
      </div>
      <div>
        {weather.map((item, index) => (
          <div className="current-weather-item" key={index}>
            <span>{dayjs(item.dt_txt).format('HH-mm-ss')}</span>
            <span>{item.main.temp} {currentUnit === 'metric' ? "°C" : '°F'}</span>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}