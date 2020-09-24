import React from 'react';
import Avatar from 'react-avatar';
import { connect } from 'react-redux';
import { Card, Button } from 'react-bootstrap';

// when add friend is clicked
// a friend_request should be created on the backend
// as well as a message to the recipient (user with id stored in button)
// message to user should include a button to 'accept' the request
// if request is accepted, friendship should be created on backend
// if declined, no further action (for now)

const FriendCard = (props) =>{
    console.log(props)

    const handleClick = event =>{
        console.log(event.target.id)
    }

    return (
        <Card>
        <Card.Body>
        <Avatar name="Tenaysia Fox" round={true} />
        <h2>{props.info.first_name}{props.info.last_initial}</h2>
        {props.location.pathname === '/dashboard/new_friend' ?  
            <Button id={props.info.id} variant="outline-dark" sz='sm' onClick={handleClick}>Add Friend</Button>
            : null}        
            </Card.Body>
        </Card>
    )
}


const mapStateToProps = (state) =>{
    return {friends: state.friends, user: state.login}
}

export default connect(mapStateToProps,null)(FriendCard)