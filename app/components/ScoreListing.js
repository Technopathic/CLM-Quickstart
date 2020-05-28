import React from 'react'

const ScoreListing = (props) => {
    // console.log("ScoreListing Props =>", props)
    return (
      <div className='card'>
        <h3>{props.name}</h3>
        <h6>{props.value}</h6>
      </div>
    )
  }
  export default ScoreListing