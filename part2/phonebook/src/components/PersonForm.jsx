import Input from './Input'

const PersonForm = ({ formProps }) =>
  <form onSubmit={formProps.onSubmit}>
    <Input text={"name:"} value={formProps.newName} onChange={formProps.handleNameChange}/>
    <Input text={"number:"} value={formProps.newNumber} onChange={formProps.handleNumberChange}/>
    <div>
    <button type={formProps.type}>{formProps.text}</button>
    </div>
  </form>

export default PersonForm