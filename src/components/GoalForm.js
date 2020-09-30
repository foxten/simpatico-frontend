import React from 'react';
import { connect } from 'react-redux';
import { editGoal, addGoal } from '../actions/goals';
import { filteringGoal } from '../actions/currentGoal';
import { Button, Form, Row } from 'react-bootstrap'


// FETCH REQUESTS - POST and PATCH

class GoalForm extends React.Component{
   constructor () {
       super()
       this.state = {
           editMode: false,
           title: "",
           multi_user: false, 
           publicly_viewable: false, 
           deadline: "",
           friend: [],
           markers: []
       }   
   }
   
    componentDidMount(){
       if(this.props.location.pathname.includes('/dashboard/goals/edit/')){
        const { goal, comp, markers } = this.props.current
        const { title, multi_user, publicly_viewable, deadline } = goal

            this.setState({ 
            editMode: !this.state.editMode,
            title: title,
            multi_user: multi_user,
            publicly_viewable: publicly_viewable,
            deadline: deadline, 
            friend: comp,
            markers: markers.sort(function(a, b){return a.id - b.id})
        })}
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.location.pathname !== prevProps.location.pathname){
            this.setState({
                editMode: false,
                title: "",
                multi_user: false, 
                publicly_viewable: false, 
                deadline: "",
                friend: [],
                markers: []
            })
        }
    }

    handleInput = event =>{
        console.log(event.target.className)
        if(event.target.className !== 'marker form-control'){
            this.setState({
            [event.target.name]: event.target.value
        })} else {
            let markers = [...this.state.markers]
            markers[event.target.dataset.id][event.target.name] = event.target.value
            this.setState({
                markers
            })
        }
    }

    handleChecks = event =>{
        // refactor
        if(event.target.name === 'multi_user'){
            this.setState({
                multi_user: !this.state.multi_user,
                friend: [{id: '', status: 'new'}]
            })
        }else if (event.target.name === 'publicly_viewable'){
            this.setState({
                publicly_viewable: !this.state.publicly_viewable
            })
        }else if (event.target.name === 'friend') {
            console.log(event.target.value, event.target.name)
            this.setState({
                friend: [...this.state.friend, {id: event.target.value, status: 'new'}].filter(friend => friend.id !== '')
            })
        }else if (event.target.name === 'accomplished'){
            let markers = [...this.state.markers]
            markers[event.target.dataset.id][event.target.name] = !markers[event.target.dataset.id][event.target.name]
            this.setState({
                markers
            })
        }
    }

    newField = (event) =>{
        event.preventDefault()
        if(event.target.name === 'newMarker'){
            this.setState({
                markers: [...this.state.markers, {title: '', notes: '', accomplished: false, status: 'new'}]
            })
        } else if (event.target.name === 'newFriend'){
            this.setState({
                friend: [...this.state.friend, {id: '', status: 'new'}]
            })
        }
    }
    
    handleSubmit = (event) =>{
        event.preventDefault()
        const token = localStorage.getItem('userToken')
        let newMarkers = this.state.markers.filter(marker => marker.status === 'new' && marker.title !== '')
        let existingMarkers = this.state.markers.filter(marker => marker.status !== 'new')
        let newFriends = this.state.friend.filter(friend => friend.status === 'new' && friend.id !== '' )
        // let existingFriends = this.state.friend.filter(friend => friend.status !== 'new')

        if(event.target.name === 'Submit'){
            delete this.state['editMode']
            // console.log (this.state)
            // fetch to submit new goal
            // backend should automatically create a new UGG with appropriate IDs
            // should then use dispatch action addGoal to add to state
            // will need to grab ugg_id (for this user's entry) from newly created goal and add it to each marker
            // should then send fetch request to create markers on backend
            // if multi-user, send patch request to user_group_goals to create second record
            const reqObj = {
                method: 'POST',
                headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: this.state.title,
                    deadline: this.state.deadline,
                    multi_user: this.state.multi_user,
                    publicly_viewable: this.state.publicly_viewable
                })
            }

            fetch('http://localhost:3000/goals', reqObj)
            .then(response => response.json())
            .then(data => {
                console.log(newMarkers)
                this.props.addGoal(data.goal[0])
                this.props.filteringGoal(data.goal[0])
                Promise.all((newMarkers.map(marker => {
                    delete marker['status']
                    marker['user_group_goal_id'] = data.goal[0].ugg_id
                    
                    fetch('http://localhost:3000/markers', {
                        method: 'POST', 
                        headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
                        body: JSON.stringify(marker)
                    })
                    .then(response => response.json())
                    .then(marker =>{
                        // this.props.addGoal(data.goal[0])
                        // this.props.filteringGoal(data.goal[0])
                        this.props.current.markers.push(marker)
                        this.props.history.push(`/dashboard/goals/view/${this.props.current.goal.id}`)
                    })
                })),
                   
                newFriends.map(friend =>{
                    const reqObj = {
                        method: 'POST',
                        headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
                        body: JSON.stringify({user_id: friend.id, goal_id: this.props.current.goal.id})
                    }
    
                    fetch('http://localhost:3000/user_group_goals', reqObj)
                        .then(response => response.json())
                            .then(friendInfo =>{
                                console.log(friendInfo)
                                this.props.current.comp.push(friendInfo.user)
                                this.props.editGoal(this.props.current)
                            }
                    )
                })
            )

        })
            
            
        } else if (event.target.name === 'Update'){
                const reqObj = {
                    method: 'PATCH',
                    headers:{'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        title: this.state.title,
                        multi_user: this.state.multi_user, 
                        publicly_viewable: this.state.publicly_viewable, 
                        deadline: this.state.deadline})
                }

            fetch(`http://localhost:3000/goals/${this.props.current.goal.id}`, reqObj)
                .then(response => response.json())
                    .then(updatedGoal => {
                        let newCurrent = updatedGoal.goal.filter(solo => solo.ugg_id === this.props.current.ugg_id)[0]
                        console.log(newCurrent)

                        this.props.filteringGoal(newCurrent)
                            if(this.state.editMode === true){
                                Promise.all((newMarkers.map(marker => {
                                delete marker['status']
                                marker['user_group_goal_id'] = this.props.current.ugg_id
                                
                                const reqObj = {
                                    method: 'POST',
                                    headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
                                    body: JSON.stringify(marker)
                                }
                                
                                fetch('http://localhost:3000/markers', reqObj)
                                .then(response => response.json())
                                .then(marker => {
                                    this.props.current.markers.push(marker)
                                    this.props.editGoal(this.props.current)
                                    this.props.history.push(`/dashboard/goals/view/${this.props.current.goal.id}`)
                                }) 
                            })),
                                existingMarkers.map(markerData =>{
                                const idInfo = markerData.id
                                delete markerData['id']
                                delete markerData['created_at']
                                delete markerData['updated_at']
                                const reqObj = {
                                    method: 'PATCH',
                                    headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
                                    body: JSON.stringify(markerData)
                                }
                                
                                fetch(`http://localhost:3000/markers/${idInfo}`, reqObj)
                                .then(response => response.json())
                                .then(updatedMarker =>{
                                    let idx = this.props.current.markers.findIndex(mar => mar.id === updatedMarker.id)
                                    this.props.current.markers.splice(idx, 1, updatedMarker)
                                    this.props.editGoal(this.props.current)
                                    this.props.history.push(`/dashboard/goals/view/${this.props.current.goal.id}`)
                                    })
                                }),
                                newFriends.map(friend =>{
                                    const reqObj = {
                                        method: 'POST',
                                        headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'application/json'},
                                        body: JSON.stringify({user_id: friend.id, goal_id: this.props.current.goal.id})
                                    }
                                    
                                    fetch('http://localhost:3000/user_group_goals', reqObj)
                                    .then(response => response.json())
                                    .then(friendInfo =>{
                                        if(friendInfo.message){
                                            console.log(friendInfo.message)
                                        } else {
                                            this.props.current.comp.push(friendInfo.user)
                                            this.props.editGoal(this.props.current)
                                            this.props.history.push(`/dashboard/goals/view/${this.props.current.goal.id}`)
                                        }
                                    })
                                }),
                            )} else {
                                this.props.editGoal(this.props.current)
                            }

                        console.log(this.props.current)
                    })
        } 
    }
        

    render(){
        console.log(this.state.friend)

        return (
            <div>
                {/* <h2>Goal Form</h2> */}
                <Form name={this.props.location.pathname === '/dashboard/new_goal' ? 'Submit' : 'Update'} onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formGoal">
                    <Form.Control name="title" type="text" placeholder="Goal" onChange={this.handleInput} value={this.state.title}/>
                    </Form.Group>
                    {/* <input type='text' placeholder='Goal' name='title' onChange={this.handleInput} value={this.state.title}></input><br/> */}
                    
                    <Form.Group controlId="formDeadline">
                    <Form.Control name="deadline" type="date" onChange={this.handleInput} value={this.state.deadline}/>
                    </Form.Group>
                    {/* <input type='date' name='deadline' onChange={this.handleInput} value={this.state.deadline}></input><br/> */}

                    <Form.Group controlId="formMultiUser">
                    <Form.Check name="multi_user" type="checkbox" onChange={this.handleChecks} checked={this.state.multi_user} label="Multi-User?"/>
                    </Form.Group>
                    {/* <input type='checkbox' name='multi_user' onChange={this.handleChecks} checked={this.state.multi_user}></input><br/> */}
                    
                    {this.state.multi_user === true ? 
                        this.state.friend.map((friend, index) => {
                            return <div key={index}>
                                <Form.Group controlId="formFriends">
                                <Form.Control as="select" name="friend" value={friend.id} onChange={this.handleChecks}>
                                {/* <select name='friend' value={friend.id} onChange={this.handleChecks}> */}
                                <option> -- select an option -- </option>
                                {this.props.friends.map((friendLI, index) => {
                                    return <option key={index} value={friendLI.id}>{friendLI.first_name}</option>})}
                                    </Form.Control>
                                    </Form.Group>
                                    </div>
                                }): null}

                    <Form.Group controlId="formPrivate">
                    <Form.Check name='publicly_viewable' type="checkbox" onChange={this.handleChecks} checked={!this.state.publicly_viewable} label="Private?"/>
                    </Form.Group>
                    {/* <label>Private?</label><input type='checkbox' name='publicly_viewable' onChange={this.handleChecks} checked={!this.state.publicly_viewable}></input><br/> */}
                    
                    
                    <Form.Group controlId="formMarker">
                    {this.state.markers.map((marker, index) =>{
                        return (<div key={index}>
                            <Row sm={2}>
                            {marker.title !== '' ? 
                            <Form.Check name="accomplished" type="checkbox" data-id={index} checked={marker.accomplished} onChange={this.handleChecks} disabled={marker.accomplished === true? true : false}/> : null }
                            {marker.accomplished === true ? <Form.Label>{marker.title}</Form.Label> : 
                            <Form.Control className='marker' name="title" type="text" data-id={index} onChange={this.handleInput} value={marker.title}/>}
                            </Row>
                        </div>)
                    })}
                    </Form.Group>
                    
                    <Button variant="outline-secondary" name= 'newMarker' onClick={this.newField}>Add Marker</Button>
                    <Button variant="outline-secondary" name= 'newFriend' onClick={this.newField}>Add Friend</Button>
                   
                    {this.state.markers.length > 0  && this.state.markers[0].title !== '' ? 
                    <Button variant="outline-secondary" type='submit'>{this.props.location.pathname === '/dashboard/new_goal' ? 'Submit' : 'Update'}</Button> :
                    null}
                </Form>
            </div>
            )
        }
}

const mapStateToProps = (state) =>{
    return { current: state.currentGoal, userId: state.login.id, friends: state.friends }
}

const mapDispatchToProps = {
    editGoal, 
    addGoal,
    filteringGoal
}

export default connect (mapStateToProps, mapDispatchToProps)(GoalForm)