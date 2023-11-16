import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Input from './components/Input'

const App = () => {
  const [allPersons, setAllPersons] = useState([]) 
  const [filteredPersons, setFilteredPersons] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setAllPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  // ON FIRST RENDER
  // App component is first rendered, and "render 0 persons" is logged
  // After the first render useEffect causes another render, [] as second parameter causes 
  // the effect to only be run along with the first render of the component
  // hook is subsequently executed and ends with setAllPersons which causes a final rerender of the App component
  // "render 4 persons" is logged and the below return at the bottom of the App component renders 4 persons
  console.log('render', allPersons.length, 'persons')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const newFilterValue = event.target.value
    setNewFilter(newFilterValue)

    const newFilteredPersons = allPersons.filter(
      person => person.name.toLowerCase().includes(newFilterValue.toLowerCase()))
    
    setFilteredPersons(newFilteredPersons)
    setShowAll(false)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const duplicate = allPersons.some(person => person.name === newName)

    if(duplicate) {
      alert(`${newName} is already added to phonebook`)
    }

    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: allPersons.length + 1,
      }
  
      setAllPersons(allPersons.concat(personObject))
      setShowAll(true)
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = showAll
    ? allPersons
    : filteredPersons

  return (
    <div>
      <h2>Phonebook</h2>

      <Input text={"filter shown with:"} value={newFilter} onChange={handleFilterChange}/>

      <h3>add a new</h3>

      <PersonForm
        formProps={{
          type: "submit",
          text: "Submit",
          onSubmit: addPerson,
          newName: newName,
          newNumber: newNumber,
          handleNameChange: handleNameChange,
          handleNumberChange: handleNumberChange,
        }}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow}/>

    </div>
  )
}

export default App