import React from 'react';
import { loggingOut } from '../actions/login';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap'




const NavBar = (props) =>{
    console.log(props.info)

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
        <div>
            {props.user !== null ?
            <Button variant="outline-secondary" name="logout" onClick={handleClick}>Logout</Button>
            :
            <div>
            <Button variant="outline-secondary"  name="login" onClick={handleClick}>Log In</Button>
            <Button variant="outline-secondary"  name="signup" onClick={handleClick}>Sign Up</Button>
            </div>
            }
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {user: state.login, goals: state.goals, friends: state.friends}
}

const mapDispatchToProps = {
    loggingOut
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)