import React from "react"
import Scene from "../../components/Scene.js"
import Home from 'containers/Home';
import Timer from '../../components/Timer.js'
import CurrentScore from '../../components/CurrentScore.js'
import '../../App.css'
export default class GameContainer extends React.Component {
  state = {
    angle: 0,
    mouth: 0,
    faceIsPresent: false,
    gameRunning: false,
    isCrushed: false,
    score: 0,
    finalScore: 0,
  }
  setFace = (value) => {
    this.setState({ faceIsPresent: value })
  }
  setAngle = (value) => {

    this.setState({ angle: value })
  }
  setMouth = (value) => {
    this.setState({ mouth: value })
  }

  startGame = () => {
    if (this.state.gameRunning === false) {
      this.setState({ gameRunning: !this.state.gameRunning })
    } else if (this.state.gameRunning === true) {
      this.setState({ gameRunning: !this.state.gameRunning })
    }
  }
  crushed = () => {
    this.setState({ isCrushed: true })
    this.setState({isCrushed:false})
    this.setState({ gameRunning: false })
  }
  finalScore = (score) => {
    this.setState({ finalScore: score })
    this.displayFinalScore(this.state.finalScore)
  }
  displayFinalScore = (score) => {
  }
  render() {
    console.log(this.state.faceIsPresent)
    return (
      <div className="grid-container">

        <div className='game-canvas'>
          {this.state.isCrushed ?  "": <Scene
            mouth={this.state.mouth}
            face={this.state.faceIsPresent}
            angle={this.state.angle}
            stopGame={this.crushed}
            gameRunning={this.state.gameRunning}
          ></Scene>}
          
        </div>
        <div className="video-display">
          <Home gameRunning={this.state.gameRunning}setMouth={this.setMouth} isRunning= {this.state.gameRunning}setRotation={this.setAngle} setFace={this.setFace} />
        </div>
        <div className="timer-display">
          {this.state.gameRunning === true && this.state.isCrushed === false ?
            <Timer face= {this.state.faceIsPresent}/>
            :
            <button className="timer" onClick={this.stopGame}><h1>Time</h1></button>
          }
        </div>
        <div className='score-display'>
          {this.state.gameRunning && this.state.isCrushed === false ?
            <CurrentScore finalScore={this.finalScore} />
            :
            <button className="score" onClick={this.stopGame}><h1>Score</h1></button>
          }
        </div>
        <div className='start-display'>
          {this.state.gameRunning ?
            <button className="start" onClick={this.startGame}><h1>Stop Game</h1></button>
            :
            <button className="start" onClick={this.startGame}><h1>Start Game</h1></button>
          }
        </div>
      </div>


    )
  }
}