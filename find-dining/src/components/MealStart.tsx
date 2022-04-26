import React from 'react'
import "./MealStart.css"

const MealStart:React.FC = () => {
  return (
      <div className='mealStartPage'>
    <h2 className='mealWith'>Your Dinner with ______</h2>
    <div className='search'>
<h3>Search Location</h3>
<input type="input" className="searchInput" placeholder='Enter your City'></input>
    </div>
    <div className='radius'>
<h3>Set Radius </h3>
<input type="input" className="radiusInput" placeholder='Radius in miles'></input>
    </div>
    <div className="mealButtons">
    <button className='chowDown'>Chow Down!</button>
    <button className='noThanks'>No Thanks</button>
    </div>
    </div>
  )
}

export default MealStart