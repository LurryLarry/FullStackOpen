import React from 'react'

const Filter = ({ handleFilterChange, newFilter }) => {
  return (
    <div>
      find countries<input
        value={newFilter}
        onChange={handleFilterChange}
      />
    </div>
    )
}

export default Filter