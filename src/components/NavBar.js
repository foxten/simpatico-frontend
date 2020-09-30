import React, { useState, useEffect } from 'react';
import { loggingOut } from '../actions/login';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Nav, Navbar } from 'react-bootstrap'




const NavBar = (props) =>{
    console.log(props.info.location.pathname)
    
    const handleClick = (event) =>{
        if (event.target.name === 'login'){
            props.info.history.push('/login')
        } else if (event.target.name === 'signup'){
            props.info.history.push('/signup')
        } else {
            localStorage.clear()
            props.loggingOut()
            props.info.history.push('/')
        }
    }

    return (
        <Navbar fixed="top" className={props.info.location.pathname === '/' ? 'justify-content-end' : 'justify-content-between'} style={{ width: "100%" }}>
            {props.info.location.pathname === '/' ? null : <Navbar.Brand>Simpatico</Navbar.Brand>}
            {props.user !== null ?
            <Button variant="outline-secondary" name="logout" onClick={handleClick}>Logout</Button>
            :
            <ButtonGroup>
            <Button variant="outline-secondary"  name="login" onClick={handleClick}>Log In</Button>
            <Button variant="outline-secondary"  name="signup" onClick={handleClick}>Sign Up</Button>
            </ButtonGroup>
            }
        </Navbar>
    )
}

const mapStateToProps = (state) =>{
    return {user: state.login, goals: state.goals, friends: state.friends}
}

const mapDispatchToProps = {
    loggingOut
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)