import React from 'react';
import { loggingOut } from '../actions/login';
import { connect } from 'react-redux';



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
            <button name="logout" onClick={handleClick}>Logout</button>
            :
            <div>
            <button name="login" onClick={handleClick}>Log In</button>
            <button name="signup" onClick={handleClick}>Sign Up</button>
            </div>
            }
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {user: state.login}
}

const mapDispatchToProps = {
    loggingOut
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)