const CountryListElement = ({ country, showCountry }) => {
    console.log(country)
    return (
        <div>
        {country.name.common}
        <button onClick={showCountry}>{"show"}</button>
        </div>
    )
}

export default CountryListElement