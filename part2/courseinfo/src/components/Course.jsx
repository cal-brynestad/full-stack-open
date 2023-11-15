const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
  const sum = parts.reduce((accumulator, part) => accumulator + part.exercises, 0)

  return (
    <p>
      <strong>total of {sum} exercises</strong>
    </p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>
  

const Content = ({ parts }) => 
  <div>
    {parts.map(part =>
      <Part key={part.id} part={part}/>
    )}     
  </div>

  const Course = ({ course }) =>
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} /> 
  </>

export default Course