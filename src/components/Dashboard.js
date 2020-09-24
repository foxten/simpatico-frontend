import React from 'react';
import { currentUser } from '../actions/login';
import { grabbingGoals } from '../actions/goals';
import { listingFriends } from '../actions/friends';
import { connect } from 'react-redux';
import {Route, Switch } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import Goals from '../containers/Goals'
import Friends from '../containers/Friends'
import IndividualGoal from '../components/IndividualGoal'
import GoalForm from '../components/GoalForm'
import AddFriend from '../components/AddFriend'



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
        // console.log(this.props.user)
        return(
            // some div with user avatar
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.login,
        goals: state.goals,
        friends: state.friends
    }
}

const mapDispatchToProps = {
    currentUser,
    grabbingGoals,
    listingFriends
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)