import React from 'react';
import { currentUser } from '../actions/login';
import { grabbingGoals } from '../actions/goals';
import { listingFriends } from '../actions/friends';
import { grabbingAlerts } from '../actions/alerts';
import { connect } from 'react-redux';
import {Route, Switch } from 'react-router-dom'
import { Button, Jumbotron } from 'react-bootstrap';
import Goals from '../containers/Goals'
import Friends from '../containers/Friends'
import Alerts from '../containers/Alerts'
import IndividualGoal from './IndividualGoal'
import GoalForm from './GoalForm'
import AddFriend from './AddFriend'
import Avatar from 'react-avatar';




class Dashboard extends React.Component{
    componentDidMount(){
        const token = localStorage.getItem('userToken')
        if(!token){
            this.props.history.push('/login')
        } else{
            const reqObj = {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              }
              fetch('http://localhost:3000/profile', reqObj)
                .then(response => response.json())
                    .then(userInfo =>{
                        this.props.currentUser(userInfo.user)
                        this.props.grabbingGoals(userInfo.user.mygoals)
                        this.props.listingFriends(userInfo.user.friends)
                        this.props.grabbingAlerts(userInfo.user.alerts)
                    })
            }
    }

    handleClick = (event) =>{
        if(event.target.name === 'goals'){
            this.props.history.push('/dashboard/goals')
        } else if(event.target.name === 'friends'){
            this.props.history.push('/dashboard/friends')
        } else {
            this.props.history.push('/dashboard/new_goal')
        }
    }
    
    render(){
        console.log(this.props.user)
        return(
            <div>
                <div>
                    {/* <Avatar name={this.props.user.first_name} size={100} round={true} /> */}
                    <Alerts />
                </div>
            <div>
                <Button variant="outline-secondary" name="goals" onClick={this.handleClick}>Goals</Button>
                <Button variant="outline-secondary" name="friends" onClick={this.handleClick}>Friends</Button>
                <Button variant="outline-secondary" name="new goal" onClick={this.handleClick}>New Goal</Button>
            <Switch>
                <Route path="/dashboard/goals/view/:id" component={IndividualGoal}/>
                <Route path="/dashboard/goals/edit/:id" component={GoalForm}/>
                <Route path="/dashboard/goals" component={Goals}/>
                <Route path="/dashboard/friends" component={Friends}/>
                <Route path="/dashboard/new_goal" component={GoalForm}/>
                <Route path="/dashboard/new_friend" component={AddFriend}/>
            </Switch>
            </div>
        </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         user: state.login,
//         goals: state.goals,
//         friends: state.friends,
//         alerts: state.alerts
//     }
// }

const mapDispatchToProps = {
    currentUser,
    grabbingGoals,
    listingFriends,
    grabbingAlerts
}

export default connect(null, mapDispatchToProps)(Dashboard)