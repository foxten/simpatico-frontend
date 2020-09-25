import React from 'react';
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import Markers from '../containers/Markers';
import { deleteGoal } from '../actions/goals'

// FETCH REQUEST - DELETE


const IndividualGoal = (props) =>{
    // debugger
    const { id } = props.match.params
    // const currentGoal = props.goals.find(element => element.goal.id !== id)
    const { markers } = props.current
    const status = (markers.filter(marker => marker.accomplished === true).length / markers.length) * 100

    // console.log(currentGoal.ugg_id)
    console.log(props)

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

    return (
        <div>This will be a card with
            Full Details for Single Goal
            <h2>Goal</h2>
            <h2>Type</h2>
            <h2>Deadline</h2>
            <h2>Status: </h2><ProgressBar completed={markers.length > 0 ? status : "Add markers to track progress"} bgcolor={"#6a1b9a"}/>
            <h2>Benchmarks:</h2>
             <Markers markers={markers.sort(function(a, b){return a.id - b.id})}/>
            <button name='remove goal' onClick={handleClick}>Remove Goal</button>
            <button name='edit goal' onClick={handleClick}>Edit Goal</button>
            </div>
    )
}

const mapStateToProps = (state) =>{
    return { current: state.currentGoal }
}

const mapDispatchToProps = {
    deleteGoal
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualGoal)