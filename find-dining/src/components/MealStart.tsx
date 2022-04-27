import React from 'react'
import "./MealStart.css"
import axios from "axios"
import { useEffect, useState } from 'react'

const MealStart = () => {
const [location, setLocation] = useState("")
const [radius, setRadius] = useState("")
const [error, setError] = useState("")
 
  function handleCreateMeal(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("")
    const options = {
      method: 'POST',
      url: 'https://find-dining-panda.herokuapp.com/api/meals/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token a597b9035bc16eb84b9db749d4a1857fee663242'
      },
      data: {
        creator: 1,
        location: location,
        radius: radius
      }
    }

    axios.request(options).then(function (response) {
      console.log(response.data)
    }).catch(function (error) {
      console.log(error)
    })
  }
  return (
      <div className='mealStartPage'>
        <form onSubmit={handleCreateMeal}>
    <h2 className='mealWith'>Your Dinner with ______</h2>
    <div className='search'>
<h3>Search Location</h3>
<input type="input" onChange={(e) => setLocation(e.target.value)} className="searchInput" placeholder='Enter your City'></input>
    </div>
    <div className='radius'>
<h3>Set Radius </h3>
<input type="input" onChange={(e) => setRadius(e.target.value)} className="radiusInput" placeholder='Radius in miles'></input>
    </div>
    <div className="mealButtons">
    <button className='chowDown'>Chow Down!</button>
    <button className='noThanks'>No Thanks</button>
    </div>
    </form>
    </div>
  )
}

export default MealStart