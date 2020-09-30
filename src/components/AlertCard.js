import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Card, Button, Modal, Container } from 'react-bootstrap'
import { addFriend } from '../actions/friends'
import { deleteAlert } from '../actions/alerts'
import { filteringGoal } from '../actions/currentGoal'
import { deleteGoal } from '../actions/goals'
import { removeFriendRequest } from '../actions/login'


const AlertCard = (props) =>{
    console.log(props)
    const [show, setShow] = useState(false);
    const { id, message, alertable_type, alertable_information } = props.info
    const token = localStorage.getItem('userToken')

    const handleAccept = event =>{
        if(event.target.name === 'FriendRequest'){
            console.log(alertable_information)
            const reqObj = {
                method: 'POST',
                headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
                body: JSON.stringify({"friend_a_id": alertable_information.requestor_id, "friend_b_id": alertable_information.requestee_id})
            }
            fetch('http://localhost:3000/friendships', reqObj)
                .then(response => response.json())
                    .then(newFriendship => {
                        if (newFriendship.message){
                            console.log(newFriendship.message)
                            props.deleteAlert(id)
                            fetch(`http://localhost:3000/alerts/${id}`, {method: 'DELETE', headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})

                            // the above four lines of code and the corresponding controller action are unnecessary outside of testing
                        }else {
                            props.addFriend(newFriendship.friend_a)
                            props.history.push('/dashboard/friends')
                            props.deleteAlert(id)
                            fetch(`http://localhost:3000/alerts/${id}`, {method: 'DELETE', headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
                        }
                    })

        } else if (event.target.name === 'UserGroupGoal'){
            console.log(alertable_type, alertable_information)
            props.filteringGoal(props.goals.filter(goal => goal.ugg_id === alertable_information.id)[0])
            props.deleteAlert(id)
            props.history.push(`/dashboard/goals/edit/${alertable_information.goal_id}`)
            fetch(`http://localhost:3000/alerts/${id}`, {method: 'DELETE', headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
        }
    }

    const handleDecline = event => {
        if (event.target.name === 'FriendRequest'){
            //     friend request - delete friend_request on backend
            setShow(true)
            // debugger
            props.removeFriendRequest(alertable_information)
            fetch(`http://localhost:3000/friend_requests/${alertable_information.id}`, {method: 'DELETE', headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
            props.deleteAlert(id)
            fetch(`http://localhost:3000/alerts/${id}`, {method: 'DELETE', headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
        } else if (event.target.name === 'UserGroupGoal'){
            //     shared goal - delete ugg record on backend for current user, update goals in state
            setShow(true)
            props.deleteGoal(alertable_information.id)
            fetch(`http://localhost:3000/user_group_goals/${alertable_information.id}`, {method: 'DELETE', headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
            props.deleteAlert(id)
            fetch(`http://localhost:3000/alerts/${id}`, {method: 'DELETE', headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
        }
    }

    return (
        <Container>
        <Card className='alerts'>
            <Card.Body>
                <h2>{message}</h2>
                <Button variant='outline-dark' name={alertable_type} onClick={handleAccept}>{alertable_type === 'FriendRequest' ? 'Accept': 'Add Markers' }</Button>
                <Button variant='outline-dark' name={props.info.alertable_type} onClick={handleDecline}>Decline</Button>
            </Card.Body>
        </Card>
         <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-90w" aria-labelledby="contained-modal-title-vcenter" centered>
         <Modal.Header closeButton>
           <Modal.Title id="example-custom-modal-styling-title">
             Custom Modal Styling
           </Modal.Title>
         </Modal.Header>
         <Modal.Body>
             {alertable_type === 'FriendRequest' ? <p>Got it. Friend Request declined. </p> : <p>Got it. Shared Goal rejected.</p>}
         </Modal.Body>
       </Modal>
       </Container>
    )
}

const mapStateToProps = (state) =>{
    return {alerts : state.alerts, goals: state.goals}
}

const mapDispatchToProps = {
    addFriend,
    deleteAlert,
    filteringGoal,
    deleteGoal,
    removeFriendRequest 
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlertCard))