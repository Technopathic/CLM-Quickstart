/*
 *
 * App
 *
 */

import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import NotFound from 'containers/NotFound';
import GameContainer from 'containers/GameContainer'
import Landing from 'containers/Landing'
import HowToPlay from '../../components/HowToPlay'
import ScoresContainer from 'containers/ScoresContainer'
import Navbar from "../../components/Navbar"

import './style.css';
import './styleM.css';

export default class App extends React.Component {
  render() {
    return (
  
      <div>
      <Route exact path='/game' render={props=> <div><Navbar/><GameContainer/></div>}/>
      <Route exact path='/' component={Landing}/>
      <Route exact path='/how_to_play' render={props=> <div><Navbar/><HowToPlay/></div>}/>
      <Route exact path='/high_scores' render={props=> <div><Navbar/><ScoresContainer/></div>}/>
      </div>
    )}
}

{/* <Route exact path='/game' component={GameContainer}/>
      <Route exact path='/' component={Home}/>
      <Route exact path='/how_to_play' component={HowToPlay}/>
      <Route exact path='/high_scores' component={ScoresContainer}/>
      <Route exact path="/players" component={PlayersContainer} /> */}
