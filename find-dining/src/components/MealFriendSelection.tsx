import "./MealFriendSelection.css"
import Select from 'react-select'
import axios from "axios";


const MealFriendSelection = () => {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const options = {
            method: 'GET',
            url: 'https://find-dining-panda.herokuapp.com/api/search?=Desi',
            params: {q: 'Desi'},
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Token a597b9035bc16eb84b9db749d4a1857fee663242'
            }
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
          }).catch(function (error) {
            console.error(error);
          });
}


const selectFriendOptions = [
        { value: "KE", label: "KE" },
        { value: "Ryan", label: "Ryan" },
        { value: "Tyler", label: "Tyler" },
        { value: "Paul", label: "Paul" },
      ];
  return (
      <div className="mealFriendSelect">
          <h2>Welcome User</h2>
    <div>Put that microwave dinner down, find some friends to eat with here:</div>
    <div className="searchFriends">
        <form onSubmit={handleSearch}>
    <input type="input" placeholder="Search Friends"></input>
    <button className="searchButton">Search</button>
    </form>
    </div>
    <div className="selectFriend">
    <Select className="select" options={selectFriendOptions} />
    <button>Add Friends to Meal</button>
    </div>
    <div className="activeMeals">
    <img
        className="profilePic"
        src={require("../images/panda.jpeg")}
        alt="This a placeholder"
      ></img>
      
      
      <p>Tyler</p>
      <button className="matchButton">See Match</button>
      <button className="matchButton">X</button>
      </div>
      </div>
  )
}

export default MealFriendSelection