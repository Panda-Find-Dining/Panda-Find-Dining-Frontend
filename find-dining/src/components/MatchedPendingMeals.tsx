// @ts-nocheck (TODO KE: remove after typescript refactor)

import {useEffect, useState} from 'react'
import axios from "axios"
import "./MatchedPending.css"
import { useNavigate } from 'react-router-dom'
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

interface token{
  token: string,
  mealPk: number,
  setMealPk: React.Dispatch<React.SetStateAction<number | undefined>>
}
const StyledButton = styled(Button)`
  background-color: #196052;
  box-shadow: none;
  border: none;
  min-width: 10px;
  &:hover {
    background-color: #196052;
    outline: none;
  }
  &:focus {
    box-shadow: none;
    border: none;
  }
`;
const Span = styled.span`
  color: #196052;
  font: Lato;
  font-weight: bold;
`;

const Container = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
`;

const MatchedPendingMeals = ({token, mealPk, setMealPk}:token) => {
  const [db, setDB] = useState<any>([])
  const [pendingDb, setPendingDB] = useState<any>([])
  const navigate = useNavigate()
  const seeMatch = () =>{
    navigate("/matched-restaurant")
  }
  useEffect(() => {
    let theDB:any = []
    const options = {
      method: 'GET',
      url: 'https://find-dining-panda.herokuapp.com/api/match/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      response.data.map((restaurant:any, index:any) => {
        return(
        theDB.push({id: restaurant.id, location: restaurant.location, invitees: restaurant.invitee, num_of_diners: restaurant.num_of_diners, archive: restaurant.archive})
        )
        
      },
      setDB(theDB))
      console.log(theDB)
    }).catch(function (error) {
      console.error(error);
    });
  }, [token])
  useEffect(() => {
    let thePendingDB:any = []
    const options = {
      method: 'GET',
      url: 'https://find-dining-panda.herokuapp.com/api/pending/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      response.data.map((restaurant:any, index:any) => {
        return(
        thePendingDB.push({id: restaurant.id, location: restaurant.location, invitees: restaurant.invitee, num_of_diners: restaurant.num_of_diners, archive: restaurant.archive})
        )
        
      },
      setPendingDB(thePendingDB))
      console.log(thePendingDB)
    }).catch(function (error) {
      console.error(error);
    });
  }, [token])
  const mealStart = () => {
    navigate("/meal-start")
  }
console.log('please work')
  const decline = (restaurantPk:number) => {
    const options = {
      method: 'DELETE',
      url: `https://find-dining-panda.herokuapp.com/api/decline/${restaurantPk}/`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

  }
  const selectRestaurants = (restaurant: any) => {
    setMealPk(restaurant)
    navigate("/restaurant-selection")
  }
  return (

    <div className="matchedPendingDiv">
      <h1 className='mealTitle'>Your Current Meals</h1>
    <h2 className='pendingMealsH2'>Pending Meals</h2>
    <div className='pendingMealsBig'>{pendingDb.map((restaurant:any, index:any) => (restaurant.archive === false ? (<div key={restaurant.id} className="pendingMeals">
      <p className='restaurantLocation'>{restaurant.location}</p>
      <p>{restaurant.archive}</p>
      <button className="pendingButton" onClick={() => selectRestaurants(restaurant.id)}>Select Restaurants</button>
      <button className="xButton" onClick={() => decline(restaurant.id)}>X</button>
      
      </div>):(<></>)
      ))}
      </div>
      <h2 className='pendingMealsH2'>Matched Meals</h2>
      <div className="pendingMealsMed">
      <div className='matchedMeals'>{db.map((restaurant:any, index:any) => (restaurant.archive === false ? (<div key={restaurant.id} className="pendingMeals">

    <Container>
    <Span>
      <h2 className='mealTitle'>Your Current Meals</h2>
      <Form>
    <Form.Label className='pendingMealsH2'>Pending Meals</Form.Label>
    <div>{db.map((restaurant:any, index:any) => (<Form.Control type="input"><Form.Control type="input" key={restaurant.id} className="pendingMeals">

      <Form.Control type="input" className='restaurantLocation'>{restaurant.location}</Form.Control>
      <StyledButton className="pendingButton">Select Restaurants</StyledButton>
      <StyledButton className="xButton">X</StyledButton>
      </Form.Control>
      </Form.Control>
      ))}
      </div>
      <Form.Label className='pendingMealsH2'>Matched Meals</Form.Label>
      <div className="pendingMeals">


<p className='restaurantLocation'>{restaurant.location}</p>
<button className="pendingButton" onClick={()=> seeMatch()}>See Match</button>
      <button className="xButton" onClick={() => decline(restaurant.id)}>X</button>
</div>): (<></>)
))}
</div>
      

      </div>
      <button className="pendingButton" onClick={()=> mealStart()}>Create Meal</button>

      <p className='restaurantLocation'>Tyler</p>
      <StyledButton className="pendingButton" onClick={()=> seeMatch()}>See Match</StyledButton>
      <StyledButton className="xButton">X</StyledButton>

      </div>
      <StyledButton className="pendingButton" onClick={()=> mealStart()}>Create Meal</StyledButton>
      </Form>
      </Span>
      </Container>
  )
}

export default MatchedPendingMeals