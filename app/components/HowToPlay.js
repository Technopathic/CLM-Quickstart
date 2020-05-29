import "../App.css"
import React from 'react'
import {Link} from 'react-router-dom'
import '../App.css'
const HowToPlay = () => {
    return(
      <div className="instructions">
        <h1>How To Play</h1>
        <ol className='instructions-list'>
          <li>The object of the game is to dodge the falling bricks by rotating the platform.</li>
          <li>The camera in the upper right will allow you to see the rotation and get a feel for the controls.</li>
          <li>The platform is rotated tilting your head side to side.</li>
          <li>You can move the platform up by opening your mouth. (Closing your mouth will return the platform to neutral position.)</li>
          <li>Scoring is all about staying alive. The longer you live the higher you score. </li>
          <li>The game ends when you are crushed by a brick or fall off of the platform to certain death. </li>
        </ol>
          <div>
          <Link to='/'><button className="eightbit-btn">Home</button></Link>
          </div>
      </div>
      )
    }
  export default HowToPlay