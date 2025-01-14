import { FormEvent, useCallback, useRef } from 'react'
import { IGetWeatherData } from '../../utils/interfaces';
import { weatherUnits } from '../../utils/types';
import './style.scss'

interface IProps {
  currentUnit: weatherUnits,
  handleGetWeather: (data: IGetWeatherData) => void,
  handleChangeCurrentUnit: (unit: weatherUnits) => void
}

export function Header({
  currentUnit,
  handleGetWeather,
  handleChangeCurrentUnit
}: IProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputRef.current) {
      handleGetWeather({ q: inputRef.current.value })
    }
  }, [currentUnit])

  return (
    <div className='header'>
      <div className="container">
        <div className='header-block'>
          <form action="" onSubmit={handleSubmit}>
            <input ref={inputRef} type="text" placeholder='City' />
            <button type="submit">Search city</button>
          </form>
          <div className='header-units'>
            <form action="">
              <div>
                <label htmlFor="">°C</label>
                <input checked={currentUnit === 'metric'} name='weather-unit' type="radio" onClick={() => handleChangeCurrentUnit('metric')} />
              </div>
              <div>
                <label htmlFor="">°F</label>
                <input checked={currentUnit === 'standard'} name='weather-unit' type="radio" onClick={() => handleChangeCurrentUnit('standard')} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}