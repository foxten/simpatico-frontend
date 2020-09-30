import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import GoalCard from '../components/GoalCard'


let filteredGoals = []

const Goals = (props) =>{
   
    const {pathname} = props.location
    const handleClick = (event) =>{
        console.log(event.target.name)
        if(event.target.name === 'personal'){
            return filteredGoals = props.goals.filter(goal => goal.goal.multi_user === false)
        } else if (event.target.name === 'shared') {
           return filteredGoals = props.goals.filter(goal => goal.goal.multi_user !== false)
        }
    }

    return (
        <div>

            <div>
                <Link to='/dashboard/goals' name='all'>All</Link> | 
                <Link to='/dashboard/goals/personal' onClick={handleClick} name='personal'>Personal</Link> | 
                <Link to='/dashboard/goals/shared' onClick={handleClick} name='shared'>Shared</Link>
            </div>

            {(pathname === '/dashboard/goals' ? props.goals : filteredGoals).map((goal, index) => {
                return <GoalCard key={index} goalInfo={goal}/>
            })}
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {goals: state.goals}
}

export default connect(mapStateToProps, null)(Goals)