// @ts-nocheck (TODO KE: remove after typescript refactor)
import { useState } from 'react'
import RestaurantCard from "../Restaurant-selection-card"
import "./RestaurantSelectionProcess.css"

const db = [
    {
      name: 'Richard Hendricks',
      url: '../images/panda.jpeg'
    },
    {
      name: 'Erlich Bachman',
      url: '../images/panda.jpeg'
    },
    {
      name: 'Monica Hall',
      url: '../images/panda.jpeg'
    },
    {
      name: 'Jared Dunn',
      url: '../images/panda.jpeg'
    },
    {
      name: 'Dinesh Chugtai',
      url: '../images/panda.jpeg'
    }
  ]

const RestaurantSelectionProcess = () => {
    const characters = db
    const [lastDirection, setLastDirection] = useState()
  
    const swiped = (direction, nameToDelete) => {
      console.log('removing: ' + nameToDelete)
      setLastDirection(direction)
    }
  
    const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
    }
  return (
        <div>
      <div className='cardContainer'>
        {characters.map((character) =>
          <RestaurantCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
            </div>
          </RestaurantCard>
        )}
      </div>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </div>
  )}

export default RestaurantSelectionProcess