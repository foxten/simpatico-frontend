import React from 'react';
import {Route, Switch } from 'react-router-dom'
import './App.css';
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import NavBar from './components/NavBar'
// friends
// goals
// friend requests
// individual goal
// form - create and edit goal, nested benchmarks



function App(props) {
  console.log(props)
  return (
    <div className="App">
      <header>Simpatico</header>
      <NavBar info={props}/>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/signup" component={Signup}/>
        </Switch>
      </div>
  );
}

export default App;
