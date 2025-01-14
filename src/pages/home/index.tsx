import { useCallback, useEffect, useState } from "react";
import { Header, WeatherInDayjs } from "../../components";
import { IGetWeatherData } from "../../utils/interfaces";
import { weatherUnits } from "../../utils/types";
import qs from 'querystringify'
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCurrentWeather, getCurrentWeatherData, getWeather, getWeatherData } from "../../store/slices/main";
import { CurrentWeather } from "../../components";
import { filterTodayWeather, filterWeatherByDays, getCurrentWeatherByDay } from "../../utils/weather";
import dayjs from "dayjs";

export function Home() {
  const dispatch = useAppDispatch();

  const currentWeather = useAppSelector(getCurrentWeatherData);
  const weather = useAppSelector(getWeatherData);

  const [currentDay, setCurrentDay] = useState<number>(dayjs().get('date'))
  const [currentUnit, setCurrentUnit] = useState<weatherUnits>('metric')

  const handleGetWeather = useCallback((data: IGetWeatherData) => {
    dispatch(getWeather(qs.stringify({ units: currentUnit, ...data })))

    console.log(currentUnit);
    dispatch(getCurrentWeather(qs.stringify({ units: currentUnit, ...data })))
  }, [currentUnit])

  const handleChangeCurrentUnit = useCallback((unit: weatherUnits) => {
    setCurrentUnit(unit)

    handleGetWeather({ units: unit, q: currentWeather?.name })
  }, [currentWeather, currentUnit])

  const handleSetCurrentDay = useCallback((day: number) => {
    setCurrentDay(day)
  }, [weather?.list])

  const getCoords = useCallback((position: GeolocationPosition) => {
    const { latitude: lat, longitude: lon } = position.coords;

    handleGetWeather({ lat, lon, units: currentUnit })
  }, [currentUnit])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoords);
    }
  }, [])

  return (
    <section>
      <Header
        currentUnit={currentUnit}
        handleGetWeather={handleGetWeather}
        handleChangeCurrentUnit={handleChangeCurrentUnit}
      />
      {weather && <div className="container">
        {currentWeather && <CurrentWeather
          currentWeather={dayjs().get('date') !== currentDay ? (getCurrentWeatherByDay(weather.list, currentDay) || currentWeather) : currentWeather}
          currentUnit={currentUnit}
          city={currentWeather.name}
          weather={filterTodayWeather(weather.list, currentDay)}
        />}
        <WeatherInDayjs
          currentUnit={currentUnit}
          currentDay={currentDay}
          weather={filterWeatherByDays(weather?.list)}
          handleSetCurrentDay={handleSetCurrentDay}
        />
      </div>}
    </section>
  )
}