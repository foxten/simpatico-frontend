import React from 'react';
import ProgressBar from './ProgressBar';
import { Switch, Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { filteringGoal } from '../actions/currentGoal'

const GoalCard = (props) =>{
    const { goalInfo } = props
    const {goal, comp, markers} = goalInfo
    // console.log(goalInfo)

    const status = markers.filter(marker => marker.accomplished === true).length / markers.length

    const handleClick = (event) =>{
        props.filteringGoal(goalInfo)
    }

    return(
        <div>GoalCard Here
            <h2>Goal: {goal.title}</h2>
            { goal.multi_user ? 
            <h2>Type: Shared w/ {comp[0].first_name}</h2>
            :
            <h2>Type: Personal</h2>
            }
            <h2>Deadline: {new Date(`${goal.deadline} 00:00:00`).toDateString()}</h2>
            <ProgressBar completed={status} bgcolor={"#6a1b9a"}/>
            <Link to={`/dashboard/goals/view/${goal.id}`} onClick={handleClick}>View Goal</Link>

        </div>
    )
}

const mapDispatchToProps = {
    filteringGoal
}

export default connect(null, mapDispatchToProps)(GoalCard)

// {new Date(props.note.created_at).toDateString()}