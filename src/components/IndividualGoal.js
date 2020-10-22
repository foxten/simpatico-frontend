import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, ProgressBar, Row, Card } from 'react-bootstrap'
// import ProgressBar from './ProgressBar';
import Markers from '../containers/Markers';
import { deleteGoal } from '../actions/goals'

// FETCH REQUEST - DELETE

const IndividualGoal = (props) =>{
    // debugger
    const { id } = props.match.params
    const { goal, markers } = props.current
    const status = Math.round((markers.filter(marker => marker.accomplished === true).length / markers.length) * 100)

    const handleClick = event =>{
        const token = localStorage.getItem('userToken')
        const url = props.current.goal.multi_user === true ? `http://localhost:3000/user_group_goals/${props.current.ugg_id}` : `http://localhost:3000/goals/${props.current.goal.id}`
        if(event.target.name === 'remove goal'){
            // fetch to delete on backend, include reducer action in that function
            fetch(url, {method: 'DELETE', headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'}})
                .then(response => response.json())
                    .then(
                        props.deleteGoal(props.current.ugg_id),
                        )
                        props.history.push('/dashboard/goals')
            // alert('Are you sure you want to delete this goal?')
            // modal
        } else {
            props.history.push(`/dashboard/goals/edit/${id}`)
        }
    }
    console.log(props)

    return (
        <Card>
            <h2>Goal: {goal.title}</h2>
            <Card.Body>
            <h4>Type: {goal.multi_user === false  ? 'Personal' : 'Shared'}</h4>
            <h4>Deadline: {new Date(`${goal.deadline} 00:00:00`).toDateString()}</h4>
            <Row className='justify-content-center'>
            <ProgressBar now={status} label={markers.length > 0 ? `${status}%`: "Add markers to track progress"}/>
            </Row>
            <hr></hr>
            <h4>Tasks</h4>
            <Markers markers={markers.sort(function(a, b){return a.id - b.id})}/>
            <hr></hr>

            <ButtonGroup>
            <Button variant="outline-dark" name='remove goal' onClick={handleClick}>Remove Goal</Button>
            <Button variant="outline-dark" name='edit goal' onClick={handleClick}>Edit Goal</Button>
            </ButtonGroup>
            </Card.Body>
        </Card>
    )
}

const mapStateToProps = (state) =>{
    return { current: state.currentGoal }
}

const mapDispatchToProps = {
    deleteGoal
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualGoal)