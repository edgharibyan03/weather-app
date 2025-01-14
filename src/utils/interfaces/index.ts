import { weatherUnits } from "../types";

export interface IGetWeatherData {
  lat?: number,
  lon?: number,
  q?: string
  units?: weatherUnits,
}

export interface ICurrentWeather {
  name: string,
  main: {
    temp: number
  },
  weather: {
    description: string
    icon: string
    id: number
    main: string
  }[]
}

export interface IWeatherDataItem {
  name: string,
  dt: number,
  dt_txt: number,
  main: {
    temp: number
  },
  weather: {
    description: string
    icon: string
    id: number
    main: string
  }[]
}