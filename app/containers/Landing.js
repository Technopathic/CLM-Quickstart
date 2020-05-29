import React from 'react'
import Logo from '../components/Logo'
import Menu from '../components/Menu'
import '../App.css'
const Home = () => {
  return (
    <div className="container">
        <Logo className="logo"/>
        <Menu/>
    </div>
  )
}
export default Home