const Weather = ({ weather, loading, image }) => {
    return (
        <div>
            {loading ? (<p>Loading temperature...</p>) : (
                <div>
                    <p>temperature: {weather.temp} Celcius</p>
                    <p>{weather.weather[0].description}</p>
                    <img src={image} />
                    <p>wind: {weather.wind_speed} m/s</p>
                </div>
            )}
        </div>
    )
}

export default Weather