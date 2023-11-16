import { useState } from 'react'
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