import "./MealFriendSelection.css"
import Select from 'react-select'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"


const MealFriendSelection = () => {
  const navigate = useNavigate()
  const [results, setResults] = useState<any>([])
  const [friends, setFriends] = useState<any>([])
  const [friendName, setFriendName] = useState("")
  const [addFriendError, setAddFriendError] = useState("")
  const [addFriendSuccess, setAddFriendSuccess] = useState("")
  const [searchError, setSearchError] = useState("")
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      setResults("")
        e.preventDefault();
        const options = {
            method: 'GET',
            url: 'https://find-dining-panda.herokuapp.com/api/search?=Desi',
            params: {q: friendName},
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Token a597b9035bc16eb84b9db749d4a1857fee663242'
            }
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
            setResults(response.data[0].id)
            setSearchError("")
          }).catch((e) =>  {
            setSearchError(e.message)
          })
}

const addFriend = () =>{
const options = {
  method: 'POST',
  url: `https://find-dining-panda.herokuapp.com/api/follow/${results}/`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Token a597b9035bc16eb84b9db749d4a1857fee663242'
  }
};

axios.request(options).then(function (response) {
  console.log(response.data);
  setAddFriendSuccess("Friend Added")
  setAddFriendError("")
}).catch((e) =>  {
  setAddFriendError(e.message)
})
}
const selectFriendOptions = [
        { value: "KE", label: "KE" },
        { value: "Ryan", label: "Ryan" },
        { value: "Tyler", label: "Tyler" },
        { value: "Paul", label: "Paul" },
      ];
console.log(friends)
  return (
      <div className="mealFriendSelect">
          <h2>Welcome User</h2>
    <div>Put that microwave dinner down, find some friends to eat with here:</div>
    <div className="searchFriends">
        <form onSubmit={handleSearch}>
    <input type="input" placeholder="Search Friends"onChange={(e) => setFriendName(e.target.value)}></input>
    <button className="searchButton">Search</button>
    </form>
    <div className="searchResults" onClick={addFriend}>{results}<button>+</button></div>
    <div className="error">{addFriendError}</div>
    <div className="success">{addFriendSuccess}</div>
    </div>
    <div className="selectFriend">
    <Select isMulti className="select" options={selectFriendOptions} onChange={(selection) => setFriends([selection])}/>
    <button onClick={() =>addFriend()}>Add Friends to Meal</button>
        <div className="error">{searchError}</div>
    </div>
    <div className="activeMeals">
    <img
        className="profilePic"
        src={require("../images/panda.jpeg")}
        alt="This a placeholder"
      ></img>
      
      
      <p>Tyler</p>
      <button className="matchButton" >See Match</button>
      <button className="matchButton">X</button>
      </div>
      </div>
  )
}

export default MealFriendSelection