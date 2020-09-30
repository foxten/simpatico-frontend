import React from 'react';
import { loggedIn } from '../actions/login';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap'

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            error: null
        }
    }

    handleInput = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event =>{
        event.preventDefault()
        console.log(this.state)
        const reqObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state)
        }
        fetch('http://localhost:3000/login', reqObj)
            .then(response => response.json())
                .then(userInfo => {
                    if (userInfo.message){
                        this.setState({
                            error: userInfo.message
                        })
                    } else{
                        console.log(userInfo)
                        localStorage.setItem('userToken', userInfo.jwt)
                        this.props.loggedIn(userInfo)
                        this.props.history.push('/dashboard')
                    }
                })
    }

    render(){
        console.log(this.state)
        return (
            <div>
                {this.state.error ? <h1>{this.state.error}</h1>: null}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formUsername">
                    <Form.Control name="username" type="text" placeholder="Enter username" onChange={this.handleInput} value={this.state.username}/>
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                    <Form.Control name="password" type="password" placeholder="Enter password" onChange={this.handleInput} value={this.state.password}/>
                    </Form.Group>
                    <Button variant="outline-dark" type="submit" size="lg">Log In</Button>
                </Form>
            </div>
        )
    }
}


const mapDispatchToProps = {
    loggedIn
}

export default connect(null, mapDispatchToProps)(Login)