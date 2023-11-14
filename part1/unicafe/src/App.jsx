import { useState } from 'react'

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  console.log(props)
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={props.good} />
          <StatisticsLine text="neutral" value={props.neutral} />
          <StatisticsLine text="bad" value={props.bad} />
          <StatisticsLine text="all" value={props.all} />      
          <StatisticsLine text="average" value={(props.good - props.bad)/props.all} />
          <StatisticsLine text="positive %" value={(props.good/props.all)*100} />
        </tbody>
      </table>
    </div>
  )
}

const History = (props) => {
  console.log(props)
  if (props.all == 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <Statistics good={props.good} bad={props.bad} neutral={props.neutral} all={props.all} />
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
    {text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={handleGoodClick} text='good' />

      <Button handleClick={handleNeutralClick} text='neutral' />

      <Button handleClick={handleBadClick} text='bad' />

      <History good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App