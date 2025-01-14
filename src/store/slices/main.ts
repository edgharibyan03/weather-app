import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../../utils/services'
import { RootState } from '../store'
import { ICurrentWeather, IWeatherDataItem } from '../../utils/interfaces'

interface IInitState {
  currentWeather: ICurrentWeather | null,
  weatherData: {
    list: IWeatherDataItem[]
  } | null
}

const initialState: IInitState = {
  weatherData: null,
  currentWeather: null
}

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async (searchParams: string) => {
    const response = await API.post(`/forecast?${searchParams}&appid=d4e3d5ef8aaff241d83b5069ee3cbc06&cnt=40`);

    return response.data;
  }
)

export const getCurrentWeather = createAsyncThunk(
  'weather/getCurrentWeather',
  async (searchParams: string) => {
    const response = await API.post(`/weather?${searchParams}&appid=d4e3d5ef8aaff241d83b5069ee3cbc06&cnt=10`);

    return response.data;
  }
)

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getWeather.fulfilled, (state, action) => {
      state.weatherData = action.payload
    })

    builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
      state.currentWeather = action.payload
    })
    builder.addCase(getWeather.rejected, () => {
      alert('Ничего не найдено')
    })
  }
})

export const getCurrentWeatherData = (state: RootState) => state.weather.currentWeather;
export const getWeatherData = (state: RootState) => state.weather.weatherData;

export default weatherSlice.reducer;