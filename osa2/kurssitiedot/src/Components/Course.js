import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>
      {course.name}
    </h1>
  )
}

const Total = ({ course }) => {
  console.log(course);
  let total = course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)

console.log(total);
  return(
    <p style={{fontWeight:'bold'}}>total of {total} exercises</p>
  ) 
}

const Part = ({ course }) => {
  return (
  <div>
    {course.parts.map(part =>
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>)}  
  </div>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      <Part course={course} />
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}/>
      <Content course={course} />
      <Total course={course}/>
    </div>
    
  )
  
}

export default Course