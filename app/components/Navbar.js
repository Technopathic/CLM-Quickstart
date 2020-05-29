import "../App.css"
import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
    return(
      <div id="center">
        <ul id="navBar">
      <Link to='/'><button className="eightbit-btn-menu">Home</button></Link>
      <Link to='/game'><button className="eightbit-btn-menu">Play Game</button></Link>
      <Link to='/how_to_play'><button className="eightbit-btn-menu">How to Play</button></Link>
      <Link to='/high_scores'><button className="eightbit-btn-menu">High Scores</button></Link>
      </ul>
      </div>
      )
    }
  export default Navbar