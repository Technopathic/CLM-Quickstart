import React from 'react'
import { Link } from 'react-router-dom'
import ScoreListing from '../components/ScoreListing.js'
class ScoresContainer extends React.Component {
  state = {
    scores: [],
    users: []
  }
  componentDidMount(){
    Promise.all([
      fetch(`http://localhost:3001/api/v1/scores`)
        .then(response => response.json()),
      fetch(`http://localhost:3001/api/v1/users`)
        .then(response => response.json())
    ])
    .then(([scores, users]) => this.setState({ scores, users }))
  }
  getUsername = (userId) => {
    let found = this.state.users.find(user => user.id === userId)
    return found.user_name
  }
  render() {
    return(
      <div>
      <h1>You are on the high scores page</h1>
      {this.state.scores.map(score => 
        <ScoreListing 
        key={score.id} 
        {...score}
        userName={this.getUsername(score.user_id)}
        />)}
        <Link to='/'><button className="eightbit-btn">Home</button></Link>
      </div>
    )
  }
}
export default ScoresContainer