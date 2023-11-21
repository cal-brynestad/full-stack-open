import CountryDisplay from './CountryDisplay'
import Country from './Country'


const DisplayChoice = ( {countries, showThisCountry} ) => {
    return (
        <div>
            {countries.length > 10 && (
                <p>Too many matches, specify another filter</p>
            )}

            {(countries.length <= 10 && countries.length > 1) && (
                countries.map(country => 
                <Country 
                    key={country.name.common}
                    country={country}
                    showCountry={() => showThisCountry( country )}/>
                )
            )}

            {countries.length === 1 && (
                <CountryDisplay country={countries[0]}/>
            )}

            {countries.length === 0 && (
                <p>No matches</p>
            )}
        </div>
    )
}

export default DisplayChoice