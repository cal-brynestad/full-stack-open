import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Input from './components/Input'
import personService from './services/persons'

const App = () => {
  const [allPersons, setAllPersons] = useState([]) 
  const [filteredPersons, setFilteredPersons] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const Notification = ({ message, className }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={className}>
        {message}
      </div>
    )
  }

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setAllPersons(initialPersons)
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

  const addPerson = (event) => {
    event.preventDefault()

    const duplicate = allPersons.some(person => person.name === newName)

    if(duplicate) {
      const confirmChange = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if (confirmChange) {
        const person = allPersons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }

        personService
          .editEntry(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setAllPersons(allPersons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setShowAll(true)
            setNewName('')
            setNewNumber('')

            setSuccessMessage(
              `${returnedPerson.name}'s number was changed`
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${person.name} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)

            setAllPersons(allPersons.filter(p => p.name !== person.name))
            setNewName('')
            setNewNumber('')
          })
      }
    }

    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setAllPersons(allPersons.concat(returnedPerson))
          setShowAll(true)
          setNewName('')
          setNewNumber('')

          setSuccessMessage(
            `Added ${returnedPerson.name} to the phonebook`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data.error)
          setErrorMessage(
            `${error.response.data.error}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const deletePersonOf = (idToDelete, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`)

    if (confirmDelete) {
      console.log(`deleting person of id ${idToDelete}`)

      const newPersons = allPersons.filter(person => person.id !== idToDelete)

      personService
        .deleteEntry(idToDelete)
        .then(responseData => {
          console.log(responseData)
          setAllPersons(newPersons)
          setShowAll(true)
        })
    }
  }

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

  const personsToShow = showAll
    ? allPersons
    : filteredPersons

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={successMessage} className={"success"} />
      <Notification message={errorMessage} className={"error"} />

      <Input text={"filter shown with:"} value={newFilter} onChange={handleFilterChange}/>

      <h3>add a new</h3>

      <PersonForm
        formProps={{
          type: "submit",
          text: "add",
          onSubmit: addPerson,
          newName: newName,
          newNumber: newNumber,
          handleNameChange: handleNameChange,
          handleNumberChange: handleNumberChange,
        }}
      />

      <h3>Numbers</h3>

      {personsToShow.map(person =>
        <Person 
          key={person.id} 
          person={person} 
          deletePerson={() => deletePersonOf(person.id, person.name)}/>
      )} 

    </div>
  )
}

export default App