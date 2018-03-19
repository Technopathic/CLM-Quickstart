/*
 *
 * App
 *
 */

import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'containers/Home';
import NotFound from 'containers/NotFound';

import './style.css';
import './styleM.css';

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => <Home/>}/>

        <Route path='*' render={() => <NotFound/>}/>
      </Switch>
    );
  }
}
