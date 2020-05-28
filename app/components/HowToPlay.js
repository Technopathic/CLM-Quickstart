import "../App.css"
import React from 'react'
import {Link} from 'react-router-dom'
const HowToPlay = () => {
    return(
      <div>
      <h1>You are on the How to Play page</h1>
      <Link to='/'><button className="eightbit-btn">Home</button></Link>
      </div>
      )
    }
  export default HowToPlay