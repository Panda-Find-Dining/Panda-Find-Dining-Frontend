import {useEffect, useState} from 'react'
import axios from "axios"
import "./MatchedPending.css"
const MatchedPendingMeals = () => {
  const [db, setDB] = useState<any>([])
  useEffect(() => {
    let theDB:any = []
    const options = {
      method: 'GET',
      url: 'https://find-dining-panda.herokuapp.com/api/users/meals/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token a597b9035bc16eb84b9db749d4a1857fee663242'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      response.data.map((restaurant:any, index:any) => {
        return(
        theDB.push({id: restaurant.id, location: restaurant.location, invitees: restaurant.invitee, num_of_diners: restaurant.num_of_diners})
        )
        
      },
      setDB(theDB))
      console.log(theDB)
    }).catch(function (error) {
      console.error(error);
    });
  }, [])
  
  return (
    <div>
      <h1 className='mealTitle'>Your Current Meals</h1>
    <h2 className='pendingMealsH2'>Pending Meals</h2>
    <div>{db.map((restaurant:any, index:any) => (<div key={restaurant.id} className="pendingMeals">

      <p className='restaurantLocation'>{restaurant.location}</p>
      <button className="pendingButton">Select Restaurants</button>
      <button className="xButton">X</button>
      </div>
      ))}
      </div>
      <h2 className='pendingMealsH2'>Matched Meals</h2>
      <div className="pendingMeals">

      
      <p className='restaurantLocation'>Tyler</p>
      <button className="pendingButton">See Match</button>
      <button className="xButton">X</button>
      </div>
      </div>
  )
}

export default MatchedPendingMeals