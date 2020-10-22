import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { connect } from 'react-redux';
import { Col, Card, Button } from 'react-bootstrap';
import { newFriendRequest } from '../actions/friendRequests'
// when add friend is clicked
// a friend_request should be created on the backend
// as well as a message to the recipient (user with id stored in button)
// message to user should include a button to 'accept' the request
// if request is accepted, friendship should be created on backend
// if declined, no further action (for now)
// if friend request exists between two users, button should be set to disabled on both ends

const FriendCard = (props) =>{

    console.log(props.friendRequests)
    const existingRequests = props.friendRequests.map(fr => fr.requestee_id).concat(props.friendRequests.map(fr => fr.requestor_id))
    
    const token = localStorage.getItem('userToken')
    const handleClick = event =>{
        const reqObj = {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
            body: JSON.stringify({requestor_id: props.user.id, requestee_id: event.target.id})
        }
        fetch('http://localhost:3000/friend_requests', reqObj)
            .then(response => response.json())
                .then(friendRequest => {
                    if (friendRequest.message){
                        console.log(friendRequest.message)
                    }else{
                        props.newFriendRequest(friendRequest)
                    }
                })
    }

    return (
        <Col>
        <Card>
        <Card.Body>
        <Avatar name={props.info.first_name} size={150} round={true} />
        <Card.Title>{props.info.first_name} {props.info.last_initial}</Card.Title>
        <Button variant='outline-dark'>View Profile</Button>
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
    return {friendRequests: state.friendRequests, user: state.login}
}

const mapDispatchToProps = {
    newFriendRequest
}

export default connect(mapStateToProps,mapDispatchToProps)(FriendCard)