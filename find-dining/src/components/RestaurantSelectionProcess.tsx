// @ts-nocheck (TODO KE: remove after typescript refactor)
import React, { useState, useMemo, useRef, useEffect } from 'react'
import RestaurantCard from "../Restaurant-selection-card"
import "./RestaurantSelectionProcess.css"
import {useNavigate} from "react-router-dom"
import axios from "axios"
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
interface restaurantDB {
  name: string,
  url: string,
}
function RestaurantSelectionProcess ({setModalShow, token, mealPk}) {
  const [restDB, setRestDB] = useState<restaurantDB>([])
  const [currentIndex, setCurrentIndex] = useState(restDB.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const [count, setCount] = useState(1)
  const [restPk, setRestPk] = useState<number>()
  const [answer, setAnswer] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)
const navigate = useNavigate();
  const childRefs = useMemo(
    () =>
      Array(restDB.length)
        .fill(0)
        .map((i) => React.createRef()),
    [restDB.length]
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }
console.log(db)
  const canGoBack = currentIndex < restDB.length - 1

  const canSwipe = currentIndex >= 0
  
  useEffect(() => {
    let theDB = []
    const options = {
      method: 'GET',
      url: `https://find-dining-panda.herokuapp.com/api/meals/${mealPk}/restaurants/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      response.data.map((restaurant, index) => {
        return(
        theDB.push({name: restaurant.name, url: restaurant.photo_reference, pk: restaurant.id})
        )
        
      },
      setRestDB(theDB))
      console.log(theDB)
    }).catch(function (error) {
      console.error(error);
    });
  },[token, mealPk])


  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index, restaurantPK) => {
    console.log(restPk)
    const yesOptions = {
      method: 'POST',
      url: `https://find-dining-panda.herokuapp.com/api/restaurants/${restaurantPK}/yes/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    };
    const noOptions = {
      method: 'POST',
      url: `https://find-dining-panda.herokuapp.com/api/restaurants/${restaurantPK}/no/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    };
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
    if(direction === "right")
    return (
      console.log(restPk),
        axios.request(yesOptions).then(function (response) {
          console.log(response.data);
          setAnswer('Previous Answer: Yes!');
          setTimeout(() => {
            setAnswer('')
          }, 1500);
        }).catch(function (error) {
          console.error(error);
        })
    )
    return (
      console.log(restPk),
      axios.request(noOptions).then(function (response) {
        console.log(response.data);
        setAnswer('Previous Answer: No!');
        setTimeout(() => {
          setAnswer('')
        }, 1500);
      }).catch(function (error) {
        console.error(error);
      }) 
      
    )
  }
  let testCount = 1
  const outOfFrame = (name, idx) => {
    
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    testCount += 1
    setCount(testCount)

    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    

    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
    return testCount
    
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < restDB.length) {
      await childRefs[currentIndex].current.swipe(dir)
       // Swipe the card!
       setCount(count + 1)
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
    setCount(count - 1)
  }

const goEat = () => {
  if (count < 10) 
  return (
  alert("Sorry you must select at least 10 Restaurants before submitting!")
  
  )
  else return (
  navigate("/matched-pending")
  )
}
console.log(lastDirection)
console.log(count)
console.log(restPk)
useEffect(() => {
    const options = {
      method: 'GET',
      url: `../.netlify/functions/pictures`,
    };
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    }) 
}, []);


const google1 = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference="
const google2 = "AIzaSyC3_vtSfDK5doLZH-9ERb458Q5oeLNW72M"
  return (
    <div>

       
      <div className='cardDeck' >
          <h2 className="emptyState">Out of Restaurants, you hungry panda!</h2>
          <button className="homeButton" style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => navigate('/home')}>Go Home!</button>
        {restDB.map((restaurant, index) => (
          <RestaurantCard
            ref={childRefs[index]}
            className='swipe'
            key={restaurant.name}
            onSwipe={(dir) => {swiped(dir, restaurant.name, index, restaurant.pk); setRestPk(restaurant.pk);setModalShow(true)
          }}
            onCardLeftScreen={() => {outOfFrame(restaurant.name, index); setRestPk(restaurant.pk)}}
          >
          {currentIndex === -1 ? (<div></div>):(<h2 className='cardCount'>Restaurant Count: {count}/{restDB.length}</h2>)}
            <div
              style={{ backgroundImage: 'url(' + google1 + restaurant.url + google2 + ')' }}
              className='card'
            >
              <h3>{restaurant.name}</h3>

              <h2 className="answer">{answer}</h2>
            </div>
          </RestaurantCard>
          
        ))}
        
      </div>

      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Heck No!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Heck Yeah!</button>
      </div>
      <button className="undoButton" style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
      <button className="undoButton"  onClick={() => goEat()}>Let's Eat!</button>

    </div>
  )
}

export default RestaurantSelectionProcess
