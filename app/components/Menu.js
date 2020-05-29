import React from 'react'
import { Link } from 'react-router-dom'
class Menu extends React.Component {
  render () {
    return (
      <div>
        <Link to="/game">
          <button className="eightbit-btn">Play</button>
        </Link>
      <br/>
        <Link to="/how_to_play">
          <button className='eightbit-btn'>How To Play</button>
        </Link>
      <br/>
        <Link to="/high_scores">
          <button className='eightbit-btn'>High Scores</button>
        </Link>
      <br/>
        {/* <Link to="/players">
          <button className='eightbit-btn'>Players</button>
        </Link> */}
      </div>
    )
  }
}
export default Menu