// @ts-nocheck (TODO KE: remove after typescript refactor)
import { useState } from 'react'
import RestaurantCard from "../Restaurant-selection-card"
import "./RestaurantSelectionProcess.css"

const db = [
    {
        name: 'Paul',
        url: './img/Paul.jpg'
      },
      {
        name: 'Ryan',
        url: './img/Ryan.jpg'
      },

      {
        name: 'Tyler',
        url: './img/Tyler.png'
      },
      {
        name: 'KE',
        url: './img/KE.jpg'
      },

  ]
  let yes = []
  let no = []
const RestaurantSelectionProcess = () => {
  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
      console.log('removing: ' + nameToDelete)
      direction === "right" ? (yes.push(nameToDelete)) : (no.push(nameToDelete))
      setLastDirection(direction)
      
    }

    const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
    }
    console.log(yes)
    console.log(no)
  return (
        <div className='cardDeck'>
      <div className='cardContainer'>
        {characters.map((character, index) =>
          <RestaurantCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} 
          onCardLeftScreen={() => outOfFrame(character.name)} flickOnSwipe={true} preventSwipe={["up", "down"]}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
              {/* <h3>{index}</h3> */}
            </div>
            
          </RestaurantCard>
        )}
        
      </div>
      {lastDirection ? <h2 className='infoText'> {lastDirection==="right" ? ("You said Yes!"): lastDirection === "left" ? ("You said No!"):("You can only swipe left or Right, please swipe again!")}</h2> : <h2 className='infoText' />}
    </div>
  )}

export default RestaurantSelectionProcess