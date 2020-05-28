import React from 'react'
class Timer extends React.Component{
  //need to have a function passed down from GameContainer that handles setting the state for the timer and the score components.
  state = {
    time: 0,
  }
  tick = () => {
    this.setState({time: this.state.time + 1})
}
  componentDidMount(){
    setTimeout(()=>  this.interval = setInterval(this.tick, 1000), 3000 )
  }
  componentWillUnmount(){
    clearInterval(this.interval)
  }
  render(){
    return(
      <div className='timer'>
      <h1 className='timer-text'>Time
      <br/>
      {this.state.time}
      </h1>
      </div>
    )
  }
}
export default Timer