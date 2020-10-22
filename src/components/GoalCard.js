import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { filteringGoal } from '../actions/currentGoal'
import { Card, Row, ProgressBar, OverlayTrigger, Tooltip } from 'react-bootstrap'

const GoalCard = (props) =>{
    const { goalInfo } = props
    const {goal, comp, markers} = goalInfo

    const status = Math.round((markers.filter(marker => marker.accomplished === true).length / markers.length) * 100)
    const nextMarker = (markers.filter(marker => marker.accomplished !== true))

    console.log(nextMarker)

    const handleClick = (event) =>{
        props.filteringGoal(goalInfo)
    }

    return(

        <Card>
            <h2>{goal.title}</h2>
            { goal.multi_user ? 
               <h4>Type: Shared | {comp.map((friend, index) => {
                    return `${friend.first_name} | `
                })} </h4>
            :
            <h4>Type: Personal</h4>
            }
            <h4>Deadline: {new Date(`${goal.deadline} 00:00:00`).toDateString()}</h4>
            <Row className='justify-content-center'>

            <OverlayTrigger placement={'right'} overlay={ <Tooltip id={'marker-tooltip'}>{nextMarker.length > 0 ? `Next task - ${nextMarker[0].title}` : 'All done!'}</Tooltip>  }>
            <ProgressBar now={status} label={markers.length > 0 ? `${status}%`: "Add markers to track progress"}/>
            </OverlayTrigger>
            
            </Row>
            <Link to={`/dashboard/goals/view/${goal.id}`} onClick={handleClick}>View Goal</Link>
        </Card>

    )
}

const mapDispatchToProps = {
    filteringGoal
}

export default connect(null, mapDispatchToProps)(GoalCard)

// {new Date(props.note.created_at).toDateString()}