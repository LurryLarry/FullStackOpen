import React from 'react'

const Notification = ({ message, success }) => {

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (message === null) {
    return null
  }

  if (success === true) {
    return (
      <div style={successStyle}>
        {message}
      </div>
    )
  } else {
    return (
      <div style={errorStyle}>
        {message}
      </div>
    )}
}

export default Notification