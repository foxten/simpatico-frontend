import React from 'react';
import ProgressBar from './ProgressBar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { filteringGoal } from '../actions/currentGoal'


const GoalCard = (props) =>{
    const { goalInfo } = props
    const {goal, comp, markers} = goalInfo
    // console.log(goalInfo)

    const status = ((markers.filter(marker => marker.accomplished === true).length) / markers.length) * 100

    const handleClick = (event) =>{
        props.filteringGoal(goalInfo)
    }

    return(
        <div>GoalCard Here
            <h2>Goal: {goal.title}</h2>
            { goal.multi_user ? 
               <h2>Type: Shared | {comp.map((friend, index) => {
                    return `${friend.first_name} | `
                })} </h2>
            :
            <h2>Type: Personal</h2>
            }
            <h2>Deadline: {new Date(`${goal.deadline} 00:00:00`).toDateString()}</h2>
             <ProgressBar completed={markers.length > 0 ? status : "Add markers to track progress"} bgcolor={"#6a1b9a"}/>
            <Link to={`/dashboard/goals/view/${goal.id}`} onClick={handleClick}>View Goal</Link>

        </div>
    )
}

const mapDispatchToProps = {
    filteringGoal
}

export default connect(null, mapDispatchToProps)(GoalCard)

// {new Date(props.note.created_at).toDateString()}