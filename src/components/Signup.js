import React from 'react';
import { signingUp } from '../actions/login';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';

class Signup extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            first_name: '',
            last_initial: '',
            password: '',
            confirmed_password: '',
            email_address:'', 
            error: ''
        }
    }

    handleInput = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event =>{
        event.preventDefault()
        if(this.state.password === this.state.confirmedPassword){
        console.log(this.state)
        const reqObj = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"user":this.state})
        }
        fetch('http://localhost:3000/users', reqObj)
            .then(response => response.json())
                .then(userInfo => {
                    if (userInfo.error){
                        this.setState({
                            error: userInfo.error
                        })
                    } else{
                        console.log(userInfo)
                        localStorage.setItem('userToken', userInfo.jwt)
                        this.props.signingUp(userInfo)
                        this.props.history.push('/dashboard')
                    }
                })
    } else {
        this.setState({
            error: 'Please make sure passwords match.'
        })
    }
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

                    <Form.Group controlId="formFirstName">
                    <Form.Control name="first_name" type="text" placeholder="Enter first name" onChange={this.handleInput} value={this.state.first_name}/>
                    </Form.Group>

                    <Form.Group controlId="formLastInitial">
                    <Form.Control name="last_initial" type="text" placeholder="Enter last name initial" onChange={this.handleInput} value={this.state.last_initial}/>
                    </Form.Group>

                    <Form.Group controlId="formEmailAddress">
                    <Form.Control name="email_address" type="text" placeholder="Enter email address" onChange={this.handleInput} value={this.state.email_address}/>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                    <Form.Control name="password" type="password" placeholder="Enter password" onChange={this.handleInput} value={this.state.password}/>
                    </Form.Group>

                    <Form.Group controlId="formConfirmPassword">
                    <Form.Control type='password' name='confirmedPassword' placeholder='Confirm password' onChange={this.handleInput} value={this.state.confirmedPassword}/>
                    </Form.Group>

                    <Button variant="outline-dark" type="submit" size="lg">Sign Up</Button>
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    signingUp
}

export default connect(null, mapDispatchToProps)(Signup)