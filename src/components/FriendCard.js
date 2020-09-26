import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { connect } from 'react-redux';
import { Col, Card, Button } from 'react-bootstrap';

// when add friend is clicked
// a friend_request should be created on the backend
// as well as a message to the recipient (user with id stored in button)
// message to user should include a button to 'accept' the request
// if request is accepted, friendship should be created on backend
// if declined, no further action (for now)
// if friend request exists between two users, button should be set to disabled on both ends

const FriendCard = (props) =>{
    const existingRequests = props.friend_requests.map(fr => fr.requestee_id && fr.requestor_id)
    
    const token = localStorage.getItem('userToken')
    const handleClick = event =>{
        console.log(props)
        debugger
        // const reqObj = {
        //     method: 'POST',
        //     headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
        //     body: JSON.stringify({requestor_id: props.user.id, requestee_id: event.target.id})
        // }
        // fetch('http://localhost:3000/friend_requests', reqObj)
        // setDisabled(true)
    }

    return (
        <Col>
        <Card>
        <Card.Body>
        <Avatar name={props.info.first_name} size={150} round={true} />
        <h2>{props.info.first_name}{props.info.last_initial}</h2>
        {props.location.pathname === '/dashboard/new_friend' ?  
            <Button id={props.info.id} variant="outline-dark" sz='sm' onClick={handleClick} disabled={ existingRequests.includes(props.info.id) ? true : false }>
                { existingRequests.includes(props.info.id) ? 'Friend Request Pending!' : 'Add Friend'}</Button>
            : null}        
            </Card.Body>
        </Card>
        </Col>
    )
}


const mapStateToProps = (state) =>{
    return {friend_requests: state.login.friend_requests, user: state.login}
}

export default connect(mapStateToProps,null)(FriendCard)