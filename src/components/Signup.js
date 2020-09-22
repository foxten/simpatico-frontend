import React from 'react';
import { signingUp } from '../actions/login';
import { connect } from 'react-redux';

class Signup extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            first_name: '',
            last_initial: '',
            password: '',
            email_address:''
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
    }

    render(){
        console.log(this.state)
        return (
            <div>
                <h1>Simpatico</h1>
                {this.state.error ? <h1>{this.state.error}</h1>: null}
                <form onSubmit={this.handleSubmit}>
                    {/* <Form.Group controlId="formUsername"> */}
                    {/* <Form.Control name="username" type="text" placeholder="Enter username" onChange={this.handleInput} value={this.state.username}/>
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                    <Form.Control name="password" type="password" placeholder="Enter password" onChange={this.handleInput} value={this.state.password}/>
                    </Form.Group> */}
                    <input name='username' placeholder='username' onChange={this.handleInput} value={this.state.username}></input>
                    <input name='first_name' placeholder='first name' onChange={this.handleInput} value={this.state.first_name}></input>
                    <input name='last_initial' placeholder='last name initial' onChange={this.handleInput} value={this.state.last_initial}></input>
                    <input name='email_address' placeholder='email address' onChange={this.handleInput} value={this.state.email_address}></input>
                    <input type='password' name='password' placeholder='password' onChange={this.handleInput} value={this.state.password}></input>
                    <button type='submit'>Submit</button>
                    {/* <Button variant="outline-dark" type="submit" size="lg">Log In</Button> */}
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    signingUp
}

export default connect(null, mapDispatchToProps)(Signup)