const CountryDisplay = ( {country} ) => {
    console.log(country)

    const languages = Object.values(country.languages).map((value, index) => (
        <li key={index}>{value}</li>
    ))

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>languages:</h2>
            {languages}
            <h1 style={{ fontSize: '5em' }}>{country.flag}</h1>
        </div>
    )
}

export default CountryDisplay