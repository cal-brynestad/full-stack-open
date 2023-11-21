import { useState, useEffect } from 'react'
import Input from './components/Input'
import DisplayChoice from './components/DisplayChoice'
import countryService from './services/countries'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [input, setInput] = useState('')

  const hook = () => {
    countryService
      .getAll()
      .then(initialCountries => {
        console.log(initialCountries)
        setAllCountries(initialCountries)
      })
  }
  
  useEffect(hook, [])

  const handleCountrySearch = (event) => {
    const newCountry = event.target.value
    if (newCountry === '') {
      setInput(newCountry)
      setFilteredCountries([])
    }

    else {
      setInput(newCountry)
      console.log(newCountry)

      const newFilteredCountries = allCountries.filter(
        country => country.name.common.toLowerCase().includes(newCountry.toLowerCase()))

      setFilteredCountries(newFilteredCountries)
      console.log(newFilteredCountries)
    }
  }

  const showThisCountry = ( targetCountry ) => {
    console.log(targetCountry)

    const selectedCountry = allCountries.filter(
      country => country.name.common.toLowerCase() === (targetCountry.name.common.toLowerCase()))

    setFilteredCountries(selectedCountry)
    setInput('')
}

  console.log(filteredCountries)
  console.log(filteredCountries.length)

  return (
    <div>
      <Input text={"find countries"} value={input} onChange={handleCountrySearch}/>

      <DisplayChoice countries={filteredCountries} showThisCountry={showThisCountry}/>
    </div>
  )
}

export default App
