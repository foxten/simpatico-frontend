import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import GoalCard from '../components/GoalCard'

let filteredGoals = []

const Goals = (props) =>{

    console.log(props.goals.sort(function(a, b) {return a.goal.deadline - b.goal.deadline}))
   
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
        <Container>
            <div className='linkBar'>
                <Link to='/dashboard/goals' name='all'>All</Link> | 
                <Link to='/dashboard/goals/personal' onClick={handleClick} name='personal'>Personal</Link> | 
                <Link to='/dashboard/goals/shared' onClick={handleClick} name='shared'>Shared</Link>
            </div>
            <Row sm={1}>
                
            {(pathname === '/dashboard/goals' ? props.goals : filteredGoals).map((goal, index) => {
                return <Col><GoalCard key={index} goalInfo={goal}/></Col>
            })}
            </Row>
        </Container>
    )
}

const mapStateToProps = (state) =>{
    return {goals: state.goals.sort(function (a, b) {return new Date(a.goal.deadline) - new Date(b.goal.deadline)})}
}

export default connect(mapStateToProps, null)(Goals)