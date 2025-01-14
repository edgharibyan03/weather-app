import dayjs from "dayjs";
import { ICurrentWeather, IWeatherDataItem } from "../interfaces";

export function filterTodayWeather(list: IWeatherDataItem[], currentDay: number) {
  return list.filter(item => currentDay === dayjs(item.dt_txt).get('date'));
}

export function filterWeatherByDays(list: IWeatherDataItem[]): IWeatherDataItem[] {
  const days: number[] = [];

  const newList = list.filter(item => {
    const day = dayjs(item.dt_txt).get('date');
    if (days.includes(day)) {
      return false
    }

    days.push(day)

    return true
  })

  return newList.slice(0, 5)
}

export function getCurrentWeatherByDay(list: IWeatherDataItem[], day: number) {
  return list.find(item => dayjs(item.dt_txt).get('date') === day)
}