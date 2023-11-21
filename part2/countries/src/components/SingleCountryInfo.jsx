const SingleCountryInfo = ({ country, languages }) =>
    <div>
        <h1>{country.name.common}</h1>
        <p>capital: {country.capital}</p>
        <p>area: {country.area}</p>
        <h2>languages:</h2>
        {languages}
        <h1 style={{ fontSize: '7em', margin: '0', padding: '0' }}>{country.flag}</h1>
    </div>

export default SingleCountryInfo