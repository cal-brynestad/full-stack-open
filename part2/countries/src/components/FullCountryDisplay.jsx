import { useState, useEffect } from 'react'
import Weather from './Weather'
import SingleCountryInfo from './SingleCountryInfo'
import countryService from '../services/countries'

const FullCountryDisplay = ( {country} ) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    console.log(country)

    const languages = Object.values(country.languages).map((value, index) => (
        <li key={index}>{value}</li>
    ))

    const getWeather = () => {
        countryService
            .getCoordinates(country.capital, 1)
            .then(response => {
                console.log(response[0])
                countryService
                    .getWeather(response[0].lat, response[0].lon)
                    .then(response => {
                        console.log(response.current)
                        setWeather(response.current)

                        const weatherCode  = response.current.weather[0].icon
                        const imgURL = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`
                        setImage(imgURL)
                        setLoading(false)
                    })
            })
    }
    useEffect(getWeather, [])

    return (
        <div>
            <SingleCountryInfo country={country} languages={languages}/>
            <h1>Weather in {country.capital}</h1>
            <Weather weather={weather} loading={loading} image={image}/>
        </div>
    )
}

export default FullCountryDisplay