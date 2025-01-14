import dayjs from "dayjs"
import { IWeatherDataItem } from "../../utils/interfaces"
import { weatherUnits } from "../../utils/types"
import './style.scss'

interface IProps {
  weather: IWeatherDataItem[],
  currentUnit: weatherUnits,
  currentDay: number,
  handleSetCurrentDay: (day: number) => void
}

export function WeatherInDayjs({ weather, currentUnit, currentDay, handleSetCurrentDay }: IProps) {
  return (
    <div className="weather-in-days">
      {weather.map((item, index) => (
        <div className={`weather-in-days-item ${currentDay === dayjs(item.dt_txt).get('date') && 'active'}`} key={index} onClick={() => handleSetCurrentDay(dayjs(item.dt_txt).get('date'))}>
          <span>{dayjs(item.dt_txt).format('DD-MM')}</span>
          <div>
            <span>{item.main.temp} {currentUnit === 'metric' ? "°C" : '°F'}</span>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            />
          </div>
        </div>
      ))}
    </div>
  )
}