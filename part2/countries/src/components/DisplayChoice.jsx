import FullCountryDisplay from './FullCountryDisplay'
import CountryListElement from './CountryListElement'


const DisplayChoice = ( {countries, showThisCountry} ) => {
    return (
        <div>
            {countries.length > 10 && (
                <p>Too many matches, specify another filter</p>
            )}

            {(countries.length <= 10 && countries.length > 1) && (
                countries.map(country => 
                <CountryListElement 
                    key={country.name.common}
                    country={country}
                    showCountry={() => showThisCountry( country )}/>
                )
            )}

            {countries.length === 1 && (
                <FullCountryDisplay country={countries[0]}/>
            )}

            {countries.length === 0 && (
                <p>No matches</p>
            )}
        </div>
    )
}

export default DisplayChoice