import React from 'react';
import { currentUser } from '../actions/login';
import { grabbingGoals } from '../actions/goals';
import { listingFriends } from '../actions/friends';
import { grabbingAlerts } from '../actions/alerts';
import { grabbingFriendRequests } from '../actions/friendRequests'
import { connect } from 'react-redux';
import {Route, Switch } from 'react-router-dom'
import { Button, ButtonGroup, Container, OverlayTrigger, Popover, Row } from 'react-bootstrap';
// import { Button, Container, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import Goals from '../containers/Goals'
import Friends from '../containers/Friends'
import Alerts from '../containers/Alerts'
import IndividualGoal from './IndividualGoal'
import GoalForm from './GoalForm'
import AddFriend from './AddFriend'
import Avatar from 'react-avatar';
import { Badge } from '@material-ui/core';



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
                        this.props.grabbingFriendRequests(userInfo.user.friend_requests)
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
        const alertsPopover = (
            <Popover bsPrefix='pushedPopover'>
                <Popover.Title as="h3">Alerts</Popover.Title>
                <Popover.Content>
                <Alerts />
                </Popover.Content>
            </Popover>
            )
        
        console.log(this.props.user)
        return(
            <Container className='otherComps'>
                <Row className="justify-content-md-center" id="avatar">
                <OverlayTrigger trigger='click' placement="right-end" overlay={alertsPopover}>
                <Badge color="primary" overlap="circle" badgeContent={this.props.alerts.length}>
                    <Avatar name={'Tester'} size={250} round={true}/>
                    </Badge>
                </OverlayTrigger>
                </Row>
                <ButtonGroup>
                <Button variant="outline-secondary" name="goals" onClick={this.handleClick}>Goals</Button>
                <Button variant="outline-secondary" name="friends" onClick={this.handleClick}>Friends</Button>
                <Button variant="outline-secondary" name="new goal" onClick={this.handleClick}>New Goal</Button>
                </ButtonGroup>
            <Switch>
                <Route path="/dashboard/goals/view/:id" component={IndividualGoal}/>
                <Route path="/dashboard/goals/edit/:id" component={GoalForm}/>
                <Route path="/dashboard/goals" component={Goals}/>
                <Route path="/dashboard/friends" component={Friends}/>
                <Route path="/dashboard/new_friend" component={AddFriend}/>
                <Route path="/dashboard/new_goal" component={GoalForm}/>
            </Switch>
        </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.login,
        goals: state.goals,
        friends: state.friends,
        alerts: state.alerts,
        friendRequests: state.friendRequests
    }
}

const mapDispatchToProps = {
    currentUser,
    grabbingGoals,
    listingFriends,
    grabbingAlerts,
    grabbingFriendRequests
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)