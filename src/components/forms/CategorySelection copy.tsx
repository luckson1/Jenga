import React from 'react'

const CategorySelection = () => {
  return (
<div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Pick a Category</span>
 
  </label>
  <select className="select select-bordered select-primary">
    <option disabled selected>Pick one</option>
    <option>Star Wars</option>
    <option>Harry Potter</option>
    <option>Lord of the Rings</option>
    <option>Planet of the Apes</option>
    <option>Star Trek</option>
  </select>

</div>
  )
}

export default CategorySelection