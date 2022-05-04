// @ts-nocheck (TODO KE: remove after typescript refactor)

import {useEffect, useState} from 'react'
import axios from "axios"
import "./MatchedPending.css"
import { useNavigate } from 'react-router-dom'
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

interface token{
  token: string
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

const MatchedPendingMeals = ({token}:token) => {
  const [db, setDB] = useState<any>([])
  const navigate = useNavigate()
  const seeMatch = () =>{
    navigate("/matched-restaurant")
  }
  useEffect(() => {
    let theDB:any = []
    const options = {
      method: 'GET',
      url: 'https://find-dining-panda.herokuapp.com/api/users/meals/',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
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
  }, [token])
  const mealStart = () => {
    navigate("/meal-start")
  }
  return (
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