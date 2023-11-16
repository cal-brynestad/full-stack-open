const Person = ({person: { name, number }}) =>
  <div>
    {name} {number}
  </div>

const Persons = ({persons}) => 
  <div>
    {persons.map(person =>
      <Person key={person.id} person={person}/>
    )} 
  </div>

export default Persons