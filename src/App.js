import React from 'react';
import {Route, Switch } from 'react-router-dom'
import './App.css';
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'


function App(props) {
  console.log(props)
  return (
    <div className="App">
      {props.location.pathname === '/' ? <header className="App-header">Simpatico</header> : null}
      <NavBar info={props}/>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/dashboard" component={Dashboard}/>
        </Switch>
      </div>
  );
}

export default App;
