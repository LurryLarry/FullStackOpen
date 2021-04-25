import React from 'react'
import Alert from 'react-bootstrap/Button'
const Notification = ({ message, success }) => {


  // const successStyle = {
  //   color: 'green',
  //   background: 'lightgrey',
  //   fontSize: '20px',
  //   borderStyle: 'solid',
  //   borderRadius: '5px',
  //   padding: '10px',
  //   marginBottom: '10px'
  // }

  // const errorStyle = {
  //   color: 'red',
  //   background: 'lightgrey',
  //   fontSize: '20px',
  //   borderStyle: 'solid',
  //   borderRadius: '5px',
  //   padding: '10px',
  //   marginBottom: '10px'
  // }
  
  
  if (message === null) {
    return null
  }

  if (success === true) {
    return (
      <Alert variant="success">
        {message}
      </Alert>
    )
  } else {
    return (
      <Alert variant="danger">
        {message}
      </Alert>
    )
  }
  }


export default Notification